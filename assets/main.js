/* BIGLIGHT – shared scripts (multi-page) */

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
  function store(k,v){try{if(v===undefined)return sessionStorage.getItem(k)||'';sessionStorage.setItem(k,v);}catch(e){return '';}}
  function sid(){var s=store('bl_sid');if(!s){s=(Date.now().toString(36)+Math.random().toString(36).slice(2,12)).replace(/[^a-z0-9]/g,'');store('bl_sid',s);}return s;}
  function send(o){try{var b=JSON.stringify(o);if(navigator.sendBeacon&&navigator.sendBeacon(API,b))return;fetch(API,{method:'POST',body:b,keepalive:true,mode:'no-cors'}).catch(function(){});}catch(e){}}
  function ga(ev,params){try{if(window.gtag)window.gtag('event',ev,params);}catch(e){}}
  if(GA4_ID){
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA4_ID);document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',GA4_ID);
  }
  if(isArticle){store('bl_src',path);send({e:'view',p:path});}
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
(function(){
  var pl=document.getElementById('preloader');
  function hidePl(){if(pl)pl.classList.add('done');}
  window.addEventListener('load',function(){setTimeout(hidePl,700);});
  setTimeout(hidePl,3000);

  var hd=document.getElementById('hd');
  var prog=document.getElementById('progress');
  var toTop=document.getElementById('toTop');
  window.addEventListener('scroll',function(){
    var h=document.documentElement;
    var sc=h.scrollTop||document.body.scrollTop;
    var max=h.scrollHeight-h.clientHeight;
    if(prog)prog.style.width=(max>0?(sc/max*100):0)+'%';
    if(toTop){if(sc>500)toTop.classList.add('show');else toTop.classList.remove('show');}
    if(hd){if(window.scrollY>60)hd.classList.add('scrolled');else hd.classList.remove('scrolled');}
  });
  if(toTop)toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

  var counted=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return; counted.unobserve(e.target);
      var el=e.target, to=+el.getAttribute('data-to'), suf=el.getAttribute('data-suf')||'', t0=null, d=1400;
      function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/d,1);var v=Math.round(to*(1-Math.pow(1-p,3)));el.innerHTML=v+'<span class="suf">'+suf+'</span>';if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('.snum2[data-to]').forEach(function(el){counted.observe(el);});

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  var mnav=document.getElementById('mnav');
  document.querySelectorAll('#mnav a').forEach(function(a){
    a.addEventListener('click',function(){if(mnav)mnav.classList.remove('open');});
  });
  // accordion: bấm mục lớn để sổ danh sách con
  document.querySelectorAll('#mnav .macc-h').forEach(function(b){
    b.addEventListener('click',function(){
      var item=b.parentElement, wasOpen=item.classList.contains('open');
      document.querySelectorAll('#mnav .macc.open').forEach(function(o){o.classList.remove('open');});
      if(!wasOpen)item.classList.add('open');
    });
  });

  var form=document.getElementById('contactForm');
  if(form){
    var confirmBox=document.getElementById('contactConfirm');
    var confTbl=document.getElementById('confTbl');
    var done=document.getElementById('formDone');
    function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    function validate(){
      var ok=true;
      form.querySelectorAll('[data-f]').forEach(function(r){
        var inp=r.querySelector('input,textarea');var v=inp.value.trim();var bad=!v;
        if(!bad&&r.hasAttribute('data-email')){bad=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
        r.classList.toggle('invalid',bad);if(bad)ok=false;
      });
      var agree=document.getElementById('agree'),ae=document.getElementById('agreeErr');
      if(agree&&!agree.checked){if(ae)ae.style.display='block';ok=false;}else if(ae){ae.style.display='none';}
      return ok;
    }
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!validate())return;
      var rows='';
      form.querySelectorAll('.frow').forEach(function(r){
        var lab=r.querySelector('label'),inp=r.querySelector('input,textarea');
        if(!lab||!inp)return;
        var name=lab.textContent.replace('必須','').trim();
        var val=inp.value.trim();
        if(!val)val='—';
        rows+='<div class="confrow"><div class="confk">'+esc(name)+'</div><div class="confv">'+esc(val).replace(/\n/g,'<br>')+'</div></div>';
      });
      if(confTbl)confTbl.innerHTML=rows;
      form.style.display='none';
      if(confirmBox){confirmBox.style.display='block';confirmBox.scrollIntoView({behavior:'smooth',block:'start'});}
    });
    var cb=document.getElementById('confBack');
    if(cb)cb.addEventListener('click',function(){
      if(confirmBox)confirmBox.style.display='none';
      form.style.display='block';form.scrollIntoView({behavior:'smooth',block:'start'});
    });
    var cs=document.getElementById('confSend');
    if(cs)cs.addEventListener('click',function(){
      var old=cs.textContent; cs.disabled=true; cs.textContent='送信中…';
      var fd={}; form.querySelectorAll('input,textarea').forEach(function(i){ if(i.name) fd[i.name]=i.value.trim(); });
      var payload={company:fd.company||'',name:fd.name||'',email:fd.email||'',tel:fd.tel||'',message:fd.msg||'',website:fd.website||''};
      /* 2026-10-07: どの記事を読んでから来たか — 担当者がメールで分かるように本文の最後に 1 行足す（お客様の文はそのまま） */
      var srcArt=BLT.src(); if(srcArt&&payload.message) payload.message+='\n\n――\n参照した記事: https://biglight.jp'+srcArt;
      fetch('https://admin.biglight.jp/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
        .then(function(r){ if(!r.ok) throw new Error('failed'); return r.json(); })
        .then(function(){
          BLT.conv('form');
          if(confirmBox)confirmBox.style.display='none';
          if(done){done.style.display='block';done.scrollIntoView({behavior:'smooth',block:'center'});}
        })
        .catch(function(){
          cs.disabled=false; cs.textContent=old;
          alert('送信に失敗しました。お手数ですが、お電話（052-908-7944）でもご連絡ください。');
        });
    });
    form.querySelectorAll('[data-f] input,[data-f] textarea').forEach(function(i){
      i.addEventListener('input',function(){i.closest('.frow').classList.remove('invalid');});
    });
  }

  /* DOWNLOAD GATE */
  (function(){
    var mask=document.getElementById('dlMask');
    if(!mask)return;
    var box=mask.querySelector('.dlbody'), done=document.getElementById('dlDone');
    var PDF='/assets/biglight-company-profile.pdf';
    function open(e){if(e)e.preventDefault();box.style.display='block';done.style.display='none';mask.classList.add('open');}
    function close(){mask.classList.remove('open');}
    document.querySelectorAll('[data-dl]').forEach(function(b){b.addEventListener('click',open);});
    mask.addEventListener('click',function(e){if(e.target===mask)close();});
    var dc=document.getElementById('dlClose');if(dc)dc.addEventListener('click',close);
    var f=document.getElementById('dlForm');
    if(f){
      f.addEventListener('submit',function(e){
        e.preventDefault();var ok=true;
        f.querySelectorAll('[data-f]').forEach(function(r){
          var inp=r.querySelector('input');var v=inp.value.trim();var bad=!v;
          if(!bad&&r.hasAttribute('data-email')){bad=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
          r.classList.toggle('invalid',bad);if(bad)ok=false;
        });
        if(!ok)return;
        var fd={}; f.querySelectorAll('input[type=text],input[type=email]').forEach(function(i){ if(i.name) fd[i.name]=i.value.trim(); });
        var interest=[]; f.querySelectorAll('input[name="interest"]:checked').forEach(function(c){ interest.push(c.value); });
        var noteEl=f.querySelector('[name="note"]'); var note=noteEl?noteEl.value.trim():'';
        var srcArt=BLT.src(); if(srcArt) note=(note?note+'\n':'')+'参照した記事: https://biglight.jp'+srcArt;
        fetch('https://admin.biglight.jp/api/download',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({company:fd.company||'',name:fd.name||'',email:fd.email||'',interest:interest,note:note})}).catch(function(){});
        var a=document.createElement('a');a.href=PDF;a.download='BIGLIGHT_会社案内.pdf';
        document.body.appendChild(a);a.click();a.remove();
        BLT.conv('download');
        box.style.display='none';done.style.display='block';f.reset();
      });
      f.querySelectorAll('[data-f] input').forEach(function(i){
        i.addEventListener('input',function(){i.closest('.frow').classList.remove('invalid');});
      });
    }
  })();

  /* PRIVACY MODAL */
  (function(){
    var m=document.getElementById('ppMask');
    if(!m)return;
    function open(e){if(e)e.preventDefault();m.classList.add('open');document.body.style.overflow='hidden';}
    function close(){m.classList.remove('open');document.body.style.overflow='';}
    document.querySelectorAll('.js-pp').forEach(function(a){a.addEventListener('click',open);});
    var c=document.getElementById('ppClose');
    if(c)c.addEventListener('click',close);
    m.addEventListener('click',function(e){if(e.target===m)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open'))close();});
  })();

  /* HOME NEWS — nạp bài viết thật từ admin (đúng số bài, link chuẩn) */
  (function(){
    var el=document.getElementById('homeNews');
    if(!el) return;
    var CT={news:['お知らせ','ncat'],magazine:['Magazine','ncat r'],seido:['制度・法改正','ncat g'],press:['プレス','ncat g']};
    var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
    fetch('https://admin.biglight.jp/api/posts/latest').then(function(r){return r.json();}).then(function(d){
      var items=(d&&d.items)||[];
      if(!items.length) return;
      el.innerHTML=items.map(function(p){
        var c=CT[p.category]||[p.category,'ncat'];
        var t=p.published_at?new Date(p.published_at):null;
        var ds=t?(t.getFullYear()+'.'+('0'+(t.getMonth()+1)).slice(-2)+'.'+('0'+t.getDate()).slice(-2)):'';
        return '<a class="nrow" href="/news/'+encodeURIComponent(p.slug)+'/"><span class="ndate">'+ds+'</span><span class="'+c[1]+'">'+esc(c[0])+'</span><span class="ntitle">'+esc(p.title)+'</span></a>';
      }).join('');
    }).catch(function(){});
  })();
})();
