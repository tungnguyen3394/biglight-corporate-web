// Sinh bộ HTML tĩnh (prototype) cho biglight.jp theo bố cục Guidable.
const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, 'dist');
const SITE = 'https://biglight.jp'; // URL chính thức (canonical). Bản xem trước new.biglight.jp bị chặn index ở tầng Caddy.
fs.rmSync(OUT, { recursive: true, force: true });
for (const d of ['css','js','img','about','about/message','about/company','about/sdgs','service','service/tokutei-ginou','service/engineer','img/field','product','news','recruit','contact']) fs.mkdirSync(path.join(OUT,d),{recursive:true});

// ---------- assets ----------
const copies = {
  'img/logo-mark.png':'img/logo.png','img/wordmark.png':'img/wordmark.png','img/engineer.jpg':'img/engineer.jpg','img/desk-portal.jpg':'img/desk-portal.jpg','img/news-kokunai.jpg':'img/news-kokunai.jpg','img/news-renewal.jpg':'img/news-renewal.jpg','img/illu-culture-1.svg':'img/illu-culture-1.svg','img/illu-culture-2.svg':'img/illu-culture-2.svg','img/illu-culture-3.svg':'img/illu-culture-3.svg','img/illu-mission.svg':'img/illu-mission.svg','img/illu-vision.svg':'img/illu-vision.svg','img/mark-alpha.png':'img/mark.png','img/icon-portal.png':'img/icon-portal.png','img/icon-academy.png':'img/icon-academy.png','img/icon-job.png':'img/icon-job.png',
  'img/recruit-1.jpg':'img/team.jpg','img/hero-team.jpg':'img/hero-team.jpg','img/ceo-full.jpg':'img/ceo.jpg',
  'img/hero-kensetsu.jpg':'img/svc-kensetsu.jpg','img/hero-gaishoku.jpg':'img/svc-gaishoku.jpg','img/hero-inshokuryohin.jpg':'img/svc-seizo.jpg',
  'img/staff-1.jpg':'img/staff-1.jpg','img/staff-2.jpg':'img/staff-2.jpg','img/staff-3.jpg':'img/staff-3.jpg',
  'img/recruit-bg.jpg':'img/field/kogyo.jpg','img/recruit-3.jpg':'img/office-hcm.jpg','img/recruit-2.jpg':'img/office-nagoya.jpg',
  'img/desk-academy.jpg':'img/desk-academy.jpg','img/desk-job.jpg':'img/desk-job.jpg','img/shot-portal-916.jpg':'img/shot-portal.jpg','img/shot-academy.jpg':'img/shot-academy.jpg','img/shot-job.jpg':'img/shot-job.jpg',
  'badges/apple-ja.svg':'img/badge-appstore.svg','badges/google-ja.png':'img/badge-googleplay.png',
};
Object.assign(copies,{'img/og-image.jpg':'img/og-image.jpg','favicon.ico':'favicon.ico','apple-touch-icon.png':'apple-touch-icon.png','icon-96.png':'icon-96.png'});
fs.mkdirSync(path.join(OUT,'img/people'),{recursive:true});for(const f of fs.readdirSync(path.join(__dirname,'src/img/people')).filter(f=>f.endsWith('.webp')))fs.copyFileSync(path.join(__dirname,'src/img/people',f),path.join(OUT,'img/people',f));
{ let out='';const N=34,S=80;const A=t=>330+110*Math.sin(t*Math.PI*1.9+0.2)-210*t, B=t=>330+110*Math.sin(t*Math.PI*1.9+2.9)-210*t+70*Math.sin(t*Math.PI);
  const mix=(a,b,k)=>a.map((v,i)=>Math.round(v+(b[i]-v)*k));const navy=[11,61,145],blue=[30,111,214],gold=[245,166,35];
  for(let i=0;i<N;i++){const k=i/(N-1);const c=k<.55?mix(navy,blue,k/.55):mix(blue,gold,(k-.55)/.45);let d='';for(let j=0;j<=S;j++){const t=j/S,x=-40+t*1080,y=A(t)+(B(t)-A(t))*k;d+=(j?'L':'M')+x.toFixed(0)+' '+y.toFixed(0);}out+='<path d="'+d+'" stroke="rgb('+c.join(',')+')"/>';}
  fs.writeFileSync(path.join(OUT,'img/bg-wave.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 520" fill="none" stroke-width="1">'+out+'</svg>'); }
// ảnh chụp: dùng bản WebP (src/img/*.webp) nếu có — tên đích đổi .jpg → .webp, tham chiếu được thay ở bước SEO
const WEBP = {};
for (const [s,d] of Object.entries(copies)) {
  const w = s.replace(/\.jpg$/, '.webp');
  if (w !== s && fs.existsSync(path.join(__dirname,'src',w))) { const dw = d.replace(/\.jpg$/, '.webp'); fs.copyFileSync(path.join(__dirname,'src',w), path.join(OUT,dw)); WEBP[d] = dw; }
  else fs.copyFileSync(path.join(__dirname,'src',s), path.join(OUT,d));
}

// ---------- CSS ----------
const css = `
/* BIGLIGHT corporate prototype — bố cục theo guidable.co.jp, màu theo BIGLIGHT */
:root{
  --ink:#202020; --ink2:#444; --grey:#737373; --line:#e0e0e0; --bg:#fff;
  --accent:#0b3d91; --accent-d:#072a66; --gold:#f5a623; --gold-l:#ffcb05; --blue:#1e6fd6;
  --loop:rgba(245,166,35,.16);
  --jp:"Noto Sans JP","Hiragino Kaku Gothic ProN","Hiragino Sans","Yu Gothic",Meiryo,sans-serif;
  --en:Roboto,"Noto Sans JP",Arial,sans-serif;
  --wrap:1120px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--jp);font-size:16px;line-height:2;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4,p{margin:0}
.wrap{max-width:var(--wrap);margin:0 auto;padding-inline:40px}
.en{font-family:var(--en);font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.ja-lb{font-size:14px;font-weight:700;letter-spacing:.1em;color:var(--accent);line-height:1.5}
.dots{display:flex;gap:28px;margin-top:22px}
.dots i{width:9px;height:9px;border-radius:50%;display:block}
.dots i:nth-child(1){background:var(--gold-l)}.dots i:nth-child(2){background:var(--gold)}.dots i:nth-child(3){background:var(--blue)}.dots i:nth-child(4){background:var(--accent)}

/* header */
.hd{position:sticky;top:0;z-index:50;background:#fff;height:69px;display:flex;align-items:center;justify-content:space-between;padding:0 40px}
.hd .logo{display:flex;align-items:center;gap:10px}
.hd .logo img{height:44px;width:auto}
.hd .logo img.wm{height:15px}
.ft .logo{display:flex;align-items:center;gap:12px}
.ft .logo img.wm{height:18px}
.hd .brand{display:flex;align-items:center;gap:22px}
.sdgs-mark{display:flex;align-items:center;gap:9px;padding-left:22px;border-left:1px solid var(--line);height:34px}
.sdgs-mark .wheel{width:32px;height:32px;flex:none;transition:transform 1.2s cubic-bezier(.2,.6,.2,1)}
.sdgs-mark:hover .wheel{transform:rotate(360deg)}
.sdgs-mark span{font-family:var(--en);font-size:8.5px;font-weight:700;letter-spacing:.12em;line-height:1.25;color:var(--ink2)}
@media (max-width:860px){.hd .brand{gap:14px}.sdgs-mark{padding-left:14px}.sdgs-mark span{display:none}.sdgs-mark .wheel{width:28px;height:28px}}
.hd nav{display:flex;align-items:center;gap:36px}
.hd nav>a,.hd nav .dd>a{font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.1em;padding:6px 0;position:relative;display:inline-flex;align-items:center;gap:8px}
.hd nav>a::after,.hd nav .dd>a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .25s}
.hd nav>a:hover::after,.hd nav .dd>a:hover::after{transform:scaleX(1)}
.hd nav .dd{position:relative}
.hd nav .dd>a .chev{width:10px;height:10px;border-right:2px solid var(--accent);border-bottom:2px solid var(--accent);transform:rotate(45deg) translateY(-3px);display:inline-block}
.hd nav .dd .menu{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:14px;display:none}
.hd nav .dd:hover .menu,.hd nav .dd:focus-within .menu{display:block}
.hd nav .dd .menu div{background:#fff;border:1px solid var(--line);border-radius:10px;padding:20px 24px;display:flex;flex-direction:column;gap:22px;min-width:150px}
.hd nav .dd .menu a{font-family:var(--en);font-size:13px;font-weight:700;letter-spacing:.1em;white-space:nowrap}
.hd nav .dd .menu a:hover{color:var(--accent)}
.hd .cta{background:var(--accent);color:#fff;border-radius:19px;padding:10px 22px;font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.1em;line-height:1;margin-left:4px}
.hd .cta:hover{background:var(--accent-d)}
.hd .burger{display:none;width:44px;height:44px;border:0;background:none;cursor:pointer;position:relative}
.hd .burger span{position:absolute;left:10px;right:10px;height:2px;background:var(--ink);top:14px}
.hd .burger span+span{top:21px}.hd .burger span+span+span{top:28px}
.mnav{display:none;position:fixed;inset:69px 0 0 0;background:#fff;z-index:49;padding:32px 40px;flex-direction:column;gap:22px;font-family:var(--en);font-size:18px;font-weight:700;letter-spacing:.1em;overflow:auto}
.mnav a{padding:6px 0}.mnav small{display:block;font-family:var(--jp);font-size:12px;color:var(--grey);letter-spacing:0;font-weight:500}
.mnav .sub{display:flex;flex-direction:column;gap:12px;padding-left:18px;font-size:14px;color:var(--ink2)}
body.menu-open .mnav{display:flex}

/* hero (Guidable式 — 実測: h766 / title 80px lh104 ls8 y203 / lead 20px y451 / dots y531 / scroll x80) */
.hero{position:relative;height:766px;padding:0 80px;overflow:hidden}
.hero .tx{position:absolute;left:80px;top:170px;z-index:2}
.hero h1{font-size:68px;line-height:92px;letter-spacing:6px;font-weight:700;color:var(--ink);white-space:nowrap}
.hero .sub{font-family:var(--en);font-weight:500;letter-spacing:.8px;color:#a5a5a5;font-size:20px;margin-top:40px;text-transform:uppercase}
.hero .dots{margin-top:40px;gap:40px}
.hero .dots i{width:10px;height:10px;cursor:pointer;opacity:.25;transition:opacity .3s;animation:none!important}
.hero .dots i.on{opacity:1}
.hero .vis{position:absolute;left:calc(50% - 130px);top:0;width:930px;height:766px;z-index:1}
.hero .sl{position:absolute;inset:0}
.hero .strip{position:absolute;top:0;width:485px;height:766px;overflow:hidden;clip-path:polygon(270px 0,485px 0,215px 100%,0 100%);opacity:0;transform:translateX(30px);transition:opacity 1.3s cubic-bezier(.2,.6,.2,1),transform 1.3s cubic-bezier(.2,.6,.2,1)}
.hero .strip:nth-child(1){left:0}.hero .strip:nth-child(2){left:214px;transition-delay:.15s}.hero .strip:nth-child(3){left:428px;transition-delay:.3s}
.hero .sl.on .strip{opacity:1;transform:none}
.hero .sl.out .strip{opacity:0;transform:translateX(-30px);transition-duration:1.2s;transition-timing-function:cubic-bezier(.4,0,.6,1)}
.hero .sl.out .strip:nth-child(1){transition-delay:0s}.hero .sl.out .strip:nth-child(2){transition-delay:.12s}.hero .sl.out .strip:nth-child(3){transition-delay:.24s}
.hero .strip .inner{position:absolute;top:0;left:0;width:930px;height:766px}
.hero .strip:nth-child(2) .inner{left:-214px}.hero .strip:nth-child(3) .inner{left:-428px}
.hero .inner img.full{width:100%;height:100%;object-fit:cover;display:block}
.hero .inner.devs{background:transparent}
.hero .inner.devs .dev{position:absolute;left:110px;top:150px;width:600px;aspect-ratio:auto;height:480px;perspective:1400px}
.hero .inner.devs .dev .lap{right:20px;top:110px;width:400px;transform:rotateY(-22deg) rotateX(6deg) rotateZ(1.5deg);transform-origin:50% 60%;transform-style:preserve-3d}
.hero .inner.devs .dev .iph{left:120px;top:20px;bottom:auto;width:118px;z-index:2;transform:rotate(-14deg) rotateY(16deg);transform-origin:50% 50%;box-shadow:none}
.hero .inner.devs .dev .iph{box-shadow:0 30px 50px rgba(0,0,0,.25)}
.hero .scrl{position:absolute;left:80px;top:686px;width:1px;height:80px;background:var(--ink);z-index:2}
.hero .scrl::after{content:"";position:absolute;left:-3px;top:0;width:7px;height:7px;border-radius:50%;background:var(--ink);animation:scrl 2s ease-in-out infinite}
@keyframes scrl{0%{transform:translateY(0);opacity:1}100%{transform:translateY(74px);opacity:0}}
/* opening overlay: 4 chấm bay rồi xếp hàng */
.opening{position:fixed;inset:0;background:#fff;z-index:100;display:flex;align-items:center;justify-content:center}
.opening i{position:absolute;width:8px;height:8px;border-radius:50%;left:50%;top:50%;margin:-4px 0 0 -4px}
.opening i:nth-child(1){background:var(--gold-l);animation:op1 2s linear forwards}
.opening i:nth-child(2){background:var(--gold);animation:op2 2s linear forwards}
.opening i:nth-child(3){background:var(--blue);animation:op3 2s linear forwards}
.opening i:nth-child(4){background:var(--accent);animation:op4 2s linear forwards}
@keyframes op1{0.00%{transform:translate(-45px,0.0px)}6.25%{transform:translate(-45px,22.6px)}12.50%{transform:translate(-45px,31.6px)}18.75%{transform:translate(-45px,22.0px)}25.00%{transform:translate(-45px,0.0px)}31.25%{transform:translate(-45px,-20.5px)}37.50%{transform:translate(-45px,-27.6px)}43.75%{transform:translate(-45px,-18.3px)}50.00%{transform:translate(-45px,-0.0px)}56.25%{transform:translate(-45px,15.1px)}62.50%{transform:translate(-45px,18.5px)}68.75%{transform:translate(-45px,10.8px)}75.00%{transform:translate(-45px,0.0px)}81.25%{transform:translate(-45px,-5.6px)}87.50%{transform:translate(-45px,-3.7px)}93.75%{transform:translate(-45px,0.0px)}100.00%{transform:translate(-45px,0.0px)}}
@keyframes op2{0.00%{transform:translate(-15px,32.0px)}6.25%{transform:translate(-15px,22.6px)}12.50%{transform:translate(-15px,0.0px)}18.75%{transform:translate(-15px,-22.0px)}25.00%{transform:translate(-15px,-30.2px)}31.25%{transform:translate(-15px,-20.5px)}37.50%{transform:translate(-15px,-0.0px)}43.75%{transform:translate(-15px,18.3px)}50.00%{transform:translate(-15px,23.7px)}56.25%{transform:translate(-15px,15.1px)}62.50%{transform:translate(-15px,0.0px)}68.75%{transform:translate(-15px,-10.8px)}75.00%{transform:translate(-15px,-11.8px)}81.25%{transform:translate(-15px,-5.6px)}87.50%{transform:translate(-15px,-0.0px)}93.75%{transform:translate(-15px,0.0px)}100.00%{transform:translate(-15px,0.0px)}}
@keyframes op3{0.00%{transform:translate(15px,0.0px)}6.25%{transform:translate(15px,-22.6px)}12.50%{transform:translate(15px,-31.6px)}18.75%{transform:translate(15px,-22.0px)}25.00%{transform:translate(15px,-0.0px)}31.25%{transform:translate(15px,20.5px)}37.50%{transform:translate(15px,27.6px)}43.75%{transform:translate(15px,18.3px)}50.00%{transform:translate(15px,0.0px)}56.25%{transform:translate(15px,-15.1px)}62.50%{transform:translate(15px,-18.5px)}68.75%{transform:translate(15px,-10.8px)}75.00%{transform:translate(15px,-0.0px)}81.25%{transform:translate(15px,5.6px)}87.50%{transform:translate(15px,3.7px)}93.75%{transform:translate(15px,0.0px)}100.00%{transform:translate(15px,0.0px)}}
@keyframes op4{0.00%{transform:translate(45px,-32.0px)}6.25%{transform:translate(45px,-22.6px)}12.50%{transform:translate(45px,-0.0px)}18.75%{transform:translate(45px,22.0px)}25.00%{transform:translate(45px,30.2px)}31.25%{transform:translate(45px,20.5px)}37.50%{transform:translate(45px,0.0px)}43.75%{transform:translate(45px,-18.3px)}50.00%{transform:translate(45px,-23.7px)}56.25%{transform:translate(45px,-15.1px)}62.50%{transform:translate(45px,-0.0px)}68.75%{transform:translate(45px,10.8px)}75.00%{transform:translate(45px,11.8px)}81.25%{transform:translate(45px,5.6px)}87.50%{transform:translate(45px,0.0px)}93.75%{transform:translate(45px,0.0px)}100.00%{transform:translate(45px,0.0px)}}
html.js .opening{animation:opout .45s 2.05s ease forwards}
@keyframes opout{to{opacity:0;visibility:hidden}}
html:not(.js) .opening{display:none}
/* mở trang: thứ tự thời gian như Guidable */
html.js.home .hd{opacity:0;animation:pagein .8s 3.35s ease forwards}
html.js .hero .ch{display:inline-block;opacity:.02;transform:translateY(31px);animation:chin .75s cubic-bezier(.2,.6,.2,1) forwards}
@keyframes chin{to{opacity:1;transform:none}}
html.js .hero .sub{opacity:0;transform:translateY(15px);animation:leadin .7s 3.6s cubic-bezier(.2,.6,.2,1) forwards}
@keyframes leadin{to{opacity:1;transform:none}}
html.js .hero .dots{opacity:0;animation:pagein .6s 4.1s ease forwards}
html.js .hero .scrl{opacity:0;animation:pagein .6s 4.1s ease forwards}
@media (prefers-reduced-motion:reduce){.opening{display:none}html.js.home .hd,html.js .hero .sub,html.js .hero .dots,html.js .hero .scrl{opacity:1;animation:none;transform:none}}

/* thiết bị: MacBook + iPhone */
.dev{position:relative;width:100%;aspect-ratio:16/10}
.dev .lap{position:absolute;right:0;top:0;width:86%}
.dev .scr{border:9px solid #1c1f26;border-bottom-width:14px;border-radius:12px 12px 4px 4px;background:#000;aspect-ratio:16/10;overflow:hidden}
.dev .scr img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;border-radius:0}
.dev .base{height:12px;margin:0 -4%;background:linear-gradient(#e9ecf1,#b5bbc5);border-radius:0 0 14px 14px;box-shadow:0 14px 30px rgba(0,0,0,.14)}
.dev .iph{position:absolute;left:0;bottom:-3%;width:25%}
.iph{aspect-ratio:9/19.5;border:6px solid #1c1f26;border-radius:28px;overflow:hidden;background:#000;box-shadow:0 18px 40px rgba(0,0,0,.22)}
.iph.solo{width:100%}
.iph img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;border-radius:0}
.iph.solo{aspect-ratio:9/16}
.svc .devwrap{width:100%;max-width:560px}
.svc .phwrap{width:190px}

/* message */
.message{padding:200px 0 0;text-align:center}
.message .t{font-family:var(--en);font-size:20px;font-weight:500;letter-spacing:.04em;color:var(--accent);text-transform:lowercase}
.message p{font-size:28px;font-weight:700;letter-spacing:.1em;line-height:1.9;margin-top:40px}
.message .more{margin-top:74px}

/* pill button (c-buttonPrimary) */
.pill{display:inline-flex;align-items:center;gap:22px;border:1px solid var(--ink);border-radius:64px;padding:14px 14px 14px 24px;font-size:16px;font-weight:700;letter-spacing:.06em;line-height:1;background:#fff;transition:background .25s,color .25s}
.pill .circ{width:38px;height:38px;border-radius:50%;background:var(--accent);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:16px;transition:transform .25s}
.pill:hover{background:var(--ink);color:#fff}
.pill:hover .circ{transform:translateX(4px)}
.pill.center{margin-inline:auto}

/* loop text */
.loop{overflow:hidden;white-space:nowrap;margin-top:-120px;pointer-events:none;position:relative;z-index:-1}
.loop span{display:inline-block;font-family:var(--en);font-weight:500;font-size:150px;letter-spacing:.04em;line-height:300px;color:var(--loop);padding-right:.5em;animation:loop 80s linear infinite;text-transform:none}
@keyframes loop{to{transform:translateX(-100%)}}
@media (prefers-reduced-motion:reduce){.loop span{animation:none}}

/* section title block (c-title) */
.sec{padding:180px 0 0}
.sec-head{display:grid;grid-template-columns:360px 1fr;gap:40px;align-items:start}
.sec-head .en{font-size:50px;line-height:65px;letter-spacing:.1em;font-weight:700}
.sec-head .ja-lb{margin-top:8px}
.sec-head .lead{font-size:16px;line-height:2;padding-top:12px}
.sec-head .lead b{display:block;font-size:28px;letter-spacing:.1em;line-height:1.9;margin-bottom:12px}

/* 3-col rows (c-button3col) */
.rows{margin-top:60px;border-top:1px solid var(--line)}
.row{display:grid;grid-template-columns:360px 1fr 40px;gap:32px;align-items:center;padding:55px 0;border-bottom:1px solid var(--line);transition:background .25s}
.row:hover{background:#fafafa}
.row .nm{font-size:26px;font-weight:700;letter-spacing:.06em;line-height:1.4}
.row .nm small{display:block;font-family:var(--en);font-size:12px;letter-spacing:.14em;color:var(--grey);margin-top:6px}
.row .ds{font-size:16px;line-height:2}
.circ40{width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:16px;flex:none;position:relative}
.circ40 i{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--gold)}
.circ40 i:nth-child(1){top:-6px;right:2px}.circ40 i:nth-child(2){top:2px;right:-8px;background:var(--blue)}.circ40 i:nth-child(3){top:-10px;right:12px;background:var(--gold-l);width:4px;height:4px}
.more-r{text-align:right;margin-top:28px}
.more-r a{font-weight:700;letter-spacing:.06em;display:inline-flex;align-items:center;gap:12px}
.more-r a .ar{color:var(--accent)}

/* product rows */
.prow{display:grid;grid-template-columns:360px 1fr 300px;gap:32px;align-items:center;padding:48px 0;border-bottom:1px solid var(--line)}
.prow .head{display:flex;align-items:center;gap:18px}
.prow .head img{width:64px;height:64px;border-radius:15px;border:1px solid var(--line)}
.prow .nm{font-size:22px;font-weight:700;letter-spacing:.04em;line-height:1.3}
.prow .nm small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.14em;color:var(--grey);margin-top:6px;font-weight:700}
.prow .ds{font-size:16px;line-height:2}
.prow .ds .for{display:block;font-size:13px;font-weight:700;color:var(--accent);letter-spacing:.06em;margin-bottom:4px}
.store{display:flex;gap:18px;align-items:center;justify-content:flex-end}
.prow .badges{flex-direction:row;align-items:center;gap:10px}
.prow .badges .soon em{white-space:nowrap;font-size:10px}
.badges{display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.badges img{height:40px;width:auto}
.badges img.gp{height:54px;margin:-7px 0 -7px -8px}
.badges .soon{display:inline-block}
.badges .soon img{opacity:.35;filter:grayscale(1)}
.badges .soon em{display:block;font-style:normal;font-size:11px;color:#7a4d00;background:#fff3da;padding:1px 6px;margin-top:4px;border-radius:2px;line-height:1.6}
.qr{width:88px;text-align:center;font-family:var(--en);font-size:10px;letter-spacing:0;text-transform:none;color:var(--grey);line-height:1.3;font-weight:500}
.qr canvas{width:88px;height:88px;display:block;border:1px solid var(--line);padding:5px;background:#fff}

/* news list (c-newsListItem) */
.nlist{border-top:1px solid var(--line)}
.nitem{display:grid;grid-template-columns:1fr 40px;gap:24px;align-items:center;padding:24px 0 25px;border-bottom:1px solid var(--line)}
.nitem .tt{font-size:16px;line-height:2}
.nitem .mt{font-family:var(--en);font-weight:500;letter-spacing:.06em;text-transform:none;font-size:12px;color:var(--grey);margin-top:6px}
.nitem .mt b{font-family:var(--jp);font-weight:500;margin-left:14px;padding-left:14px;border-left:1px solid var(--line)}

/* recruit block */
.recruit .sec-head .lead b{font-size:28px}

/* wave band */
.band{position:relative;overflow:hidden;margin-top:160px;padding:200px 0 80px}
.band svg{position:absolute;left:-40px;top:-40px;width:min(1040px,76%);height:auto;pointer-events:none}
.band .wrap{position:relative;display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center}
.band .big{font-family:var(--en);font-size:clamp(40px,6.4vw,92px);font-weight:700;letter-spacing:.02em;line-height:1.08;text-transform:uppercase}
.band .tag{font-size:28px;font-weight:700;letter-spacing:.1em;line-height:1.7;text-align:right}

/* contact box (c-buttonSquare) */
.cbox-wrap{padding:60px 0 0}
.cbox{display:flex;align-items:center;justify-content:space-between;gap:32px;border:1px solid var(--line);border-radius:16px;padding:60px 70px 56px;min-height:218px;background:#fff;transition:background .25s}
.cbox:hover{background:#fcfcfc}
.cbox .en{font-size:50px;line-height:1;letter-spacing:.1em}
.cbox .ja-lb{margin-top:22px}
.ctel{margin-top:18px;font-size:13px;color:var(--grey);text-align:right;letter-spacing:.04em}
.ctel b{font-family:var(--en);font-size:15px;color:var(--ink2);letter-spacing:.06em}
.cbox .circ{width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;flex:none}
.cbox .tel{text-align:right;color:var(--ink2);font-size:14px;line-height:1.8}
.cbox .tel b{display:block;font-family:var(--en);font-size:28px;letter-spacing:.04em;color:var(--ink);text-transform:none;font-weight:700}

/* footer */
.ft{margin-top:140px;border-top:1px solid var(--line);padding:100px 0 40px}
.ft .top{display:grid;grid-template-columns:1fr auto auto auto;gap:80px;align-items:start}
.ft .logo img{height:56px;width:auto}
.ft .addr{font-size:13px;color:var(--ink2);line-height:1.9;margin-top:28px}
.ft .col a{display:block;font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.1em;padding:8px 0}
.ft .col .sub a{font-size:12px;color:var(--grey);font-weight:500;letter-spacing:.08em;padding:6px 0}
.ft .col .sub{margin:8px 0 18px}
.ft .cert{font-size:12px;color:var(--ink2);line-height:1.8;max-width:260px}
.ft .cert b{display:block;font-family:var(--en);font-size:13px;letter-spacing:.1em;color:var(--ink);margin-bottom:8px}
.ft .cert .lic{border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-top:8px}
.ft .bot{border-top:1px solid var(--line);margin-top:100px;padding-top:30px;display:flex;gap:40px;flex-wrap:wrap;font-size:13px;letter-spacing:.06em}
.ft .copy{text-align:center;font-family:var(--en);font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:none;margin-top:40px}

/* sub pages */
.ph{padding:80px 0 0}
.ph .en{font-size:50px;line-height:65px}
.tabs{display:flex;gap:24px;margin-top:70px}
.tabs a{min-width:150px;gap:16px;white-space:nowrap;display:flex;justify-content:space-between;align-items:center;padding:0 10px 10px 0;border-bottom:1px solid var(--line);font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.1em}
.tabs a .ch{color:var(--accent);font-size:12px}
.tabs a.on{border-bottom-color:var(--accent)}
.blk{padding:200px 0 0}
.blk .lbl,.vscroll .lbl{font-family:var(--en);font-size:20px;font-weight:700;letter-spacing:.06em;color:var(--accent)}
.blk .lbl::before,.vscroll .lbl::before{content:"::";margin-right:10px;letter-spacing:0}
.two{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-top:40px}
.two h2{font-size:44px;font-weight:700;letter-spacing:.06em;line-height:1.45;white-space:nowrap}
.two .sub-en{font-family:var(--en);font-weight:500;font-size:13px;letter-spacing:.14em;color:var(--grey);margin-top:22px}
.two .txt{font-size:16px;font-weight:700;line-height:2.2}
.two .txt p+p{margin-top:28px}
.two img{border-radius:8px;width:100%;height:auto}
.vals{display:grid;grid-template-columns:repeat(5,1fr);gap:24px;margin-top:60px}
.vals div{border-top:1px solid var(--ink);padding-top:22px}
.vals b{display:block;font-family:var(--en);font-size:50px;line-height:1;color:var(--accent);font-weight:700}
.vals h3{font-size:16px;font-weight:700;margin-top:18px;letter-spacing:.06em}
.vals h3 small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.14em;color:var(--grey);font-weight:700;margin-top:2px}
.vals p{font-size:14px;line-height:1.9;margin-top:10px;color:var(--ink2)}

.side{display:grid;grid-template-columns:330px 1fr;gap:40px;align-items:start;margin-top:80px}
.wrap.side>.en{font-size:clamp(30px,3vw,42px)}
.wrap.side>.en.long{font-size:clamp(26px,2.3vw,33px);letter-spacing:.06em}
.side>div{min-width:0}
.side .en{font-size:50px;line-height:1.2}
.dl{border-top:1px solid var(--line)}
.dl div{display:grid;grid-template-columns:270px 1fr;gap:24px;padding:32px 0;border-bottom:1px solid var(--line);font-size:16px;line-height:2}
.dl dt{color:var(--grey)}
.dl dd{margin:0}
.msg-ph{border-radius:8px;overflow:hidden;aspect-ratio:1/1;background:#ededed}
.msg-photo{position:relative;top:-6%;width:100%;height:112%;object-fit:cover;object-position:50% 0;display:block;will-change:transform}
.msg-body b{color:var(--accent)}
.msg-body{margin-top:80px;font-size:16px;line-height:2}
.msg-body p+p{margin-top:32px}
.msg-sign{text-align:right;margin-top:56px;font-weight:700}
.msg-sign small{display:block;font-weight:500;color:var(--grey);font-size:13px;font-family:var(--en);letter-spacing:.1em;text-transform:none}

.svc{padding:100px 0 0}
.svc+.svc{border-top:1px solid var(--line);margin-top:100px}
.svc .num{font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.14em;color:var(--accent)}
.svc .g{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-top:40px}
.svc h2{font-size:36px;font-weight:700;letter-spacing:.06em;line-height:1.4}
.svc h2 small{display:block;font-family:var(--en);font-size:12px;letter-spacing:.16em;color:var(--grey);margin-top:8px;font-weight:700}
.svc .ds{margin-top:24px;font-size:16px;line-height:2}
.svc .acts{display:flex;gap:40px;flex-wrap:wrap;margin-top:34px}
.svc .acts div{font-size:14px;font-weight:700;display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.svc img.photo{border-radius:8px;width:100%;aspect-ratio:3/2;object-fit:cover}
.svc .ic{display:flex;align-items:center;gap:22px}
.svc .ic img{width:96px;height:96px;border-radius:22px;border:1px solid var(--line);aspect-ratio:1}
.svc .ic h2{font-size:30px;white-space:nowrap}
.svc img.shot{width:200px;border-radius:14px;box-shadow:0 20px 50px rgba(11,42,102,.16);aspect-ratio:auto}
.flow{display:grid;grid-template-columns:repeat(5,1fr);gap:24px;margin-top:60px}
.flow div{border-top:1px solid var(--ink);padding-top:20px}
.flow b{font-family:var(--en);font-size:13px;letter-spacing:.14em;color:var(--accent);font-weight:700}
.flow h3{font-size:18px;font-weight:700;margin-top:10px}
.flow p{font-size:14px;color:var(--ink2);line-height:1.9;margin-top:8px}
.lead28{font-size:28px;font-weight:700;letter-spacing:.1em;line-height:1.9;margin-top:60px}
.lead16{font-size:16px;margin-top:24px}
.lead-end{border-bottom:1px solid var(--line);padding-bottom:60px}

.news-side{display:grid;grid-template-columns:270px 1fr;gap:40px;margin-top:0}
.filters{display:flex;flex-direction:column;gap:12px;margin-top:60px;font-size:14px;font-weight:700;letter-spacing:.06em}
.filters a{color:var(--grey)}.filters a.on{color:var(--accent)}
.pager{display:flex;gap:28px;justify-content:center;margin-top:60px;font-family:var(--en);font-weight:700;font-size:16px;letter-spacing:.06em;color:var(--grey)}
.pager b{color:var(--ink)}.pager .ch{color:var(--accent)}

.form{display:grid;grid-template-columns:270px 1fr;gap:40px;margin-top:80px}
.form .info{font-size:14px;line-height:2;color:var(--ink2)}
.form .info b{display:block;font-family:var(--en);font-size:28px;color:var(--ink);letter-spacing:.04em;text-transform:none}
.form label{display:block;font-size:14px;font-weight:700;letter-spacing:.06em;margin-top:34px}
.form label small{color:var(--accent);margin-left:8px}
.form input,.form textarea,.form select{width:100%;border:0;border-bottom:1px solid var(--ink);padding:12px 0;font:inherit;font-size:16px;background:transparent;border-radius:0;outline:none}
.form textarea{min-height:140px;resize:vertical}
.form .send{margin-top:48px}
.form .note{font-size:12px;color:var(--grey);margin-top:16px}

.sdg{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:60px}
.sdg div{border-top:1px solid var(--ink);padding-top:22px}
.sdg b{font-family:var(--en);font-size:40px;color:var(--accent);line-height:1}
.sdg h3{font-size:18px;font-weight:700;margin-top:16px;letter-spacing:.04em;line-height:1.6}
.sdg p{font-size:14px;color:var(--ink2);margin-top:10px;line-height:1.9}

.proto{position:fixed;left:12px;bottom:12px;z-index:60;background:rgba(32,32,32,.78);color:#fff;font-family:var(--en);font-size:10px;letter-spacing:.14em;padding:5px 10px;border-radius:4px;text-transform:uppercase;font-weight:700}



/* chấm nhảy */
@keyframes bounce{0%,30%,100%{transform:translateY(0)}15%{transform:translateY(-9px)}}
html.js .dots i{animation:bounce 2.8s cubic-bezier(.3,.7,.3,1) infinite}
html.js .dots i:nth-child(2){animation-delay:.12s}html.js .dots i:nth-child(3){animation-delay:.24s}html.js .dots i:nth-child(4){animation-delay:.36s}
html.js .circ40 i{animation:bounce 2.8s ease-in-out infinite}
html.js .circ40 i:nth-child(2){animation-delay:.15s}html.js .circ40 i:nth-child(3){animation-delay:.3s}
/* ảnh thực có chuyển động (mission/vision) */
.pic{position:relative;margin-top:60px}
.pic .main{position:relative;overflow:hidden;border-radius:8px;aspect-ratio:4/3}
.pic .main img{width:100%;height:100%;object-fit:cover;display:block;border-radius:0}
html.js .pic .main{clip-path:inset(0 100% 0 0);transition:clip-path 1.3s cubic-bezier(.7,0,.2,1)}
html.js .pic.in .main{clip-path:inset(0 0 0 0)}
html.js .pic .main img{animation:kb 22s ease-in-out infinite alternate}
@keyframes kb{from{transform:scale(1)}to{transform:scale(1.1)}}
.pic .sub{position:absolute;right:-8%;bottom:-14%;width:42%;aspect-ratio:1;border-radius:8px;overflow:hidden;box-shadow:0 20px 50px rgba(11,42,102,.15);border:6px solid #fff}
.pic .sub img{width:100%;height:100%;object-fit:cover;display:block;border-radius:0}
html.js .pic .sub{opacity:0;transform:translateY(30px);transition:opacity .9s .6s,transform .9s .6s}
html.js .pic.in .sub{opacity:1;transform:none}
.pic .fl{position:absolute;border-radius:50%;pointer-events:none}
.pic .fl.a{width:22px;height:22px;background:var(--gold);left:-22px;top:12%}
.pic .fl.b{width:14px;height:14px;background:var(--blue);right:18%;top:-14px}
.pic .fl.c{width:10px;height:10px;background:var(--accent);left:30%;bottom:-20px}
.pic .fl.d{width:46px;height:46px;border:2px solid var(--gold);left:-40px;bottom:18%;background:transparent}
html.js .pic .fl{animation:float 5s ease-in-out infinite}
html.js .pic .fl.b{animation-duration:6.2s;animation-delay:.6s}html.js .pic .fl.c{animation-duration:4.4s;animation-delay:1.1s}html.js .pic .fl.d{animation-duration:7s;animation-delay:.3s}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
/* recruit */
.cul{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:100px 0;border-bottom:1px solid var(--line)}
.cul .num{font-family:var(--en);font-size:14px;letter-spacing:.14em;color:var(--accent);font-weight:700}
.cul h2{font-size:40px;letter-spacing:.08em;line-height:1.4;margin-top:16px}
.cul h2 small{display:block;font-family:var(--en);font-size:12px;letter-spacing:.16em;color:var(--grey);margin-top:8px;font-weight:700}
.cul p{margin-top:24px;font-size:16px;line-height:2}
.cul img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px}
.cul.rev .ph-col,.cul.rev .illu{order:-1}
.cul .illu{margin:0 auto;max-width:440px;width:100%}
.voices{margin-top:60px;border-top:1px solid var(--line)}
.voice{display:grid;grid-template-columns:400px 1fr;gap:64px;align-items:center;padding:70px 0;border-bottom:1px solid var(--line)}
.voice.rev{grid-template-columns:1fr 400px}
.voice.rev .vph{order:2}
.voice .vph{border-radius:8px;overflow:hidden;aspect-ratio:4/5}
.voice .vph img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;border-radius:0}
.voice .num{font-family:var(--en);font-size:12px;letter-spacing:.14em;color:var(--accent);font-weight:700}
.voice .num span{font-family:var(--jp);color:var(--grey);margin-left:14px;letter-spacing:.06em}
.voice h3{font-size:30px;letter-spacing:.08em;margin-top:16px;line-height:1.4}
.voice h3 small{font-size:13px;color:var(--grey);font-weight:700;margin-left:14px;letter-spacing:.1em}
.voice .ld{font-size:16px;font-weight:700;line-height:1.9;margin-top:22px}
.voice .q{font-size:15px;line-height:2.1;margin-top:14px;color:var(--ink2)}
.req dt{font-weight:700;color:var(--ink)}
.req ul{margin:0;padding-left:18px}
.req .pos{display:flex;flex-direction:column;gap:6px}
.req .pos small{color:var(--grey);margin-left:10px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:60px}
.steps div{border-top:1px solid var(--ink);padding-top:20px}
.steps b{font-family:var(--en);font-size:13px;letter-spacing:.14em;color:var(--accent);font-weight:700}
.steps h3{font-size:18px;margin-top:10px}
.steps p{font-size:14px;color:var(--ink2);margin-top:8px;line-height:1.9}
.strip{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px;margin-top:70px}
.strip img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px}
@media (max-width:860px){.cul{grid-template-columns:1fr;gap:28px;padding:60px 0}.cul.rev .ph-col,.cul.rev .illu{order:0}.voice,.voice.rev{grid-template-columns:1fr;gap:24px;padding:44px 0}.voice.rev .vph{order:0}.voice h3{font-size:24px}.voice h3 small{display:block;margin:6px 0 0}.steps{grid-template-columns:1fr 1fr}.strip{grid-template-columns:1fr 1fr}.pic .sub{right:0;bottom:-10%}}

/* ảnh nổi khi rê chuột (Guidable式) */
.hv{position:fixed;left:0;top:0;z-index:40;pointer-events:none;width:400px;padding:0;background:transparent;opacity:0;transform:translate(-50%,-50%) scale(.9) rotate(-1deg);transition:opacity .35s cubic-bezier(.2,.6,.2,1),transform .45s cubic-bezier(.2,.6,.2,1)}
.hv.on{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}
.hv.port{width:190px}
.hv.land{width:400px}
.hv .iph.solo{box-shadow:none}
.hv .dev{margin-bottom:4%}
.hv>img{width:100%;display:block;border-radius:10px;box-shadow:0 24px 60px rgba(11,42,102,.22)}
.hv .dev .base{box-shadow:0 18px 40px rgba(11,42,102,.18)}
.hv .cap{display:none}
.row,.prow{cursor:pointer}
@media (hover:none){.hv{display:none}}

/* cụm chấm trang trí giữa các khối (Guidable式) */
.deco{position:relative;height:0;max-width:var(--wrap);margin:0 auto;padding-inline:40px}
.deco i{position:absolute;width:9px;height:9px;border-radius:50%}
.deco.a i:nth-child(1){left:48%;top:120px;background:var(--gold-l)}.deco.a i:nth-child(2){left:50%;top:124px;background:var(--gold)}.deco.a i:nth-child(3){left:52%;top:134px;background:var(--blue)}.deco.a i:nth-child(4){left:54%;top:152px;background:var(--accent)}
.deco.b i:nth-child(1){left:49%;top:90px;background:var(--gold)}.deco.b i:nth-child(2){left:51%;top:90px;background:var(--accent)}
html.js .deco i{animation:float 5s ease-in-out infinite}html.js .deco i:nth-child(2){animation-delay:.4s}html.js .deco i:nth-child(3){animation-delay:.8s}html.js .deco i:nth-child(4){animation-delay:1.2s}
/* ===== v7 service detail ===== */
.slant{position:relative;height:460px;container-type:inline-size}
.slant .s{position:absolute;top:0;height:100%;width:37.9%;overflow:hidden;clip-path:polygon(22% 0,100% 0,78% 100%,0 100%)}
.slant .s:nth-child(1){left:0}.slant .s:nth-child(2){left:30%}.slant .s:nth-child(3){left:60%}
.slant .s img{position:absolute;top:0;height:100%;width:100cqw;max-width:none;object-fit:cover;border-radius:0}
.slant .s:nth-child(1) img{left:0}.slant .s:nth-child(2) img{left:-30cqw}.slant .s:nth-child(3) img{left:-60cqw}
html.js .slant .s{opacity:0;transform:translateX(30px);transition:opacity 1s cubic-bezier(.2,.6,.2,1),transform 1s cubic-bezier(.2,.6,.2,1)}
html.js .slant .s:nth-child(2){transition-delay:.15s}html.js .slant .s:nth-child(3){transition-delay:.3s}
html.js .slant.in .s{opacity:1;transform:none}
.ftiles{display:grid;grid-template-columns:repeat(4,1fr);gap:48px 28px;margin-top:60px}
.ftile{display:grid;grid-template-columns:1fr 40px;gap:14px;align-items:center}
.ftile .im{grid-column:1/-1;overflow:hidden;border-radius:8px;aspect-ratio:4/3;background:#eef2f8}
.ftile .im img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.6,.2,1);border-radius:0}
.ftile:hover .im img{transform:scale(1.06)}
.ftile .nm span{display:block;font-size:17px;font-weight:700;letter-spacing:.06em;line-height:1.5}
.ftile .nm small{font-family:var(--en);font-size:11px;letter-spacing:.14em;color:var(--grey);font-weight:700;text-transform:uppercase}
.ftile:hover .circ40{transform:translateX(6px)}
.sup10{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:60px;border-top:1px solid var(--ink)}
.sup10 div{padding:24px 18px 26px 0;border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:10px}
.sup10 b{font-family:var(--en);font-size:28px;color:var(--accent);line-height:1}
.sup10 span{font-size:15px;font-weight:700;line-height:1.7}
.jobs4{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:60px}
.jobs4 div{border-top:1px solid var(--ink);padding-top:22px}
.jobs4 h3{font-size:18px;letter-spacing:.06em}
.jobs4 h3 small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.14em;color:var(--grey);margin-top:2px}
.jobs4 p{font-size:14px;color:var(--ink2);line-height:2;margin-top:12px}
.faq{border-top:1px solid var(--line)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:40px 1fr 24px;align-items:center;padding:28px 0;font-size:16px;font-weight:700;letter-spacing:.04em}
.faq summary::-webkit-details-marker{display:none}
.faq b{font-family:var(--en);font-size:22px;color:var(--accent)}
.faq summary i{width:14px;height:14px;position:relative}
.faq summary i::before,.faq summary i::after{content:"";position:absolute;left:0;top:6px;width:14px;height:2px;background:var(--ink);transition:transform .3s}
.faq summary i::after{transform:rotate(90deg)}
.faq details[open] summary i::after{transform:rotate(0)}
.faq .ans{display:grid;grid-template-columns:40px 1fr;padding:0 24px 30px 0;font-size:15px;line-height:2;color:var(--ink2)}
.faq .ans>b{color:var(--blue);line-height:1.4}
.faq .ans p+p,.faq .ans .fpath+p,.faq .ans p+.fpath{margin-top:14px}
.faq details[open] .ans{animation:faqin .45s cubic-bezier(.2,.6,.2,1)}
@keyframes faqin{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.fpath{display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:13px;font-weight:700;color:var(--ink)}
.fpath span{border:1px solid var(--line);border-radius:64px;padding:6px 16px}
.fpath span.hl{border-color:var(--accent);color:var(--accent)}
.fpath i{font-style:normal;color:var(--grey)}
.faq summary:hover span{color:var(--accent)}
.faq summary span{transition:color .25s}
.ja-sub{display:block;font-family:var(--jp);font-size:14px;letter-spacing:.1em;color:var(--accent);margin-top:14px;text-transform:none;line-height:1.5}
.crumb{font-family:var(--en);font-size:12px;letter-spacing:.14em;color:var(--grey);font-weight:700;margin-bottom:30px;display:flex;gap:10px;flex-wrap:wrap}
.crumb a:hover{color:var(--accent)}
.note{color:var(--grey);font-size:13px}
.fnav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.fnav a{display:flex;align-items:center;gap:18px;padding:30px 0;font-size:18px;font-weight:700;letter-spacing:.06em}
.fnav a small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.16em;color:var(--grey)}
.fnav a.nx{justify-content:flex-end;text-align:right}
.fnav a.all{font-size:14px;color:var(--accent)}
.fnav .ar{width:40px;height:40px;border-radius:50%;border:1px solid var(--ink);display:inline-flex;align-items:center;justify-content:center;transition:background .25s,color .25s}
.fnav a:hover .ar{background:var(--accent);border-color:var(--accent);color:#fff}
@media (max-width:860px){.slant{height:260px}.ftiles{grid-template-columns:1fr 1fr;gap:32px 16px}.sup10,.jobs4{grid-template-columns:1fr 1fr}.fnav{grid-template-columns:1fr 1fr}.fnav a.all{display:none}.ftile .nm span{font-size:15px}}

/* ===== EFFECTS (Guidable式) — nội dung luôn hiện khi không có JS / giảm chuyển động ===== */
@keyframes pagein{from{opacity:0}to{opacity:1}}
html.js body{animation:pagein .6s ease both}
html.js .fx{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.6,.2,1),transform .9s cubic-bezier(.2,.6,.2,1)}
html.js .fx.in{opacity:1;transform:none}
html.js .fx img.photo{transform:scale(1.05);transition:transform 1.4s cubic-bezier(.2,.6,.2,1)}
html.js .fx.in img.photo{transform:none}
.pill .tx{position:relative;display:block;overflow:hidden;line-height:1.3}
.pill .tx span{display:block;transition:transform .5s cubic-bezier(.65,0,.35,1)}
.pill .tx span+span{position:absolute;left:0;top:100%}
.pill:hover .tx span{transform:translateY(-100%)}
.circ40,.cbox .circ{transition:transform .35s cubic-bezier(.2,.6,.2,1)}
.row:hover .circ40,.nitem:hover .circ40,.cbox:hover .circ{transform:translateX(6px)}
.badges a img{transition:transform .3s}
.badges a:hover img{transform:translateY(-3px)}
html.js .hero .ch{display:inline-block;opacity:.02;transform:translateY(.35em);animation:chin .7s cubic-bezier(.2,.6,.2,1) forwards}
@keyframes chin{to{opacity:1;transform:none}}
html.js .hero .line,html.js .hero .btns{opacity:0;animation:pagein .9s ease forwards}
html.js .hero .line{animation-delay:1.1s}html.js .hero .btns{animation-delay:1.5s}
html.js .chars .ch{display:inline-block;opacity:0;transform:translateY(.3em)}
html.js .chars.in .ch{animation:chin .6s cubic-bezier(.2,.6,.2,1) forwards}
html.js .band svg path{stroke-dasharray:3200;stroke-dashoffset:3200}
html.js .band.in svg path{animation:draw 3s cubic-bezier(.3,.5,.2,1) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.fld{position:relative}
.fld::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .4s}
.fld:focus-within::after{transform:scaleX(1)}
.tabs a{position:relative}
.tabs a::after{content:"";position:absolute;left:0;bottom:-1px;height:1px;width:100%;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.tabs a:hover::after,.tabs a.on::after{transform:scaleX(1)}
.tabs a.on{border-bottom-color:transparent}
/* value slider */
/* VALUE kiểu Guidable: ghim + dải xám xiên + chấm màu tăng dần */
.vscroll{position:relative;height:500vh;margin-top:120px}
.vsticky{position:sticky;top:69px;height:calc(100vh - 69px);overflow:hidden;display:flex;align-items:center}
.vband{position:absolute;left:32%;top:0;bottom:0;width:15%;background:#f4f5f7;transform:skewX(-20deg)}
.vin{position:relative;z-index:1;width:100%}
.vstage{position:relative;height:330px;margin-top:40px}
.vslide{position:absolute;inset:0;opacity:0;transform:translateY(40px);transition:opacity .6s ease,transform .8s cubic-bezier(.2,.6,.2,1);pointer-events:none}
.vslide.past{transform:translateY(-40px)}
.vslide.on{opacity:1;transform:none;pointer-events:auto;transition-delay:.12s}
.vslide h2{font-size:56px;letter-spacing:.1em;line-height:1.6}
.vslide p{font-size:16px;line-height:2;margin-top:30px}
.vslide .k{font-family:var(--en);font-size:12px;letter-spacing:.14em;color:var(--grey);font-weight:700;margin-top:22px}
.vslide .k b{color:var(--accent);font-size:20px;margin-right:10px}
.vdots{display:flex;gap:18px;margin-top:44px}
.vdots button{width:10px;height:10px;border-radius:50%;border:0;background:#d8dbe0;padding:0;cursor:pointer;transition:background .3s,transform .3s}
.vdots button.on{background:var(--accent);transform:scale(1.2)}
.vmarks{position:absolute;right:22%;top:44%;display:flex;z-index:1}
.vmarks i{width:22px;height:22px;border-radius:50%;margin-left:-5px;transform:scale(0);transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.vmarks i:nth-child(1){background:var(--gold-l);margin-left:0}.vmarks i:nth-child(2){background:var(--gold)}.vmarks i:nth-child(3){background:var(--blue)}.vmarks i:nth-child(4){background:var(--accent)}.vmarks i:nth-child(5){background:var(--ink)}
.vmarks i.on{transform:scale(1)}
.vlbl{position:relative;z-index:1}
/* tranh minh hoạ Mission / Vision */
.illu{position:relative;margin-top:60px;max-width:520px}
.illu img{width:100%;height:auto;display:block}
html.js .illu img{opacity:0;transform:translateY(50px) scale(.94);transition:opacity 1s ease,transform 1.2s cubic-bezier(.2,.6,.2,1)}
html.js .illu.in img{opacity:1;transform:none}
html.js .illu.in img{animation:bob 6s ease-in-out 1.3s infinite}
@keyframes bob{0%,100%{translate:0 0}50%{translate:0 -10px}}
.illu .fl{position:absolute;border-radius:50%;pointer-events:none;transform:scale(0);transition:transform .6s cubic-bezier(.3,1.6,.5,1)}
.illu.in .fl{transform:scale(1)}
.illu.in .fl.b{transition-delay:.25s}.illu.in .fl.c{transition-delay:.4s}.illu.in .fl.d{transition-delay:.55s}
.illu .fl.a{width:22px;height:22px;background:var(--gold);left:-14px;top:10%}
.illu .fl.b{width:14px;height:14px;background:var(--blue);right:8%;top:-10px}
.illu .fl.c{width:10px;height:10px;background:var(--accent);left:34%;bottom:-16px}
.illu .fl.d{width:46px;height:46px;border:2px solid var(--gold);right:-20px;bottom:20%;background:transparent}
@media (max-width:860px){.vscroll{height:420vh;margin-top:60px}.vsticky{top:69px}.vband{left:40%;width:28%}.vstage{height:340px}.vslide h2{font-size:34px}.vslide p{font-size:14px}.vmarks{right:10%;top:20%}.vmarks i{width:16px;height:16px}.illu{max-width:100%}}
@media (prefers-reduced-motion:reduce){html.js .illu img{opacity:1;transform:none;animation:none}.illu .fl{transform:scale(1)}.vslide{transition:none}}
@media (prefers-reduced-motion:reduce){html.js .fx{opacity:1;transform:none;transition:none}html.js .hero .ch,html.js .chars .ch,html.js .hero .line,html.js .hero .sub,html.js .hero .btns{opacity:1;transform:none;animation:none}html.js .band svg path{stroke-dashoffset:0;animation:none}html.js body{animation:none}.vslide.on{animation:none}}
@media (max-width:860px){.vslide{grid-template-columns:1fr;gap:24px}.vslide h2{font-size:30px}.vbg{display:none}}

/* v8: hiệu ứng nhẹ toàn trang */
.cul .ph-col{overflow:hidden;border-radius:8px;aspect-ratio:4/3}
.cul .ph-col img{height:100%;border-radius:0}
.slant{overflow:hidden}
#value{overflow-x:clip}
.svc .ic h2{min-width:0;overflow-wrap:anywhere}
.par{scale:1.12;translate:0 var(--py,0px);will-change:translate}
.msg-photo.par{scale:1}
html.js .wipe{clip-path:inset(0 100% 0 0);transition:clip-path 1.3s cubic-bezier(.7,0,.2,1)}
html.js .wipe.in{clip-path:inset(0 0 0 0)}
html.js .en.chars .ch{transform:translateY(.6em)}
.hd{transition:box-shadow .3s}
.hd.scrolled{box-shadow:0 1px 0 var(--line),0 8px 24px rgba(11,42,102,.05)}
.totop{position:fixed;right:28px;bottom:28px;z-index:40;width:52px;height:52px;border-radius:50%;border:1px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .35s,transform .35s,background .25s,border-color .25s;font-family:var(--en);font-size:16px;color:var(--ink)}
.totop.on{opacity:1;transform:none;pointer-events:auto}
.totop:hover{background:var(--accent);border-color:var(--accent);color:#fff}
.totop svg{position:absolute;inset:-1px;width:54px;height:54px;transform:rotate(-90deg)}
.totop circle{fill:none;stroke:var(--gold);stroke-width:2;stroke-dasharray:163.4;stroke-dashoffset:calc(163.4 - 163.4 * var(--pg,0))}
@media (prefers-reduced-motion:reduce){.par{translate:none;scale:1}html.js .wipe{clip-path:none;transition:none}}
@media (max-width:860px){.totop{right:16px;bottom:16px;width:44px;height:44px}.totop svg{width:46px;height:46px}}
/* v10: chất BIGLIGHT — vàng = chỗ bấm/chỗ nhớ, navy = khối nhấn; chữ trên vàng luôn là navy (tương phản 4,9) */
.pill .circ,.circ40,.cbox .circ{background:var(--gold);color:var(--accent-d);font-weight:700}
.pill:hover{background:var(--accent);border-color:var(--accent);color:#fff}
.row:hover .circ40,.nitem:hover .circ40{background:var(--accent);color:#fff}
.hd nav>a::after,.hd nav .dd>a::after{background:var(--gold);height:2px}
.hd .cta{background:var(--gold);color:var(--accent-d)}
.hd .cta:hover{background:var(--accent);color:#fff}
.hd .dl-btn{font-family:var(--en);font-size:14px;font-weight:700;letter-spacing:.1em;line-height:1;border:1.5px solid var(--accent);color:var(--accent);border-radius:19px;padding:9px 20px;transition:background .25s,color .25s}
.hd .dl-btn:hover{background:var(--accent);color:#fff}
.hd nav{gap:32px}
.sec-head .en::after,.wrap.side>.en::after{content:"";display:block;width:40px;height:4px;border-radius:2px;background:var(--gold);margin-top:18px}
.wrap.side>.en:has(small)::after{display:none}
.wrap.side>.en small{position:relative;padding-top:22px}
.wrap.side>.en small::before{content:"";position:absolute;left:0;top:0;width:40px;height:4px;border-radius:2px;background:var(--gold)}
.blk .lbl::before,.vscroll .lbl::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--gold);margin-right:12px;vertical-align:2px}
.tabs a::after{background:var(--gold);height:2px}
.tabs a .ch{color:var(--gold)}
.message .t::before{content:"";display:block;width:10px;height:10px;border-radius:50%;background:var(--gold);margin:0 auto 14px}
.ft{border-top:0;position:relative}
.ft::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,var(--accent) 0 70%,var(--blue) 70% 88%,var(--gold) 88%)}
/* dải con số (navy) */
.nums{margin-top:140px}
.nums .nb{background:var(--accent);color:#fff;border-radius:16px;padding:64px 70px 70px;position:relative;overflow:hidden}
.nums .nb::after{content:"";position:absolute;right:-90px;top:-90px;width:260px;height:260px;border-radius:50%;border:40px solid rgba(245,166,35,.14)}
.nums-h{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap}
.nums-h .en{font-size:28px;letter-spacing:.1em}
.nums-h .en span{color:var(--gold);text-transform:lowercase;font-weight:500;letter-spacing:.04em}
.nums-h p{font-size:14px;color:rgba(255,255,255,.8)}
.nums-g{display:grid;grid-template-columns:repeat(4,1fr);margin-top:44px}
.nums-g>div{padding:6px 28px;border-left:1px solid rgba(255,255,255,.18)}
.nums-g>div:first-child{border-left:0;padding-left:0}
.nums-g b{display:block;font-family:var(--en);font-size:72px;line-height:1;color:var(--gold);font-weight:700;letter-spacing:.02em}
.nums-g b small{font-family:var(--jp);font-size:18px;color:#fff;margin-left:6px;letter-spacing:.06em}
.nums-g span{display:block;margin-top:16px;font-size:13px;line-height:1.8;color:rgba(255,255,255,.85)}

@media (max-width:1100px){.hd nav{gap:22px}}
@media (max-width:860px){
  .nums{margin-top:90px}.nums .nb{padding:44px 24px}
  .nums-g{grid-template-columns:1fr 1fr;gap:32px 0}.nums-g>div:nth-child(3){border-left:0;padding-left:0}
  .nums-g b{font-size:48px}.nums-h .en{font-size:22px}.nums-g>div{padding:4px 0 4px 16px}.nums-g>div:nth-child(odd){padding-left:0}
  .cbox{padding:36px 24px}
}
/* trang ngành (v13) */
.flow.f4{grid-template-columns:repeat(4,1fr);row-gap:44px}
.src{font-size:11px;color:var(--grey);line-height:1.8;margin-top:28px}
.fstats{display:grid;grid-template-columns:repeat(3,1fr);margin-top:48px;border-top:1px solid var(--line)}
.fstats>div{padding:26px 22px 0 0}
.fstats>div+div{padding-left:22px;border-left:1px solid var(--line)}
.fstats b{display:block;font-family:var(--en);font-size:44px;line-height:1.1;font-weight:700;color:var(--accent);letter-spacing:.02em;white-space:nowrap}
.fstats b i{font-style:normal;font-family:var(--jp);font-size:16px;margin-left:4px;color:var(--ink)}
.fstats span{display:block;margin-top:10px;font-size:13px;line-height:1.8;color:var(--ink2)}
.fnotice{border:1px solid var(--accent);border-radius:12px;padding:36px 40px}
.fnotice>b{display:inline-block;background:var(--accent);color:#fff;font-size:12px;letter-spacing:.1em;padding:4px 12px;border-radius:64px}
.fnotice h3{font-size:22px;letter-spacing:.04em;line-height:1.6;margin-top:16px}
.fnotice p{font-size:15px;line-height:2;margin-top:14px;color:var(--ink2)}
.fnotice p b{color:var(--ink)}
.froutes,.fwork{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:60px}
.froutes>div,.fwork>div{border:1px solid var(--line);border-radius:12px;padding:30px 28px}
.tg{display:inline-block;border:1px solid var(--accent);color:var(--accent);font-size:12px;font-weight:700;letter-spacing:.06em;padding:3px 12px;border-radius:64px;vertical-align:middle}
.froutes h3{font-size:19px;margin-top:16px;letter-spacing:.04em}
.froutes small{display:block;font-size:12px;color:var(--grey);margin-top:4px;font-weight:700}
.froutes p,.fwork p{font-size:14px;line-height:1.9;color:var(--ink2);margin-top:12px}
.fwork h3{font-size:18px;letter-spacing:.04em}
.fwork>div:only-child{grid-column:1/-1}
.fwork>div.off{background:#f6f7f9;border-color:transparent}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.chips span{border:1px solid var(--line);border-radius:64px;padding:6px 14px;font-size:13px;font-weight:700;background:#fff;line-height:1.5}
.fwork .off .chips span{color:var(--ink2);font-weight:500}
.frules{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:50px;border-top:1px solid var(--line)}
.frules>div{border-bottom:1px solid var(--line);padding:28px 0}
.frules h3{font-size:17px;letter-spacing:.04em;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.frules p{font-size:14px;line-height:1.95;color:var(--ink2);margin-top:10px}
.fcareer{display:grid;grid-template-columns:1fr 32px 1fr 32px 1fr;align-items:stretch;margin-top:60px}
.fcareer>i{font-style:normal;align-self:center;text-align:center;color:var(--grey);font-size:20px}
.fcareer>div{border:1px solid var(--line);border-radius:12px;padding:28px 26px}
.fcareer>div:last-child{border-color:var(--accent)}
.fcareer small{font-family:var(--en);font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--accent)}
.fcareer h3{font-size:22px;margin-top:8px;letter-spacing:.04em}
.fcareer b{display:block;font-size:13px;color:var(--ink2);margin-top:4px}
.fcareer p{font-size:14px;line-height:1.9;margin-top:14px}
@media (max-width:860px){.flow.f4{grid-template-columns:1fr 1fr}.fstats{grid-template-columns:1fr}.fstats>div+div{border-left:0;padding-left:0;border-top:1px solid var(--line)}.fstats>div{padding:20px 0}.fstats b{font-size:36px}.froutes,.fwork,.frules{grid-template-columns:1fr}.fcareer{grid-template-columns:1fr}.fcareer>i{transform:rotate(90deg);padding:6px 0}.fnotice{padding:26px 22px}}
/* footer gọn */
.ft{margin-top:110px;padding:40px 0 22px}
.ft .top{display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap}
.ft .logo img{height:38px}.ft .logo img.wm{height:14px}
.ft .addr{font-size:12px;color:var(--ink2);line-height:1.7;margin-top:10px}
.ft .top{align-items:flex-start}
.ft .fsite{display:grid;grid-template-columns:repeat(6,auto);gap:0 36px}
.ft .fsite div{display:flex;flex-direction:column;gap:7px}
.ft .fsite a{font-family:var(--en);font-size:11.5px;font-weight:500;letter-spacing:.06em;color:var(--ink2);white-space:nowrap}
.ft .fsite a.h{font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--ink);margin-bottom:5px}
.ft .fsite a:hover{color:var(--accent)}
.ft .fnavl a{font-family:var(--en);font-size:13px;font-weight:700;letter-spacing:.1em}
.ft .fnavl a:hover{color:var(--accent)}
.ft .bot{border-top:1px solid var(--line);margin-top:26px;padding-top:18px;display:flex;justify-content:space-between;align-items:center;gap:12px 28px;flex-wrap:wrap;font-size:12px}
.ft .bot .links{display:flex;gap:22px;flex-wrap:wrap}
.ft .bot .lic{color:var(--grey);font-size:11px;letter-spacing:.04em}
.ft .copy{font-family:var(--en);font-size:11px;font-weight:700;letter-spacing:.06em;margin:0;text-align:right}
@media (max-width:860px){.ft{margin-top:72px;padding:26px 0 16px}.ft .top{flex-direction:column;align-items:flex-start;gap:12px}.ft .addr{margin-top:6px;font-size:11px}.ft .fsite{grid-template-columns:repeat(3,1fr);gap:20px 16px;width:100%}.ft .bot{margin-top:16px;padding-top:12px;flex-direction:column;align-items:flex-start;gap:6px}.ft .bot .links{gap:4px 14px;font-size:11px}.ft .copy{text-align:left}}
/* v17: số liệu / lý do / 事例 / download */
.kstats{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.kstats>div{padding:34px 0 30px 28px}
.kstats>div+div{border-left:1px solid var(--line)}
.kstats b{display:block;font-family:var(--en);font-size:clamp(44px,4.6vw,64px);line-height:1;font-weight:700;color:var(--accent);letter-spacing:.02em}
.kstats b i{font-style:normal;font-size:.5em;margin-left:4px}
.kstats span{display:block;margin-top:14px;font-size:13px;font-weight:700;color:var(--ink2);letter-spacing:.06em}
.reasons{margin-top:60px;border-top:1px solid var(--line)}
.reasons .rs{display:grid;grid-template-columns:360px 1fr;gap:32px;padding:52px 0;border-bottom:1px solid var(--line);align-items:start}
.reasons .no{display:block;font-family:var(--en);font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--grey)}
.reasons h3{font-size:26px;letter-spacing:.06em;line-height:1.5;margin-top:10px}
.reasons .rb p{font-size:16px;line-height:2}
.reasons .pts{display:flex;flex-wrap:wrap;gap:8px 0;margin-top:18px;font-size:13px;color:var(--ink2)}
.reasons .pts span+span::before{content:"／";margin:0 12px;color:var(--line)}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tags span{border:1px solid var(--line);border-radius:64px;padding:4px 12px;font-size:12px;font-weight:700;color:var(--ink2)}
.ccards{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:56px}
.ccard{position:relative;display:flex;flex-direction:column;gap:16px;border:1px solid var(--line);border-radius:12px;padding:20px 20px 28px;transition:box-shadow .3s,transform .3s}
.ccard:hover{box-shadow:0 20px 50px rgba(11,42,102,.1);transform:translateY(-3px)}
.ccard .im{border-radius:8px;overflow:hidden;aspect-ratio:16/9}
.ccard .im img{width:100%;height:100%;object-fit:cover;transition:transform .8s}
.ccard:hover .im img{transform:scale(1.05)}
.ccard h3{font-size:19px;line-height:1.6;letter-spacing:.04em;padding-right:52px}
.ccard .kp{display:flex;gap:28px}
.ccard .kp b{display:block;font-family:var(--en);font-size:32px;color:var(--accent);line-height:1.1}
.ccard .kp b i{font-style:normal;font-family:var(--jp);font-size:14px;margin-left:2px;color:var(--ink)}
.ccard .kp small{font-size:12px;color:var(--grey);font-weight:700}
.ccard .circ40{position:absolute;right:20px;bottom:28px}
.ccard:hover .circ40{transform:translateX(6px)}
.case .chead{display:grid;grid-template-columns:1fr 440px;gap:48px;align-items:center;margin-top:28px}
.case .chead h2{font-size:32px;line-height:1.6;letter-spacing:.06em;margin-top:18px}
.case .chead .im{border-radius:10px;overflow:hidden;aspect-ratio:4/3}
.case .chead .im img{width:100%;height:100%;object-fit:cover}
.ckpi{display:flex;flex-wrap:wrap;gap:0;margin-top:44px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.ckpi>div{padding:24px 40px 22px 0;margin-right:40px}
.ckpi>div+div{padding-left:40px;border-left:1px solid var(--line)}
.ckpi b{display:block;font-family:var(--en);font-size:44px;color:var(--accent);line-height:1.1}
.ckpi b i{font-style:normal;font-family:var(--jp);font-size:16px;margin-left:4px;color:var(--ink)}
.ckpi span{font-size:13px;font-weight:700;color:var(--ink2)}
.cdl{margin-top:24px}
.cdl ul{margin:0;padding-left:1.2em}
.cvoice{margin:40px 0 0;background:#f6f7f9;border-radius:12px;padding:32px 36px}
.cvoice p{font-size:16px;line-height:2;font-weight:700}
.cvoice cite{display:block;font-style:normal;font-size:13px;color:var(--grey);margin-top:10px}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-top:14px}
.form .ck{margin:0;font-weight:500;font-size:14px;display:flex;align-items:center;gap:10px;cursor:pointer;letter-spacing:.02em}
.form .ck input{width:18px;height:18px;padding:0;border:1px solid var(--ink);accent-color:var(--accent);flex:none}
.fld.bad input{border-bottom-color:#d33}
.dldone{grid-column:2;border:1px solid var(--line);border-radius:12px;padding:40px}
.dldone b{font-size:22px}.dldone p{margin:12px 0 28px;color:var(--ink2)}
@media (max-width:860px){.kstats{grid-template-columns:1fr 1fr}.kstats>div{padding:22px 0 20px 16px}.kstats>div:nth-child(3){border-left:0}.kstats>div:nth-child(n+3){border-top:1px solid var(--line)}.ccards{grid-template-columns:1fr}.reasons .rs{grid-template-columns:1fr;gap:14px;padding:36px 0}.reasons h3{font-size:21px}.case .chead{grid-template-columns:1fr}.case .chead h2{font-size:24px}.ckpi>div,.ckpi>div+div{padding:18px 20px 16px 0;margin-right:20px;border-left:0}.checks{grid-template-columns:1fr}.dldone{grid-column:1}.cvoice{padding:24px 20px}}
/* v19: giải thích chế độ */
.sysck{list-style:none;padding:0;margin:44px 0 0;border-top:1px solid var(--line)}
.sysck li{position:relative;padding:18px 0 18px 34px;border-bottom:1px solid var(--line);font-size:15px;line-height:1.9}
.sysck li::before{content:"";position:absolute;left:4px;top:26px;width:14px;height:8px;border-left:2px solid var(--accent);border-bottom:2px solid var(--accent);transform:rotate(-45deg)}
.sysck b{color:var(--accent)}
.ctitle{font-size:24px;letter-spacing:.06em;margin-top:80px}
.ctable-wrap{overflow-x:auto;margin-top:28px}
.ctable{width:100%;min-width:720px;border-collapse:collapse;font-size:14px;line-height:1.7}
.ctable th,.ctable td{border:1px solid var(--line);padding:16px 18px;text-align:center;vertical-align:middle}
.ctable thead th{background:#f4f6f9;font-weight:700;letter-spacing:.04em}
.ctable thead th.hl{background:var(--accent);color:#fff}
.ctable tbody th{background:#f9fafb;font-weight:700;width:150px}
.ctable td.hl{color:var(--accent);font-weight:700;background:#f5f8fd}
.ctable thead th.hl2{background:var(--accent-d);color:#fff}
.ctable td.hl2{color:var(--accent-d);font-weight:700;background:#eef3fb}
.ctable{min-width:860px}
.ctable small{display:block;font-size:12px;color:var(--grey);font-weight:500;margin-top:2px}
.ctable.two-col{min-width:560px}
.vcat{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:50px}
.vcat>div{border:1px solid var(--line);border-radius:12px;padding:28px}
.vcat b{font-size:24px;letter-spacing:.08em;color:var(--accent)}
.vcat small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.12em;color:var(--grey);font-weight:700;margin-top:4px}
.vcat p{font-size:15px;font-weight:700;line-height:1.8;margin-top:16px}
.vcat span{display:block;font-size:13px;color:var(--ink2);line-height:1.8;margin-top:10px}
@media (max-width:860px){.vcat{grid-template-columns:1fr}.ctitle{font-size:20px;margin-top:56px}.sysck li{font-size:14px}}
/* trang bài viết (Guidable: tiêu đề 28px, ngày Roboto 12px, ảnh 835 ngang; ảnh đặt TRÊN tiêu đề theo CEO) */
.art{min-width:0}
.art .thumb{border-radius:10px;overflow:hidden;aspect-ratio:1200/630;background:#f3f6fb}
.art .thumb img{width:100%;height:100%;object-fit:cover;display:block}
.art h1.art-h{font-size:28px;line-height:1.7;letter-spacing:.04em;margin-top:36px}
.art .meta{font-family:var(--en);font-size:12px;font-weight:500;letter-spacing:.06em;color:var(--grey);margin-top:14px}
.art .meta b{font-family:var(--jp);font-weight:500;margin-left:14px;padding-left:14px;border-left:1px solid var(--line)}
.art .meta span{font-family:var(--jp);margin-left:14px;padding-left:14px;border-left:1px solid var(--line)}
.art .body{margin-top:44px;font-size:15px;line-height:2.1;color:var(--ink)}
.art .body p{margin:0 0 22px}
.art .body h2{font-size:20px;line-height:1.7;letter-spacing:.04em;margin:52px 0 18px;padding-left:16px;border-left:3px solid var(--accent)}
.art .body h3{font-size:16px;margin:30px 0 10px;letter-spacing:.04em}
.art .body ul,.art .body ol{margin:0 0 22px;padding-left:1.4em}
.art .body li{margin:6px 0}
.art .body .ctable{min-width:0;font-size:14px}
.art .body .ctable-wrap{margin:8px 0 10px}
.art .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:40px}
.art .tags span{font-size:12px;color:var(--accent);border:1px solid var(--line);border-radius:64px;padding:4px 12px;font-weight:700}
.art .share{display:flex;gap:18px;align-items:center;margin-top:24px;font-size:12px;letter-spacing:.06em;color:var(--grey)}
.art .share a{font-family:var(--en);font-weight:700;color:var(--ink2)}
.art .share a:hover{color:var(--accent)}
@media (max-width:860px){.art h1.art-h{font-size:21px}.art .body h2{font-size:18px}}
.phh{margin:0;font-size:inherit;font-weight:inherit;line-height:inherit}
.phh span{display:block}
.ph .phh .ja-lb{margin-top:4px}
.nm-en{display:block;font-family:var(--en);font-weight:700;letter-spacing:.06em;line-height:1.25}
.row .nm small,.svc h2 small{font-family:var(--jp);font-size:14px;letter-spacing:.08em;color:var(--accent);margin-top:10px;font-weight:700}
.row .nm .nm-en{font-size:28px}.svc h2 .nm-en{font-size:38px}
@media (max-width:860px){.row .nm .nm-en{font-size:22px}.svc h2 .nm-en{font-size:26px}}
/* trang tin */
.nitem .thumbs{display:none}
.art .thumb{aspect-ratio:1200/630}
.art .body .ntoc{background:#f6f8fb;border-radius:10px;padding:22px 28px;margin:0 0 36px}
.art .body .ntoc-h{font-weight:700;font-size:14px;letter-spacing:.08em;color:var(--accent);margin-bottom:8px}
.art .body .ntoc ol{margin:0;padding-left:1.3em;font-size:14px;line-height:1.9}
.art .body .ntoc li.lv3{margin-left:1.2em;list-style:circle;font-size:13px}
.art .body .ntoc a:hover{color:var(--accent)}
.art .body .nbody-tablewrap{overflow-x:auto;margin:10px 0 24px}
.art .body table{width:100%;min-width:520px;border-collapse:collapse;font-size:14px;line-height:1.7}
.art .body th,.art .body td{border:1px solid var(--line);padding:12px 14px;text-align:left;vertical-align:top}
.art .body thead th{background:#f4f6f9;font-weight:700}
.art .body blockquote{margin:0 0 22px;padding:18px 22px;border-left:3px solid var(--gold);background:#fffaf0;font-size:14px;line-height:1.9}
.art .body a{color:var(--accent);text-decoration:underline;text-underline-offset:3px}
.art .body strong{font-weight:700}
.art .afaq{margin-top:56px}
.art .afaq h2{font-size:20px;margin-bottom:20px;padding-left:16px;border-left:3px solid var(--accent)}
.filters a{cursor:pointer}
/* CASE dạng dòng (trang chủ) */
.crows{margin-top:60px}
.crow{display:grid;grid-template-columns:300px 1fr auto 40px;gap:36px;align-items:center;padding:44px 0;border-bottom:1px solid var(--line);transition:background .25s}
.crow:hover{background:#fafbfc}
.crow .cno{font-family:var(--en);font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--accent)}
.crow .cno small{display:block;font-family:var(--jp);font-size:13px;letter-spacing:.04em;color:var(--grey);font-weight:500;margin-top:8px}
.crow .ct{font-size:20px;font-weight:700;letter-spacing:.04em;line-height:1.7}
.crow .ck{display:flex;gap:28px}
.crow .ck b{display:block;font-family:var(--en);font-size:30px;color:var(--accent);line-height:1.1;white-space:nowrap}
.crow .ck b i{font-style:normal;font-family:var(--jp);font-size:13px;margin-left:2px;color:var(--ink)}
.crow .ck small{font-size:11px;color:var(--grey);font-weight:700}
.crow:hover .circ40{transform:translateX(6px)}
/* 2 dải ảnh chạy chéo */
.people{position:relative;overflow:hidden;margin-top:80px;padding:10px 0;display:flex;flex-direction:column;gap:14px}
.prow-s{position:relative;width:100%;overflow:hidden}

.people .ptrack{display:flex!important;flex-direction:row;flex-wrap:nowrap;gap:14px;width:max-content;animation:pslide 160s linear infinite}
.prow-s.rev .ptrack{animation-direction:reverse;animation-duration:115s}
.people .ptrack img{width:360px;height:240px;max-width:none;object-fit:cover;border-radius:8px;flex:none;display:block}
@keyframes pslide{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.ptrack{animation:none}}
@media (max-width:1100px){.crow{grid-template-columns:220px 1fr 40px}.crow .ck{grid-column:2}}
@media (max-width:860px){.crow{grid-template-columns:1fr 40px;gap:14px;padding:30px 0}.crow .cno,.crow .ct,.crow .ck{grid-column:1}.crow .circ40{grid-column:2;grid-row:1/4}.crow .ct{font-size:17px}.people{margin-top:60px;gap:10px}.people .ptrack img{width:240px;height:160px}}
/* nền: mảng xám rất nhạt cắt xiên (cùng góc với hero / Value) */
.bgw{position:relative;isolation:isolate;overflow-x:clip}
.bgw::before{content:"";position:absolute;z-index:-1;pointer-events:none;top:0;bottom:0;width:30%;background:#f6f7f9;transform:skewX(-20deg)}
.bgw-r::before{right:-6%}
.bgw-l::before{left:-6%}
.ph{position:relative;isolation:isolate;overflow-x:clip}
.ph::before{content:"";position:absolute;z-index:-1;pointer-events:none;top:-80px;bottom:-40px;right:-4%;width:24%;background:#f6f7f9;transform:skewX(-20deg)}
@media (max-width:860px){.bgw::before{width:42%}.ph::before{width:38%}}
/* responsive */
@media (max-width:1360px) and (min-width:861px){
  .hero h1{font-size:clamp(48px,4.9vw,68px);line-height:1.35;letter-spacing:.09em}
  .hero .vis{left:auto;right:0;transform:scale(.88);transform-origin:100% 0}
}
@media (max-width:1100px){
  .sec-head{grid-template-columns:260px 1fr}
  .row{grid-template-columns:260px 1fr 40px}
  .prow{grid-template-columns:260px 1fr 260px}
  .ft .top{gap:40px}
}
@media (max-width:860px){
  .wrap{padding-inline:20px}
  .hd{padding:0 20px}
  .hd nav,.hd .cta{display:none}
  .hd .burger{display:block}
  .hero{height:auto;padding:40px 20px 0}
  .hero .tx{position:static}
  .hero h1{white-space:nowrap;font-size:10.5vw;line-height:1.3;letter-spacing:.08em}
  .hero .sub{font-size:13px;margin-top:20px}
  .hero .vis{position:relative;left:auto;top:auto;width:100%;height:auto;aspect-ratio:4/3;margin:32px -20px 0;width:calc(100% + 40px)}
  .hero .strip{width:33.333%;height:100%;clip-path:polygon(28% 0,100% 0,72% 100%,0 100%)}
  .hero .strip:nth-child(1){left:0}.hero .strip:nth-child(2){left:23.8%}.hero .strip:nth-child(3){left:47.6%}
  .hero .strip .inner{width:300%;height:100%}
  .hero .strip:nth-child(2) .inner{left:-71.4%}.hero .strip:nth-child(3) .inner{left:-142.8%}
  .hero .vis{overflow:hidden}
  .hero .inner.devs .dev{left:8%;top:14%;width:66%;height:72%;perspective:900px}
  .hero .inner.devs .dev .lap{width:70%;right:0;top:26%}
  .hero .inner.devs .dev .iph{width:24%;left:4%;top:0}
  .hero .scrl{display:none}
  .message{padding-top:110px}
  .message p{font-size:20px;letter-spacing:.06em}
  .loop span{font-size:72px;line-height:150px}
  .loop{margin-top:-60px}
  .sec{padding-top:90px}
  .sec-head,.two,.side,.svc .g,.news-side,.form,.dl div{grid-template-columns:1fr;gap:24px}
  .sec-head .en,.ph .en,.cbox .en,.side .en{font-size:36px;line-height:1.2}
  .sec-head .lead b{font-size:22px}
  .row{grid-template-columns:1fr 40px;padding:32px 0}
  .row .ds{grid-column:1/-1}
  .row .nm{font-size:20px}
  .prow{grid-template-columns:1fr;padding:32px 0}
  .store{justify-content:flex-start}
  .qr{display:none}
  .band{margin-top:90px;padding:80px 0 40px}
  .band .wrap{grid-template-columns:1fr}
  .band .tag{text-align:left;font-size:20px}
  .band svg{width:110%}
  .cbox{flex-direction:column;align-items:flex-start;padding:36px 24px}
  .ctel{text-align:left}
  .tabs{gap:16px;flex-wrap:wrap}
  .tabs a{width:calc(50% - 8px);min-width:0;white-space:normal;font-size:12px}
  .two h2{font-size:30px;white-space:normal}
  .vals,.flow,.sdg{grid-template-columns:1fr 1fr}
  .svc h2{font-size:24px}
  .svc .ic h2{font-size:22px;white-space:normal}
  .svc .ic img{width:56px;height:56px}
  .blk{padding-top:100px}
}
`;
fs.writeFileSync(path.join(OUT,'css/site.css'), css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s*\n\s*/g,'').replace(/\s*([{};:,>])\s*/g,'$1').replace(/;}/g,'}'));

