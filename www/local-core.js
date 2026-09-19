(function(global){'use strict';
const SCHEMA_VERSION=1, KEY='lw.localcore.v1';
const allowedTypes=['full_time','part_time','mini_job','other'];
function text(v,max){return String(v??'').trim().slice(0,max);}
function num(v,min,max){const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null;}
function validateProfile(x){
 const errors={}; const name=text(x?.name,80), employer=text(x?.employer,120), type=text(x?.employmentType,30);
 if(!name) errors.name='required'; if(!employer) errors.employer='required'; if(!allowedTypes.includes(type)) errors.employmentType='invalid';
 return {ok:!Object.keys(errors).length,errors,value:{name,employer,employmentType:type}};
}
function validateContract(x){
 const errors={}; const weeklyHours=num(x?.weeklyHours,0,168), annualLeaveDays=num(x?.annualLeaveDays,0,366), grossHourlyRate=x?.grossHourlyRate===''||x?.grossHourlyRate==null?null:num(x.grossHourlyRate,0,10000);
 if(weeklyHours===null) errors.weeklyHours='invalid'; if(annualLeaveDays===null) errors.annualLeaveDays='invalid'; if(x?.grossHourlyRate!==''&&x?.grossHourlyRate!=null&&grossHourlyRate===null) errors.grossHourlyRate='invalid';
 return {ok:!Object.keys(errors).length,errors,value:{weeklyHours,annualLeaveDays,grossHourlyRate}};
}
function fresh(){return {schemaVersion:SCHEMA_VERSION,profiles:[]};}
function parse(raw){if(!raw)return fresh();try{const d=JSON.parse(raw);if(!d||d.schemaVersion!==SCHEMA_VERSION||!Array.isArray(d.profiles))return fresh();return d;}catch(_){return fresh();}}
function repo(storage){return {
 load(){return parse(storage.getItem(KEY));},
 saveProfile(profile,contract){const p=validateProfile(profile),c=validateContract(contract);if(!p.ok||!c.ok)return {ok:false,errors:{...p.errors,...c.errors}};
  const db=this.load(), now=new Date().toISOString(), id=text(profile.id,80)||('wp-'+Date.now());
  const rec={id,...p.value,contract:{...c.value,provenance:'user_confirmed'},provenance:'user_confirmed',updatedAt:now};
  const i=db.profiles.findIndex(v=>v.id===id); if(i>=0)db.profiles[i]=rec;else db.profiles.push(rec);
  storage.setItem(KEY,JSON.stringify(db)); return {ok:true,value:rec};},
 remove(id){const db=this.load();db.profiles=db.profiles.filter(v=>v.id!==id);storage.setItem(KEY,JSON.stringify(db));}
};}
const api={SCHEMA_VERSION,KEY,validateProfile,validateContract,parse,repo};
if(typeof module!=='undefined'&&module.exports)module.exports=api;global.LohnCore=api;
})(typeof window!=='undefined'?window:globalThis);
