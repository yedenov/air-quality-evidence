export function analyze(input) {
  const {daily,expectedDays,seed=42}=input;
  if(!Array.isArray(daily)||!Number.isInteger(expectedDays)||expectedDays<1||daily.length!==expectedDays) throw Error('daily must contain one value or null per expected day');
  if(!Number.isInteger(seed)||seed<0||seed>4294967295) throw Error('seed must be a uint32');
  if(daily.some(v=>v!==null&&(typeof v!=='number'||!Number.isFinite(v)||v<0))) throw Error('PM2.5 must be finite and nonnegative, or null');
  const values=daily.filter(v=>v!==null);
  if(values.length<2) throw Error('At least two observed days required');
  const mean=values.reduce((a,b)=>a+b,0)/values.length;
  let state=seed>>>0;
  const random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
  const means=Array.from({length:2000},()=>values.reduce(a=>a+values[Math.floor(random()*values.length)],0)/values.length).sort((a,b)=>a-b);
  return {observedDays:values.length,missingDays:expectedDays-values.length,coverage:values.length/expectedDays,meanUgM3:mean,bootstrap95:[means[49],means[1949]],daysAbove15:values.filter(v=>v>15).length,observedFractionAbove15:values.filter(v=>v>15).length/values.length};
}