// ---------- JS ----------
const js = `
(function(){
  /* v8: đánh dấu trước khi quan sát */
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].forEach.call(document.querySelectorAll('.sec-head .en, .side>.en, .ph .phh .en, .cbox .en'),function(e){e.classList.add('chars');});
  /* ảnh hé mở: phần tử bị clip-path che kín thì IntersectionObserver không thấy → quan sát phần tử cha */
  var wipes=[].slice.call(document.querySelectorAll('.cul .ph-col, .msg-ph, .svc img.photo, .voice .vph'));
  wipes.forEach(function(e){e.classList.add('wipe');});
  if('IntersectionObserver' in window){var wio=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target._wipe.classList.add('in');wio.unobserve(x.target);}});},{rootMargin:'0px 0px -10% 0px'});
    wipes.forEach(function(e){e.parentNode._wipe=e;wio.observe(e.parentNode);});} else wipes.forEach(function(e){e.classList.add('in');});
  /* fade-in khi cuộn */
  var sel='.crow, .art>*, .reasons .rs, .sysck li, .vcat>div, .ctable-wrap, .kstats>div, .ccard, .ckpi>div, .chead>*, .cvoice, .illu, .sec-head>*, .fstats>div, .froutes>div, .fwork>div, .frules>div, .fcareer>div, .fnotice, .row, .prow, .nitem, .blk .lbl, .two>*, .vals>div, .flow>div, .sdg>div, .svc .num, .svc .g>*, .dl>div, .cbox, .ph .en, .ph .ja-lb, .ph .dots, .tabs, .lead28, .lead16, .message>.wrap>*, .band, .msg-body, .form>*, .filters, .pager, .more-r, .vs, .vlbl, .chars, .slant, .ftile, .sup10>div, .jobs4>div, .faq, .fnav, .pic, .cul>*, .voice>*, .steps>div, .strip img, .req>div';
  var els=[].slice.call(document.querySelectorAll(sel));
  els.forEach(function(e){e.classList.add('fx');});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var e=x.target;var sib=[].slice.call(e.parentNode.children).filter(function(c){return c.classList.contains('fx')&&!c.classList.contains('in');});var i=sib.indexOf(e);e.style.transitionDelay=(Math.max(0,i)*90)+'ms';e.classList.add('in');io.unobserve(e);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(e){io.observe(e);});
  } else { els.forEach(function(e){e.classList.add('in');}); }
  /* tách chữ: hero + tiêu đề mission */
  function split(el,base,step){var i=0;function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){var sp=document.createElement('span');sp.className='ch';sp.textContent=ch===' '?'\u00a0':ch;sp.style.animationDelay=(base+i*step)+'ms';i++;f.appendChild(sp);});n.replaceChild(f,c);}else if(c.nodeType===1&&c.tagName!=='BR'){walk(c);}});}walk(el);}
  var h=document.querySelector('.hero h1'); if(h) split(h,2200,40);
  document.querySelectorAll('.chars').forEach(function(e){split(e,0,40);});
  /* nút: nhân đôi chữ cho hiệu ứng trượt */
  document.querySelectorAll('.pill').forEach(function(p){var c=p.querySelector('.circ');var txt='';[].slice.call(p.childNodes).forEach(function(n){if(n.nodeType===3){txt+=n.textContent;p.removeChild(n);}});txt=txt.trim();if(!txt)return;var t=document.createElement('span');t.className='tx';t.innerHTML='<span>'+txt+'</span><span aria-hidden="true">'+txt+'</span>';p.insertBefore(t,c);});
  /* VALUE: ghim màn hình, cuộn để đổi (kiểu Guidable) */
  var vsc=document.querySelector('.vscroll');
  if(vsc){var vsl=vsc.querySelectorAll('.vslide'),vds=vsc.querySelectorAll('.vdots button'),vmk=vsc.querySelectorAll('.vmarks i'),vlb=vsc.querySelector('.vlbl .n'),vcur=-1;
    function vgo(n){if(n===vcur)return;vsl.forEach(function(e,i){e.classList.toggle('on',i===n);e.classList.toggle('past',i<n);});vds.forEach(function(e,i){e.classList.toggle('on',i===n);});vmk.forEach(function(e,i){e.classList.toggle('on',i<=n);});if(vlb)vlb.textContent=(n+1)+'/'+vsl.length;vcur=n;}
    function vupd(){var r=vsc.getBoundingClientRect(),span=vsc.offsetHeight-innerHeight;var p=span>0?Math.min(Math.max(-r.top/span,0),.999):0;vgo(Math.floor(p*vsl.length));}
    window.addEventListener('scroll',vupd,{passive:true});window.addEventListener('resize',vupd);vupd();
    vds.forEach(function(d,i){d.addEventListener('click',function(){var span=vsc.offsetHeight-innerHeight;window.scrollTo({top:vsc.getBoundingClientRect().top+scrollY+span*(i+.5)/vsl.length,behavior:RM?'auto':'smooth'});});});}
  /* ảnh nổi bám theo con trỏ */
  if(matchMedia('(hover:hover)').matches){
    var hv=document.createElement('div');hv.className='hv';document.body.appendChild(hv);
    var tx=0,ty=0,cx=0,cy=0,raf=null,on=false,cur=null;
    function place(el){var r=el.getBoundingClientRect(),w=hv.offsetWidth||400,h=hv.offsetHeight||300;tx=innerWidth-w/2-28;ty=Math.min(Math.max(r.top+r.height/2,69+h/2+12),innerHeight-h/2-12);}
    function build(el){var t=el.getAttribute('data-type')||'img',cap=el.getAttribute('data-cap')||'';var h='';
      if(t==='dev'){h='<div class="dev"><div class="lap"><div class="scr"><img src="'+el.getAttribute('data-lap')+'" alt=""></div><div class="base"></div></div><div class="iph"><img src="'+el.getAttribute('data-ph')+'" alt=""></div></div>';hv.className='hv land';}
      else if(t==='ph'){h='<div class="iph solo"><img src="'+el.getAttribute('data-ph')+'" alt=""></div>';hv.className='hv port';}
      else {h='<img src="'+el.getAttribute('data-hv')+'" alt="">';hv.className='hv land';}
      hv.innerHTML=h+'<div class="cap">'+cap+'</div>';}
    function tick(){cx+=(tx-cx)*0.18;cy+=(ty-cy)*0.18;hv.style.left=cx+'px';hv.style.top=cy+'px';if(on||Math.abs(tx-cx)>0.5)raf=requestAnimationFrame(tick);else raf=null;}
    window.addEventListener('scroll',function(){if(cur){place(cur);if(!raf)tick();}},{passive:true});
    document.querySelectorAll('[data-hv]').forEach(function(el){
      el.addEventListener('mouseenter',function(){var was=on;build(el);cur=el;place(el);if(!was){cx=tx;cy=ty;}requestAnimationFrame(function(){place(el);hv.classList.add('on');});on=true;if(!raf)tick();});
      el.addEventListener('mouseleave',function(){hv.classList.remove('on');on=false;cur=null;});
      var href=el.getAttribute('data-href');
      if(href){el.addEventListener('click',function(e){if(e.target.closest('a'))return;location.href=href;});}
    });
  }
  /* hero slider */
  var hs=document.querySelectorAll('.hero .sl'),hd=document.querySelectorAll('.hero .dots i');
  if(hs.length){var hc=0,ht;function hgo(n){var old=hs[hc];old.classList.remove('on');old.classList.add('out');hd[hc].classList.remove('on');hc=(n+hs.length)%hs.length;var nw=hs[hc];hd[hc].classList.add('on');setTimeout(function(){old.classList.remove('out');nw.classList.add('on');},1450);}
    /* lần đầu: ảnh vào lúc 3.4s như Guidable */
    hs[0].classList.remove('on');setTimeout(function(){hs[0].classList.add('on');},matchMedia('(prefers-reduced-motion: reduce)').matches?0:3400);
    hd.forEach(function(d,i){d.addEventListener('click',function(){hgo(i);clearInterval(ht);ht=setInterval(function(){hgo(hc+1);},4200);});});
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(function(){ht=setInterval(function(){hgo(hc+1);},4200);},3400);}
  /* v8: parallax ảnh khi cuộn */
  var pars=[].slice.call(document.querySelectorAll('.cul .ph-col img, .pic .main img, .slant .s img, .msg-photo'));
  pars.forEach(function(e){e.classList.add('par');});
  var hdr=document.querySelector('.hd'),tt=document.createElement('button');
  tt.className='totop';tt.setAttribute('aria-label','ページの先頭へ');tt.innerHTML='<svg viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="26"/></svg>↑';
  document.body.appendChild(tt);tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:RM?'auto':'smooth'});});
  var tk=false;function onScroll(){if(tk)return;tk=true;requestAnimationFrame(function(){tk=false;var y=window.scrollY,vh=window.innerHeight,H=document.documentElement.scrollHeight-vh;
    if(hdr)hdr.classList.toggle('scrolled',y>10);tt.classList.toggle('on',y>600);tt.style.setProperty('--pg',H>0?(y/H).toFixed(3):0);
    if(RM)return;pars.forEach(function(e){var r=e.parentNode.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;var k=parseFloat(e.getAttribute('data-par')||'0.1');var p=((r.top+r.height/2)-vh/2)/vh;e.style.setProperty('--py',(-p*k*r.height).toFixed(1)+'px');});});}
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);onScroll();
  var dlf=document.getElementById('dlf');if(dlf){dlf.addEventListener('submit',function(e){e.preventDefault();var ok=true;dlf.querySelectorAll('input[required]').forEach(function(i){var bad=!i.value.trim()||(i.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value));i.closest('.fld').classList.toggle('bad',bad);if(bad)ok=false;});if(!ok)return;dlf.hidden=true;var d=document.querySelector('.dldone');d.hidden=false;});}
  /* lọc tin theo loại */
  var nf=document.getElementById('nf');
  if(nf){var fl=function(c){[].forEach.call(document.querySelectorAll('.nlist .nitem'),function(e){e.style.display=(!c||e.getAttribute('data-cat')===c)?'':'none';});[].forEach.call(nf.querySelectorAll('a'),function(a){a.classList.toggle('on',a.getAttribute('data-f')===c);});};
    nf.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;e.preventDefault();fl(a.getAttribute('data-f'));history.replaceState(null,'',a.getAttribute('href')==='#'?location.pathname:a.getAttribute('href'));});
    var hh={'#oshirase':'お知らせ','#magazine':'HR Magazine'}[location.hash];if(hh)fl(hh);}
  var b=document.querySelector('.burger'); if(b){b.addEventListener('click',function(){document.body.classList.toggle('menu-open');});}
  /* sóng kẻ mảnh (band) */
  /* dải ruy-băng xoắn: hai đường biên A,B cắt nhau, N đường nội suy ở giữa */
  document.querySelectorAll('svg.wave').forEach(function(svg){
    var N=56,S=90,out='';
    function A(t){return 330+110*Math.sin(t*Math.PI*1.9+0.2)-210*t;}
    function B(t){return 330+110*Math.sin(t*Math.PI*1.9+2.9)-210*t+70*Math.sin(t*Math.PI);}
    function mix(a,b,k){return a.map(function(v,i){return Math.round(v+(b[i]-v)*k);});}
    var navy=[11,61,145],blue=[30,111,214],gold=[245,166,35];
    for(var i=0;i<N;i++){var k=i/(N-1);var c=k<0.55?mix(navy,blue,k/0.55):mix(blue,gold,(k-0.55)/0.45);var d='';
      for(var j=0;j<=S;j++){var t=j/S,x=-40+t*1080,y=A(t)+(B(t)-A(t))*k;d+=(j?' L':'M')+x.toFixed(1)+' '+y.toFixed(1);}
      out+='<path d="'+d+'" fill="none" stroke="rgb('+c.join(',')+')" stroke-width="1" opacity="0.75"/>';}
    svg.setAttribute('viewBox','0 0 1040 520');svg.innerHTML='<defs><linearGradient id="rfade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="0.78" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="rmask"><rect x="0" y="0" width="1040" height="520" fill="url(#rfade)"/></mask></defs><g mask="url(#rmask)">'+out+'</g>';
  });
  /* QR giữ chỗ: khi xuất thật sẽ thay bằng QR sinh từ URL */
  document.querySelectorAll('canvas[data-qr]').forEach(function(cv){
    var ctx=cv.getContext('2d'),n=29,s=cv.width/n,seed=0,key=cv.dataset.qr;
    for(var k=0;k<key.length;k++)seed=(seed*31+key.charCodeAt(k))>>>0;
    function rnd(){seed=(seed*1103515245+12345)>>>0;return (seed>>>16)/65536;}
    ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle='#202020';
    for(var y=0;y<n;y++)for(var x=0;x<n;x++){var f=(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9);if(f)continue;if(rnd()<0.47)ctx.fillRect(x*s,y*s,s,s);}
    function fd(x,y){ctx.fillStyle='#202020';ctx.fillRect(x*s,y*s,7*s,7*s);ctx.fillStyle='#fff';ctx.fillRect((x+1)*s,(y+1)*s,5*s,5*s);ctx.fillStyle='#202020';ctx.fillRect((x+2)*s,(y+2)*s,3*s,3*s);}
    fd(0,0);fd(n-7,0);fd(0,n-7);
  });
})();
`;
fs.writeFileSync(path.join(OUT,'js/site.js'), js);

