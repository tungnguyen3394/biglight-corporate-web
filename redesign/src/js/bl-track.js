/* ===== Lấy nguyên từ web cũ assets/main.js (main) — BLT: đếm 記事→ボタン→問い合わせ; BLF: Turnstile + ft ===== */
/* ===== 記事 → ボタン → 問い合わせ を数える（2026-10-07・marketing.biglight.jp のレポート用）=====
   ・記事（/news/…）を開いた・問い合わせ系のボタンを押した・フォームの送信が成功した を数えるだけ。
   ・個人は送らない: 氏名・メール・電話・IP・Cookie は使わない。sessionStorage（タブを閉じると消える）に
     「直前に読んだ記事のパス」と「タブごとの乱数」だけを置く（同じ送信を二重に数えないため）。
   ・送り先は CRM（api-crm.biglight.jp/mktbot/t）。届かなくてもページの動きは何も変わらない。
   ・GA4_ID に Google アナリティクスの測定 ID（G-XXXXXXX）を入れると、同じ出来事を GA4 にも送る
     （cta_click ・ generate_lead）。空のあいだは GA4 を読み込まない。 */
var BLT=(function(){
  var API='https://api-crm.biglight.jp/mktbot/t';
  var GA4_ID='';
  var path=location.pathname;
  /* 記事 = /news/<slug>/ だけ（/news/tag/… /news/category/… /news/page/… の一覧は記事ではない） */
  var isArticle=/^\/news\/(?!(tag|category|page|author)\/)[^\/]+\/?$/.test(path);
  /* 2026-10-10 Cookie同意: アクセス解析に同意（BLC.has('a')）するまで 送らない・保存しない。
     同意前の出来事は Q に貯め、同じページで同意されたら まとめて送る（拒否なら捨てる）。 */
  var Q=[];
  function ok(){return !!(window.BLC&&window.BLC.has('a'));}
  function later(fn){if(ok())fn();else Q.push(fn);}
  document.addEventListener('bl:consent',function(e){var d=e.detail||{};if(d.a){var q=Q;Q=[];q.forEach(function(f){try{f();}catch(x){}});loadGA();}else Q=[];});
  function store(k,v){try{if(v===undefined)return sessionStorage.getItem(k)||'';if(ok())sessionStorage.setItem(k,v);}catch(e){return '';}}
  function sid(){var s=store('bl_sid');if(!s){s=(Date.now().toString(36)+Math.random().toString(36).slice(2,12)).replace(/[^a-z0-9]/g,'');store('bl_sid',s);}return s;}
  function send(o){later(function(){post(o);});}
  function post(o){try{var b=JSON.stringify(o);if(navigator.sendBeacon&&navigator.sendBeacon(API,b))return;fetch(API,{method:'POST',body:b,keepalive:true,mode:'no-cors'}).catch(function(){});}catch(e){}}
  function ga(ev,params){if(!GA4_ID)return;later(function(){try{if(window.gtag)window.gtag('event',ev,params);}catch(e){}});}
  /* GA4（未設定のあいだは何もしない）: 同意後にだけ読み込む。Consent Mode v2 の既定値は <head> で denied */
  var gaOn=false;
  function loadGA(){if(!GA4_ID||gaOn||!ok())return;gaOn=true;
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA4_ID);document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',GA4_ID);
  }
  loadGA();
  /* 2026-10-15: SNS の投稿から来たか（utm_source=チャンネル・utm_content=p<投稿>・utm_campaign=c<キャンペーン>）。タブの間は覚えておく */
  var UTM_OK=['facebook','instagram','threads','x','whatsapp','zalo','tiktok'];
  function utm(){
    var o={};
    try{var q=new URLSearchParams(location.search),u=q.get('utm_source')||'',c=q.get('utm_content')||'',g=q.get('utm_campaign')||'';
      if(UTM_OK.indexOf(u)>=0){store('bl_utm',u);store('bl_utmc',/^p\d{1,9}$/.test(c)?c:'');store('bl_utmg',/^c\d{1,9}$/.test(g)?g:'');}
    }catch(e){}
    var u2=store('bl_utm'),c2=store('bl_utmc'),g2=store('bl_utmg');
    if(u2)o.u=u2;if(c2)o.c=c2;if(g2)o.g=g2;return o;
  }
  function withUtm(o){var t=utm();for(var k in t)o[k]=t[k];return o;}
  if(isArticle)later(function(){store('bl_src',path);post(withUtm({e:'view',p:path}));});
  /* フォーム営業のリンク（?bl=BL-XXXXXX）から来た訪問（2026-10-07・2026-10-25 改）。
     ・同意を待たずに すぐ送る（送るのは 参照番号・パス・見えていた時間・動かした %・操作の有無・webdriver の印だけ。Cookie・保存領域は使わない・第三者へは送らない）。
     ・番号は すぐアドレス欄から消す（共有・ブックマークに残さない）。同じ訪問の 次のページへは 押した内部リンクに bl（と blk=p）を付けて渡すだけ。
     ・k: open = 開いた ／ page = 同じ訪問の次のページ ／ dwell = 隠れる・離れるとき（ms はその間に見えていた分だけ）。
     ・配信停止のページ（/optout/）は 送らない（止めに来た人を「見ています」と数えない）。 */
  (function(){
    var FAPI='https://api-crm.biglight.jp/formbot/c', ref='', kind='open';
    try{
      var qs=new URLSearchParams(location.search), b=(qs.get('bl')||'').toUpperCase();
      if(/^BL-[A-Z0-9]{6}$/.test(b)){
        ref=b; if(qs.get('blk')==='p') kind='page';
        qs.delete('bl'); qs.delete('blk'); var rest=qs.toString();
        history.replaceState(history.state,'',path+(rest?'?'+rest:'')+location.hash);
      }
    }catch(e){}
    if(!ref||/^\/optout(\/|$)/.test(path)) return;
    function beat(o){o.r=ref;o.p=path;try{var s=JSON.stringify(o);if(navigator.sendBeacon&&navigator.sendBeacon(FAPI,s))return;fetch(FAPI,{method:'POST',body:s,keepalive:true,mode:'no-cors'}).catch(function(){});}catch(e){}}
    var wd=navigator.webdriver===true?1:0;
    beat({k:kind,wd:wd});
    /* 滞在: 見えている間だけ数える。隠れる・離れるたびに その間の分（差分）を送る */
    var since=document.visibilityState==='hidden'?0:Date.now(), sc=0, ia=0;
    function scroll(){try{var h=document.documentElement,room=Math.max(h.scrollHeight,document.body?document.body.scrollHeight:0)-window.innerHeight;if(room>0){var p=Math.round(Math.min(1,Math.max(0,(window.scrollY||h.scrollTop||0)/room))*100);if(p>sc)sc=p;}}catch(e){}}
    window.addEventListener('scroll',scroll,{passive:true});
    ['pointerdown','keydown','touchstart','mousemove'].forEach(function(t){window.addEventListener(t,function(){ia=1;},{passive:true,once:true});});
    function flush(){if(!since)return;var ms=Date.now()-since;since=0;beat({k:'dwell',ms:ms,sc:sc,ia:ia,wd:wd});}
    document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')flush();else if(!since)since=Date.now();});
    window.addEventListener('pagehide',flush);
    /* 同じ訪問の次のページ: 押した内部リンクにだけ bl を付ける（同じページの #・ファイル・よそのサイトは付けない） */
    function tag(e){
      var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
      var u;try{u=new URL(a.getAttribute('href'),location.href);}catch(x){return;}
      if(u.origin!==location.origin||!/^https?:$/.test(u.protocol))return;
      if(u.pathname===location.pathname&&u.search===location.search&&u.hash)return;
      if(/\.(pdf|zip|jpe?g|png|webp|gif|svg|xlsx?|docx?|pptx?|csv)$/i.test(u.pathname)||/^\/optout(\/|$)/.test(u.pathname)||u.searchParams.has('bl'))return;
      u.searchParams.set('bl',ref);u.searchParams.set('blk','p');
      a.setAttribute('href',u.pathname+u.search+u.hash);
    }
    document.addEventListener('click',tag,true);document.addEventListener('auxclick',tag,true);
  })();
  /* 押したボタンの名前。問い合わせ・資料・電話・LINE・求人・記事内の CTA だけを数える（ほかのリンクは数えない） */
  function ctaLabel(el){
    var href=el.getAttribute('href')||'';
    if(el.hasAttribute('data-dl'))return '資料ダウンロード';
    if(/^tel:/i.test(href))return '電話';
    if(/line\.me|lin\.ee/i.test(href))return 'LINE';
    if(/job\.biglight\.jp/i.test(href))return '求人を見る';
    if(/#request/.test(href))return '資料請求';
    if(/\/contact\/?(#|$)/.test(href)||el.classList.contains('cta')||el.classList.contains('macc-cta'))return '無料相談';
    if(el.classList.contains('ncta-btn'))return (el.textContent||'').trim().slice(0,40)||'記事の CTA';
    return '';
  }
  /* CTA 率 ＝ 記事から押した数 ÷ 記事の表示。記事以外のページで押したものは数えない */
  document.addEventListener('click',function(e){
    if(!isArticle)return;
    var el=e.target&&e.target.closest?e.target.closest('a,button'):null;if(!el)return;
    var l=ctaLabel(el);if(!l)return;
    send(withUtm({e:'cta',p:path,l:l}));
    ga('cta_click',{cta_label:l,page_path:path,source_article:store('bl_src')});
  },true);
  return {
    /** 直前に読んだ記事のパス（無ければ ''） */
    src:function(){return store('bl_src');},
    /** 送信が成功したときに呼ぶ。kind = form（無料相談）/ download（資料） */
    conv:function(kind){var src=store('bl_src');send(withUtm({e:'conv',p:path,k:kind,s:sid(),src:src}));ga('generate_lead',{method:kind,source_article:src});}
  };
})();
/* ===== フォームのボット対策（2026-10-08・admin.biglight.jp /api/form-config）=====
   ・ft = サーバーが署名した「フォームを開いた時刻」。送信時に一緒に送る（直接 POST するボットを見分ける）。
   ・Cloudflare Turnstile: サイトキーが設定されているときだけ読み込む。普段は表示されず、怪しいときだけ確認が出る。
   ・設定が取れない・Turnstile が読めないときでも、フォーム自体はそのまま送れる（お客様を止めない）。 */
var BLF=(function(){
  var CFG='https://admin.biglight.jp/api/form-config', cfgP=null, tsP=null;
  function cfg(){ if(!cfgP) cfgP=fetch(CFG,{cache:'no-store'}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};}); return cfgP; }
  function loadTs(){
    if(!tsP) tsP=new Promise(function(ok){
      if(window.turnstile) return ok(window.turnstile);
      var s=document.createElement('script'); s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.async=true;
      s.onload=function(){ok(window.turnstile||null);}; s.onerror=function(){ok(null);}; document.head.appendChild(s);
    });
    return tsP;
  }
  /* form に確認用の枠を差し込み、送信時に使う {ft, turnstile} を返す関数を持つオブジェクトを返す */
  function mount(form, before){
    var st={ft:'',token:'',wid:null,box:null};
    cfg().then(function(c){
      st.ft=c.ft||'';
      if(!c.turnstileSiteKey) return;
      st.box=document.createElement('div'); st.box.className='cf-ts';
      if(before&&before.parentNode) before.parentNode.insertBefore(st.box,before); else form.appendChild(st.box);
      loadTs().then(function(ts){
        if(!ts) return;
        st.wid=ts.render(st.box,{sitekey:c.turnstileSiteKey,appearance:'interaction-only',language:'ja','refresh-expired':'auto',
          callback:function(t){st.token=t;}, 'expired-callback':function(){st.token='';}, 'error-callback':function(){st.token='';}});
      });
    });
    return {
      fields:function(){ return {ft:st.ft,turnstile:st.token}; },
      reset:function(){ st.token=''; try{ if(window.turnstile&&st.wid!=null) window.turnstile.reset(st.wid); }catch(e){} }
    };
  }
  return {mount:mount};
})();

