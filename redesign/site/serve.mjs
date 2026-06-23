import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = dirname(fileURLToPath(import.meta.url)), PORT = 8080;
const T = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.json':'application/json'};
createServer(async (req,res)=>{
  try{ let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
    const f=normalize(join(ROOT,p)); if(!f.startsWith(normalize(ROOT))){res.writeHead(403).end();return;}
    const d=await readFile(f); res.writeHead(200,{'Content-Type':T[extname(f)]||'application/octet-stream'}); res.end(d);
  }catch{ res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('404'); }
}).listen(PORT,'127.0.0.1',()=>console.log(`ASTRA redesign: http://127.0.0.1:${PORT}`));