// ---------- helpers ----------
const SDG_COLORS=['#E5243B','#DDA63A','#4C9F38','#C5192D','#FF3A21','#26BDE2','#FCC30B','#A21942','#FD6925','#DD1367','#FD9D24','#BF8B2E','#3F7E44','#0A97D9','#56C02B','#00689D','#19486A'];
const sdgWheel = (() => { const R=50,r=31,gap=1.1,seg=360/17; const pt=(a,rad)=>{const t=(a-90)*Math.PI/180;return [(50+rad*Math.cos(t)).toFixed(2),(50+rad*Math.sin(t)).toFixed(2)];};
  return '<svg class="wheel" viewBox="0 0 100 100" aria-hidden="true">'+SDG_COLORS.map((c,i)=>{const a0=i*seg+gap/2,a1=(i+1)*seg-gap/2;const [x0,y0]=pt(a0,R),[x1,y1]=pt(a1,R),[x2,y2]=pt(a1,r),[x3,y3]=pt(a0,r);
    return '<path fill="'+c+'" d="M'+x0+' '+y0+'A'+R+' '+R+' 0 0 1 '+x1+' '+y1+'L'+x2+' '+y2+'A'+r+' '+r+' 0 0 0 '+x3+' '+y3+'Z"/>';}).join('')+'</svg>'; })();