/* ===== Form 問い合わせ / 資料ダウンロード → admin.biglight.jp (giống web cũ) ===== */
(function(){
  var API='https://admin.biglight.jp/api/';
  function vals(f){var o={};[].forEach.call(f.querySelectorAll('input,textarea,select'),function(i){if(i.name&&i.type!=='checkbox')o[i.name]=i.value.trim();});return o;}
  function check(f){var ok=true,first=null;[].forEach.call(f.querySelectorAll('[required]'),function(i){var bad=!i.value.trim()||(i.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.trim()));var w=i.closest('.fld');if(w)w.classList.toggle('bad',bad);i.setAttribute('aria-invalid',bad);if(bad){ok=false;first=first||i;}});if(!ok)first.focus();return ok;}
  function done(f,d){f.hidden=true;d.hidden=false;d.scrollIntoView({block:'center',behavior:'smooth'});}
  /* お問い合わせ */
  var cf=document.getElementById('cf');
  if(cf){var cg=BLF.mount(cf,cf.querySelector('.send')),btn=cf.querySelector('button[type=submit]');
    cf.addEventListener('submit',function(e){e.preventDefault();if(!check(cf)||btn.disabled)return;
      var v=vals(cf),g=cg.fields(),msg=v.message||'';var src=BLT.src();if(src)msg+='\n\n――\n参照した記事: https://biglight.jp'+src;
      var old=btn.innerHTML;btn.disabled=true;[].forEach.call(btn.querySelectorAll('.tx span'),function(x){x.textContent='送信中…';});if(!btn.querySelector('.tx'))btn.firstChild.nodeValue='送信中…';
      fetch(API+'inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({company:v.company||'',name:v.name||'',email:v.email||'',tel:v.tel||'',kind:v.type||'',message:msg,website:v.website||'',ft:g.ft,turnstile:g.turnstile})})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok){var er=new Error(j.error||'failed');er.code=j.code;er.msg=j.error;throw er;}return j;});})
        .then(function(){BLT.conv('form');done(cf,document.getElementById('cf-done'));})
        .catch(function(er){btn.disabled=false;btn.innerHTML=old;cg.reset();
          alert((er&&er.msg&&er.msg!=='failed'?er.msg+'\n':'')+(er&&er.code==='turnstile'?'':'送信に失敗しました。お手数ですが、お電話（052-908-7944）でもご連絡ください。'));});
    });}
  /* 資料請求（2026-11-01 CEO）: 資料を選ぶ → CRM がその場でリンクを作ってメールも送る → 画面に出す。
     担当者への通知と履歴は 今までどおり /api/inquiry。CRM が止まっていても 請求は 失われない（担当者から送る）。 */
  var df=document.getElementById('dlf');
  if(df){var dg=BLF.mount(df,df.querySelector('.send')),dbtn=df.querySelector('button[type=submit]'),CRM='https://api-crm.biglight.jp/',ft='',more=document.getElementById('dlf-more');
    df.classList.remove('fx');df.classList.add('in');   // ẩn trong tab lúc tải: không chờ hiệu ứng cuộn, kẻo mở tab ra thấy trắng
    var picked=function(){return [].slice.call(df.querySelectorAll('input[name=item]:checked'));};
    var getFt=function(){return fetch(CRM+'materials/config',{cache:'no-store'}).then(function(r){return r.json();}).then(function(j){ft=j.ft||'';
      /* 基準表に 金額が ある 業種だけ 自動で 料金リンク。無ければ 今までどおり 担当者から */
      var pc=df.querySelector('input[value=price]'),box=document.getElementById('dlf-prices');if(pc&&box&&j.prices&&j.prices.length&&pc.name==='item'&&!box.querySelector('input')){pc.name='grp';pc.setAttribute('data-sub','dlf-prices');
        j.prices.forEach(function(x){var l=document.createElement('label'),i=document.createElement('input'),s=document.createElement('span');i.type='checkbox';i.name='item';i.value='price:'+x.id;i.setAttribute('data-name','料金シミュレーション（'+x.name+'）');s.textContent=x.name;l.appendChild(i);l.appendChild(s);box.appendChild(l);});}
    }).catch(function(){});};
    getFt();
    df.addEventListener('change',function(e){var t=e.target;if(t.name!=='item'&&t.name!=='grp')return;var cd=t.closest('.mtc');if(cd)cd.classList.toggle('on',t.checked);
      if(t.name==='grp'){var fs=document.getElementById(t.getAttribute('data-sub'));fs.hidden=!t.checked;if(!t.checked)[].forEach.call(fs.querySelectorAll('input'),function(c){c.checked=false;});}
      var p=picked();more.hidden=!p.length;document.getElementById('dlf-sel').textContent=p.map(function(c){return c.getAttribute('data-name');}).join('・');});
    /* ?doc=<id>: từ trang dịch vụ, chọn sẵn tài liệu */
    var dm=/[?&]doc=([a-z-]{2,30})/.exec(location.search);if(dm){var pre=df.querySelector('input[value="'+dm[1]+'"]');if(pre){var gp=pre.closest('.mtf')?df.querySelector('input[data-sub="'+pre.closest('.mtf').id+'"]'):null;if(gp&&!gp.checked)gp.click();if(!pre.checked)pre.click();}}
    var admin=function(v,g,kind,names){var msg='【資料請求】'+names.join('・');var src=BLT.src();if(src)msg+='\n\n――\n参照した記事: https://biglight.jp'+src;
      return fetch(API+'inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({company:v.company||'',name:v.name||'',email:v.email||'',tel:v.tel||'未入力',kind:kind,message:msg,website:v.website||'',ft:g.ft,turnstile:g.turnstile})}).then(function(r){return r.ok;}).catch(function(){return false;});};
    var finish=function(links,mailed,price){var box=document.getElementById('dl-links'),m=document.getElementById('dl-msg');
      links.forEach(function(l){var d=document.createElement('div');d.className='mtr-lk';var b=document.createElement('b');b.textContent=l.label;d.appendChild(b);
        [['Webで見る',l.url],['PDF',l.pdfUrl]].forEach(function(x){if(!x[1])return;var a=document.createElement('a');a.textContent=x[0];a.href=x[1];a.target='_blank';a.rel='noopener';d.appendChild(a);});box.appendChild(d);});
      m.textContent=(links.length?(mailed?'下記からご覧いただけます。同じリンクをメールでもお送りしました。':'下記からご覧いただけます。'):'内容を確認のうえ、担当者より3営業日以内に資料をお送りします。')+(links.length&&price?'料金のご案内は、担当者より別途お送りします。':'');
      BLT.conv('download');var dn=document.getElementById('dl-done');dn.classList.remove('fx');dn.classList.add('in');done(df,dn);};
    df.addEventListener('submit',function(e){e.preventDefault();if(!check(df)||dbtn.disabled)return;
      var p=picked();if(!p.length)return;
      var v=vals(df),g=dg.fields(),names=p.map(function(c){return c.getAttribute('data-name');}),all=p.map(function(c){return c.value;}),items=all.filter(function(x){return x!=='price';}),price=all.indexOf('price')>=0;
      var old=dbtn.innerHTML;dbtn.disabled=true;dbtn.firstChild.nodeValue='送信中…';
      var fail=function(msg){dbtn.disabled=false;dbtn.innerHTML=old;dg.reset();getFt();alert(msg);};
      fetch(CRM+'materials/request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({company:v.company||'',name:v.name||'',email:v.email||'',tel:v.tel||'',items:items,price:price,website:v.website||'',ft:ft})})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {s:r.status,j:j};});})
        .then(function(x){
          if(x.s===200){admin(v,g,x.j.mailed?'資料請求（自動送付）':'資料請求',names).then(function(ok){
            if(!(x.j.links||[]).length&&!ok)return fail('送信に失敗しました。お手数ですが、お電話（052-908-7944）でもご連絡ください。');
            finish(x.j.links||[],x.j.mailed,price);});return;}
          if(x.s===400||x.s===429)return fail(x.j.error||'送信に失敗しました。');
          throw new Error('crm');})
        .catch(function(){admin(v,g,'資料請求',names).then(function(ok){if(ok)finish([],false,false);else fail('送信に失敗しました。お手数ですが、お電話（052-908-7944）でもご連絡ください。');});});
    });}
})();
