const assert = require('assert');
const { RemoteJobEngine, NINETY_DAY_PLAN, SOURCING_PLATFORMS } = require('../ian-engine.js');

console.log('🧪 Running JobHunter / IanEngine Test Suite...\n');

const engine = new RemoteJobEngine();

// 1. Profile Verification
const profile = engine.saveProfile({
  targetRole: 'Customer Success Manager',
  yearsExperience: '5',
  englishLevel: 'C1 Fluent',
  targetSalaryUsd: '4500'
});
assert.strictEqual(profile.targetRole, 'Customer Success Manager');
console.log('✓ Candidate profile persistence works');

// 2. 90-Day Plan structure
assert.strictEqual(NINETY_DAY_PLAN.length, 4);
const totalTasks = NINETY_DAY_PLAN.reduce((acc, p) => acc + p.tasks.length, 0);
assert(totalTasks >= 20, `Expected at least 20 tasks, got ${totalTasks}`);
console.log(`✓ 90-Day execution plan loaded with ${totalTasks} tactical tasks across 4 phases`);

// 3. Task Toggle
const toggled = engine.toggleTask('w1_d1');
assert(toggled.includes('w1_d1'));
const untoggled = engine.toggleTask('w1_d1');
assert(!untoggled.includes('w1_d1'));
console.log('✓ Task toggle state works correctly');

// 4. Job Description Analysis
const sampleJd = `We are looking for a Customer Success Manager with Salesforce, Zendesk, and SQL experience to reduce churn and elevate CSAT scores across our US accounts.`;
const analysis = engine.analyzeJobDescription(sampleJd, 'Experienced in Salesforce and reducing churn');
assert(analysis.topKeywords.length >= 3);
assert(analysis.matchScore > 50);
console.log(`✓ Job description parser extracted ${analysis.topKeywords.length} keywords with match score: ${analysis.matchScore}%`);

// 5. ATS-Compliant CV Generation
const cv = engine.generateAtsCv(profile, analysis);
assert(cv.includes('PROFESSIONAL SUMMARY'));
assert(cv.includes('CORE COMPETENCIES & TECHNICAL STACK'));
assert(cv.includes('PROFESSIONAL EXPERIENCE'));
assert(cv.includes('W-8BEN'));
console.log('✓ ATS 1-column CV generated with clean formatting');

// 6. LinkedIn Magnet Optimization
const li = engine.generateLinkedInOptimization(profile);
assert(li.headline.length <= 220);
assert(li.about.includes('Let\'s connect'));
assert(li.settingsChecklist.length === 4);
console.log('✓ LinkedIn headline, 4-part About, and settings checklist generated');

// 7. Boolean Search Strings & Sourcing
const booleanSearch = engine.generateBooleanSearches('Customer Success Manager');
assert(booleanSearch.linkedinJobs.includes('NOT "On-site"'));
assert(booleanSearch.googleXrayGreenhouse.includes('site:boards.greenhouse.io'));
console.log('✓ Boolean queries for LinkedIn, Google X-Ray, and Greenhouse synthesized');

// 7.1 Multi-Board Lookup Everywhere Links
const lookupLinks = engine.generateLookupEverywhereLinks('Customer Success');
assert.strictEqual(lookupLinks.length, 9);
assert(lookupLinks.some(l => l.id === 'greenhouse'));
assert(lookupLinks.some(l => l.id === 'lever'));
assert(lookupLinks.some(l => l.id === 'ashby'));
assert(lookupLinks.some(l => l.id === 'linkedin'));
console.log(`✓ Lookup Everywhere multi-board links generated (${lookupLinks.length} major boards)`);

// 7.2 Fallback Live Jobs Database
const fallbackJobs = engine._getFallbackJobs('customer');
assert(fallbackJobs.length >= 1);
assert(fallbackJobs[0].title.length > 0);
console.log(`✓ Live job search engine verified with fallback job cards`);

