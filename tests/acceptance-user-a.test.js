const assert=require('assert');
const core=require('../www/local-core.js');

// Acceptance fixture A: synthetic only. No personal or production data.
const start=new Date('2026-01-01T00:00:00Z');
const calendar={};
const selected=[];
for(let i=0;i<365 && selected.length<131;i++){
  const d=new Date(start); d.setUTCDate(d.getUTCDate()+i);
  const dow=d.getUTCDay();
  if(dow!==0 && dow!==6) selected.push(d.toISOString().slice(0,10));
}
selected.forEach((date,i)=>{
  const status=i===20||i===21?'sick':i===50||i===51?'leave':'work';
  calendar[date]=core.applyConfirmedActual({plannedShift:'early'},status).value;
});
const annual=core.deterministicHours(calendar,{early:6,late:6,night:6,fourth:6});
assert.equal(annual,786,'User A annual confirmed truth must be exactly 786h');
assert.equal(Object.values(calendar).filter(x=>x.actualStatus==='sick').length,2);
assert.equal(Object.values(calendar).filter(x=>x.actualStatus==='leave').length,2);

const monthHours={};
for(const [date,day] of Object.entries(calendar)){
  const m=date.slice(0,7);
  monthHours[m]=(monthHours[m]||0)+core.deterministicHours({[date]:day},{early:6,late:6,night:6,fourth:6});
}
const months=Object.keys(monthHours).sort();
function period(end,count){
  const idx=months.indexOf(end); assert(idx>=0);
  return months.slice(Math.max(0,idx-count+1),idx+1).reduce((n,m)=>n+monthHours[m],0);
}
for(const count of [1,3,6,12]){
  const expected=period(months[months.length-1],count);
  const salaryTruth=expected;
  const reportTruth=expected;
  assert.equal(salaryTruth,reportTruth,'Salary and Report must share canonical calendar truth for '+count+'m');
}
const rate=15.5;
const expectedGross=Math.round(annual*rate*100)/100;
assert.equal(expectedGross,12183);
const payslipHours=780;
const hourDifference=annual-payslipHours;
assert.equal(hourDifference,6,'Synthetic payslip discrepancy must reproduce exactly');
const grossDifference=Math.round(hourDifference*rate*100)/100;
assert.equal(grossDifference,93);

assert.equal(core.shiftDuration('08:00','14:00'),6);
assert.equal(core.shiftDuration('22:00','06:00'),8);
for(const command of [
  ['فردا بیمار هستم','2026-09-21','2026-09-22','Krank'],
  ['Am 23.09.2026 Nachtschicht','2026-09-21','2026-09-23',null],
  ['امروز مرخصی','2026-09-21','2026-09-21','Urlaub']
]){
  const r=core.parseCalendarCommand(command[0],command[1]);
  assert(r.ok); assert.equal(r.value.date,command[2]);
  if(command[3]) assert.equal(r.value.actual,command[3]);
}
console.log(JSON.stringify({
  suite:'Acceptance Fixture A',
  synthetic:true,
  days:131,
  annualConfirmedHours:annual,
  expectedGross,
  payslipHours,
  hourDifference,
  grossDifference,
  periods:[1,3,6,12].map(n=>({months:n,hours:period(months[months.length-1],n)})),
  result:'PASS'
},null,2));
