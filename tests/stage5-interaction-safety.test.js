const fs=require('fs'),assert=require('assert');
const h=fs.readFileSync('www/index.html','utf8');
const core=require('../www/local-core.js');

// Stage-5 next test: interaction wiring and safety contract.
// This is intentionally fail-closed: presence of a button is not enough.
const screens=['homePanel','calendarPanel','docsPanel','payPanel','aiPanel','absencePanel','shiftPanel','reportsPanel','morePanel','settingsPanel'];
for(const id of screens) assert(h.includes('id="'+id+'"'),'missing screen '+id);

const buttons=['prevWeek','nextWeek','goToday','saveDay','patternOpen','patternSave','scanBtn','fileBtn','planFileBtn','planCameraBtn','reconcile','aiRun','aiConfirm','absencePrepare','absenceConfirm','shiftSetupOpen','reportRefresh','reportExport','faqBtn','feedbackBtn'];
for(const id of buttons){
  assert(h.includes('id="'+id+'"'),'missing interactive control '+id);
  const wired=h.includes("$('"+id+"').onclick")||h.includes("[$('"+id+"')")||h.includes("['"+id+"'");
  assert(wired,'interactive control has no executable handler '+id);
}

// File/camera controls must target real file inputs rather than display-only buttons.
for(const id of ['docCamera','docFile','planFile','planCamera']) assert(h.includes('id="'+id+'"'),'missing file input '+id);
assert(h.includes("accept=\"image/*\" capture=\"environment\""),'camera capture input missing');
assert(h.includes("accept=\"application/pdf,image/*\""),'PDF/image picker missing');

// Core safety: no network path or embedded API secret in current Local Core.
assert(!/fetch\s*\(|XMLHttpRequest|WebSocket/.test(h),'Local Core unexpectedly contains network path');
assert(!/sk-[A-Za-z0-9_-]{20,}/.test(h),'secret-like API key present');

// Deterministic command parser must abstain when date/action is ambiguous.
assert(!core.parseCalendarCommand('Nachtschicht','2026-09-21').ok);
assert(!core.parseCalendarCommand('2026-09-23 irgendetwas','2026-09-21').ok);
let d=core.parseCalendarCommand('فردا بیمار هستم','2026-09-21');
assert(d.ok); assert.equal(d.value.date,'2026-09-22'); assert.equal(d.value.actual,'Krank');

// Persistence/reload and future-schema fail-closed behavior.
const mem={v:null,getItem(){return this.v},setItem(k,v){this.v=v}};
const repo=core.repo(mem);
let saved=repo.saveProfile({name:'Test',employer:'Firma',employmentType:'part_time'},{weeklyHours:20,annualLeaveDays:24,grossHourlyRate:15});
assert(saved.ok); assert.equal(repo.load().value.profiles.length,1);
const future=JSON.stringify({schemaVersion:999,profiles:[]}); mem.v=future;
const blocked=repo.saveProfile({name:'X',employer:'Y',employmentType:'other'},{weeklyHours:1,annualLeaveDays:1});
assert(!blocked.ok); assert.equal(mem.v,future);

// Arbitrary shift duration and overnight handling.
assert.equal(core.shiftDuration('08:00','14:00'),6);
assert.equal(core.shiftDuration('22:00','06:00'),8);
assert.equal(core.shiftDuration('09:15','13:45'),4.5);

console.log('stage5-interaction-safety tests PASS');