const sdgMark = (r) => `<a class="sdgs-mark" href="${r}about/sdgs/index.html" aria-label="SDGsへの取り組み">${sdgWheel}<span>SUSTAINABLE<br>DEVELOPMENT<br>GOALS</span></a>`;
const circ = (cls='circ40') => `<span class="${cls}"><i></i><i></i><i></i>→</span>`;
const pill = (txt, href='#') => `<a class="pill" href="${href}">${txt}<span class="circ">→</span></a>`;
const dots = `<div class="dots"><i></i><i></i><i></i><i></i></div>`;
const dev = (r,lap,ph) => `<div class="dev"><div class="lap"><div class="scr"><img src="${r}img/${lap}" alt=""></div><div class="base"></div></div><div class="iph"><img src="${r}img/${ph}" alt=""></div></div>`;
const heroSlide = (inner,on,cls) => `<div class="sl${on?' on':''}">${[0,1,2].map(()=>`<div class="strip"><div class="inner${cls==='devs'?' devs':''}">${inner}</div></div>`).join('')}</div>`;
const phone = (r,ph) => `<div class="iph solo"><img src="${r}img/${ph}" alt=""></div>`;

function page({root, title, desc, body, active, home}) {
  const r = root;
  const nav = `
  <header class="hd">
    <div class="brand"><a class="logo" href="${r}index.html"><img src="${r}img/logo.png" alt=""><img class="wm" src="${r}img/wordmark.png" alt="BIGLIGHT株式会社"></a>${sdgMark(r)}</div>
    <nav>
      <div class="dd"><a href="${r}about/index.html">ABOUT <span class="chev"></span></a>
        <div class="menu"><div>
          <a href="${r}about/index.html#mission">Mission</a>
          <a href="${r}about/message/index.html">Message</a>
          <a href="${r}about/strength/index.html">Strength</a>
          <a href="${r}about/company/index.html">Company</a>
          <a href="${r}about/sdgs/index.html">SDGs</a>
        </div></div>
      </div>
      <a href="${r}service/index.html">SERVICE</a>
      <a href="${r}product/index.html">PRODUCT</a>
      <a href="${r}news/index.html">NEWS</a>
      <a href="${r}recruit/index.html">RECRUIT</a>
      <a class="dl-btn" href="${r}download/index.html">DOWNLOAD</a>
      <a class="cta" href="${r}contact/index.html">CONTACT</a>
    </nav>
    <button class="burger" aria-label="menu"><span></span><span></span><span></span></button>
  </header>
  <div class="mnav">
    <a href="${r}about/index.html">ABOUT<small>私たちについて</small></a>
    <div class="sub"><a href="${r}about/index.html#mission">Mission</a><a href="${r}about/message/index.html">Message</a><a href="${r}about/strength/index.html">Strength</a><a href="${r}about/company/index.html">Company</a><a href="${r}about/sdgs/index.html">SDGs</a></div>
    <a href="${r}service/index.html">SERVICE<small>事業内容</small></a>
    <div class="sub"><a href="${r}service/tokutei-ginou/index.html">Specified Skilled Worker</a><a href="${r}service/engineer/index.html">Engineer</a><a href="${r}case/index.html">Case</a></div>
    <a href="${r}product/index.html">PRODUCT<small>アプリ</small></a>
    <a href="${r}news/index.html">NEWS<small>お知らせ</small></a>
    <a href="${r}recruit/index.html">RECRUIT<small>採用情報</small></a>
    <a href="${r}download/index.html">DOWNLOAD<small>資料ダウンロード</small></a>
    <a href="${r}contact/index.html">CONTACT<small>お問い合わせ</small></a>
  </div>`;
  const footer = `
  <footer class="ft"><div class="wrap">
    <div class="top">
      <div class="fb"><a class="logo" href="${r}index.html"><img src="${r}img/logo.png" alt=""><img class="wm" src="${r}img/wordmark.png" alt="BIGLIGHT"></a>
        <p class="addr">〒462-0007 愛知県名古屋市北区如意一丁目112 A　TEL 052-908-7944</p></div>
      <nav class="fsite"><div><a class="h" href="${r}about/index.html">ABOUT</a><a href="${r}about/index.html#mission">Mission</a><a href="${r}about/message/index.html">Message</a><a href="${r}about/strength/index.html">Strength</a><a href="${r}about/company/index.html">Company</a><a href="${r}about/sdgs/index.html">SDGs</a></div><div><a class="h" href="${r}service/index.html">SERVICE</a><a href="${r}service/tokutei-ginou/index.html">Specified Skilled Worker</a><a href="${r}service/engineer/index.html">Engineer</a><a href="${r}service/field/kogyo/index.html">Manufacturing</a><a href="${r}service/field/kensetsu/index.html">Construction</a><a href="${r}service/field/inshoku/index.html">Food Manufacturing</a><a href="${r}service/field/gaishoku/index.html">Food Service</a><a href="${r}case/index.html">Case</a></div><div><a class="h" href="${r}product/index.html">PRODUCT</a><a href="${r}product/index.html#portal">Portal</a><a href="${r}product/index.html#academy">Academy</a><a href="${r}product/index.html#job">JOB</a></div><div><a class="h" href="${r}news/index.html">NEWS</a></div><div><a class="h" href="${r}recruit/index.html">RECRUIT</a><a href="${r}recruit/index.html#culture">Culture</a><a href="${r}recruit/index.html#voice">Interview</a><a href="${r}recruit/index.html#req">Requirements</a></div><div><a class="h" href="${r}contact/index.html">CONTACT</a><a href="${r}contact/index.html">Contact</a><a href="${r}download/index.html">Download</a></div></nav>
    </div>
    <div class="bot">
      <div class="links"><a href="https://biglight.jp/privacy/">プライバシーポリシー</a><a href="https://biglight.jp/faq/">よくある質問</a><a href="https://biglight.jp/optout/">配信停止</a><a href="${r}download/index.html">資料ダウンロード</a></div>
      <div class="lic">有料職業紹介 23-ユ-302414 ／ 登録支援機関 21登-006596</div>
      <p class="copy">© BIGLIGHT Co., Ltd.</p>
    </div>
  </div></footer>
  <script src="${r}js/site.js?v=__JSV__" defer></script>`;
  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}">
<!--SEO-->
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" href="/icon-96.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta name="theme-color" content="#0b3d91">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Roboto:wght@500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Roboto:wght@500;700&display=swap"></noscript>
<link rel="stylesheet" href="${r}css/site.css?v=__CSSV__">
<script>document.documentElement.classList.add('js'${home?",'home'":''});</script>
</head><body>
${nav}
<main>
${body}
</main>
${footer}
</body></html>`;
}

const numBand = () => `
<section class="nums"><div class="wrap"><div class="nb">
  <div class="nums-h"><div class="en">BIGLIGHT <span>in numbers</span></div><p>採用から定着まで、数字でみるBIGLIGHTの約束。</p></div>
  <div class="nums-g">
    <div><b>16<small>分野</small></b><span>特定技能の全分野に対応</span></div>
    <div><b>0<small>円</small></b><span>採用が決まるまで費用ゼロ<br>（完全成功報酬）</span></div>
    <div><b>1<small>年</small></b><span>入社後の保証期間（最長）</span></div>
    <div><b>4<small>言語</small></b><span>母国語でサポート<br>ベトナム・インドネシア・ミャンマー・ネパール</span></div>
  </div>
</div></div></section>`;
const contactBox = (r) => `
<section class="cbox-wrap"><div class="wrap">
  <a class="cbox" href="${r}contact/index.html">
    <div><div class="en">Contact</div><div class="ja-lb">お問い合わせ</div></div>
    <span class="circ">→</span>
  </a>
  <p class="ctel">お電話でのご相談　<b>052-908-7944</b>　平日 9:00–18:00</p>
</div></section>`;

const pageHead = (en, ja, tabs='') => `
<section class="ph"><div class="wrap">
  <h1 class="phh"><span class="en">${en}</span><span class="ja-lb">${ja}</span></h1>${dots}${tabs}
