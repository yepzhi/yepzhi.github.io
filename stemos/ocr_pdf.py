import os
import fitz
import Quartz
import Vision
from Cocoa import NSURL

def ocr_page(image_path):
    url = NSURL.fileURLWithPath_(image_path)
    handler = Vision.VNImageRequestHandler.alloc().initWithURL_options_(url, None)
    
    results = []
    
    # A class or a simple callback works. In modern PyObjC, we can pass a function directly as completion handler.
    def completion_handler(request, error):
        if error:
            print(f"Error in OCR for {image_path}: {error}")
            return
        observations = request.results()
        if observations:
            for obs in observations:
                candidates = obs.topCandidates_(1)
                if candidates:
                    results.append(candidates[0].string())
                    
    request = Vision.VNRecognizeTextRequest.alloc().initWithCompletionHandler_(completion_handler)
    request.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    request.setUsesLanguageCorrection_(True)
    
    success, error = handler.performRequests_error_([request], None)
    if not success:
        print(f"Failed to run OCR for {image_path}: {error}")
        return ""
    
    return "\n".join(results)

def main():
    pdf_path = "stemOS foundation.pdf"
    if not os.path.exists(pdf_path):
        print(f"PDF not found: {pdf_path}")
        return
        
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    num_pages = len(doc)
    print(f"Total pages: {num_pages}")
    
    full_text = []
    
    for i in range(num_pages):
        print(f"Processing page {i+1}/{num_pages}...")
        page = doc[i]
        pix = page.get_pixmap(dpi=200)
        temp_img_path = f"temp_page_{i+1}.png"
        pix.save(temp_img_path)
        
        try:
            page_text = ocr_page(temp_img_path)
            full_text.append(f"\n--- Page {i+1} ---\n{page_text}")
        except Exception as e:
            print(f"Error OCR-ing page {i+1}: {e}")
            full_text.append(f"\n--- Page {i+1} ---\n[Error: {e}]")
        finally:
            if os.path.exists(temp_img_path):
                os.remove(temp_img_path)
                
    output_path = "stemOS_foundation_text.txt"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(full_text))
        
    print(f"OCR text written to {output_path}")

if __name__ == "__main__":
    main()
