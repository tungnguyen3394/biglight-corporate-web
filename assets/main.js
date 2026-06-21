/* BIGLIGHT – shared scripts (multi-page) */
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
      if(confirmBox)confirmBox.style.display='none';
      if(done){done.style.display='block';done.scrollIntoView({behavior:'smooth',block:'center'});}
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
        var a=document.createElement('a');a.href=PDF;a.download='BIGLIGHT_会社案内.pdf';
        document.body.appendChild(a);a.click();a.remove();
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
})();