</div></section>`;

const aboutTabs = (r, on) => `<div class="tabs">
  <a href="${r}about/index.html" class="${on==='mission'?'on':''}">MISSION <span class="ch">›</span></a>
  <a href="${r}about/message/index.html" class="${on==='message'?'on':''}">MESSAGE <span class="ch">›</span></a>
  <a href="${r}about/strength/index.html" class="${on==='strength'?'on':''}">STRENGTH <span class="ch">›</span></a>
  <a href="${r}about/company/index.html" class="${on==='company'?'on':''}">COMPANY <span class="ch">›</span></a>
  <a href="${r}about/sdgs/index.html" class="${on==='sdgs'?'on':''}">SDGS <span class="ch">›</span></a>
</div>`;

const NEWS = JSON.parse(fs.readFileSync(path.join(__dirname,'news.json'),'utf8'));
const news = NEWS.map(n=>[n.date,n.cat,n.title,n.slug]);
const nitem = ([d,c,t,slug],r='') => `<a class="nitem" data-cat="${c}" href="${slug?r+'news/'+slug+'/index.html':'https://biglight.jp/news/'}"><div><div class="tt">${t}</div><div class="mt">${d}<b>${c}</b></div></div>${circ()}</a>`;

const products = (r) => `
<div class="rows" style="margin-top:60px">
  <div class="prow" data-hv="${r}img/shot-portal.jpg" data-type="dev" data-lap="${r}img/desk-portal.jpg" data-ph="${r}img/shot-portal.jpg" data-cap="BIGLIGHT Portal · Web / iPhone" data-href="${r}product/index.html#portal">
    <div class="head"><img src="${r}img/icon-portal.png" alt=""><div class="nm">BIGLIGHT ポータル<small>Portal · for companies &amp; workers</small></div></div>
    <div class="ds"><span class="for">企業様・外国人材向け</span>在留資格・提出書類・連絡・定期面談を、企業と本人がひとつの画面で。</div>
    <div class="store"><div class="badges"><a href="https://apps.apple.com/jp/app/biglight/id6804992207"><img src="${r}img/badge-appstore.svg" alt="App Storeからダウンロード"></a><a href="https://play.google.com/store/apps/details?id=jp.biglight.app"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play で手に入れよう"></a></div></div>
  </div>
  <div class="prow" data-hv="${r}img/shot-academy.jpg" data-type="dev" data-lap="${r}img/desk-academy.jpg" data-ph="${r}img/shot-academy.jpg" data-cap="BIGLIGHT Academy · Web / iPhone" data-href="${r}product/index.html#academy">
    <div class="head"><img src="${r}img/icon-academy.png" alt=""><div class="nm">BIGLIGHT アカデミー<small>Academy · for workers</small></div></div>
    <div class="ds"><span class="for">外国人材向け</span>特定技能試験の対策を、ベトナム語・インドネシア語・ミャンマー語・ネパール語で。</div>
    <div class="store"><div class="badges"><a href="https://apps.apple.com/jp/app/id6816712170"><img src="${r}img/badge-appstore.svg" alt="App Storeからダウンロード"></a><a href="https://play.google.com/store/apps/details?id=jp.biglight.academy"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play で手に入れよう"></a></div></div>
  </div>
  <div class="prow" data-hv="${r}img/shot-job.jpg" data-type="dev" data-lap="${r}img/desk-job.jpg" data-ph="${r}img/shot-job.jpg" data-cap="BIGLIGHT JOB · Web / iPhone" data-href="${r}product/index.html#job">
    <div class="head"><img src="${r}img/icon-job.png" alt=""><div class="nm">BIGLIGHT JOB<small>Job · for job seekers</small></div></div>
    <div class="ds"><span class="for">求職者・採用企業向け</span>特定技能専門の求人サイト。履歴書作成から面接、入社後フォローまで。</div>
    <div class="store"><div class="badges"><span class="soon"><img src="${r}img/badge-appstore.svg" alt="App Store 近日公開"><em>App Store：審査中・近日公開</em></span><a href="https://play.google.com/store/apps/details?id=jp.biglight.job"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play で手に入れよう"></a></div></div>
  </div>
</div>`;

// ---------- HOME ----------
function home(){ const r='./'; return page({root:r,home:true,title:'BIGLIGHT株式会社｜特定技能・技人国の外国人材紹介・定着支援【名古屋】',desc:'BIGLIGHT株式会社は、特定技能・技人国の外国人材を採用から定着までワンストップでご支援する名古屋の登録支援機関です。',body:`
<div class="opening" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<section class="hero">
  <div class="tx">
    <h1>日本の成長を、<br>もっと<br>グローバルに。</h1>
    <p class="sub">Powering Japan’s Growth, Globally.</p>
    <div class="dots"><i class="on"></i><i></i><i></i><i></i></div>
  </div>
  <div class="vis">
    ${heroSlide('<img class="full" src="'+r+'img/office-hcm.jpg" alt="BIGLIGHTのオフィス">', true)}
    ${heroSlide(dev(r,'desk-job.jpg','shot-job.jpg'), false, 'devs')}
    ${heroSlide('<img class="full" src="'+r+'img/hero-team.jpg" alt="BIGLIGHTのチーム">')}
    ${heroSlide(dev(r,'desk-academy.jpg','shot-academy.jpg'), false, 'devs')}
  </div>
  <div class="scrl"></div>
</section>

<section class="message"><div class="wrap">
  <div class="t">message</div>
  <p>人材を紹介して、終わりにしない。<br>採用から定着まで、企業と外国人材のそばで<br>伴走しつづける登録支援機関です。</p>
  <div class="more">${pill('私たちについて', r+'about/index.html')}</div>
</div></section>
<div class="loop" aria-hidden="true"><span>Powering Japan’s Growth, Globally. Powering Japan’s Growth, Globally. </span><span>Powering Japan’s Growth, Globally. Powering Japan’s Growth, Globally. </span></div>

<section class="sec bgw bgw-r"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">Service</h2><div class="ja-lb">事業内容</div></div>
    <p class="lead">BIGLIGHTは、特定技能・技人国の外国人材の紹介から、<br>在留資格の手続き、住まいと生活、入社後の定着までを自社で一貫して支援しています。</p></div>
  <div class="rows">
    <a class="row" href="${r}service/tokutei-ginou/index.html" data-hv="${r}img/svc-kensetsu.jpg" data-cap="Specified Skilled Worker"><div class="nm"><span class="nm-en">Specified Skilled Worker</span><small>特定技能 採用支援</small></div><div class="ds">人手不足の現場に、即戦力の特定技能人材を。募集・面接から入社後の定着支援まで、登録支援機関として一貫対応。</div>${circ()}</a>
    <a class="row" href="${r}service/engineer/index.html" data-hv="${r}img/engineer.jpg" data-cap="Engineer / Specialist"><div class="nm"><span class="nm-en">Engineer / Specialist</span><small>技人国 人材紹介</small></div><div class="ds">エンジニア・通訳・貿易事務など、専門スキルを持つ高度人材のご紹介。</div>${circ()}</a>
  </div>
  <div class="more-r"><a href="${r}service/index.html">事業内容を見る <span class="ar">→</span></a></div>
</div></section>

${homeStats(r)}
<section class="sec"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">Product</h2><div class="ja-lb">アプリ</div></div></div>
  ${products(r)}
  <div class="more-r"><a href="${r}product/index.html">アプリの詳細を見る <span class="ar">→</span></a></div>
</div></section>

<div class="deco a"><i></i><i></i><i></i><i></i></div>
<section class="sec bgw bgw-r"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">News</h2><div class="ja-lb">お知らせ</div></div>
    <div><div class="nlist">${news.slice(0,3).map(n=>nitem(n,r)).join('')}</div>
    <div class="more-r"><a href="${r}news/index.html">ニュース一覧を見る <span class="ar">→</span></a></div></div></div>
</div></section>

<div class="deco b"><i></i><i></i></div>
<section class="sec recruit"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">Recruit</h2><div class="ja-lb">採用情報</div></div>
    <div class="lead"><b>日本と世界をつなぐ仕事を、一緒に。</b>BIGLIGHTは「日本の成長を、もっとグローバルに。」というミッションのもと、ベトナム・インドネシア・ミャンマー・ネパールなど、さまざまな国の人材と企業の未来を本気で支える仲間を求めています。<div style="margin-top:40px">${pill('採用情報を見る', r+'recruit/index.html')}</div></div></div>
</div></section>
<div class="people" aria-label="日本の現場で働く人たち">
  <div class="prow-s"><div class="ptrack">${Array.from({length:34},(_,k)=>'p'+String(k+1).padStart(2,'0')).concat(Array.from({length:34},(_,k)=>'p'+String(k+1).padStart(2,'0'))).map((p,j)=>`<img src="${r}img/people/${p}.webp" alt="${j<34?'日本の現場で働く人':''}" width="360" height="240">`).join('')}</div></div>
</div>

<section class="band">
  <svg class="wave" viewBox="0 0 900 520" aria-hidden="true"></svg>
  <div class="wrap"><div class="big">Powering<br>Japan’s Growth,<br>Globally.</div><div class="tag">日本の成長を、<br>もっとグローバルに。</div></div>
</section>
${contactBox(r)}
`});}

// ---------- ABOUT ----------
function about(){ const r='../'; return page({root:r,title:'私たちについて｜BIGLIGHT株式会社',desc:'BIGLIGHTのミッション・ビジョン・行動指針 F.I.R.S.T.',body:`
${pageHead('We are','私たちについて',aboutTabs(r,'mission'))}
<section class="blk" id="mission"><div class="wrap">
  <div class="lbl">Mission</div>
  <div class="two">
    <div><h2 class="chars">日本の成長を、<br>もっとグローバルに。</h2><div class="sub-en">Powering Japan’s Growth, Globally.</div>
      <div class="illu"><img src="${r}img/illu-mission.svg" alt="的の中心に矢を当てるイラスト"><i class="fl a"></i><i class="fl b"></i><i class="fl c"></i><i class="fl d"></i></div></div>
    <div class="txt"><p>人手不足に向き合う日本の企業と、<br>「日本で働きたい」と願う外国人材。<br>そのあいだにある言葉・制度・生活の壁を、<br>私たちは一つずつ取り除いていきます。</p>
    <p>人材を紹介して終わりではなく、<br>在留資格の手続きから住まい、入社後の定着まで。<br>人と企業が国籍を越えて信頼でつながる社会を、<br>名古屋から、東海から、全国へ。</p></div>
  </div>
</div></section>
<section class="blk" id="vision"><div class="wrap">
  <div class="lbl">Vision</div>
  <div class="two">
    <div><h2>東海地域で最も信頼される<br>外国人材の架け橋になる。</h2>
      <div class="txt" style="margin-top:40px"><p>東海から全国へ、そして世界へ。<br>私たちは、信頼と成長をつむぐ架け橋であり続けます。</p></div></div>
    <div class="illu" style="margin-top:0"><img src="${r}img/illu-vision.svg" alt="世界の目的地を見つめる二人のイラスト"><i class="fl a"></i><i class="fl b"></i><i class="fl d"></i></div>
  </div>
</div></section>
<section id="value" class="vscroll"><div class="vsticky">
  <div class="vband" aria-hidden="true"></div>
  <div class="vmarks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="wrap vin">
    <div class="lbl vlbl">Value <span class="n">1/5</span></div>
    <div class="vstage"><div class="vslide on"><h2>迷わず、<br>すぐに動く。</h2><p>私たちは、迷っている時間を成果に変えます。<br>問い合わせへの返答も、手続きも、まず動く。<br>スピードが企業と人材の信頼をつくります。</p><div class="k"><b>F</b>FAST ／ 迅速</div></div><div class="vslide"><h2>本質を見抜き、<br>集中する。</h2><p>余計なことはしない。<br>企業が本当に困っていること、人材が本当に望んでいることを見抜き、<br>そこに力を注ぎます。</p><div class="k"><b>I</b>INSIGHT ／ 本質</div></div><div class="vslide"><h2>最後まで、<br>やり抜く。</h2><p>紹介して終わりにしない。<br>入社後の生活も、定着も、任されたことは最後まで責任を持つ。<br>それが登録支援機関としての約束です。</p><div class="k"><b>R</b>RESPONSIBILITY ／ 責任</div></div><div class="vslide"><h2>失敗を恐れず、<br>挑む。</h2><p>新しい仕組みを導入する。新しい分野に踏み出す。<br>若い会社だからこそ、変化を恐れず、新しい道を切り開きます。</p><div class="k"><b>S</b>SPIRIT ／ 挑戦</div></div><div class="vslide"><h2>感謝を、<br>行動で示す。</h2><p>当たり前と思わない。<br>企業様、人材、パートナーへの感謝を、言葉ではなく行動で返します。</p><div class="k"><b>T</b>THANKFUL ／ 感謝</div></div></div>
    <div class="vdots"><button class="on" aria-label="1"></button><button aria-label="2"></button><button aria-label="3"></button><button aria-label="4"></button><button aria-label="5"></button></div>
  </div>
</div></section>
`});}

function message(){ const r='../../'; return page({root:r,title:'代表メッセージ｜BIGLIGHT株式会社',desc:'代表取締役 グエン・タン・トゥンからのメッセージ',body:`
${pageHead('We are','私たちについて',aboutTabs(r,'message'))}
<section><div class="wrap side">
  <h2 class="en">Message</h2>
  <div>
    <div class="msg-ph"><img class="msg-photo" data-par="0.08" src="${r}img/ceo.jpg" alt="代表取締役 グエン・タン・トゥン"></div>
    <div class="msg-body">
      <p>この度はBIGLIGHT株式会社のホームページをご覧いただき、誠にありがとうございます。</p>
      <p>私はベトナム出身で、日本で生活し、仕事をする中で、多くの外国人材と企業様の課題を見てきました。</p>
      <p>外国人材は「日本で働きたい」という強い気持ちを持っていても、言葉や生活、仕事の面で不安を抱えています。一方で、多くの日本企業は人材不足という課題を抱えながらも、「どこに相談すればよいかわからない」「採用後のサポートが心配」と感じているのが現状です。</p>
      <p>BIGLIGHTは、そんな双方をつなぐ<b>架け橋</b>になりたいという思いから設立しました。</p>
      <p>私たちは人材を紹介して終わりではありません。採用前のご相談から、入社後の生活支援、職場定着まで、一人ひとり、一社一社と真剣に向き合うことを大切にしています。</p>
      <p>まだ若い会社ではありますが、お客様への感謝を忘れず、迅速・誠実・責任を持って行動し、信頼されるパートナーであり続けたいと考えています。</p>
      <p>これからも企業様と外国人材の未来に少しでも貢献できるよう努力してまいります。</p>
      <p>今後ともBIGLIGHT株式会社をよろしくお願い申し上げます。</p>
      <div class="msg-sign">代表取締役　グエン・タン・トゥン<small>Nguyen Thanh Tung</small></div>
    </div>
  </div>
</div></section>
`});}

function company(){ const r='../../'; return page({root:r,title:'会社概要｜BIGLIGHT株式会社',desc:'BIGLIGHT株式会社の会社概要・沿革',body:`
${pageHead('We are','私たちについて',aboutTabs(r,'company'))}
<section><div class="wrap side">
  <h2 class="en">Company</h2>
  <dl class="dl">
    <div><dt>会社名</dt><dd>BIGLIGHT株式会社</dd></div>
    <div><dt>代表取締役</dt><dd>グエン・タン・トゥン</dd></div>
    <div><dt>所在地</dt><dd>〒462-0007<br>愛知県名古屋市北区如意一丁目112 A</dd></div>
    <div><dt>電話番号</dt><dd>052-908-7944（FAX 052-908-7267）</dd></div>
    <div><dt>設立年月日</dt><dd>2021年8月12日</dd></div>
    <div><dt>資本金</dt><dd>5,000,000円</dd></div>
    <div><dt>事業内容</dt><dd>特定技能外国人支援事業<br>外国人高度人材紹介事業<br>支援アプリの導入・提供（BIGLIGHT ポータル／アカデミー／JOB）</dd></div>
    <div><dt>許可番号</dt><dd>有料職業紹介事業許可番号 / 23-ユ-302414<br>登録支援機関登録番号 / 21登-006596</dd></div>
    <div><dt>取引銀行</dt><dd>あいち銀行</dd></div>
    <div><dt>関連会社</dt><dd>BIGLIGHT HR JOINT STOCK COMPANY<br>2nd Floor, THINH PHAT Building, 88 Bach Dang Street, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam</dd></div>
  </dl>
</div></section>
<section class="blk"><div class="wrap side" style="margin-top:0">
  <h2 class="en">History</h2>
  <dl class="dl">
    <div><dt>2021.8</dt><dd>法人設立（名古屋市西区）</dd></div>
    <div><dt>2021.12</dt><dd>有料職業紹介・登録支援機関の許可を取得、営業開始</dd></div>
    <div><dt>2023.12</dt><dd>事務所移転（名古屋市北区）</dd></div>
    <div><dt>2024.8</dt><dd>ベトナム・ホーチミン市に子会社を設立、HR専門部署を立ち上げ</dd></div>
    <div><dt>2026.3</dt><dd>関東方面に出張所を開設</dd></div>
    <div><dt>2026.9</dt><dd>BIGLIGHT ポータル／アカデミー／JOB のアプリ提供を開始（App Store・Google Play）</dd></div>
  </dl>
</div></section>
`});}

function sdgs(){ const r='../../'; return page({root:r,title:'SDGsへの取り組み｜BIGLIGHT株式会社',desc:'BIGLIGHTのSDGsへの取り組み',body:`
${pageHead('We are','私たちについて',aboutTabs(r,'sdgs'))}
<section class="blk"><div class="wrap">
  <div class="lbl">SDGs</div>
  <div class="two"><h2 style="font-size:40px">事業を通じて、<br>持続可能な社会へ。</h2><div class="txt"><p>外国人材と企業をつなぐ事業そのものが、働きがいと経済成長、不平等の是正につながると考えています。3つの重点取り組みを定めています。</p></div></div>
  <div class="sdg">
    <div><b>08</b><h3>安定した雇用と<br>企業の成長支援</h3><p>完全成功報酬・最長1年保証で、企業が安心して外国人材を採用できる環境をつくります。</p></div>
    <div><b>10</b><h3>外国人材が安心して暮らし、<br>働ける環境づくり</h3><p>母国語での相談、住まいと行政手続きの支援、定期面談で、不平等と孤立をなくします。</p></div>
    <div><b>13</b><h3>デジタル化による<br>環境負荷の低減</h3><p>書類・連絡・学習をアプリに集約し、紙と移動を減らします。</p></div>
  </div>
</div></section>
`});}

// ---------- SERVICE ----------
function service(){ const r='../'; return page({root:r,title:'事業内容｜BIGLIGHT株式会社',desc:'特定技能 採用支援・技人国 人材紹介',body:`
${pageHead('Service','事業内容')}
<section><div class="wrap lead-end">
  <p class="lead28">採用から定着まで、ワンストップで。<br>完全成功報酬・最長1年保証。</p>
  <p class="lead16">BIGLIGHTは、名古屋を拠点に、特定技能・技人国の外国人材の紹介と、登録支援機関としての定着支援を自社で一貫して行っています。</p>
</div></section>

<section class="svc" id="s1"><div class="wrap">
  <div class="num">SERVICE-01</div>
  <div class="g">
    <div><h2><span class="nm-en">Specified Skilled Worker</span><small>特定技能 採用支援</small></h2>
      <p class="ds">製造・建設・介護・外食など、人手不足の現場に即戦力人材を。人材募集・スクリーニング、面接調整・通訳、在留資格・ビザ手続きの代行から、登録支援機関として住居・行政手続き・定期面談・母国語相談まで、入社後の定着を一貫して支えます。</p>
      <div class="acts"><div>外国人採用をすぐ始めたい${pill('事業者様はこちら', r+'contact/index.html')}</div><div>働きたい外国人の方${pill('BIGLIGHT JOB へ','https://job.biglight.jp/')}</div></div></div>
    <img class="photo" src="${r}img/svc-kensetsu.jpg" alt="">
  </div>
</div></section>

<section class="svc" id="s2"><div class="wrap">
  <div class="num">SERVICE-02</div>
  <div class="g">
    <div><h2><span class="nm-en">Engineer / Specialist</span><small>技人国 人材紹介</small></h2>
      <p class="ds">技術・人文知識・国際業務の在留資格を持つ高度人材をご紹介。エンジニア、機械設計、生産技術、品質管理、貿易事務、海外営業、通訳・翻訳など。経験・日本語力・専門性を考慮した最適なご提案。</p>
      <div class="acts"><div>専門人材を採用したい${pill('事業者様はこちら', r+'contact/index.html')}</div></div></div>
    <img class="photo" src="${r}img/engineer.jpg" alt="">
  </div>
</div></section>



<section class="blk"><div class="wrap">
  <div class="lbl">Flow</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">ご相談から定着まで、<br>5つのステップ。</h2><div class="txt"><p>ご相談は無料です。採用人数・職種・時期が未定でも構いません。</p></div></div>
  <div class="flow">
    <div><b>STEP 01</b><h3>ご相談</h3><p>無料でヒアリングし、課題やご要望を伺います。</p></div>
    <div><b>STEP 02</b><h3>ご提案</h3><p>最適な人材プラン・スケジュールをご提示します。</p></div>
    <div><b>STEP 03</b><h3>マッチング</h3><p>条件に合う人材をご紹介し、面接を実施します。</p></div>
    <div><b>STEP 04</b><h3>入社</h3><p>在留資格・ビザ手続きをワンストップで対応します。</p></div>
    <div><b>STEP 05</b><h3>定着支援</h3><p>入社後も生活・就労をフォローし、長期定着を支えます。</p></div>
  </div>
</div></section>
${contactBox(r)}
`});}

// ---------- PRODUCT ----------
function product(){ const r='../'; return page({root:r,title:'アプリ｜BIGLIGHT株式会社',desc:'BIGLIGHT ポータル・アカデミー・JOB',body:`
${pageHead('Product','アプリ')}
<section><div class="wrap lead-end">
  <p class="lead28">採用・学習・定着の現場に、<br>3つのアプリを導入しています。</p>
  <p class="lead16">企業様の支援業務、外国人材の試験対策、求職者の就職活動。それぞれの現場でご利用いただけるアプリを、App Store と Google Play からご案内しています。</p>
</div></section>

<section class="svc" id="portal"><div class="wrap">
  <div class="num">PRODUCT-01</div>
  <div class="g">
    <div><div class="ic"><img src="${r}img/icon-portal.png" alt=""><h2>BIGLIGHT ポータル<small>Portal</small></h2></div>
      <p class="ds">在留資格・提出書類・連絡・定期面談・年末調整などの支援業務を、企業と本人がひとつの画面で。書類の期限管理、担当者とのメッセージ、在留カードのスキャン読み取りに対応。</p>
      <div class="acts"><div>企業様・外国人材向け${pill('ポータルを開く','https://portal.biglight.jp/')}</div></div></div>
    <div class="store" style="justify-content:flex-start;gap:40px;flex-wrap:wrap"><div class="devwrap">${dev(r,'desk-portal.jpg','shot-portal.jpg')}</div><div class="badges"><a href="https://apps.apple.com/jp/app/biglight/id6804992207"><img src="${r}img/badge-appstore.svg" alt="App Store"></a><a href="https://play.google.com/store/apps/details?id=jp.biglight.app"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play"></a></div></div>
  </div>
</div></section>

<section class="svc" id="academy"><div class="wrap">
  <div class="num">PRODUCT-02</div>
  <div class="g">
    <div><div class="ic"><img src="${r}img/icon-academy.png" alt=""><h2>BIGLIGHT アカデミー<small>Academy</small></h2></div>
      <p class="ds">特定技能試験の対策アプリ。分野別の問題・単語・文法・模擬試験を、ベトナム語・インドネシア語・ミャンマー語・ネパール語で学べます。ふりがな付きで、スキマ時間に。</p>
      <div class="acts"><div>外国人材向け${pill('アカデミーを開く','https://academy.biglight.jp/')}</div></div></div>
    <div class="store" style="justify-content:flex-start;gap:40px;flex-wrap:wrap"><div class="devwrap">${dev(r,'desk-academy.jpg','shot-academy.jpg')}</div><div class="badges"><a href="https://apps.apple.com/jp/app/id6816712170"><img src="${r}img/badge-appstore.svg" alt="App Store"></a><a href="https://play.google.com/store/apps/details?id=jp.biglight.academy"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play"></a></div></div>
  </div>
</div></section>

<section class="svc" id="job"><div class="wrap">
  <div class="num">PRODUCT-03</div>
  <div class="g">
    <div><div class="ic"><img src="${r}img/icon-job.png" alt=""><h2>BIGLIGHT JOB<small>Job</small></h2></div>
      <p class="ds">特定技能専門の求人サイト。製造・建設・外食など全国の求人検索から、多言語の履歴書作成、面接練習、ビザ申請、入社後フォローまで。企業様は求人掲載・応募管理に。</p>
      <div class="acts"><div>求職者・採用企業向け${pill('JOB を開く','https://job.biglight.jp/')}</div></div></div>
    <div class="store" style="justify-content:flex-start;gap:40px;flex-wrap:wrap"><div class="devwrap">${dev(r,'desk-job.jpg','shot-job.jpg')}</div><div class="badges"><span class="soon"><img src="${r}img/badge-appstore.svg" alt="App Store 近日公開"><em>App Store：審査中・近日公開</em></span><a href="https://play.google.com/store/apps/details?id=jp.biglight.job"><img class="gp" src="${r}img/badge-googleplay.png" alt="Google Play"></a></div></div>
  </div>
</div></section>
${contactBox(r)}
`});}

// ---------- NEWS ----------
function newsPage(){ const r='../'; return page({root:r,title:'お知らせ・HR Magazine｜BIGLIGHT株式会社',desc:'BIGLIGHTからのお知らせと採用お役立ち情報',body:`
<section class="ph"><div class="wrap news-side">
  <div><h1 class="phh"><span class="en">News</span><span class="ja-lb">お知らせ・HR Magazine</span></h1>${dots}
    <div class="filters" id="nf"><a class="on" href="#" data-f="">すべて</a><a href="#oshirase" data-f="お知らせ">お知らせ</a><a href="#magazine" data-f="HR Magazine">HR Magazine</a></div></div>
  <div><div class="nlist">${news.map(n=>nitem(n,r)).join('')}</div></div>
