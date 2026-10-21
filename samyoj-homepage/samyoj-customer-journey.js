/* Customer journey: isolated adaptation of the supplied interactive demo. */
(() => {
  'use strict';
  const root = document.getElementById('custom-crm-section');
  if (!root) return;
  const get = id => root.querySelector('#syj-' + id);

/* =====================================================================
   CONFIG — drop your own assets in here.
   heroPhoto : URL of the cut-out photo (transparent PNG works best)
   avatars   : up to 6 URLs (people used in contacts / pipeline / agents)
   icons     : override any channel icon with an <svg …> string or an image URL
               keys: wa ig fb meta
   ===================================================================== */
const CONFIG = {
  heroPhoto: 'images/journey/customer-phone.png',
  avatars: ['images/avatars/priyal.webp','images/avatars/rohit.webp','images/avatars/neha.webp','images/avatars/karan.webp','images/avatars/sameer.webp','images/avatars/akash.webp'],
  icons: {
    wa: 'New%20images/social%20icons/whatsapp.png',
    fb: '<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="13" fill="#1877f2"/><path d="M28 42V27h5l.8-6H28v-4c0-1.8.5-3 3.1-3H34V8.6c-.5-.1-2.3-.2-4.3-.2-4.3 0-7.3 2.6-7.3 7.5V21h-5v6h5v15z" fill="#fff"/></svg>',
    meta: 'New%20images/social%20icons/meta.png'
  }
};

/* ===== 1. responsive scaling ===== */
const stage = get('stage'), viewport = get('viewport');
const DESIGN_WIDTH = 1536, DESIGN_HEIGHT = 920;
const mq = matchMedia('(min-width:1200px)');
function fit(){
  if(mq.matches){
    const availableWidth = Math.max(320, viewport.clientWidth - 64);
    const s = Math.min(availableWidth/DESIGN_WIDTH, 1);
    viewport.style.height = (DESIGN_HEIGHT*s)+'px';
    stage.style.transform = `translate(${(viewport.clientWidth-DESIGN_WIDTH*s)/2}px,0) scale(${s})`;
  }else{
    viewport.style.height = ''; stage.style.transform = '';
  }
}
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(viewport);
addEventListener('resize', fit); mq.addEventListener?.('change', fit); fit();
/* ===== 2. channel icons ===== */
const ICONS = {
 ig:`<svg viewBox="0 0 48 48"><defs><linearGradient id="syj-gi" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#fdb03a"/><stop offset=".45" stop-color="#e8336d"/><stop offset="1" stop-color="#7c3ad9"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#syj-gi)"/><rect x="11.500" y="11.500" width="25" height="25" rx="7.500" fill="none" stroke="#fff" stroke-width="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" stroke-width="3"/><circle cx="31.500" cy="16.500" r="1.800" fill="#fff"/></svg>`,
 fb:`<svg viewBox="0 0 48 48"><defs><linearGradient id="syj-gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8bff"/><stop offset="1" stop-color="#1769f0"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#syj-gf)"/><path d="M24 11c-7.500 0-13.500 5.400-13.500 12.100 0 3.800 1.900 7.200 5 9.400V38l4.700-2.600c1.200.3 2.500.5 3.800.5 7.500 0 13.500-5.400 13.500-12.100S31.500 11 24 11z" fill="#fff"/><circle cx="18" cy="24" r="2" fill="#2b7bf2"/><circle cx="24" cy="24" r="2" fill="#2b7bf2"/><circle cx="30" cy="24" r="2" fill="#2b7bf2"/></svg>`,
 meta:`<svg viewBox="0 0 48 48"><path d="M24 24c-2.500-4.500-5-9-8.500-9C11.500 15 9 19.500 9 24s2.500 9 6.500 9c3.500 0 6-4.500 8.500-9zm0 0c2.500 4.500 5 9 8.500 9 4 0 6.500-4.500 6.500-9s-2.500-9-6.500-9c-3.500 0-6 4.500-8.500 9z" fill="none" stroke="#1f6bf0" stroke-width="4.600" stroke-linejoin="round"/></svg>`,
};
const asMarkup=v=>/^\s*</.test(v)?v:`<img src="${v}" alt="">`;
root.querySelectorAll('[data-icon]').forEach(el=>{
  const k=el.dataset.icon, html=asMarkup(CONFIG.icons[k]||ICONS[k]);
  el.insertAdjacentHTML('afterbegin',html);
});

/* ===== 3. avatars ===== */
const P=i=>`<img src="${CONFIG.avatars[i%CONFIG.avatars.length]}" alt="" width="48" height="48" loading="lazy" decoding="async">`;

/* ===== 4. compact CRM detail icon ===== */
get('summary-icon').innerHTML = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="8" y="7" width="32" height="34" rx="7" fill="#fff" stroke="#6a35ee" stroke-width="2.5"/><path d="M16 17h16M16 23h10M16 31h5M28 29l3 3 5-6" stroke="#6a35ee" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="32" r="7" fill="#dcfce7" stroke="#22b35a" stroke-width="2"/></svg>`;

/* ===== 5. contacts ===== */
const CONT=[
 {n:'Nirbhay',s:'WhatsApp',st:'nl',p:0,avatarText:'NH',c:'#22c55e',sel:1},
 {n:'Rohit Mehta',s:'Instagram',st:'q',p:1,c:'#7a4cf3'},
 {n:'Ananya Gupta',s:'Facebook',st:'db',p:2,c:'#2b7bf2'},
 {n:'Karan Patel',s:'Meta Ads',st:'cw',p:3,c:'#1f6bf0'}
];
const STG=[['nl','New Lead'],['q','Qualified'],['db','Demo Booked'],['cw','Closed Won']];
const crows=get('crows');
CONT.forEach(c=>{
  const r=document.createElement('div');r.className='syj-crow'+(c.sel?' syj-sel':'');
  const avatar=c.avatarText?`<span class="syj-avatar-monogram" aria-label="${c.n}">${c.avatarText}</span>`:P(c.p);
  r.innerHTML=`<div class="syj-av"><div>${avatar}</div><span class="syj-cd" style="background:${c.c}"></span></div><div class="syj-cn"><b>${c.n}</b><span>${c.s}</span></div><div class="syj-stg syj-s-${c.st}">${STG.find(x=>x[0]===c.st)[1]}</div>${c.sel?'<i class="syj-un"></i>':''}<div class="syj-kb2"></div>`;
  crows.appendChild(r);
  r.addEventListener('click',()=>{root.querySelectorAll('.syj-crow').forEach(x=>x.classList.toggle('syj-sel',x===r))});
  r.querySelector('.syj-stg').addEventListener('click',e=>{
    e.stopPropagation();
    const from=c.st, idx=(STG.findIndex(x=>x[0]===from)+1)%4; c.st=STG[idx][0];
    const el=e.currentTarget; el.className='syj-stg syj-s-'+c.st; el.textContent=STG[idx][1];
    bumpCount(from,-1); bumpCount(c.st,+1);
  });
});

/* ===== 6. pipeline ===== */
const COLS=[{k:'nl',l:'New Leads',n:320,p:[0,3,1]},{k:'q',l:'Qualified',n:186,p:[3,1,3]},{k:'db',l:'Demo Booked',n:97,p:[3,1,3]},{k:'cw',l:'Closed Won',n:64,p:[2,4,5]}];
const pcols=get('pcols'), counters={};
COLS.forEach((c,ci)=>{
  const d=document.createElement('div');d.className='syj-pcol syj-c-'+c.k;
  d.innerHTML=`<div class="syj-ph"><div class="syj-pl">${c.l}</div><div class="syj-pn">0</div></div><div class="syj-pcards">`+
    c.p.map((p,i)=>`<div class="syj-pcard" style="--d:${(ci*.4+i*.3)}s"><div class="syj-av">${P(p)}</div><div class="syj-ln"><i></i><i></i></div></div>`).join('')+`</div>`;
  pcols.appendChild(d); counters[c.k]={el:d.querySelector('.syj-pn'),v:c.n};
  const t0=performance.now()+900+ci*120;
  (function tick(now){const t=Math.min(1,Math.max(0,(now-t0)/1100));counters[c.k].el.textContent=Math.round(counters[c.k].v*(1-Math.pow(1-t,3)));if(t<1)requestAnimationFrame(tick)})(performance.now());
});
function bumpCount(k,d){const c=counters[k];c.v+=d;c.el.textContent=c.v;c.el.classList.remove('syj-bump');void c.el.offsetWidth;c.el.classList.add('syj-bump')}
setInterval(()=>bumpCount('nl',1),5200);

/* ===== 7. tags ===== */
const TAGS=[['Interested','p',91],['High Budget','g',103],['Festival Campaign','r',135],['Repeat Customer','b',127],['Product: Sofa','p',111],['Location: Delhi','n',115]];
const trow=get('trow');
function mkTag(label,cls,w){const d=document.createElement('div');d.className='syj-tag syj-t-'+cls;if(w)d.style.setProperty('--w',w+'px');d.textContent=label;d.onclick=()=>d.classList.toggle('syj-sel');return d}
TAGS.forEach(t=>trow.appendChild(mkTag(t[0],t[1],t[2])));
const add=document.createElement('div');add.className='syj-tag syj-add';add.style.setProperty('--w','100px');
add.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" stroke="#5d6481" stroke-width="1.7" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg><span>Add Tag</span>';
trow.appendChild(add);
add.onclick=()=>{
  if(add.querySelector('input'))return;
  const sp=add.querySelector('span'),inp=document.createElement('input');inp.placeholder='New tag';inp.maxLength=24;sp.replaceWith(inp);add.style.setProperty('--w','140px');inp.focus();
  const done=()=>{const v=inp.value.trim();const s=document.createElement('span');s.textContent='Add Tag';inp.replaceWith(s);add.style.setProperty('--w','100px');
    if(v){trow.insertBefore(mkTag(v,'p',null),add)}};
  inp.addEventListener('keydown',e=>{if(e.key==='Enter')inp.blur();if(e.key==='Escape'){inp.value='';inp.blur()}});
  inp.addEventListener('blur',done);
};

/* ===== 8. agents ===== */
const ag=get('agents');
[3,4,5].forEach(i=>{const d=document.createElement('div');d.className='syj-ag';d.innerHTML=P(i);ag.appendChild(d)});
ag.insertAdjacentHTML('beforeend','<div class="syj-ag syj-plus"><svg viewBox="0 0 18 18"><path d="M9 3v12M3 9h12"/></svg></div>');
const ags=[...ag.querySelectorAll('.syj-ag:not(.syj-plus)')];let ai=0;
setInterval(()=>{ags.forEach((a,i)=>a.classList.toggle('syj-hot',i===ai));ai=(ai+1)%ags.length},1300);

/* ===== 9. chat sequence ===== */
const els=['m1','m2','m3','m4'].map(i=>get(i));
function play(){els.forEach(e=>e.classList.remove('syj-show'));[600,1700,2800,3900].forEach((t,i)=>setTimeout(()=>els[i].classList.add('syj-show'),t))}
play();setInterval(play,16000);
const toast=get('toast');let tt;
root.querySelectorAll('.syj-qb').forEach(b=>b.addEventListener('click',()=>{
  root.querySelectorAll('.syj-qb').forEach(x=>x.classList.toggle('syj-sel',x===b));
  toast.textContent='Sent: '+b.textContent;toast.classList.add('syj-show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('syj-show'),1800)}));
const details=get('details');
details.addEventListener('click',()=>{const s=details.querySelector('span');details.classList.add('syj-done');s.textContent='Inbox opened ✓';setTimeout(()=>{details.classList.remove('syj-done');s.textContent='Open inbox'},2200)});

/* ===== 10. entrance on scroll (flow layout) / immediately (desktop) ===== */
const ins=[...root.querySelectorAll('.syj-in')];
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('syj-vis');io.unobserve(e.target)}}),{threshold:.08});
  ins.forEach(el=>io.observe(el));
}else ins.forEach(el=>el.classList.add('syj-vis'));

})();
