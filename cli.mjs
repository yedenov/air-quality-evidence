import fs from 'node:fs';
import path from 'node:path';
import {analyze} from './src/model.mjs';
const [input,output]=process.argv.slice(2);
if(!input){console.error('Usage: node cli.mjs INPUT.json [OUTPUT_DIRECTORY]');process.exit(1);}
try {
 const data=JSON.parse(fs.readFileSync(input,'utf8'));
 const result=analyze(data);
 const artifact={project:"air-quality-evidence",dataStatus:path.resolve(input)===path.resolve('data/demo.json')?'SYNTHETIC DEMONSTRATION':'USER SUPPLIED — provenance not verified',input:data,result};
 const json=JSON.stringify(artifact,null,2)+'\n';
 if(output){fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'result.json'),json);const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');fs.writeFileSync(path.join(output,'report.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Air Quality Evidence — report</title><style>body{font:17px/1.6 system-ui;margin:48px auto;padding:0 24px;max-width:960px;color:#143143;background:#f4f8fa}h1{font-size:42px;line-height:1.15}strong{color:#985400}pre{background:white;padding:24px;overflow:auto;border:1px solid #cbdde5;border-radius:12px}a{color:#006a83}</style><h1>Air Quality Evidence</h1><strong>'+esc(artifact.dataStatus)+'</strong><p>How does missing daily monitoring change our interpretation of PM2.5 exposure?</p><h2>Method and interpretation</h2><p>Daily means are compared with the WHO 2021 PM2.5 24-hour guideline level of 15 µg/m³. This comparison is descriptive: formal guideline assessment uses the annual 99th percentile. The sample mean is NOT an annual exposure estimate. A seeded IID percentile bootstrap estimates uncertainty in the observed mean; serial correlation and non-random missingness can invalidate this interval.</p><h2>Inputs and results</h2><pre>'+esc(json)+'</pre><p>Research prototype • no verified field impact • <a href="https://www.who.int/publications/i/item/9789240034228/">Method reference</a></p></html>');}
 process.stdout.write(json);
}catch(e){console.error('Analysis failed: '+e.message);process.exit(1);}