</div></section>
`});}

// ---------- RECRUIT ----------
function recruit(){ const r='../'; return page({root:r,title:'採用情報｜BIGLIGHT株式会社',desc:'BIGLIGHTで一緒に働く仲間を募集しています。会社文化・先輩の声・募集要項。',body:`
${pageHead('Recruit','採用情報')}
<section><div class="wrap lead-end">
  <p class="lead28">日本と世界をつなぐ仕事を、<br>一緒に。</p>
  <p class="lead16">ベトナム・インドネシア・ミャンマー・ネパールなど、さまざまな国の人材と企業をつなぐ仕事を、BIGLIGHTで。若く、国際的なチームで成長できる環境です。法人営業・ルート営業・外国人管理支援スタッフを募集しています。</p>
  <div style="margin-top:40px;display:flex;gap:20px;flex-wrap:wrap">${pill('募集要項を見る','#req')}${pill('先輩の声を見る','#voice')}</div>
</div></section>

<section class="blk" id="culture"><div class="wrap">
  <div class="lbl">Culture</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">BIGLIGHTのチームが<br>大切にしている、3つの文化。</h2><div class="txt"><p>名古屋とホーチミン、2つの拠点が毎日つながって働いています。</p></div></div>
  <div class="cul"><div><div class="num">CULTURE-01</div><h2>挑戦<small>Challenge</small></h2><p>変化を恐れず、新しい挑戦を続ける。失敗を学びに変え、一歩先へ進み続けます。若い会社だからこそ、一人ひとりの提案がすぐにかたちになります。</p></div><div class="illu cul-illu"><img src="${r}img/illu-culture-1.svg" alt="一段ずつ上へ登る人のイラスト"><i class="fl a"></i><i class="fl b"></i><i class="fl d"></i></div></div>
  <div class="cul rev"><div><div class="num">CULTURE-02</div><h2>チームワーク<small>Teamwork</small></h2><p>仲間と協力し、より大きな成果を創る。一人ではなく、チームで勝つ組織です。困ったときはお互いに助け合い、努力と成果をきちんと評価します。</p></div><div class="illu cul-illu"><img src="${r}img/illu-culture-2.svg" alt="ホワイトボードに一緒に書き込む二人のイラスト"><i class="fl a"></i><i class="fl c"></i><i class="fl d"></i></div></div>
  <div class="cul"><div><div class="num">CULTURE-03</div><h2>革新<small>Innovation</small></h2><p>現状に満足せず、常に改善を追求する。昨日より良い仕組みを、今日つくります。支援業務・学習・求人にアプリを導入し、現場の声をすぐに仕組みに変えます。</p></div><div class="illu cul-illu"><img src="${r}img/illu-culture-3.svg" alt="大きな電球を見上げる人のイラスト"><i class="fl a"></i><i class="fl b"></i><i class="fl c"></i></div></div>
</div></section>

<section class="blk" id="voice"><div class="wrap">
  <div class="lbl">Interview</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">先輩の声</h2><div class="txt"><p>BIGLIGHTで働くメンバーが、仕事への想いをお話しします。</p></div></div>
  <div class="voices">
    <div class="voice"><div class="vph"><img src="${r}img/staff-2.jpg" alt="ノン タン フン"></div>
      <div class="vtx"><div class="num">INTERVIEW-01<span>入社4年目</span></div><h3>ノン タン フン<small>マネージャー</small></h3><p class="ld">BIGLIGHTでは、企業様への提案や人材紹介、入社後のフォローを担当しています。</p><p class="q">幅広い業務に挑戦でき、自分の成長を実感できることがこの仕事の魅力です。社内は若く活気があり、困ったときにはお互いに助け合える環境があります。努力や成果をきちんと評価してもらえるため、やりがいを持って働けます。新しいことに挑戦したい方、責任を持って仕事に取り組める方にぴったりの会社です。私たちと一緒に成長し、BIGLIGHTの未来をつくっていきましょう。</p></div></div>
    <div class="voice rev"><div class="vph"><img src="${r}img/staff-1.jpg" alt="マイ ラン リン"></div>
      <div class="vtx"><div class="num">INTERVIEW-02<span>入社5年目</span></div><h3>マイ ラン リン<small>営業職</small></h3><p class="ld">企業様への人材提案や採用支援、入社後のフォローなどを担当しています。</p><p class="q">企業様と求職者の双方から感謝の言葉をいただけることが、大きなやりがいです。BIGLIGHTでは、自分の経験を活かしながら新しい仕事にも挑戦できます。分からないことがあっても相談しやすく、仲間と協力しながら成長できる環境です。人と接することが好きで、相手のために行動できる方に向いている仕事だと思います。一緒に経験を積み、多くの方の新しい一歩を支えていきましょう。</p></div></div>
    <div class="voice"><div class="vph"><img src="${r}img/staff-3.jpg" alt="レ テ クアン"></div>
      <div class="vtx"><div class="num">INTERVIEW-03<span>新卒入社1年目</span></div><h3>レ テ クアン<small>営業職</small></h3><p class="ld">特定技能人材やエンジニアの生活支援、企業様との連絡・調整を担当しています。</p><p class="q">外国人の方が日本で安心して働く姿を見ると、この仕事の意義を実感します。入社後は先輩から丁寧に教えてもらえるため、安心して仕事を覚えられました。若い社員が多く、意見や相談を伝えやすい明るい職場です。人を支えることが好きな方や、日本語を活かして成長したい方におすすめです。私たちと一緒に学びながら、新しいことへ積極的に挑戦していきましょう。</p></div></div>
  </div>
</div></section>

<section class="blk" id="req"><div class="wrap side" style="margin-top:0">
  <h2 class="en long">Requirements<small style="display:block;font-family:var(--jp);font-size:14px;letter-spacing:.1em;color:var(--accent);margin-top:14px;text-transform:none">募集要項</small></h2>
  <dl class="dl req">
    <div><dt>募集職種</dt><dd class="pos"><span><b>① 法人営業（BtoBセールス）</b><small>日本企業への人材サービス提案営業</small></span><span><b>② ルート営業（既存顧客フォロー）</b><small>既存取引先へのフォロー・関係構築</small></span><span><b>③ 外国人管理・支援スタッフ</b><small>外国人スタッフの生活・就労サポート</small></span></dd></div>
    <div><dt>雇用形態</dt><dd>正社員（フルタイム）</dd></div>
    <div><dt>勤務地</dt><dd>愛知県名古屋市北区如意一丁目112 A（本社）</dd></div>
    <div><dt>勤務時間</dt><dd>9:00〜18:00（休憩1時間）</dd></div>
    <div><dt>給与</dt><dd>月給 210,000〜350,000円（経験・能力により決定）<br>年2回の賞与あり</dd></div>
    <div><dt>各種手当</dt><dd><ul><li>住宅手当：月20,000円</li><li>交通費全額支給（実費）</li><li>会社支給：ノートパソコン、携帯電話</li></ul></dd></div>
    <div><dt>応募条件</dt><dd><ul><li>Google Workspace（Docs, Sheets, Forms など）が使用できる方</li><li>責任感があり、チームワークを大切にできる方</li><li>外国籍の方：日本語N2以上、日本の専門学校または大学卒業（同等レベル可）</li></ul></dd></div>
    <div><dt>福利厚生</dt><dd><ul><li>社会保険・雇用保険・労災保険完備</li><li>日本の祝日および有給休暇制度</li><li>昇進・キャリアアップのチャンス</li></ul></dd></div>
    <div><dt>応募方法</dt><dd>お電話またはお問い合わせフォームよりご連絡ください。担当者が対応いたします。<br><b style="font-family:var(--en);font-size:20px;letter-spacing:.04em">052-908-7944</b></dd></div>
  </dl>
</div></section>

<section class="blk"><div class="wrap">
  <div class="lbl">Flow</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">選考の流れ</h2><div class="txt"><p>ご応募から入社まで、約2〜4週間が目安です。</p></div></div>
  <div class="steps">
    <div><b>STEP 01</b><h3>ご応募</h3><p>電話またはフォームからご連絡ください。</p></div>
    <div><b>STEP 02</b><h3>面接</h3><p>名古屋本社またはオンラインで1〜2回。</p></div>
    <div><b>STEP 03</b><h3>内定</h3><p>条件のご案内と入社日のご相談。</p></div>
    <div><b>STEP 04</b><h3>入社</h3><p>先輩がマンツーマンで業務をお教えします。</p></div>
  </div>
  <div style="margin-top:60px">${pill('応募・お問い合わせ', r+'contact/index.html')}</div>
</div></section>
${contactBox(r)}
`});}

// ---------- CONTACT ----------
function contact(){ const r='../'; return page({root:r,title:'お問い合わせ｜BIGLIGHT株式会社',desc:'無料相談・資料請求はこちら',body:`
${pageHead('Contact','お問い合わせ・無料相談')}
<section><div class="wrap form">
  <div class="info"><b>052-908-7944</b>平日 9:00–18:00<br>採用人数・職種・時期が未定でも構いません。<br>登録支援機関として、制度の説明からお手伝いします。<br><br>〒462-0007<br>愛知県名古屋市北区如意一丁目112 A</div>
  <form onsubmit="return false">
    <label>お問い合わせ種別<small>必須</small></label><select><option>無料相談（採用について）</option><option>資料請求</option><option>アプリについて</option><option>採用について（求職者の方）</option><option>その他</option></select>
    <label>会社名<small>必須</small></label><div class="fld"><input type="text" placeholder="BIGLIGHT株式会社"></div>
    <label>お名前<small>必須</small></label><div class="fld"><input type="text" placeholder="山田 太郎"></div>
    <label>メールアドレス<small>必須</small></label><div class="fld"><input type="email" placeholder="example@company.co.jp"></div>
    <label>電話番号</label><div class="fld"><input type="tel" placeholder="052-000-0000"></div>
    <label>お問い合わせ内容</label><div class="fld"><textarea placeholder="採用したい職種・人数・時期など"></textarea></div>
    <div class="send"><button class="pill" type="submit" style="cursor:pointer">送信する<span class="circ">→</span></button></div>
    <p class="note">※ 試作版のため送信はできません。本番ではボット対策（Turnstile）付きの現行フォームに接続します。</p>
  </form>
</div></section>
`});}

// ---------- SERVICE DETAIL (v7) ----------
const fieldImg = (r,f) => f.photo ? (f.photo.startsWith('../') ? `${r}img/${f.photo.slice(3)}` : `${r}img/field/${f.photo}`) : `${r}img/field/${f.slug}.svg`;
const serviceTabs = (r,on) => `<div class="tabs">
  <a href="${r}service/index.html" class="${on==='overview'?'on':''}">OVERVIEW <span class="ch">›</span></a>
  <a href="${r}service/tokutei-ginou/index.html" class="${on==='tg'?'on':''}">SPECIFIED SKILLED WORKER <span class="ch">›</span></a>
  <a href="${r}service/engineer/index.html" class="${on==='en'?'on':''}">ENGINEER <span class="ch">›</span></a>
  <a href="${r}service/index.html#fields" class="${on==='field'?'on':''}">FIELDS <span class="ch">›</span></a>
  <a href="${r}case/index.html" class="${on==='case'?'on':''}">CASE <span class="ch">›</span></a>
</div>`;
const slant = (src,alt) => `<div class="slant"><div class="s"><img src="${src}" alt="${alt||''}"></div><div class="s"><img src="${src}" alt=""></div><div class="s"><img src="${src}" alt=""></div></div>`;
const fieldTiles = (r,list) => `<div class="ftiles">${list.map(f=>`<a class="ftile" href="${r}service/field/${f.slug}/index.html"><div class="im"><img src="${fieldImg(r,f)}" alt="${f.ja}"></div><div class="nm"><span>${f.ja}</span><small>${f.en}</small></div>${circ()}</a>`).join('')}</div>`;
// よくある質問 — 特定技能は biglight.jp/faq/ の文面そのまま、技人国は biglight.jp/service/jinzai-shoukai/ の記載から
const FAQ_TG = [
  ['技能実習と特定技能の違いは何ですか？','<p>技能実習は、外国人が日本で技能や知識を学ぶことを目的とした制度です。一方、特定技能は人手不足分野において即戦力となる外国人材を受け入れるための制度です。</p><p>また、現在は技能実習制度に代わる新制度として「育成就労制度」が創設され、育成就労から特定技能へとステップアップできる仕組みへ移行しています。</p><div class="fpath"><span>育成就労（最大3年）</span><i>→</i><span>特定技能1号（最大5年）</span><i>→</i><span class="hl">特定技能2号（更新制限なし）</span></div><p>特定技能2号へ移行した場合は、長期的な就労が可能となり、配偶者や子どもの帯同も認められます。</p><p>企業様にとっては、長期的な人材育成と安定した人材確保につながる制度です。</p>'],
  ['特定技能外国人を採用するにはどのくらい時間がかかりますか？','国内在住者の場合は約1～3ヶ月、海外からの採用の場合は約3～6ヶ月が一般的です。職種や在留資格の状況によって異なります。'],
  ['日本語能力はどの程度ありますか？','特定技能外国人は、日本語試験および技能試験に合格した人材です。日常業務に必要なコミュニケーション能力を有しています。'],
  ['どのような業種で採用できますか？','製造業、建設業、食品製造業、外食業など、特定技能制度で認められている分野で採用が可能です。'],
  ['特定技能外国人は何年間働くことができますか？','特定技能1号は最長5年間就労可能です。さらに要件を満たした場合は特定技能2号へ移行することができます。'],
  ['特定技能2号になるとどうなりますか？','在留期間の更新回数に制限がなくなり、長期的な就労が可能となります。また、配偶者や子どもの帯同も認められています。'],
  ['採用後の生活サポートは必要ですか？','はい。特定技能外国人を受け入れる企業には支援義務があります。BIGLIGHTでは生活支援や各種手続きもサポートしております。'],
  ['転職は可能ですか？','同じ特定技能分野内であれば転職は可能です。そのため、働きやすい環境づくりや定着支援が重要になります。'],
  ['海外から直接採用することはできますか？','はい。海外在住の人材を採用することも可能です。面接から入国手続きまでサポートいたします。'],
  ['受入れに必要な手続きは難しいですか？','在留資格申請や支援計画など一定の手続きが必要ですが、BIGLIGHTがサポートいたしますのでご安心ください。'],
  ['まずは相談だけでも可能ですか？','もちろん可能です。人材不足や採用計画に関するご相談だけでもお気軽にお問い合わせください。'],
];
const FAQ_EN = [
  ['技人国と特定技能の違いは何ですか？','「技術・人文知識・国際業務」は、大学卒業者や専門知識を有する外国人材が日本で働くための在留資格です。単純作業ではなく、専門知識や語学力を活かした業務に従事します。特定技能が現場業務中心であるのに対し、技人国は家族帯同が可能で、将来の管理職候補として採用できます。'],
  ['どのような職種で採用できますか？','IT・システム（システムエンジニア・プログラマーなど）、製造・技術（機械設計・生産技術・品質管理など）、事務・営業（貿易事務・海外営業など）、語学・国際業務（通訳・翻訳など）の専門職です。'],
  ['日本語力はどの程度ありますか？','N2以上の人材が中心です。ビジネス会話や社内コミュニケーションに対応できる人材をご紹介します。'],
  ['学歴の条件はありますか？','原則として大学卒業が必要です。専門学校卒業の人材もご紹介しています。学んだ分野と業務内容の関連性も審査されるため、採用前に業務内容を一緒に整理します。'],
  ['在留資格の手続きもお願いできますか？','はい。在留資格の申請・変更手続きを専門スタッフが代行します。'],
  ['費用はいつ発生しますか？','完全成功報酬のため、採用が決まるまで費用は一切かかりません。さらに最長1年の保証が付きます。'],
];
const faq = (list) => `<div class="faq">${list.map(([q,a])=>`<details><summary><b>Q</b><span>${q}</span><i></i></summary><div class="ans"><b>A</b><div>${a.startsWith('<p>')?a:'<p>'+a+'</p>'}</div></div></details>`).join('')}</div>`;
const faqSec = (list) => `<section class="blk faq-sec"><div class="wrap side" style="margin-top:0">
  <h2 class="en">FAQ<small class="ja-sub">よくある質問</small></h2>
  ${faq(list)}
</div></section>`;

function serviceTop(){ const r='../'; return page({root:r,title:'事業内容｜BIGLIGHT株式会社',desc:'特定技能 採用支援・技人国 人材紹介。製造・建設・食品・外食の4分野を中心に対応。',body:`
${pageHead('Service','事業内容',serviceTabs(r,'overview'))}
<section><div class="wrap lead-end">
  <p class="lead28">採用から定着まで、ワンストップで。<br>完全成功報酬・最長1年保証。</p>
  <p class="lead16">BIGLIGHTは名古屋の登録支援機関として、特定技能・技人国の外国人材の紹介と、入社後の定着支援を自社で一貫して行っています。</p>
</div></section>
<section class="svc" id="s1"><div class="wrap">
  <div class="num">SERVICE-01</div>
  <div class="g">
    <div><h2><span class="nm-en">Specified Skilled Worker</span><small>特定技能 採用支援</small></h2>
      <p class="ds">人手不足の16分野に、即戦力の外国人材を。募集・面接から在留資格の手続き、登録支援機関としての義務的支援まで一貫して対応します。</p>
      <div class="acts"><div>詳しく知りたい${pill('特定技能 採用支援', r+'service/tokutei-ginou/index.html')}</div></div></div>
    <img class="photo" src="${r}img/svc-kensetsu.jpg" alt="">
  </div>
</div></section>
<section class="svc" id="s2"><div class="wrap">
  <div class="num">SERVICE-02</div>
  <div class="g">
    <div><h2><span class="nm-en">Engineer / Specialist</span><small>技人国 人材紹介</small></h2>
      <p class="ds">エンジニア・通訳・貿易事務など、専門知識を持つ高度人材をご紹介します。経験・日本語力・専門性から最適な人材をご提案します。</p>
      <div class="acts"><div>詳しく知りたい${pill('技人国 人材紹介', r+'service/engineer/index.html')}</div></div></div>
    <img class="photo" src="${r}img/svc-seizo.jpg" alt="">
  </div>
</div></section>
<section class="blk" id="fields"><div class="wrap">
  <div class="lbl">Fields</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">BIGLIGHTが強い、<br>4つの主力分野</h2><div class="txt"><p>分野ごとに、現場の課題・対象業務・取得要件・支援内容をまとめています。その他の分野もお気軽にご相談ください。</p></div></div>
  ${fieldTiles(r,FIELDS)}
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Flow</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">ご相談から定着まで、<br>5つのステップ。</h2><div class="txt"><p>ご相談は無料です。採用人数・職種・時期が未定でも構いません。</p></div></div>
  <div class="flow">
    <div><b>STEP 01</b><h3>ご相談</h3><p>無料でヒアリングし、課題やご要望を伺います。</p></div>
    <div><b>STEP 02</b><h3>ご提案</h3><p>最適な人材プラン・スケジュールをご提示します。</p></div>
    <div><b>STEP 03</b><h3>マッチング</h3><p>条件に合う人材をご紹介し、面接を実施します。</p></div>
    <div><b>STEP 04</b><h3>入社</h3><p>在留資格・ビザ手続きをワンストップで対応します。</p></div>
    <div><b>STEP 05</b><h3>定着支援</h3><p>入社後も生活・就労をフォローし、長期定着を支えます。</p></div>
  </div>
</div></section>
${contactBox(r)}
`});}

function tokutei(){ const r='../../'; return page({root:r,title:'特定技能 採用支援｜BIGLIGHT株式会社',desc:'特定技能外国人の採用から登録支援機関としての支援まで。',body:`
${pageHead('Specified Skilled Worker','特定技能 採用支援',serviceTabs(r,'tg'))}
<section><div class="wrap">${slant(r+'img/svc-kensetsu.jpg','特定技能の現場')}</div></section>
<section class="blk" style="padding-top:140px"><div class="wrap side" style="margin-top:0">
  <h2 class="en">About</h2>
  <div><p class="lead28" style="margin-top:0">人手不足の現場に、<br>即戦力の外国人材を。</p>
  <p class="lead16">特定技能は、人手不足が深刻な16分野で、一定の技能と日本語力を持つ外国人材が働くための在留資格です。BIGLIGHTは人材の紹介から在留資格の手続き、入社後の支援までを一貫してお任せいただけます。</p></div>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">System</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">特定技能とは</h2><div class="txt"><p>2019年4月に始まった、人手不足の現場で即戦力として働く外国人材のための在留資格です。</p></div></div>
  <ul class="sysck">
    <li>人手不足が深刻な<b>16分野</b>（介護・建設・工業製品製造業・飲食料品製造業・外食業など）で就労できる在留資格</li>
    <li><b>特定技能1号</b>：技能試験と日本語試験に合格した即戦力。通算で最長5年就労可能</li>
    <li><b>特定技能2号</b>：熟練した技能を持つ人材。在留期間の更新に上限がなく、要件を満たせば家族の帯同も可能</li>
    <li>技能実習2号を良好に修了した方は試験免除で移行でき、帰国した元技能実習生の呼び戻しも可能</li>
    <li>2027年4月から技能実習に代わり「育成就労制度」が開始。育成就労の修了者も特定技能へ移行可能</li>
    <li>受入れ企業には10項目の支援義務があり、登録支援機関（BIGLIGHT）へ全部委託できます</li>
  </ul>
  <h3 class="ctitle">制度比較</h3>
  <div class="ctable-wrap"><table class="ctable">
    <thead><tr><th></th><th>技能実習</th><th>育成就労</th><th class="hl">特定技能1号</th><th class="hl2">特定技能2号</th></tr></thead>
    <tbody>
      <tr><th>目的</th><td>技能移転による国際貢献</td><td>特定技能1号水準の人材の育成・確保</td><td class="hl">人手不足分野の即戦力の確保</td><td class="hl2">熟練した技能を持つ人材の長期確保</td></tr>
      <tr><th>制度開始</th><td>1993年<br><small>2027年から育成就労へ段階的に移行</small></td><td>2027年4月</td><td class="hl">2019年4月</td><td class="hl2">2019年4月<br><small>2023年に対象分野を拡大</small></td></tr>
      <tr><th>在留期間</th><td>最長5年<br><small>1号1年・2号2年・3号2年</small></td><td>原則3年</td><td class="hl">通算5年<br><small>2号は更新上限なし</small></td><td class="hl2">更新上限なし</td></tr>
      <tr><th>入国時の試験</th><td>なし<br><small>介護のみ日本語要件あり</small></td><td>なし<br><small>介護など一部分野は日本語要件あり</small></td><td class="hl">技能試験・日本語試験<br><small>技能実習2号修了者は免除</small></td><td class="hl2">分野ごとの2号試験＋実務経験<br><small>一部分野は日本語要件あり</small></td></tr>
      <tr><th>転職・転籍</th><td>原則不可</td><td>一定の条件を満たせば本人意向で可能</td><td class="hl">同一の業務区分内などで可能</td><td class="hl2">同一の業務区分内などで可能</td></tr>
      <tr><th>受入れ人数枠</th><td>あり</td><td>あり</td><td class="hl">なし<br><small>介護・建設分野を除く</small></td><td class="hl2">なし<br><small>建設分野を除く</small></td></tr>
      <tr><th>家族の帯同</th><td>不可</td><td>不可</td><td class="hl">原則不可</td><td class="hl2">可能<br><small>配偶者・子</small></td></tr>
      <tr><th>支援を行う機関</th><td>監理団体</td><td>監理支援機関</td><td class="hl">登録支援機関</td><td class="hl2">支援義務なし</td></tr>
    </tbody>
  </table></div>
  <p class="src">出典：出入国在留管理庁「外国人労働者に関する制度概要」をもとに作成。制度は改正されることがあるため、最新の情報は同庁の公表資料をご確認ください。</p>
</div></section>
<section class="blk"><div class="wrap side" style="margin-top:0">
  <h2 class="en">Type</h2>
  <dl class="dl">
    <div><dt>特定技能1号</dt><dd>相当程度の知識・経験を要する業務に従事。在留は通算5年まで、家族の帯同は原則不可。</dd></div>
    <div><dt>特定技能2号</dt><dd>熟練した技能を要する業務に従事。在留期間の更新に上限がなく、要件を満たせば家族の帯同も可能。</dd></div>
    <div><dt>必要な試験</dt><dd>分野ごとの技能評価試験と日本語試験（JFT-Basic または JLPT N4以上）。技能実習2号を良好に修了した方は、関連分野で試験が免除されます。</dd></div>
  </dl>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Support</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">登録支援機関として、<br>義務的支援をすべて代行。</h2><div class="txt"><p>法律で定められた10項目の支援を、母国語で行います。</p></div></div>
  <div class="sup10">
    ${['事前ガイダンス','出入国時の送迎','住居確保・生活に必要な契約の支援','生活オリエンテーション','公的手続き等への同行','日本語学習の機会の提供','相談・苦情への対応','日本人との交流促進','転職支援（人員整理等の場合）','定期的な面談・行政機関への通報'].map((t,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><span>${t}</span></div>`).join('')}
  </div>
</div></section>
<section class="blk" id="fields"><div class="wrap">
  <div class="lbl">Fields</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">主力分野</h2><div class="txt"><p>BIGLIGHTが強い4つの分野です。分野を選ぶと、課題・対象業務・取得要件をご覧いただけます。その他の分野もご相談ください。</p></div></div>
  ${fieldTiles(r,FIELDS)}
</div></section>
${faqSec(FAQ_TG)}
${contactBox(r)}
`});}

