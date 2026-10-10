/* ===== Cookie同意バナー（2026-10-10）=====
   ・状態は <head> の小さなスクリプトが先に読む（window.BLC・Google Consent Mode v2 の既定値 = denied）。
   ・ここは見た目と操作だけ: 初回はバナー、フッターの「Cookie設定」でいつでも開き直せる。
   ・保存先は localStorage「bl_consent」（Cookie ではない）。1年で期限切れ → もう一度たずねる。
   ・選んだら document に 'bl:consent' を流す → 解析（bl-track.js）と Google マップがそれを聞いて動く。 */
(function(){
  var K='bl_consent', PP='/privacy/';
  var box=null, panel=null;
  function g(c){return c?'granted':'denied';}
  function save(a,m){
    var s={v:1,a:!!a,m:!!m,t:Date.now()};
    try{localStorage.setItem(K,JSON.stringify(s));}catch(e){}
    window.BLC.s=s;
    try{window.gtag('consent','update',{analytics_storage:g(a),ad_storage:g(m),ad_user_data:g(m),ad_personalization:g(m)});}catch(e){}
    try{document.dispatchEvent(new CustomEvent('bl:consent',{detail:s}));}catch(e){}
    close();
  }
  /* nút nổi ở đáy (↑ lên đầu trang) nhích lên đúng bằng chiều cao banner → không bị che */
  function lift(){var h=box&&!box.hidden&&box.classList.contains('on')?box.offsetHeight:0;document.documentElement.style.setProperty('--ckh',h+'px');}
  function close(){if(box){box.classList.remove('on');lift();setTimeout(function(){if(box&&!box.classList.contains('on'))box.hidden=true;},300);}}
  function build(){
    box=document.createElement('section');
    box.className='ck';box.hidden=true;
    box.setAttribute('role','region');box.setAttribute('aria-label','Cookieの設定');
    box.innerHTML=
      '<div class="ck-in">'+
        '<p class="ck-tx">当サイトでは、サービスの向上、アクセス解析および広告効果の測定等のためにCookieを使用しています。Cookieの使用については、<a href="'+PP+'">プライバシーポリシー</a>をご確認ください。</p>'+
        '<div class="ck-bt"><button type="button" class="ck-ok">すべて同意する</button><button type="button" class="ck-no">拒否する</button><button type="button" class="ck-set" aria-expanded="false" aria-controls="ck-panel">設定する</button></div>'+
      '</div>'+
      '<div class="ck-panel" id="ck-panel" hidden>'+
        '<label class="ck-row"><span><b>必須Cookie</b><small>サイトの表示・フォーム送信・不正送信の防止など、サイトを動かすために必要です。</small></span><input type="checkbox" checked disabled><i aria-hidden="true"></i></label>'+
        '<label class="ck-row"><span><b>アクセス解析Cookie</b><small>記事の閲覧やお問い合わせへの流れを集計し、サイトの改善に使います。</small></span><input type="checkbox" class="ck-a"><i aria-hidden="true"></i></label>'+
        '<label class="ck-row"><span><b>広告・マーケティングCookie</b><small>Google マップなど外部サービスの表示や、広告効果の測定に使います。</small></span><input type="checkbox" class="ck-m"><i aria-hidden="true"></i></label>'+
        '<div class="ck-sv"><button type="button" class="ck-save">選択した内容で保存する</button></div>'+
      '</div>';
    document.body.appendChild(box);
    panel=box.querySelector('.ck-panel');
    if(window.ResizeObserver)new ResizeObserver(lift).observe(box);addEventListener('resize',lift);
    box.querySelector('.ck-ok').addEventListener('click',function(){save(true,true);});
    box.querySelector('.ck-no').addEventListener('click',function(){save(false,false);});
    box.querySelector('.ck-set').addEventListener('click',function(){togglePanel(panel.hidden);});
    box.querySelector('.ck-save').addEventListener('click',function(){save(box.querySelector('.ck-a').checked,box.querySelector('.ck-m').checked);});
  }
  function togglePanel(show){
    panel.hidden=!show;box.querySelector('.ck-set').setAttribute('aria-expanded',show);
    var s=window.BLC.s||{};box.querySelector('.ck-a').checked=!!s.a;box.querySelector('.ck-m').checked=!!s.m;
  }
  function open(withPanel){
    if(!box)build();
    box.hidden=false;togglePanel(!!withPanel);
    requestAnimationFrame(function(){box.classList.add('on');lift();});
  }
  if(!window.BLC.s)open(false);
  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest?e.target.closest('[data-cookie-settings]'):null;
    if(t){e.preventDefault();open(true);}
  });

  /* Google マップ（フッター）: 広告・マーケティングに同意 or 「地図を表示」を押したときだけ読み込む */
  function loadMaps(){[].forEach.call(document.querySelectorAll('iframe[data-src]'),function(f){f.src=f.getAttribute('data-src');f.removeAttribute('data-src');var w=f.closest('.fmap');if(w)w.classList.add('on');});}
  if(window.BLC.has('m'))loadMaps();
  document.addEventListener('bl:consent',function(e){if(e.detail&&e.detail.m)loadMaps();});
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('.fmap-load'):null;if(b){e.preventDefault();loadMaps();}});
})();