// 8. Outreach Sequence
const outreach = engine.generateOutreachSequence('Alex', 'SaaSFlow', 'Customer Success Manager', 'cut churn by 20%');
assert(outreach.templateA.length <= 300);
assert(outreach.templateB.includes('Alex'));
assert(outreach.templateC.includes('follow up'));
console.log('✓ 3-stage outreach sequence (Connection, Value Pitch, 7-Day Bump) generated');

// 9. Scam Screening
const scamTest = engine.screenForScams('Contact us on Telegram to receive your equipment reimbursement check from our @gmail.com account.');
assert.strictEqual(scamTest.isSafe, false);
assert(scamTest.redFlags.length >= 2);
console.log(`✓ Scam detection engine flagged ${scamTest.redFlags.length} critical threats`);

// 10. Mock Interview STAR Evaluation
const starEval = engine.evaluateStarResponse('In my previous job we had a 20% drop in SLA, so I automated tickets using Slack which saved 10 hours weekly.');
assert(starEval.hasMetrics === true);
assert(starEval.score >= 80);
console.log(`✓ STAR interview evaluator scored response at ${starEval.score}/100`);

// 11. Salary Negotiation Scripts
const neg = engine.generateNegotiationScripts(4000, 'Customer Success Manager');
assert.strictEqual(neg.recommendedCounter, 4480);
assert(neg.deflectionScript.includes('$4000'));
console.log('✓ Salary negotiation counter-offer scripts (+12% benchmark) calculated');

// 12. MadsLorentzen 5-Dimension Fit Evaluation & Compatibility
const topJobs = engine.getCuratedHighMatchJobs();
assert(topJobs.length >= 5);
const primaryJob = topJobs[0];
const fitResult = engine.evaluateJobFit(primaryJob);
assert(fitResult.overallScore >= 90, `Expected score >= 90, got ${fitResult.overallScore}`);
assert.strictEqual(fitResult.locationGate, 'PASS');
assert.strictEqual(fitResult.languageGate, 'PASS');
assert(fitResult.strengths.length >= 3);
assert(fitResult.reputation.glassdoorRating >= 4.5);
console.log(`✓ 5-Dimension Fit Evaluation verified: ${primaryJob.title} scored ${fitResult.overallScore}% (${fitResult.verdict})`);

// 13. Forward-Looking Cover Letter Generation
const coverLetter = engine.generateCoverLetterForJob(primaryJob);
assert(coverLetter.includes('Dear Hiring Team at'));
assert(coverLetter.includes('JóvenesSTEM'));
assert(coverLetter.includes('90 days'));
assert(coverLetter.includes('Mexico'));
console.log('✓ Forward-looking tailored cover letter generated per ai-job-search framework');

// 14. Follow-Up Email Sequence & Mailto Links
const emailSeq = engine.generateFollowUpEmailSequence(primaryJob);
assert(emailSeq.touchpoint1.subject.includes('Application:'));
assert(emailSeq.touchpoint1.mailtoUrl.startsWith('mailto:'));
assert(emailSeq.touchpoint2.body.includes('follow up'));
assert(emailSeq.touchpoint3.subject.includes('Thank You'));
assert(emailSeq.linkedinNote.text.length <= 300);
console.log('✓ 4-Touchpoint follow-up email suite & mailto links verified');

// 15. Pipeline Management & Application Tracking
const initialPipeline = engine.getPipeline();
const updatedPipeline = engine.addToPipeline(primaryJob, fitResult);
assert(updatedPipeline.some(item => item.title === primaryJob.title));
const pipelineAfterStatus = engine.updatePipelineStatus(primaryJob.id, 'Interviewing');
const itemFound = pipelineAfterStatus.find(item => item.id === primaryJob.id);
assert.strictEqual(itemFound.status, 'Interviewing');
engine.removePipelineItem(primaryJob.id);
console.log('✓ Application Pipeline tracker (add, status update, remove) functioning');

console.log('\n========================================');
console.log('🎉 ALL 15 HYBRID ENGINE TESTS PASSED WITH 0 FAILURES');
console.log('========================================\n');

