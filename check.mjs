// Cek cepat: link internal rusak, judul/deskripsi ganda atau kepanjangan, H1 ganda.
import fs from 'node:fs'; import path from 'node:path';
const files=[];(function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);fs.statSync(p).isDirectory()?walk(p):p.endsWith('.html')&&files.push(p);}})('dist');
let err=0;const titles={},descs={};
for(const f of files){const h=fs.readFileSync(f,'utf8');if(f.endsWith('dist/index.html')||f.endsWith('404.html')||/google[0-9a-f]+\.html$/.test(f))continue;
  const t=(h.match(/<title>(.*?)<\/title>/)||[])[1]||'';const d=(h.match(/name="description" content="(.*?)"/)||[])[1]||'';
  (titles[t]??=[]).push(f);(descs[d]??=[]).push(f);
  const tl=t.replace(/&amp;/g,'&').length, dl=d.replace(/&amp;/g,'&').length;
  if(tl>65)console.log('JUDUL PANJANG',tl,f),err++; if(dl>160||dl<70)console.log('DESKRIPSI',dl,f),err++;
  if((h.match(/<h1/g)||[]).length!==1)console.log('H1 != 1',f),err++;
  for(const m of h.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)){const B=process.env.BASE_PATH||'';const p=B&&m[1].startsWith(B)?m[1].slice(B.length):m[1];const target=p.endsWith('/')?path.join('dist',p,'index.html'):path.join('dist',p);if(!fs.existsSync(target))console.log('LINK RUSAK',p,'di',f),err++;}
  for(const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{JSON.parse(m[1])}catch{console.log('SCHEMA RUSAK',f);err++}}
}
// Anti-spam: panjang minimum, kepadatan kata kunci, dan kemiripan antarhalaman
const words=(t)=>t.toLowerCase().replace(/[^a-z0-9à-ÿ\s]/gi,' ').split(/\s+/).filter(Boolean);
const shingles=(w)=>{const S=new Set();for(let i=0;i+5<=w.length;i++)S.add(w.slice(i,i+5).join(' '));return S;};
for(const dir of ['src/content/blog/id','src/content/blog/en','src/content/kota']){
  if(!fs.existsSync(dir))continue;
  const docs=fs.readdirSync(dir).filter(f=>f.endsWith('.md')).map(f=>{const raw=fs.readFileSync(path.join(dir,f),'utf8');const body=raw.replace(/^---[\s\S]*?---/,'');const w=words(body);return{f:path.join(dir,f),w,sh:shingles(w),body:body.toLowerCase()};});
  for(const d of docs){
    if(d.w.length<380)console.log('TERLALU PENDEK',d.w.length,'kata',d.f),err++;
    const kw=(d.body.match(/penerjemah tersumpah/g)||[]).length;
    if(kw/d.w.length>0.02)console.log('KATA KUNCI TERLALU PADAT',kw,'kali dalam',d.w.length,'kata',d.f),err++;
  }
  for(let i=0;i<docs.length;i++)for(let j=i+1;j<docs.length;j++){
    const A=docs[i].sh,B=docs[j].sh;let n=0;for(const x of A)if(B.has(x))n++;
    const sim=n/Math.min(A.size,B.size||1);
    if(sim>0.22)console.log('TERLALU MIRIP',Math.round(sim*100)+'%',docs[i].f,'<>',docs[j].f),err++;
  }
}
for(const [k,v] of Object.entries(titles))if(v.length>1)console.log('JUDUL GANDA',k,v),err++;
for(const [k,v] of Object.entries(descs))if(v.length>1)console.log('DESKRIPSI GANDA',k,v),err++;
console.log(files.length,'file dicek,',err,'masalah');process.exit(err?1:0);
