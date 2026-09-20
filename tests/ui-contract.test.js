const fs=require('fs'),assert=require('assert');const h=fs.readFileSync('www/index.html','utf8');
const screens=['homePanel','calendarPanel','docsPanel','payPanel','aiPanel','absencePanel','shiftPanel','reportsPanel','morePanel','settingsPanel'];
for(const id of screens)assert(h.includes('id="'+id+'"'),'missing screen '+id);
for(const lang of ['de','fa','ar','uk','en'])assert(h.includes(lang+':{'),'missing language '+lang);
const actions=['prevWeek','nextWeek','goToday','saveDay','patternOpen','patternSave','scanBtn','fileBtn','planFileBtn','planCameraBtn','reconcile','aiRun','absencePrepare','absenceConfirm','shiftSetupOpen','reportRefresh','reportExport','faqBtn','feedbackBtn'];
for(const id of actions){assert(h.includes('id="'+id+'"'),'missing action '+id);assert(h.includes("$('"+id+"').onclick")||h.includes("['"+id+"'")||h.includes("[$('"+id+"')"),'no handler '+id)}
assert(h.includes("localStorage.getItem(DBKEY)"));assert(h.includes("localStorage.setItem(DBKEY"));
assert(h.includes("fa-IR-u-ca-gregory"),'Persian must remain Gregorian');
assert(h.includes("Cloud-AI ist in diesem Local-first Build absichtlich nicht verbunden"),'AI-off disclosure missing');
assert(!/sk-[A-Za-z0-9_-]{20,}/.test(h),'secret-like key in UI');
console.log('ui-contract tests PASS');