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
  if(isArticle)later(function(){store('bl_src',path);post({e:'view',p:path});});
  /* フォーム営業のリンク（?bl=BL-XXXXXX）から来たら、どの会社が開いたかを CRM に知らせる（2026-10-07）。
     番号だけを送り、すぐにアドレス欄から消す（共有・ブックマークに残さない） */
  try{
    var qs=new URLSearchParams(location.search), bl=(qs.get('bl')||'').toUpperCase();
    if(/^BL-[A-Z0-9]{6}$/.test(bl)){
      var fb=JSON.stringify({r:bl,p:path}), FAPI='https://api-crm.biglight.jp/formbot/c';
      later(function(){if(!(navigator.sendBeacon&&navigator.sendBeacon(FAPI,fb)))fetch(FAPI,{method:'POST',body:fb,keepalive:true,mode:'no-cors'}).catch(function(){});});
      qs.delete('bl'); var rest=qs.toString();
      history.replaceState(history.state,'',path+(rest?'?'+rest:'')+location.hash);
    }
  }catch(e){}
  /* 押したボタンの名前。問い合わせ・資料・電話・LINE・求人・記事内の CTA だけを数える（ほかのリンクは数えない） */
  function ctaLabel(el){
    var href=el.getAttribute('href')||'';
    if(el.hasAttribute('data-dl'))return '資料ダウンロード';
    if(/^tel:/i.test(href))return '電話';
    if(/line\.me|lin\.ee/i.test(href))return 'LINE';
    if(/job\.biglight\.jp/i.test(href))return '求人を見る';
    if(/\/contact\/?(#|$)/.test(href)||el.classList.contains('cta')||el.classList.contains('macc-cta'))return '無料相談';
    if(el.classList.contains('ncta-btn'))return (el.textContent||'').trim().slice(0,40)||'記事の CTA';
    return '';
  }
  /* CTA 率 ＝ 記事から押した数 ÷ 記事の表示。記事以外のページで押したものは数えない */
  document.addEventListener('click',function(e){
    if(!isArticle)return;
    var el=e.target&&e.target.closest?e.target.closest('a,button'):null;if(!el)return;
    var l=ctaLabel(el);if(!l)return;
    send({e:'cta',p:path,l:l});
    ga('cta_click',{cta_label:l,page_path:path,source_article:store('bl_src')});
  },true);
  return {
    /** 直前に読んだ記事のパス（無ければ ''） */
    src:function(){return store('bl_src');},
    /** 送信が成功したときに呼ぶ。kind = form（無料相談）/ download（資料） */
    conv:function(kind){var src=store('bl_src');send({e:'conv',p:path,k:kind,s:sid(),src:src});ga('generate_lead',{method:kind,source_article:src});}
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
  /* 資料請求（2026-10-10 CEO）: PDF はその場で渡さない。/api/inquiry（種別「資料請求」）へ送る
     → 担当者に通知メール・お客様に受付の自動返信が届き、担当者から資料を送って連絡する。 */
  var df=document.getElementById('dlf');
  if(df){var dg=BLF.mount(df,df.querySelector('.send')),dbtn=df.querySelector('button[type=submit]');
    df.addEventListener('submit',function(e){e.preventDefault();if(!check(df)||dbtn.disabled)return;
      var v=vals(df),g=dg.fields(),interest=[];[].forEach.call(df.querySelectorAll('input[name=interest]:checked'),function(c){interest.push(c.value);});
      var msg='【資料請求】会社資料の送付を希望します。'+(interest.length?'\n【ご興味のある内容】'+interest.join('／'):'')+(v.note?'\n【ご質問・ご要望】\n'+v.note:'');
      var src=BLT.src();if(src)msg+='\n\n――\n参照した記事: https://biglight.jp'+src;
      var old=dbtn.innerHTML;dbtn.disabled=true;[].forEach.call(dbtn.querySelectorAll('.tx span'),function(x){x.textContent='送信中…';});
      fetch(API+'inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({company:v.company||'',name:v.name||'',email:v.email||'',tel:v.tel||'',kind:'資料請求',message:msg,website:v.website||'',ft:g.ft,turnstile:g.turnstile})})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok){var er=new Error(j.error||'failed');er.code=j.code;er.msg=j.error;throw er;}return j;});})
        .then(function(){BLT.conv('download');done(df,document.getElementById('dl-done'));})
        .catch(function(er){dbtn.disabled=false;dbtn.innerHTML=old;dg.reset();
          alert((er&&er.msg&&er.msg!=='failed'?er.msg+'\n':'')+(er&&er.code==='turnstile'?'':'送信に失敗しました。お手数ですが、お電話（052-908-7944）でもご連絡ください。'));});
    });}
})();
