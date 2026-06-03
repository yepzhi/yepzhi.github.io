import fitz
import os
import re

def render_proposal_pdf(md_filepath, output_pdf):
    doc = fitz.open()
    page = None
    y_pos = 0
    margin_top = 70
    margin_bottom = 70
    margin_left = 60
    margin_right = 60
    page_width = 595.28  # A4 width
    page_height = 841.89 # A4 height
    
    base_font = "helv"
    bold_font = "hebo"

    def new_page():
        nonlocal page, y_pos
        page = doc.new_page(width=page_width, height=page_height)
        y_pos = margin_top

    with open(md_filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Split into paragraphs
    paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]

    # --- PARSE STRUCTURE ---
    # First 4 paragraphs go to the title page:
    # 1. Main Title
    # 2. Subtitle
    # 3. Metadata
    # 4. Resumen introduction
    title_text = paragraphs[0]
    subtitle_text = paragraphs[1]
    metadata_text = paragraphs[2]
    resumen_text = paragraphs[3]
    
    # 5. Problema block
    # 6. Propuesta block
    problema_text = paragraphs[4]
    propuesta_text = paragraphs[5]
    
    body_paragraphs = paragraphs[6:]

    # --- PAGE 1: TITLE PAGE ---
    new_page()
    
    # Draw double line accent at the top of the title page
    page.draw_line(fitz.Point(margin_left, margin_top + 10), fitz.Point(page_width - margin_right, margin_top + 10), color=(0.1, 0.1, 0.1), width=1.5)
    page.draw_line(fitz.Point(margin_left, margin_top + 14), fitz.Point(page_width - margin_right, margin_top + 14), color=(0.1, 0.1, 0.1), width=0.5)
    
    # Title
    title_rect = fitz.Rect(margin_left, margin_top + 50, page_width - margin_right, margin_top + 150)
    page.insert_textbox(title_rect, title_text.upper(), fontsize=20, fontname=bold_font, color=(0.0, 0.0, 0.0), align=1)
    
    # Subtitle
    sub_rect = fitz.Rect(margin_left, margin_top + 130, page_width - margin_right, margin_top + 200)
    page.insert_textbox(sub_rect, subtitle_text, fontsize=11, fontname=base_font, color=(0.25, 0.25, 0.25), align=1)
    
    # Metadata
    meta_rect = fitz.Rect(margin_left, margin_top + 180, page_width - margin_right, margin_top + 210)
    page.insert_textbox(meta_rect, metadata_text, fontsize=9, fontname=base_font, color=(0.4, 0.4, 0.4), align=1)
    
    # Mid-page Divider
    page.draw_line(fitz.Point(margin_left + 100, margin_top + 230), fitz.Point(page_width - margin_right - 100, margin_top + 230), color=(0.85, 0.85, 0.85), width=0.5)
    
    # Resumen Section
    resumen_clean = resumen_text.replace("RESUMEN\n", "").strip()
    res_header_rect = fitz.Rect(margin_left, margin_top + 260, page_width - margin_right, margin_top + 280)
    page.insert_textbox(res_header_rect, "RESUMEN / ABSTRACT", fontsize=11, fontname=bold_font, color=(0.0, 0.0, 0.0), align=0)
    
    res_body_rect = fitz.Rect(margin_left, margin_top + 285, page_width - margin_right, margin_top + 420)
    page.insert_textbox(res_body_rect, resumen_clean, fontsize=10, fontname=base_font, color=(0.15, 0.15, 0.15), align=3)
    
    # Two-Column Problema & Propuesta Layout
    col_width = (page_width - margin_left - margin_right - 30) / 2
    col_y = margin_top + 440
    col_height = 250
    
    # Left column: Problema
    prob_rect = fitz.Rect(margin_left, col_y, margin_left + col_width, col_y + col_height)
    page.insert_textbox(prob_rect, problema_text, fontsize=9.5, fontname=base_font, color=(0.2, 0.2, 0.2), align=3)
    
    # Right column: Propuesta
    prop_rect = fitz.Rect(margin_left + col_width + 30, col_y, page_width - margin_right, col_y + col_height)
    page.insert_textbox(prop_rect, propuesta_text, fontsize=9.5, fontname=base_font, color=(0.2, 0.2, 0.2), align=3)
    
    # --- PAGE 2 & ONWARDS: BODY CONTENT ---
    new_page()
    
    for para in body_paragraphs:
        # Page break separator detection
        if para == "⸻" or para == "***":
            y_pos += 20
            page.draw_line(fitz.Point(margin_left + 150, y_pos), fitz.Point(page_width - margin_right - 150, y_pos), color=(0.9, 0.9, 0.9), width=0.5)
            y_pos += 30
            continue
            
        if para.startswith("────────────────────────────────────────────────────────────"):
            # End footer block: force new page or draw horizontal rules
            y_pos += 15
            page.draw_line(fitz.Point(margin_left, y_pos), fitz.Point(page_width - margin_right, y_pos), color=(0.1, 0.1, 0.1), width=1.0)
            y_pos += 10
            
            # Format and render the closing footer text
            footer_lines = [l.strip() for l in para.split('\n') if l.strip() and not l.startswith('──')]
            footer_text = "\n".join(footer_lines)
            
            rect = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
            rc = page.insert_textbox(rect, footer_text, fontsize=8.5, fontname=base_font, color=(0.3, 0.3, 0.3), align=1)
            y_pos += (rect.height - rc) + 10
            
            page.draw_line(fitz.Point(margin_left, y_pos), fitz.Point(page_width - margin_right, y_pos), color=(0.1, 0.1, 0.1), width=1.0)
            continue

        fontname = base_font
        fontsize = 10.5
        color = (0.1, 0.1, 0.1)
        alignment = 3  # Justified
        
        is_heading = False
        is_roman = False
        
        # Heading 3 Detection
        if para.startswith("### "):
            para = para.replace("### ", "")
            fontsize = 12.5
            fontname = bold_font
            color = (0, 0, 0)
            y_pos += 5
            alignment = 0
            is_heading = True
            
        # Heading 2 Detection
        elif para.startswith("## "):
            para = para.replace("## ", "")
            fontsize = 14
            fontname = bold_font
            color = (0, 0, 0)
            y_pos += 12
            alignment = 0
            is_heading = True
            
        # Roman numeral principles heading detection (e.g. I, II, III)
        elif re.match(r"^[IVX]+\n", para) or re.match(r"^[IVX]+$", para.split('\n')[0].strip()):
            lines = para.split('\n')
            roman_numeral = lines[0].strip()
            principle_title = lines[1].strip() if len(lines) > 1 else ""
            principle_body = "\n".join(lines[2:]) if len(lines) > 2 else ""
            
            # Print Roman numeral in bold
            if y_pos > page_height - margin_bottom - 80:
                new_page()
                
            rect_num = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
            rc_num = page.insert_textbox(rect_num, roman_numeral, fontsize=11, fontname=bold_font, color=(0, 0, 0), align=0)
            y_pos += (rect_num.height - rc_num) + 2
            
            # Print principle title in bold
            rect_title = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
            rc_title = page.insert_textbox(rect_title, principle_title, fontsize=10.5, fontname=bold_font, color=(0.1, 0.1, 0.1), align=0)
            y_pos += (rect_title.height - rc_title) + 4
            
            # Render body text normally
            rect_body = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
            rc_body = page.insert_textbox(rect_body, principle_body, fontsize=10, fontname=base_font, color=(0.15, 0.15, 0.15), align=3)
            y_pos += (rect_body.height - rc_body) + 12
            continue

        # Table Parsing
        if "|" in para and "---" in para.split('\n')[1]:
            rows = [r.strip() for r in para.split('\n') if r.strip()]
            header_cols = [c.strip() for c in rows[0].split('|')]
            
            # Render Table Header
            y_pos += 10
            col_x = margin_left
            # We have 3 columns in Table 1
            col_w = [120, 150, 205] # specific widths summing up to 475
            
            if y_pos > page_height - margin_bottom - 80:
                new_page()
                
            # Draw header background
            header_rect = fitz.Rect(margin_left, y_pos - 4, page_width - margin_right, y_pos + 18)
            page.draw_rect(header_rect, color=None, fill=(0.95, 0.95, 0.95))
            
            for idx, col_text in enumerate(header_cols):
                rect_cell = fitz.Rect(col_x + 5, y_pos, col_x + col_w[idx] - 5, y_pos + 25)
                page.insert_textbox(rect_cell, col_text, fontsize=9, fontname=bold_font, color=(0, 0, 0), align=0)
                col_x += col_w[idx]
            
            y_pos += 22
            
            # Render Rows
            for r in rows[2:]:
                cols = [c.strip() for c in r.split('|')]
                col_x = margin_left
                max_cell_h = 0
                
                # Check height requirement for this row
                row_y = y_pos
                for idx, col_text in enumerate(cols):
                    rect_cell = fitz.Rect(col_x + 5, row_y, col_x + col_w[idx] - 5, row_y + 120)
                    rc_cell = page.insert_textbox(rect_cell, col_text, fontsize=8.5, fontname=base_font, color=(0.15, 0.15, 0.15), align=0)
                    cell_h = rect_cell.height - rc_cell
                    if cell_h > max_cell_h:
                        max_cell_h = cell_h
                    col_x += col_w[idx]
                
                # Draw separating line
                page.draw_line(fitz.Point(margin_left, row_y + max_cell_h + 4), fitz.Point(page_width - margin_right, row_y + max_cell_h + 4), color=(0.9, 0.9, 0.9), width=0.5)
                
                y_pos += max_cell_h + 10
                
                if y_pos > page_height - margin_bottom - 40:
                    new_page()
                    
            y_pos += 10
            continue

        # Bold prefix detection (e.g. "Problema. La desconexión...")
        # Match standard cleanups
        para_render = para.replace("**", "").replace("*", "").replace("`", "")
        
        # List items formatting
        if para_render.startswith("- "):
            lines = []
            for l in para_render.split('\n'):
                lines.append(l.replace("- ", "•  "))
            para_render = "\n".join(lines)
            alignment = 0

        if y_pos > page_height - margin_bottom - 50:
            new_page()
            
        rect = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
        
        try:
            rc = page.insert_textbox(rect, para_render, fontsize=fontsize, fontname=fontname, color=color, align=alignment)
            if rc >= 0:
                y_pos += (rect.height - rc) + (10 if is_heading else 7)
            else:
                new_page()
                rect = fitz.Rect(margin_left, y_pos, page_width - margin_right, page_height - margin_bottom)
                rc = page.insert_textbox(rect, para_render, fontsize=fontsize, fontname=fontname, color=color, align=alignment)
                if rc >= 0:
                    y_pos += (rect.height - rc) + 10
                else:
                    y_pos += 150
        except Exception as e:
            print(f"Error rendering paragraph: {e}")
            y_pos += 15

    # Page Numbering (Skip Page 1)
    for i in range(1, doc.page_count):
        p = doc[i]
        # Left footer metadata
        p.insert_text(fitz.Point(margin_left, page_height - 40), "JÓVENESSTEM  |  Propuesta de Aula Piloto (Hermosillo)", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))
        # Right footer page number
        p.insert_text(fitz.Point(page_width - margin_right - 30, page_height - 40), f"Pág. {i + 1}", fontsize=8, fontname="helv", color=(0.5, 0.5, 0.5))

    doc.save(output_pdf)
    print(f"✅ Generated {output_pdf} (Academic Design)")

if __name__ == "__main__":
    render_proposal_pdf("proposal_hermosillo_formal.md", "propuesta_jovenesstem_hermosillo.pdf")