function engineer(){ const r='../../'; return page({root:r,title:'技人国 人材紹介｜BIGLIGHT株式会社',desc:'技術・人文知識・国際業務の在留資格を持つ高度人材のご紹介。',body:`
${pageHead('Engineer','技人国 人材紹介',serviceTabs(r,'en'))}
<section><div class="wrap">${slant(r+'img/engineer.jpg','CNC機械を操作するエンジニア')}</div></section>
<section class="blk" style="padding-top:140px"><div class="wrap side" style="margin-top:0">
  <h2 class="en">About</h2>
  <div><p class="lead28" style="margin-top:0">専門知識と国際感覚を持つ、<br>高度人材をご紹介。</p>
  <p class="lead16">「技術・人文知識・国際業務（技人国）」は、大学・専門学校で学んだ知識や語学力を活かして働くための在留資格です。単純作業ではなく、専門性を活かした業務に従事できます。</p></div>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Visa</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">技術・人文知識・<br>国際業務とは</h2><div class="txt"><p>通称「技人国（ぎじんこく）」。大学や専門学校で身につけた専門知識・語学力を活かし、専門職として働くための就労ビザです。外国人の就労ビザの中で最も多く利用されています。</p></div></div>
  <div class="vcat">
    <div><b>技術</b><small>Engineer</small><p>理学・工学など自然科学分野の知識を要する業務</p><span>例：システムエンジニア、機械設計、CAD、生産技術</span></div>
    <div><b>人文知識</b><small>Specialist in Humanities</small><p>法律・経済・社会学など人文科学分野の知識を要する業務</p><span>例：経理、営業企画、マーケティング、総務</span></div>
    <div><b>国際業務</b><small>International Services</small><p>外国の文化に基盤を持つ思考・感受性を要する業務</p><span>例：通訳・翻訳、海外取引、語学指導、デザイン</span></div>
  </div>
  <ul class="sysck">
    <li><b>学歴・経験</b>：業務に関連する分野で大学（短大含む）または日本の専門学校を卒業。学歴がない場合は実務経験10年以上（国際業務は3年以上）</li>
    <li><b>在留期間</b>：5年・3年・1年・3か月のいずれか。更新回数に上限がなく、長く働き続けられます</li>
    <li><b>家族</b>：配偶者・子どもは「家族滞在」ビザで一緒に暮らせます</li>
    <li><b>報酬</b>：日本人が同じ仕事をする場合と同等以上が必要です</li>
    <li><b>注意</b>：工場のライン作業など、専門知識を必要としない単純作業だけの業務には従事できません</li>
  </ul>
  <h3 class="ctitle">特定技能との違い</h3>
  <div class="ctable-wrap"><table class="ctable two-col">
    <thead><tr><th></th><th class="hl">技術・人文知識・国際業務</th><th>特定技能（1号）</th></tr></thead>
    <tbody>
      <tr><th>学歴</th><td class="hl">原則として大学・専門学校卒業</td><td>不要（技能・日本語試験に合格）</td></tr>
      <tr><th>業務内容</th><td class="hl">専門職（ホワイトカラー）</td><td>現場業務が中心</td></tr>
      <tr><th>在留期間</th><td class="hl">更新上限なし</td><td>通算5年（2号は上限なし）</td></tr>
      <tr><th>家族帯同</th><td class="hl">可能</td><td>原則不可</td></tr>
      <tr><th>支援義務</th><td class="hl">なし</td><td>あり（10項目）</td></tr>
      <tr><th>キャリア</th><td class="hl">管理職・幹部候補として育成可能</td><td>現場の中核人材として活躍</td></tr>
    </tbody>
  </table></div>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Jobs</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">主な職種</h2><div class="txt"><p>経験・日本語力・専門性を見極めて、最適な人材をご提案します。</p></div></div>
  <div class="jobs4">
    <div><h3>IT・システム<small>IT</small></h3><p>システムエンジニア／プログラマー／インフラエンジニア／Webエンジニア</p></div>
    <div><h3>製造・技術<small>Engineering</small></h3><p>機械設計／CADオペレーター／生産技術／品質管理／設備保全</p></div>
    <div><h3>事務・営業<small>Business</small></h3><p>貿易事務／海外営業／営業企画／経理・総務</p></div>
    <div><h3>通訳・翻訳<small>Language</small></h3><p>通訳／翻訳／外国人スタッフのコーディネーター</p></div>
  </div>
</div></section>
<section class="blk"><div class="wrap side" style="margin-top:0">
  <h2 class="en">Point</h2>
  <dl class="dl">
    <div><dt>学歴・経験</dt><dd>原則として、業務に関連する大学・専門学校の卒業、または一定の実務経験が必要です。</dd></div>
    <div><dt>業務内容</dt><dd>学んだ専門分野と業務内容の関連性が審査されます。採用前に業務内容を一緒に整理します。</dd></div>
    <div><dt>費用</dt><dd>完全成功報酬。入社後は最長1年の保証付きです。</dd></div>
  </dl>
</div></section>
${faqSec(FAQ_EN)}
${contactBox(r)}
`});}

