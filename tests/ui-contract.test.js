const fs=require('fs'),assert=require('assert');const h=fs.readFileSync('www/index.html','utf8');
const screens=['homePanel','calendarPanel','docsPanel','payPanel','aiPanel','absencePanel','shiftPanel','reportsPanel','morePanel','settingsPanel'];
for(const id of screens)assert(h.includes('id="'+id+'"'),'missing screen '+id);
for(const lang of ['de','fa','ar','uk','en'])assert(h.includes(lang+':{'),'missing language '+lang);
const actions=['prevWeek','nextWeek','goToday','saveDay','patternOpen','patternSave','scanBtn','fileBtn','planFileBtn','planCameraBtn','reconcile','aiRun','aiConfirm','absencePrepare','absenceConfirm','shiftSetupOpen','reportRefresh','reportExport','faqBtn','feedbackBtn'];
for(const id of actions){assert(h.includes('id="'+id+'"'),'missing action '+id);assert(h.includes("$('"+id+"').onclick")||h.includes("['"+id+"'")||h.includes("[$('"+id+"')"),'no handler '+id)}
assert(h.includes("localStorage.getItem(DBKEY)"));assert(h.includes("localStorage.setItem(DBKEY"));
assert(h.includes("fa-IR-u-ca-gregory"),'Persian must remain Gregorian');
assert(h.includes("Cloud-AI ist in diesem Local-first Build absichtlich nicht verbunden"),'AI-off disclosure missing');
assert(!/sk-[A-Za-z0-9_-]{20,}/.test(h),'secret-like key in UI');
console.log('ui-contract tests PASS');
assert(h.includes('LohnCore.parseCalendarCommand'),'AI command UI must use deterministic parser');assert(h.includes("db.commandHistory.push"),'confirmed AI command must be traceable');

assert(!h.includes("(work*8)+'h'"),'reports must not hardcode 8 hours per workday');assert(h.includes('calendarHours=confirmedHours(month)'),'payroll must derive expected hours from confirmed calendar');assert(h.includes("confirm('Änderung für "),'manual calendar mutation must require confirmation');assert(h.indexOf("week('Nacht','nightDays')")<h.indexOf("week('Spät','lateDays')")&&h.indexOf("week('Spät','lateDays')")<h.indexOf("week('Früh','morningDays')"),'three-shift preset must follow owner-approved Nacht-Spät-Früh order');for(const id of ['morningEnabled','lateEnabled','nightEnabled','fourthEnabled','morningStart','morningEnd','lateStart','lateEnd','nightStart','nightEnd','fourthStart','fourthEnd'])assert(h.includes('id="'+id+'"'),'missing configurable shift control '+id);assert(h.includes('LohnCore.shiftDuration'),'UI must use tested arbitrary-duration engine');

for(const v of ['1','3','6','12'])assert(h.includes('<option value="'+v+'">'),'missing report period '+v);assert(h.includes('function reportRange('),'multi-month report engine missing');assert(h.includes("months.reduce((n,x)=>n+confirmedHours(x),0)"),'period report must use confirmed calendar hours');assert(h.includes("db.pay.filter(p=>months.includes(p.month))"),'period report must compare payslips in selected period');

assert(h.includes('db.shiftSettings'),'shift settings must persist locally');
assert(h.includes("active.push('4. Schicht','4. Schicht')"),'four-shift preset must schedule fourth shift when enabled');
assert(h.includes("allowed=new Set(['Früh','Spät','Nacht','4. Schicht','Frei'])"),'custom pattern must reject unknown statuses');
assert(h.includes("x.morning?.start||'06:00'"),'calculations must use persisted shift times, not transient controls');