// ---------- 4 ngành có trang thật trên biglight.jp/service/tokutei-ginou/<slug>/ — nội dung lấy nguyên văn ----------
const SUP10 = ['事前ガイダンス','出入国時の送迎','住居の確保','生活オリエンテーション','公的手続の同行','日本語学習の機会提供','相談・苦情対応','日本人との交流促進','転職支援（非自発的離職時）','定期面談（四半期ごと）'];
const CAREER = (a,b,c) => [['最長3年','育成就労','2027年4月〜',a],['最長5年','特定技能1号','即戦力として活躍',b],['上限なし','特定技能2号','長期就労・家族帯同可能',c]];
const FIELDS = [
 {slug:'kogyo',en:'Manufacturing',ja:'工業製品製造業',photo:'kogyo.jpg',
  lead:'製造現場の即戦力を、<br>特定技能で確保する。',
  desc:'機械金属加工・電気電子機器組立て・金属表面処理をはじめ、幅広い製造現場へ。募集から在留資格手続き、入社後の定着まで、名古屋の登録支援機関BIGLIGHTが一貫支援します。',
  stats:[['56,736','人','工業製品製造業の特定技能'],['173,300','人','5年間の受入れ上限（最多）'],['26.0','%','外国人労働者は製造業が最多']],
  src1:'出典：厚生労働省「外国人雇用状況の届出状況」（令和6年10月末）／出入国在留管理庁「特定技能在留外国人数」（令和7年12月末）・「特定技能の受入れ見込数」（令和6年3月29日閣議決定）',
  issuesH:'製造現場が直面する課題',issuesP:'慢性的な人手不足は、いまや事業の存続にも関わる経営課題です。',
  issues:[['人手不足の慢性化','中小製造業の従業員過不足DIは −18.2（2024年）','コロナ前の不足水準へ逆戻り'],['採用が難しい','正社員が不足する企業は約51%','若年層の減少と現場の高齢化'],['倒産リスクの上昇','人手不足倒産は年441件で過去最多','うち約77%が従業員10人未満'],['技能継承の停滞','熟練技能を引き継ぐ若手が不足','現場ノウハウの断絶リスク']],
  src2:'出典：2025年版ものづくり白書（中小企業景況調査）／帝国データバンク「人手不足に対する企業の動向調査」「人手不足倒産の動向調査」',
  whyP:'工業製品製造業は、特定技能制度の中核を担う分野です。',
  why:[['即戦力で入社','技能試験＋日本語試験に合格済み','入社後すぐ現場で活躍'],['長期就労が可能','1号は通算5年まで就労','2号は更新上限なし・家族帯同可'],['実習生から移行','特定技能の約6割が技能実習ルート','同分野の移行は試験免除'],['制度が後押し','育成就労が2027年4月施行','特定技能へつながる流れが明確に']],
  workH:'対象となる業務と要件',workP:'2024年の制度改正により、旧「素形材産業」「産業機械製造業」「電気・電子情報関連産業」の3分野が統合され、「工業製品製造業分野」となりました。',
  work:[{h:'主な業務区分（全17区分）',items:['機械金属加工','電気電子機器組立て','金属表面処理','紙器・段ボール箱製造','コンクリート製品製造','陶磁器製品製造','印刷・製本','紡織製品製造','縫製','家具製造','ゴム製品製造','かばん製造 ほか']}],
  req:[['特定技能1号','製造分野特定技能1号評価試験に合格し、日本語はJFT-Basic（A2相当）またはJLPT N4以上が必要です。技能実習2号を良好に修了した方は、これらの試験が免除されます。'],['特定技能2号','機械金属加工・電気電子機器組立て・金属表面処理の3区分は特定技能2号の対象。更新上限なし・家族帯同可で、熟練人材の長期定着を実現します。']],
  career:CAREER('現場で技能・日本語を習得','一定の技能と日本語能力を有する人材','在留期間の更新回数に制限なし・配偶者や子どもの帯同が可能'),
  flow:[['お問い合わせ','まずはお気軽にご相談ください。採用のお悩みを伺います。'],['ヒアリング','必要な人材像・業務区分・条件を丁寧にヒアリングします。'],['候補者のご紹介','経験・日本語力・専門性を考慮した最適な人材をご提案します。'],['面接','企業様と候補者の面接を実施。通訳・日程調整もサポートします。'],['内定','双方合意のうえ内定。雇用条件・入社時期を確定します。'],['在留資格手続き','在留資格の申請・変更手続きを専門スタッフが代行します。'],['入社・定着支援','入社後も定期訪問・面談でフォローし、長期定着を支えます。']],
  faq:[['最短でどのくらいで入社できますか？','候補者の状況により異なりますが、選考から在留資格手続きを経て入社まで、目安として数か月程度です。'],['技能実習生からの切替はできますか？','可能です。同分野であれば技能試験・日本語試験が免除され、特定技能へスムーズに移行できます。'],['費用はどのくらいかかりますか？','人材紹介・支援委託の費用は、受入れ人数やご要望により異なります。お見積り・ご相談は無料です。'],['対応エリアはどこまでですか？','名古屋を拠点に、全国の製造現場に対応しています。']]},
 {slug:'kensetsu',en:'Construction',ja:'建設業',photo:'../svc-kensetsu.jpg',
  lead:'建設現場の担い手不足を、<br>特定技能で確実に埋める。',
  desc:'土木・建築・ライフライン設備。試験に合格した即戦力人材を、JAC加入・受入計画認定・入管手続き・定着支援までワンストップで。名古屋の登録支援機関BIGLIGHTが、採用のリスクと手間をまとめて引き受けます。',
  stats:[['約3.8','万人','建設分野で働く特定技能外国人（16分野中4位）'],['8.0','万人','建設分野の5年間受入れ見込数（2024〜2028年度）'],['69.6','%','建設業就業者はピーク（1997年）比約7割まで減少']],
  src1:'出典：国土交通省「建設業就業者数」／出入国在留管理庁「特定技能在留外国人数」（令和7年12月末）・「特定技能の受入れ見込数」（令和6年3月29日閣議決定）',
  issuesH:'建設現場が直面する4つの課題',issuesP:'人手不足は「一時的」ではなく「構造的」です。担い手の減少と高齢化が同時に進み、2024年問題が拍車をかけています。',
  issues:[['就業者数の長期減少','2024年は477万人（ピーク比69.6%）','1997年ピーク685万人から減少が継続'],['深刻な高齢化','55歳以上が約37%、29歳以下は約12%','ベテランの大量離職期が迫る'],['2024年問題','時間外労働の上限規制が建設業にも適用','一人あたり労働時間が減り必要人員増'],['技能承継の断絶','30〜49歳の中核層が238万→177万人へ','ノウハウを継ぐ次世代が不足']],
  src2:'出典：国土交通省「建設業就業者数の推移」／総務省「労働力調査」',
  whyP:'技能実習と違い、特定技能は「即戦力採用」の制度です。建設分野は特定技能2号まで用意され、長く働いてもらえます。',
  why:[['入社初日から即戦力','技能試験・日本語試験に合格済み','基礎技能と現場コミュニケーションを保有'],['長期雇用・2号で無期限','1号で最長5年','建設は2号あり、上限なし・家族帯同可'],['技能実習からの移行','建設職種の技能実習2号を良好修了で','技能・日本語試験が免除に'],['育成就労で入口も拡大','2027年4月に育成就労が開始','未経験を育て特定技能へつなぐ']],
  workH:'建設分野の対象業務（3区分）',workP:'2022年の再編で、建設分野は「土木」「建築」「ライフライン・設備」の3つの業務区分に統合されました。区分内であれば幅広い作業に従事できます。',
  work:[{h:'土木',p:'道路・トンネル・河川・造成など、インフラの基礎をつくる区分。',items:['とび','土工','コンクリート圧送','鉄筋施工','型枠施工','建設機械施工','トンネル推進工']},{h:'建築',p:'住宅・ビル・工場など、建物の躯体から仕上げまでを担う区分。',items:['建築大工','左官','内装仕上げ','屋根ふき','塗装','鉄筋施工','とび','建築板金']},{h:'ライフライン・設備',p:'電気・通信・配管など、暮らしと建物を支える設備の区分。',items:['配管','電気工事','電気通信','保温保冷','消防設備工事']}],
  req:[['特定技能1号','「建設分野特定技能1号評価試験」または該当職種の技能検定3級 ＋ 日本語試験（JFT-Basic A2 または JLPT N4以上）に合格。建設職種の技能実習2号を良好に修了した方は、両試験が免除されます。在留期間は通算最長5年。'],['特定技能2号','「建設分野特定技能2号評価試験」または技能検定1級 ＋ 班長・職長として複数作業員を指導した実務経験が要件。在留期間の上限なし、要件を満たせば家族帯同も可能です。']],
  rulesH:'建設分野だけの「特別ルール」',rulesP:'建設分野は他分野より要件が厳格です。ここを外すと採用できません。BIGLIGHTがすべて代行・伴走します。',
  rules:[['① 受入計画の認定','必須','入管への在留資格申請の「前に」、国土交通大臣の受入計画認定が必要です。審査は標準で約2ヶ月（地域により3〜4ヶ月）。逆算したスケジュール設計が欠かせません。'],['② JAC（建設技能人材機構）への加入','必須','正会員団体経由、または賛助会員として直接加入（賛助会員の年会費24万円）。加えて受入負担金が月額・1人あたりで発生します（例：海外試験合格者25,000円、国内試験合格者13,500円、技能実習2号修了者12,500円）。'],['③ 月給制・日本人と同等以上の報酬','必須','日給・時給制は不可、必ず月給制です。同等技能の日本人と同等以上の報酬とし、技能習熟に応じた昇給を雇用契約書に明記する必要があります。'],['④ CCUS（建設キャリアアップシステム）登録','必須','受入企業・技能者ともにCCUSへの登録が必要です。就業履歴と保有資格を蓄積し、キャリアと処遇を「見える化」します。'],['⑤ 受入人数の上限','','特定技能外国人と外国人建設就労者の合計が、受入企業の常勤職員数を超えてはなりません（技能実習生はこの人数に含みません）。'],['⑥ 建設特定技能受入計画の遵守','','安全衛生教育、報酬・待遇、キャリア形成など、認定を受けた計画どおりの受入れ・雇用管理が求められ、巡回指導の対象となります。']],
  career:CAREER('現場で技能・日本語を習得。特定技能1号への移行を前提に育成','試験合格済みの即戦力。区分内の実作業を一人で担う中核戦力','班長・職長として現場を指揮。在留期間の更新に上限なし・家族帯同も可能'),
  flow:[['お問い合わせ','採用したい職種・人数・時期をヒアリングします。'],['ニーズ整理・ご提案','現場要件と予算を整理し、最適な採用プランをご提案します。'],['候補者のご紹介・面接','要件に合う候補者を紹介し、オンライン等で面接を実施します。'],['内定・雇用契約','月給制・昇給明記など、建設分野の基準に沿った契約を締結します。'],['JAC加入・CCUS登録','建設技能人材機構への加入、キャリアアップシステム登録を代行します。'],['受入計画の認定申請','国土交通省へ受入計画を申請。認定取得まで伴走します（標準約2ヶ月）。'],['在留資格の申請','認定後、入管へ在留資格を申請。書類作成を一括で代行します。'],['受入れ・定着支援','入国・配属後も、10項目支援と定期面談で長期定着をサポートします。']],
  faq:[['採用決定から就労開始まで、最短でどのくらい？','建設分野は「受入計画認定（標準約2ヶ月）」が必要なため、選考から就労開始まで概ね4〜6ヶ月を見込みます。技能実習からの移行で短縮できる場合もあります。逆算スケジュールはBIGLIGHTが設計します。'],['JACには必ず加入が必要ですか？費用は？','建設分野では加入が必須です。賛助会員として直接加入する場合の年会費は24万円。加えて受入負担金が月額・1人あたりで発生します（海外試験合格者25,000円、国内試験合格者13,500円、技能実習2号修了者12,500円など）。手続きはBIGLIGHTが代行します。'],['技能実習生を特定技能に切り替えられますか？','はい。建設職種の技能実習2号を良好に修了していれば、技能試験・日本語試験が免除され、スムーズに特定技能へ移行できます。雇用中の実習生の継続雇用にも有効です。'],['給与は日給でもよいですか？','建設分野は月給制が必須で、日給・時給制は認められません。同等技能の日本人と同等以上の報酬とし、技能習熟に応じた昇給を雇用契約に明記する必要があります。'],['何人まで受け入れられますか？','特定技能外国人と外国人建設就労者の合計が、御社の常勤職員数を超えない範囲となります（技能実習生は含みません）。人数計画のご相談も承ります。'],['対応エリアは？費用の目安は？','名古屋を拠点に全国の建設現場に対応します。費用は職種・人数・支援範囲により異なり、無料でお見積りします。まずは無料相談をご利用ください。']]},
 {slug:'inshoku',en:'Food Manufacturing',ja:'飲食料品製造業',photo:'../svc-seizo.jpg',
  lead:'食品工場の人手不足を、<br>特定技能で安定させる。',
  desc:'全16分野で受入れ「最多」、そして最も需要が旺盛な分野。コンビニ弁当・惣菜・パン・飲料まで、24時間稼働する現場の即戦力を、採用から入管手続き・生活支援・定着まで、名古屋の登録支援機関BIGLIGHTがワンストップでお届けします。',
  stats:[['約6.8','万人','飲食料品製造業で働く特定技能外国人（全16分野で第1位）'],['13.9','万人','5年間の受入れ見込数（2024〜2028年度）＝全分野で最大枠'],['2.19','倍','飲食料品製造業の有効求人倍率（全産業平均1.16倍の約2倍）']],
  src1:'出典：出入国在留管理庁「特定技能在留外国人数」（令和7年12月末）・「特定技能の受入れ見込数」（令和6年3月29日閣議決定）／厚生労働省「一般職業紹介状況」',
  issuesH:'食品製造現場が直面する4つの課題',issuesP:'需要は最大、でも人が採れない。食品工場の人手不足は、他業種より一段深刻です。',
  issues:[['慢性的な採用難','有効求人倍率 2.19倍（全産業平均1.16倍）','募集しても応募が集まらない'],['夜勤・交替制の担い手不足','弁当・惣菜工場は24時間フル稼働','交替制を安定して回す人員が不足'],['若手の減少と高齢化','製造業の34歳以下は20年で約121万人減','65歳以上は33万人増、構造が限界に'],['需要に供給が追いつかない','受入れ見込13.9万人に対し充足率は約49%','制度枠の半分しか埋まっていない']],
  src2:'出典：厚生労働省「一般職業紹介状況」／出入国在留管理庁「特定技能在留外国人数」／総務省「労働力調査」',
  whyP:'技能実習と違い、特定技能は「即戦力採用」の制度。飲食料品製造業は2号まで用意され、長く戦力になってもらえます。',
  why:[['入社初日から即戦力','技能測定試験・日本語試験に合格済み','衛生管理や現場作業の基礎を保有'],['長期雇用・2号で無期限','1号で最長5年','2023年に2号対象化、上限なし・家族帯同可'],['技能実習からの移行','食品加工の技能実習2号を良好修了で','技能・日本語試験が免除に'],['育成就労で入口も拡大','2027年4月に育成就労が開始','未経験を育て特定技能へつなぐ']],
  workH:'飲食料品製造業の対象業務',workP:'「飲食料品（酒類を除く）の製造・加工・安全衛生」に関わる一連の現場業務が対象です。区分は分かれておらず、幅広い工程に従事できます。',
  work:[{h:'従事できる主な作業',p:'原材料の受入れから出荷・品質管理まで、食品づくりの現場工程を一通り担えます。',items:['受入検査','前処理・洗浄','計量・切断・混合','加熱・冷却・調理加工','充填・シール・ラベル貼付','検品・抜取検査','金属検出・異物混入防止','包装・仕分け・出荷','品質・衛生管理（HACCP）','機械・器具の洗浄清掃']},{h:'対象となる主な業種',items:['食料品製造業（惣菜・弁当・水産／畜産加工など）','パン・菓子製造業','清涼飲料・茶・氷製造業','スーパー等のバックヤードでの惣菜製造（製造が主）']},{h:'対象外の業務',items:['店舗での接客・調理・配膳（＝外食業分野）','酒類の製造','営業・経理などの管理業務のみ'],off:true}],
  req:[['特定技能1号','「飲食料品製造業特定技能1号技能測定試験」（学科＋実技／約80分）＋ 日本語試験（JFT-Basic A2 または JLPT N4以上）に合格。飲食料品製造分野の技能実習2号を良好に修了した方は、両試験が免除されます。在留期間は通算最長5年。'],['特定技能2号（2023年〜対象）','「飲食料品製造業特定技能2号技能測定試験」＋ 複数の作業員を指導しつつ工程を管理した実務経験が要件。在留期間の上限なし、要件を満たせば家族帯同も可能です。長期定着・幹部候補の受け皿になります。']],
  career:CAREER('現場で技能・日本語を習得。特定技能1号への移行を前提に育成','試験合格済みの即戦力。製造ラインの各工程を一人で担う','工程管理・後輩指導を担う現場リーダー。在留期間の更新に上限なし・家族帯同も可能'),
  flow:[['お問い合わせ','採用したい工程・人数・時期をヒアリングします。'],['ニーズ整理・ご提案','現場要件と予算を整理し、最適な採用プランをご提案します。'],['候補者のご紹介・面接','要件に合う候補者を紹介し、オンライン等で面接を実施します。'],['内定・雇用契約','日本人と同等以上の待遇を満たす雇用条件で契約を締結します。'],['在留資格の申請','入管へ在留資格を申請。必要書類の作成を一括で代行します。'],['入国・受入れ準備','住居・生活インフラの手配、事前ガイダンスを実施します。'],['受入れ・定着支援','配属後も10項目支援と定期面談で長期定着をサポートします。']],
  faq:[['採用決定から就労開始まで、最短でどのくらい？','候補者の状況によりますが、選考から在留資格手続きを経て、概ね数ヶ月で就労開始が目安です。すでに国内在住・技能実習からの移行の場合は、さらに短縮できるケースもあります。逆算スケジュールはBIGLIGHTが設計します。'],['スーパーのバックヤードや惣菜製造も対象になりますか？','製造・加工が主たる業務であれば対象になり得ます。一方で、店舗での接客・調理・配膳（＝外食業分野）は対象外です。御社の業態が対象になるか、無料で判定いたします。'],['技能実習生を特定技能に切り替えられますか？','はい。飲食料品製造・食品加工の技能実習2号を良好に修了していれば、技能試験・日本語試験が免除され、スムーズに特定技能へ移行できます。現に雇用中の実習生の継続雇用にも有効です。'],['5年で必ず帰国してしまいますか？','いいえ。飲食料品製造業は2023年に特定技能2号の対象となりました。2号の試験・実務要件を満たせば在留期間の上限がなくなり、家族帯同も可能です。長く働いてもらえる制度設計です。'],['夜勤や交替制でも働いてもらえますか？','日本人と同様のルール（労働時間・割増賃金・安全衛生）を守れば、夜勤・交替制も可能です。待遇は日本人と同等以上とする必要があります。シフト設計のご相談も承ります。'],['対応エリアは？費用の目安は？','名古屋を拠点に全国の食品工場に対応します。費用は工程・人数・支援範囲により異なり、無料でお見積りします。まずは無料相談をご利用ください。']]},
 {slug:'gaishoku',en:'Food Service',ja:'外食業',photo:'../svc-gaishoku.jpg',
  lead:'外食業は「上限到達」。<br>それでも採れる道を、設計する。',
  desc:'2026年4月13日、外食業の特定技能1号は上限到達により新規受入が原則停止。海外からの呼び寄せや他分野からの切替はほぼ不可に。しかし「転職組の受入れ」「技能実習からの移行」「特定技能2号への移行」の3つは今も有効です。名古屋の登録支援機関BIGLIGHTが、御社が採れる最短ルートを設計します。',
  stats:[['5.0','万人','外食業の受入れ上限（2026年1月に下方修正）'],['約88','%','充足率（在留者 約4.4万人／2025年12月末）'],['4/13','〜停止','2026年4月13日受理分から新規受入が原則停止']],
  src1:'出典：出入国在留管理庁「特定技能在留外国人数」（令和7年12月末）・特定技能制度の運用に関する公表資料／制度は変動するため最新の運用は同庁公表資料をご確認ください。',
  notice:{h:'2026年4月13日〜 外食業 特定技能1号の新規受入が原則停止',p:'上限（5万人）到達が見込まれたため、<b>海外からの呼び寄せ（在留資格認定証明書交付申請）</b>と<b>他分野・留学などからの変更</b>は原則不許可となりました。一方で、<b>①外食業内での転職受入れ ②技能実習（給食製造）からの移行 ③在留期間の更新 ④特定技能2号（上限なし）</b>は引き続き可能です。制度は変動するため、最新の運用は出入国在留管理庁の公表資料でご確認ください。BIGLIGHTが個別に可否を判定します。'},
  issuesH:'外食業が直面する課題',issuesP:'人手不足は依然深刻。だからこそ「今いる人材をどう確保・定着させるか」が勝負になります。',
  issues:[['制度枠がほぼ満杯','上限5万人に対し在留者は約4.4万人（充足率88%）','新規の海外採用ルートが事実上閉鎖'],['採っても定着しない','シフト・深夜勤務・繁忙で離職が起きやすい','「辞めさせない仕組み」の重要度が上昇'],['需要は増、人は不足','訪日客の回復で店舗需要は拡大','多言語対応できる人材ニーズも上昇'],['育成就労で入口再拡大','2027年開始の育成就労が新ルートに','未経験を育て特定技能へつなぐ見込み']],
  src2:'出典：出入国在留管理庁「特定技能在留外国人数」（令和7年12月末）ほか公表資料',
  routesH:'新規停止後も、外食業で採れる3つのルート',routesP:'「もう採れない」ではありません。ルールを正しく使えば、まだ採用できます。BIGLIGHTが御社の状況で使える道を見極めます。',
  routes:[['① 転職組の受入れ','在留資格変更（外食業内）','受入れ可','他社で働く外食業の特定技能1号人材を、転職としてスカウト・受入れ。上限の影響を受けず通常審査で進められます。即戦力を最短で確保できる本命ルートです。'],['② 技能実習からの移行','給食製造など','条件付で可','「医療・福祉施設給食製造作業」等の技能実習修了者を、特定技能1号（外食業）へ移行。要件確認は必要ですが、国内人材を活かせる有効な道です。'],['③ 特定技能2号への移行','2023年〜対象・上限なし','受入れ可','2号は上限がなく申請可能。今いる1号人材を2号へ引き上げれば、在留期間の上限なし・家族帯同可で、長期戦力として囲い込めます。']],
  whyH:'いま外食業がやるべきこと',whyP:'入口が狭まった今こそ、「確保・引き上げ・定着」に軸足を移すべきタイミングです。',
  why:[['今いる1号を2号へ','2号は上限なし','管理経験を積んだ人材を長期確保'],['転職市場から即戦力','外食業内の転職受入れは通常審査','試験合格済みの人材を最短で採用'],['定着率を上げて流出を防ぐ','離職1人の重みが増している','生活支援・定期面談で辞めさせない'],['2027年の育成就労に備える','次の入口となる育成就労を見据える','受入れ・支援体制を今から整備']],
  workH:'外食業の対象業務',workP:'「飲食物調理」「接客」「店舗管理」に関わる一連の業務が対象。ホールも厨房も、店舗運営全般を任せられます。',
  work:[{h:'従事できる主な業務',p:'調理から接客、店舗マネジメントまで、飲食店の現場業務を幅広くカバーします。',items:['仕込み・下ごしらえ','調理・盛り付け','デザート・製菓','来店客の案内・オーダー','配膳・下げ膳','レジ・会計','予約管理','食材の発注・在庫管理','厨房清掃・器具の衛生管理','店舗運営・シフト補助']},{h:'対象となる主な業態',items:['レストラン・食堂・ラーメン店','居酒屋・カフェ・ファストフード','持ち帰り・宅配・給食提供施設 など']},{h:'注意点',items:['デリバリー・清掃「のみ」の従事は不可','風俗営業等に該当する店舗は対象外','受入れ後4ヶ月以内に協議会加入が必須'],off:true}],
  req:[['特定技能1号','「外食業特定技能1号技能測定試験」＋ 日本語試験（JFT-Basic A2 または JLPT N4以上）に合格。在留期間は通算最長5年。※2026年4月13日以降、海外からの新規呼び寄せ・他分野からの変更は原則停止中（転職・移行ルートは可）。'],['特定技能2号（2023年〜対象・上限なし）','「外食業特定技能2号技能測定試験」＋ 複数の従業員を指導・監督する店舗管理の実務経験（おおむね2年以上）が要件。在留期間の上限なし、家族帯同も可能です。']],
  career:CAREER('現場で調理・接客・日本語を習得。特定技能への移行を前提に育成','試験合格済みの即戦力。調理・接客・店舗運営を一人で担う','店長候補。店舗管理・スタッフ指導を担い、上限規制の外で長期確保できる。家族帯同も可能'),
  flow:[['お問い合わせ・ルート判定','採用したい人数・時期を伺い、転職／移行／2号のどれで採れるかを判定します。'],['ニーズ整理・ご提案','現場要件と予算を整理し、最適な採用・確保プランをご提案します。'],['候補者のご紹介・面接','転職希望者や移行対象者を紹介し、オンライン等で面接を実施します。'],['内定・雇用契約','日本人と同等以上の待遇を満たす雇用条件で契約を締結します。'],['在留資格の申請・協議会加入','在留資格の変更等を申請し、受入れ後4ヶ月以内の協議会加入まで代行します。'],['受入れ準備','住居・生活インフラの手配、事前ガイダンスを実施します。'],['受入れ・定着支援','配属後も10項目支援と定期面談で長期定着・2号化をサポートします。']],
  faq:[['外食業はもう特定技能で採用できないのですか？','「海外からの新規呼び寄せ」と「他分野・留学からの切替」は2026年4月13日以降、原則停止です。ただし①外食業内での転職受入れ、②技能実習（給食製造など）からの移行、③特定技能2号への移行は引き続き可能です。御社の状況で使えるルートを無料で判定します。'],['今いる特定技能1号の在留期間の更新はできますか？','はい。更新申請は上限規制の対象外で、通常どおり審査されます。既存人材の継続雇用に影響はありません。'],['2号にすると何が変わりますか？','特定技能2号は在留期間の上限がなく（更新を続ければ実質的に長期就労が可能）、家族帯同も認められます。上限規制の影響も受けません。店舗管理の実務経験と2号試験が要件です。'],['協議会への加入は必要ですか？','必要です。外食業では受入れ開始後4ヶ月以内の「食品産業特定技能協議会」加入が義務で、未加入だと在留更新が不許可になるリスクがあります。加入手続きはBIGLIGHTが代行します。'],['対応エリアは？費用の目安は？','名古屋を拠点に全国の飲食店・給食施設に対応します。支援委託費は月2〜3万円程度が目安で、人数・支援範囲により異なります。まずは無料相談・無料見積りをご利用ください。']]},
];
const n2 = k => String(k+1).padStart(2,'0');
const card4 = list => `<div class="flow f4">${list.map(([h,a,b],k)=>`<div><b>${n2(k)}</b><h3>${h}</h3><p>${a}<br>${b}</p></div>`).join('')}</div>`;
const blkHead = (lbl,h,p) => `<div class="lbl">${lbl}</div><div class="two" style="margin-top:24px"><h2 style="font-size:36px">${h}</h2><div class="txt"><p>${p}</p></div></div>`;
function fieldPage(f,i){ const r='../../../'; const prev=FIELDS[(i+FIELDS.length-1)%FIELDS.length], next=FIELDS[(i+1)%FIELDS.length];
  return page({root:r,title:`${f.ja}の特定技能採用｜BIGLIGHT株式会社`,desc:`${f.ja}で特定技能外国人を採用するための課題・対象業務・要件・支援内容。`,body:`
<section class="ph"><div class="wrap">
  <div class="crumb"><a href="${r}service/index.html">SERVICE</a><span>/</span><a href="${r}service/tokutei-ginou/index.html">SPECIFIED SKILLED WORKER</a><span>/</span>${f.en.toUpperCase()}</div>
  <h1 class="phh"><span class="en">${f.en}</span><span class="ja-lb">${f.ja}の特定技能採用</span></h1>${dots}
</div></section>
<section><div class="wrap" style="margin-top:60px">${slant(fieldImg(r,f),f.ja)}</div></section>
<section class="blk" style="padding-top:140px"><div class="wrap side" style="margin-top:0">
  <h2 class="en">Overview</h2>
  <div><p class="lead28" style="margin-top:0">${f.lead}</p><p class="lead16">${f.desc}</p>
    <div class="fstats">${f.stats.map(([n,u,l])=>`<div><b>${n}<i>${u}</i></b><span>${l}</span></div>`).join('')}</div>
    <p class="src">${f.src1}</p></div>
</div></section>
${f.notice?`<section class="blk" style="padding-top:80px"><div class="wrap"><div class="fnotice"><b>重要なお知らせ</b><h3>${f.notice.h}</h3><p>${f.notice.p}</p></div></div></section>`:''}
<section class="blk"><div class="wrap">${blkHead('Issues',f.issuesH,f.issuesP)}${card4(f.issues)}<p class="src">${f.src2}</p></div></section>
${f.routes?`<section class="blk"><div class="wrap">${blkHead('3 Routes',f.routesH,f.routesP)}
  <div class="froutes">${f.routes.map(([h,s,tag,p])=>`<div><span class="tg">${tag}</span><h3>${h}</h3><small>${s}</small><p>${p}</p></div>`).join('')}</div></div></section>`:''}
<section class="blk"><div class="wrap">${blkHead(f.whyH?'Why Now':'Why SSW',f.whyH||'なぜ今「特定技能」なのか',f.whyP)}${card4(f.why)}</div></section>
<section class="blk"><div class="wrap">${blkHead('Target Work',f.workH,f.workP)}
  <div class="fwork">${f.work.map(g=>`<div class="${g.off?'off':''}"><h3>${g.h}</h3>${g.p?`<p>${g.p}</p>`:''}<div class="chips">${g.items.map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')}</div>
</div></section>
<section class="blk"><div class="wrap side" style="margin-top:0">
  <h2 class="en long">Requirements<small class="ja-sub">取得要件</small></h2>
  <dl class="dl">${f.req.map(([t,d])=>`<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
</div></section>
${f.rules?`<section class="blk"><div class="wrap">${blkHead('Construction Rules',f.rulesH,f.rulesP)}
  <div class="frules">${f.rules.map(([h,tag,p])=>`<div><h3>${h}${tag?`<span class="tg">${tag}</span>`:''}</h3><p>${p}</p></div>`).join('')}</div></div></section>`:''}
<section class="blk"><div class="wrap">${blkHead('Career Path','育成就労 → 特定技能1号 → 2号','段階的にスキルを高めながら、長期的に活躍できる仕組みです。')}
  <div class="fcareer">${f.career.map(([term,h,s,p])=>`<div><small>${term}</small><h3>${h}</h3><b>${s}</b><p>${p}</p></div>`).join('<i>→</i>')}</div>
</div></section>
<section class="blk"><div class="wrap">${blkHead('Our Support','BIGLIGHTの支援内容','法定の義務的支援10項目を含め、採用から定着までワンストップで代行します。')}
  <div class="sup10">${SUP10.map((t,k)=>`<div><b>${n2(k)}</b><span>${t}</span></div>`).join('')}</div>
</div></section>
<section class="blk"><div class="wrap">${blkHead('Flow',`ご利用の流れ（${f.flow.length}ステップ）`,'お問い合わせから就労開始まで、面倒な手続きはすべてBIGLIGHTが代行します。')}
  <div class="flow f4">${f.flow.map(([h,p],k)=>`<div><b>STEP ${n2(k)}</b><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
</div></section>
${faqSec(f.faq)}
<section class="blk"><div class="wrap">
  <div class="fnav"><a href="${r}service/field/${prev.slug}/index.html"><span class="ar">←</span><div><small>PREV</small>${prev.ja}</div></a><a href="${r}service/index.html#fields" class="all">対応分野一覧</a><a href="${r}service/field/${next.slug}/index.html" class="nx"><div><small>NEXT</small>${next.ja}</div><span class="ar">→</span></a></div>
</div></section>
${contactBox(r)}
`});}

// ---------- v17: Strength / 数字 / 導入事例 / Download (nội dung từ biglight.jp hiện tại) ----------
const STATS = [['2021','','設立'],['500','+','人材紹介実績（名）'],['80','+','取引企業（社）'],['90','%','定着率']];
const statsRow = () => `<div class="kstats">${STATS.map(([n,u,l])=>`<div><b>${n}<i>${u}</i></b><span>${l}</span></div>`).join('')}</div>`;
const REASONS = [
  ['高精度マッチング','最適な人材に、最短で出会える。経験豊富なチームが、企業のニーズと人材を丁寧にマッチングします。',['経験豊富な専任チーム','自社プラットフォームの母集団','スキル・人柄まで見極め']],
  ['完全成功報酬 × 1年保証','採用が決まるまで費用は一切ゼロ。さらに最長1年の保証付きで、業界トップクラスの安心をお約束します。',['初期費用・着手金なし','採用成功時のみのお支払い','最長1年の安心保証']],
  ['ワンストップ・低コスト','募集から手続き、定着支援まで全工程をワンストップで完結。中間業者を介さないから、圧倒的な低コストを実現します。',['採用〜定着まで一気通貫','中間マージンゼロ','東海エリア密着 × ベトナム直結']],
];
const CASES = [
  {slug:'welding',ind:'製造業（溶接・鉄骨加工）',area:'愛知県',size:'従業員 約50名',photo:'field/kogyo.jpg',
   h:'溶接工程の人手不足を解消し、安定した受注対応へ',
   before:'若手日本人の採用が難しく、慢性的な人手不足が続いていました。特に溶接工程では経験者の確保が困難で、受注増加に対して生産体制が追いつかない状況でした。',
   plan:'ベトナム人特定技能人材3名をご紹介。面接から入社手続き、生活支援までワンストップでサポートしました。',
   kpi:[['3','名','特定技能を採用']],
   after:['溶接工程の人員不足を解消','現場の生産性が向上','安定した受注対応が可能に'],
   voice:'仕事に対する姿勢が真面目で、現場にもすぐ馴染んでくれました。今後も継続的に採用を検討したいと考えています。'},
  {slug:'interior',ind:'内装仕上げ工事業',area:'東京都',size:'従業員 3名→6名',photo:'svc-kensetsu.jpg',
   h:'従業員3名から6名へ、売上は約2倍に成長',
   before:'社長を含め日本人従業員3名で事業を運営していました。お客様からの依頼は増えていたものの、人手不足により受注を断らざるを得ない案件も多く、事業拡大に課題を抱えていました。また、外国人材を採用した経験がなく、「コミュニケーションは大丈夫か」「現場で定着するのか」といった不安もありました。',
   plan:'建設分野の特定技能人材をご紹介。面接から在留資格手続き、入社後の生活支援まで一貫してサポートし、安心して受け入れができる体制を整えました。',
   kpi:[['3→6','名','従業員数'],['約2','倍','売上成長'],['3','名','特定技能が活躍中']],
   after:['対応可能な現場数が増加','受注機会の損失を大幅に削減','工事スケジュールが安定','外国人材が事業拡大を支える重要な戦力に'],
   voice:'最初は外国人採用に不安がありましたが、実際に受け入れてみると非常に真面目で仕事への意欲も高く、現場にもすぐ馴染んでくれました。今では会社の成長に欠かせない存在です。人手不足で悩んでいる企業には、特定技能制度をぜひ検討してほしいと思います。'},
];
const caseCard = (r,c) => `<a class="ccard" href="${r}case/index.html#${c.slug}"><div class="im"><img src="${r}img/${c.photo}" alt=""></div>
  <div class="tags"><span>${c.ind}</span><span>${c.area}</span></div><h3>${c.h}</h3>
  <div class="kp">${c.kpi.slice(0,2).map(([n,u,l])=>`<div><b>${n}<i>${u}</i></b><small>${l}</small></div>`).join('')}</div>${circ()}</a>`;
// trang chủ: dải số + khối 導入事例
const homeStats = (r) => `
<section class="sec kband bgw bgw-l"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">Strength</h2><div class="ja-lb">数字で見るBIGLIGHT</div></div></div>
  ${statsRow()}
  <div class="more-r"><a href="${r}about/strength/index.html">選ばれる理由を見る <span class="ar">→</span></a></div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head"><div><h2 class="en">Case</h2><div class="ja-lb">導入事例</div></div></div>
  <div class="rows crows">${CASES.map((c,i)=>`<a class="crow" href="${r}case/index.html#${c.slug}">
    <div class="cno">CASE ${String(i+1).padStart(2,'0')}<small>${c.ind}・${c.area}</small></div>
    <div class="ct">${c.h}</div>
    <div class="ck">${c.kpi.slice(0,2).map(([n,u,l])=>`<span><b>${n}<i>${u}</i></b><small>${l}</small></span>`).join('')}</div>
    ${circ()}</a>`).join('')}</div>
  <div class="more-r"><a href="${r}case/index.html">導入事例を見る <span class="ar">→</span></a></div>
</div></section>`;
function strength(){ const r='../../'; return page({root:r,title:'選ばれる理由｜BIGLIGHT株式会社',desc:'BIGLIGHTが選ばれる3つの理由と数字で見る実績',body:`
${pageHead('We are','私たちについて',aboutTabs(r,'strength'))}
<section class="blk"><div class="wrap">
  <div class="lbl">Strength</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">BIGLIGHTが選ばれる、<br>3つの理由。</h2><div class="txt"><p>数多くの企業様に選ばれてきた、3つの理由があります。</p></div></div>
  <div class="reasons">${REASONS.map(([h,p,li],i)=>`<div class="rs"><div class="rh"><span class="no">0${i+1}</span><h3>${h}</h3></div><div class="rb"><p>${p}</p><div class="pts">${li.map(x=>`<span>${x}</span>`).join('')}</div></div></div>`).join('')}</div>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Performance</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">数字で見るBIGLIGHT</h2><div class="txt"><p>名古屋・東海エリアを中心に、全国の企業様をご支援しています。</p></div></div>
  ${statsRow()}
</div></section>
<section class="blk"><div class="wrap side" style="margin-top:0">
  <h2 class="en">License</h2>
  <dl class="dl">
    <div><dt>有料職業紹介事業</dt><dd>許可番号 23-ユ-302414</dd></div>
    <div><dt>登録支援機関</dt><dd>登録番号 21登-006596</dd></div>
    <div><dt>海外拠点</dt><dd>ベトナム・ホーチミン市に自社子会社（BIGLIGHT HR JOINT STOCK COMPANY）</dd></div>
  </dl>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Case</div>
  <div class="two" style="margin-top:24px"><h2 style="font-size:40px">導入事例</h2><div class="txt"><p>実際にご支援した企業様の声をご紹介します。</p></div></div>
  <div class="ccards">${CASES.map(c=>caseCard(r,c)).join('')}</div>
</div></section>
${contactBox(r)}
`});}
function cases(){ const r='../'; return page({root:r,title:'導入事例｜BIGLIGHT株式会社',desc:'採用から定着まで、BIGLIGHTがご支援した企業様の事例',body:`
${pageHead('Case','導入事例',serviceTabs(r,'case'))}
<section><div class="wrap lead-end"><p class="lead28">採用から定着まで、<br>BIGLIGHTがご支援した企業様の事例。</p></div></section>
${CASES.map((c,i)=>`<section class="blk case" id="${c.slug}"><div class="wrap">
  <div class="lbl">Case ${String(i+1).padStart(2,'0')}</div>
  <div class="chead"><div><div class="tags"><span>${c.ind}</span><span>${c.area}</span><span>${c.size}</span></div><h2>${c.h}</h2></div><div class="im"><img src="${r}img/${c.photo}" alt=""></div></div>
  <div class="ckpi">${c.kpi.map(([n,u,l])=>`<div><b>${n}<i>${u}</i></b><span>${l}</span></div>`).join('')}</div>
  <dl class="dl cdl">
    <div><dt>導入前の課題</dt><dd>${c.before}</dd></div>
    <div><dt>BIGLIGHTの提案</dt><dd>${c.plan}</dd></div>
    <div><dt>導入後の成果</dt><dd><ul>${c.after.map(x=>`<li>${x}</li>`).join('')}</ul></dd></div>
  </dl>
  <blockquote class="cvoice"><p>「${c.voice}」</p><cite>― ご担当者様</cite></blockquote>
</div></section>`).join('')}
${contactBox(r)}
`});}
function download(){ const r='../'; const IN=['外国人材の採用を検討している','特定技能について知りたい','技人国（エンジニア・専門職）について','定着・生活支援について','まずは資料を見たい（情報収集）','その他'];
 return page({root:r,title:'資料ダウンロード｜BIGLIGHT株式会社',desc:'BIGLIGHTの会社資料（PDF）をダウンロード',body:`
${pageHead('Download','資料ダウンロード')}
<section><div class="wrap form">
  <div class="info"><b>会社資料</b>PDF ／ 無料<br>サービス内容・料金体系・支援の流れ・導入事例をまとめた資料です。<br>ご入力後、すぐにダウンロードいただけます。<br><br>お電話でのご相談<br>052-908-7944（平日 9:00–18:00）</div>
  <form id="dlf" novalidate>
    <label>会社名<small>必須</small></label><div class="fld"><input type="text" placeholder="BIGLIGHT株式会社" required></div>
    <label>お名前<small>必須</small></label><div class="fld"><input type="text" placeholder="山田 太郎" required></div>
    <label>メールアドレス<small>必須</small></label><div class="fld"><input type="email" placeholder="example@company.co.jp" required></div>
    <label>ご興味のある内容</label><div class="checks">${IN.map(x=>`<label class="ck"><input type="checkbox" value="${x}"><span>${x}</span></label>`).join('')}</div>
    <label>ご質問・ご要望</label><div class="fld"><textarea placeholder="気になる点があればご記入ください"></textarea></div>
    <div class="send"><button class="pill" type="submit" style="cursor:pointer">資料をダウンロードする<span class="circ">↓</span></button></div>
    <p class="note">※ 試作版のため送信はされません。本番では現行フォーム（admin.biglight.jp）に接続します。</p>
  </form>
  <div class="dldone" hidden><b>ありがとうございました。</b><p>下のボタンから資料をダウンロードいただけます。</p><a class="pill" href="https://biglight.jp/assets/biglight-company-profile.pdf">会社資料（PDF）を開く<span class="circ">↓</span></a></div>
</div></section>
`});}


// ---------- NEWS ARTICLE (demo: 2 bài thật từ biglight.jp/news/; bản thật do admin.biglight.jp sinh) ----------
const ARTICLES = Object.fromEntries(NEWS.map(n=>[n.slug,n]));
function article(slug){ const A=ARTICLES[slug]; const r='../../'; const others=news.filter(n=>n[3]!==slug).slice(0,3);
 return page({root:r,title:A.title+'｜BIGLIGHT株式会社',desc:A.desc,body:`
<section class="ph"><div class="wrap news-side">
  <div><div class="phh"><span class="en">News</span><span class="ja-lb">お知らせ</span></div>${dots}
    <div class="filters"><a href="${r}news/index.html">すべて</a><a class="${A.cat==='お知らせ'?'on':''}" href="${r}news/index.html#oshirase">お知らせ</a><a class="${A.cat==='HR Magazine'?'on':''}" href="${r}news/index.html#magazine">HR Magazine</a></div></div>
  <article class="art">
    <div class="thumb"><img src="${A.img}" alt="${A.title}"></div>
    <h1 class="art-h">${A.title}</h1>
    <div class="meta">${A.date}<b>${A.cat}</b><span>${A.read}で読めます</span></div>
    <div class="body">${A.body}</div>
    ${A.faq.length?`<div class="afaq"><h2>よくある質問</h2>${faq(A.faq)}</div>`:''}
    <div class="tags">${A.tags.map(t=>'<span>#'+t+'</span>').join('')}</div>
    <div class="share"><span>シェア</span><a href="https://www.facebook.com/sharer/sharer.php?u=https://biglight.jp/news/${slug}/" target="_blank" rel="noopener">Facebook</a><a href="https://twitter.com/intent/tweet?url=https://biglight.jp/news/${slug}/" target="_blank" rel="noopener">X</a><a href="https://social-plugins.line.me/lineit/share?url=https://biglight.jp/news/${slug}/" target="_blank" rel="noopener">LINE</a><a href="https://www.linkedin.com/sharing/share-offsite/?url=https://biglight.jp/news/${slug}/" target="_blank" rel="noopener">LinkedIn</a></div>
    <div class="more-r" style="margin-top:50px"><a href="${r}news/index.html">お知らせ一覧へ <span class="ar">→</span></a></div>
  </article>
</div></section>
<section class="blk"><div class="wrap">
  <div class="lbl">Related</div>
  <div class="nlist" style="margin-top:28px">${others.map(n=>nitem(n,r)).join('')}</div>
</div></section>
${contactBox(r)}
`});}

const pages = {
  'index.html': home(),
  'about/index.html': about(),
  'about/message/index.html': message(),
  'about/company/index.html': company(),
  'about/sdgs/index.html': sdgs(),
  'service/index.html': serviceTop(),
  'service/tokutei-ginou/index.html': tokutei(),
  'service/engineer/index.html': engineer(),
  'product/index.html': product(),
  'news/index.html': newsPage(),
  'recruit/index.html': recruit(),
  'contact/index.html': contact(),
  'about/strength/index.html': strength(),
  'case/index.html': cases(),
  'download/index.html': download(),
};
FIELDS.forEach((f,i)=>{pages['service/field/'+f.slug+'/index.html']=fieldPage(f,i);});
NEWS.forEach(n=>{pages['news/'+n.slug+'/index.html']=article(n.slug);});

pages['404.html']=page({root:'/',title:'ページが見つかりません｜BIGLIGHT株式会社',desc:'お探しのページは見つかりませんでした。',body:`
<section class="ph"><div class="wrap"><h1 class="phh"><span class="en">404</span><span class="ja-lb">ページが見つかりません</span></h1>${dots}</div></section>
<section><div class="wrap lead-end"><p class="lead16">お探しのページは移動または削除された可能性があります。</p><div style="margin-top:40px;display:flex;gap:20px;flex-wrap:wrap">${pill('トップページへ','/index.html')}${pill('お問い合わせ','/contact/index.html')}</div></div></section>`});
const nPages=require('./seo.cjs')(pages,{OUT,SITE,ARTICLES,WEBP});
console.log('pages',nPages);
/* ảnh tạm (差し替え予定) */
function phSvg(en,ja,hue){ let lines='';for(let i=0;i<34;i++){const dy=i*9;lines+='<path d="M-50 '+(520+dy)+' C 250 '+(330+dy)+', 520 '+(660+dy)+', 800 '+(470+dy)+' S 1100 '+(260+dy)+', 1260 '+(360+dy)+'" fill="none" stroke="hsl('+hue+',55%,'+(48+i)+'%)" stroke-width="1.2" opacity=".55"/>';}
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+hue+',35%,94%)"/><stop offset="1" stop-color="hsl('+hue+',40%,84%)"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/>'+lines+
  '<text x="70" y="110" font-family="Roboto,Arial,sans-serif" font-size="26" font-weight="700" letter-spacing="5" fill="hsl('+hue+',30%,40%)">PHOTO ／ 差し替え予定</text>'+
  '<text x="70" y="480" font-family="Roboto,Arial,sans-serif" font-size="'+(en.length>16?62:92)+'" font-weight="700" letter-spacing="3" fill="hsl('+hue+',45%,28%)">'+en.toUpperCase()+'</text>'+
  '<text x="74" y="540" font-family="Noto Sans JP,Hiragino Sans,sans-serif" font-size="34" font-weight="700" fill="hsl('+hue+',30%,38%)">'+ja+'</text></svg>'; }
FIELDS.filter(f=>!f.photo).forEach(f=>fs.writeFileSync(path.join(OUT,'img/field/'+f.slug+'.svg'),phSvg(f.en,f.ja+'分野',f.hue)));
fs.writeFileSync(path.join(OUT,'img/field/engineer.svg'),phSvg('Engineer','技術・人文知識・国際業務',220));
console.log('pages', Object.keys(pages).length);
