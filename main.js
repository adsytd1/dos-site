// Scroll throttle — collect all scroll callbacks into one rAF-batched handler
var _scrollCbs=[];
function onScroll(fn){_scrollCbs.push(fn)}
(function(){var ticking=false;window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(function(){for(var i=0;i<_scrollCbs.length;i++)_scrollCbs[i]();ticking=false})}},{passive:true})})();
// GA4 Event Tracking
function gEvent(name,params){if(typeof gtag==='function')gtag('event',name,params||{})}
document.querySelectorAll('a[href*="wa.me"]').forEach(a=>a.addEventListener('click',()=>gEvent('whatsapp_click',{link_url:a.href})));
// Reveal
const ro=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){t.target.classList.add('visible');ro.unobserve(t.target)}})},{threshold:.08,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal,.reveal-children').forEach(e=>ro.observe(e));
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();var href=l.getAttribute('href');if(!href||href==='#')return;var t;try{t=document.querySelector(href)}catch(err){return}if(t){t.scrollIntoView({behavior:'smooth',block:'start'});t.setAttribute('tabindex','-1');t.focus({preventScroll:true});t.addEventListener('blur',function(){t.removeAttribute('tabindex')},{once:true});history.pushState(null,null,href);var nav=document.querySelector('.navbar');if(nav){nav.classList.remove('nav-open');var toggle=nav.querySelector('.mobile-toggle');if(toggle)toggle.setAttribute('aria-expanded','false')}}})});
// Close mobile menu on outside click
document.addEventListener('click',function(e){var nav=document.querySelector('.navbar');if(!nav)return;if(nav.classList.contains('nav-open')&&!e.target.closest('.navbar')){nav.classList.remove('nav-open')}});
// Stat counter
const so=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){t.target.querySelectorAll('.hero-stat-num').forEach(n=>{const txt=n.textContent,m=txt.match(/(\d+)/);if(m){const target=parseInt(m[1],10),sfx=txt.replace(m[1],'');let startTime=null;const duration=900;function step(ts){if(!startTime)startTime=ts;const progress=Math.min((ts-startTime)/duration,1);const eased=1-Math.pow(1-progress,3);n.textContent=Math.round(eased*target)+sfx;if(progress<1)requestAnimationFrame(step)}requestAnimationFrame(step)}});so.unobserve(t.target)}})},{threshold:.5});
const hs=document.querySelector('.hero-stats');if(hs)so.observe(hs);
// Floating WA + Demo
const fw=document.getElementById('floatingWa'),dt=document.getElementById('demoToggle'),fc=document.getElementById('floatingCall');
onScroll(function(){var s=window.scrollY>300;if(fw)fw.classList.toggle('visible',s);if(dt)dt.classList.toggle('visible',s);if(fc)fc.classList.toggle('visible',s)});
// Inline form validation
(function(){var nm=document.getElementById('qName'),ph=document.getElementById('qPhone'),nc=document.getElementById('nameCheck'),pc=document.getElementById('phoneCheck'),en=document.getElementById('errName'),ep=document.getElementById('errPhone');if(!nm||!ph)return;function v(inp,chk,err,test){var val=inp.value.trim();if(!val){inp.classList.remove('valid','error');if(chk)chk.style.display='none';if(err)err.textContent='';return}if(test(val)){inp.classList.add('valid');inp.classList.remove('error');if(chk)chk.style.display='inline';if(err)err.textContent=''}else{inp.classList.add('error');inp.classList.remove('valid');if(chk)chk.style.display='none';if(err)err.textContent=inp===nm?'Минимум 2 символа':'Введите корректный номер'}}nm.addEventListener('input',function(){v(nm,nc,en,function(s){return s.length>=2})});ph.addEventListener('input',function(){v(ph,pc,ep,function(s){return s.replace(/\D/g,'').length>=10})})})();
// Carousel (page-based) with autoplay + swipe hint
(function(){
const track=document.getElementById('reviewsTrack'),dotsC=document.getElementById('carouselDots');
if(!track)return;
// On mobile split 4-card pages into 2-card pages
var _lastWidth=window.innerWidth,_resizeTimer;
window.addEventListener('resize',function(){clearTimeout(_resizeTimer);_resizeTimer=setTimeout(function(){var nowWidth=window.innerWidth;if((_lastWidth<=768&&nowWidth>768)||(_lastWidth>768&&nowWidth<=768)){goTo(0);bD()}_lastWidth=nowWidth},150)});
if(window.innerWidth<=768){
  var origPages=Array.from(track.querySelectorAll('.review-page'));
  origPages.forEach(function(pg){
    var cards=Array.from(pg.querySelectorAll('.review-card'));
    if(cards.length<=1)return;
    // Show all cards (they were hidden by CSS nth-child)
    cards.forEach(function(c){c.style.display=''});
    // Keep first card in original page, move each remaining to its own page
    for(var i=1;i<cards.length;i++){
      var newPage=document.createElement('div');
      newPage.className='review-page review-page--mobile';
      newPage.appendChild(cards[i]);
      pg.parentNode.insertBefore(newPage,pg.nextSibling);
    }
  });
}
const pages=track.querySelectorAll('.review-page');
let current=0,total=pages.length;
function bD(){if(!dotsC)return;dotsC.innerHTML='';for(let i=0;i<total;i++){const d=document.createElement('div');d.className='carousel-dot'+(i===current?' active':'');d.onclick=()=>{userInteract();goTo(i)};dotsC.appendChild(d)}updatePageIndicator()}
var pageIndicator=document.createElement('div');pageIndicator.className='carousel-page-indicator';if(dotsC&&dotsC.parentNode)dotsC.parentNode.insertBefore(pageIndicator,dotsC.nextSibling);
function updatePageIndicator(){pageIndicator.textContent=(current+1)+'/'+total}
function goTo(i){track.querySelectorAll('video').forEach(v=>v.pause());current=Math.max(0,Math.min(i,total-1));track.style.transition='transform .6s cubic-bezier(.4,0,.2,1), opacity .4s ease';track.style.opacity='0.5';track.style.transform='translateX(-'+(current*100)+'%)';setTimeout(function(){track.style.opacity='1'},400);document.querySelectorAll('.carousel-dot').forEach((d,idx)=>d.className='carousel-dot'+(idx===current?' active':''));updatePageIndicator()}
// --- Autoplay ---
let autoplayTimer=null,userStopped=false;
function autoAdv(){if(userStopped)return;goTo(current<total-1?current+1:0);clearTimeout(autoplayTimer);autoplayTimer=setTimeout(autoAdv,10000)}
function startAutoplay(){clearTimeout(autoplayTimer);if(!userStopped)autoplayTimer=setTimeout(autoAdv,10000)}
function stopAutoplay(){clearTimeout(autoplayTimer);userStopped=true}
var idleTimer=null;
function userInteract(){stopAutoplay();clearTimeout(idleTimer);idleTimer=setTimeout(function(){userStopped=false;startAutoplay()},30000)}
// Pause on hover/touch (desktop + mobile)
var carousel=track.closest('.reviews-carousel');
if(carousel){carousel.addEventListener('mouseenter',function(){stopAutoplay()});
carousel.addEventListener('touchstart',function(){stopAutoplay()},{passive:true});}
// Prev / Next buttons
var prevBtn=document.getElementById('prevBtn'),nextBtn=document.getElementById('nextBtn');
function debounceNav(){prevBtn.disabled=true;nextBtn.disabled=true;setTimeout(function(){prevBtn.disabled=false;nextBtn.disabled=false},500)}
if(prevBtn)prevBtn.onclick=()=>{userInteract();goTo(current-1);debounceNav()};
if(nextBtn)nextBtn.onclick=()=>{userInteract();goTo(current+1);debounceNav()};
// Touch swipe
let sx=0;
var sy=0;
track.addEventListener('touchstart',function(e){sx=e.touches[0].pageX;sy=e.touches[0].pageY;track.style.transition='none'},{passive:true});
track.addEventListener('touchend',function(e){var dx=e.changedTouches[0].pageX-sx;var dy=e.changedTouches[0].pageY-sy;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){userInteract();goTo(dx>0?current-1:current+1)}},{passive:true});
// Mouse drag
let md=false,mx=0;
track.addEventListener('mousedown',e=>{md=true;mx=e.pageX;track.style.transition='none';track.style.userSelect='none';track.style.webkitUserSelect='none'});
window.addEventListener('mouseup',()=>{if(md){md=false;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';track.style.userSelect='';track.style.webkitUserSelect=''}});
track.addEventListener('mousemove',e=>{if(!md)return;const dx=e.pageX-mx;if(Math.abs(dx)>60){md=false;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';userInteract();goTo(dx>0?current-1:current+1)}});
// Keyboard navigation for carousel
document.addEventListener('keydown',function(e){
  if(!carousel)return;
  var rect=carousel.getBoundingClientRect();
  if(rect.bottom<0||rect.top>window.innerHeight)return;
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  if(e.key==='ArrowLeft'){userInteract();goTo(current-1);if(prevBtn&&nextBtn)debounceNav()}
  else if(e.key==='ArrowRight'){userInteract();goTo(current+1);if(prevBtn&&nextBtn)debounceNav()}
});
// --- Swipe hint (mobile) ---
var hint=document.getElementById('swipeHint');
if(hint){setTimeout(function(){hint.remove()},3200)}
// Init
bD();
startAutoplay();
})();
// Calculator
(function(){
const sR=document.getElementById('calcSales'),cR=document.getElementById('calcCheck'),cvR=document.getElementById('calcConv'),tR=document.getElementById('calcTime');
if(!sR)return;
const sV=document.getElementById('calcSalesVal'),cV=document.getElementById('calcCheckVal'),cvV=document.getElementById('calcConvVal'),tV=document.getElementById('calcTimeVal');
const oE=document.getElementById('calcOld'),nE=document.getElementById('calcNew'),dE=document.getElementById('calcDiff'),yE=document.getElementById('calcYear'),lE=document.getElementById('calcLost'),svE=document.getElementById('calcSaved');
function fmt(n){if(isNaN(n))return '0';return n.toLocaleString('ru-RU')}
function lossRate(h){if(h<=0)return 0.05;if(h<=0.5)return 0.2;if(h<=1)return 0.35;if(h<=2)return 0.5;if(h<=4)return 0.65;if(h<=8)return 0.75;return 0.9}
function calc(){
const leads=+sR.value,check=+cR.value,conv=+cvR.value,hrs=tR?+tR.value:2;
sV.textContent=leads;cV.textContent=fmt(check);cvV.textContent=conv+'%';
if(tV)tV.textContent=hrs>0?hrs+' ч':'< 5 мин';
const curSales=Math.round(leads*conv/100);
const rev=curSales*check;
var boostSlider=document.getElementById('calcBoost');var boost=boostSlider?+boostSlider.value:30;const newConv=Math.min(conv*(1+boost/100),100);
const newSales=Math.round(leads*newConv/100);
const newRev=newSales*check;
const diff=newRev-rev;
const lost=Math.round(leads*lossRate(hrs));
const saved=Math.round(lost*0.95);
oE.innerHTML=fmt(rev)+' &#8376;';nE.innerHTML=fmt(newRev)+' &#8376;';
dE.innerHTML='+'+fmt(diff)+' &#8376;';
if(lE)lE.textContent=lost+' заявок/мес';
if(svE)svE.textContent='+'+saved+' заявок/мес';
const totalExtra=diff+(svE?Math.round(saved*check*newConv/100):0);
var yearlyVal=totalExtra*12;
yE.innerHTML='+'+fmt(yearlyVal)+' &#8376;/год';
var hl=document.getElementById('calcHighlight');
if(hl){if(yearlyVal>5000000){hl.style.display=''}else{hl.style.display='none'}}
}
var _calcTimer=null;function calcDebounced(){clearTimeout(_calcTimer);_calcTimer=setTimeout(calc,100)}
var bR=document.getElementById('calcBoost'),bV=document.getElementById('calcBoostVal');
function updateSliderFill(el){var pct=((el.value-el.min)/(el.max-el.min))*100;el.style.background='linear-gradient(90deg,var(--accent) '+pct+'%,var(--border-light) '+pct+'%)';}
function onSliderInput(el){updateSliderFill(el);calcDebounced();}
[sR,cR,cvR,tR,bR].forEach(function(el){if(el){el.oninput=function(){if(el===bR&&bV)bV.textContent=el.value+'%';onSliderInput(el)};updateSliderFill(el);}});
calc();
// (miniCalcLoss removed — element no longer exists)
})();
// Quiz
let qStep=0;const qTotal=5;
function qSelect(el){el.closest('.quiz-options').querySelectorAll('.quiz-option').forEach(o=>o.classList.remove('selected'));el.classList.add('selected')}
function quizGo(dir){
const steps=document.querySelectorAll('.quiz-step'),bars=document.querySelectorAll('.quiz-progress-bar');
if(qStep===qTotal-1&&dir===1){
const nm=document.getElementById('qName').value,ph=document.getElementById('qPhone').value,ni=document.getElementById('qNiche').value;
var errN=document.getElementById('errName'),errP=document.getElementById('errPhone'),nameI=document.getElementById('qName'),phoneI=document.getElementById('qPhone');
errN.classList.remove('show');errP.classList.remove('show');nameI.classList.remove('error');phoneI.classList.remove('error');
var hasErr=false;
if(!nm){errN.textContent='Введите ваше имя';errN.classList.add('show');nameI.classList.add('error');hasErr=true}
if(!ph){errP.textContent='Введите номер телефона';errP.classList.add('show');phoneI.classList.add('error');hasErr=true}
else if(ph.replace(/\D/g,'').length<11||ph.replace(/\D/g,'')[0]!=='7'){errP.textContent='Номер должен быть +7 (XXX) XXX-XX-XX';errP.classList.add('show');phoneI.classList.add('error');hasErr=true}
if(hasErr)return;
var submitBtn=document.getElementById('quizNext');
submitBtn.disabled=true;submitBtn.style.opacity='.6';submitBtn.style.pointerEvents='none';submitBtn.textContent='Отправляем...';
const answers={};document.querySelectorAll('.quiz-step').forEach((s,i)=>{if(i<qTotal-1){const sel=s.querySelectorAll('.quiz-option.selected');answers['step'+(i+1)]=Array.from(sel).map(o=>o.textContent.trim()).join(', ')||'не выбрано'}});
const data={name:nm,phone:ph,niche:ni,answers:answers,source:'dos-site-quiz',timestamp:new Date().toISOString()};
fetch('https://adsytd.space/webhook/dos-quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(res){if(!res.ok)throw new Error('Server error');}).then(function(){
gEvent('quiz_submit',{niche:ni,name:nm});
window.location.href='thank-you.html?name='+encodeURIComponent(nm)+'&niche='+encodeURIComponent(ni||'');
}).catch(function(){
submitBtn.disabled=false;submitBtn.style.opacity='';submitBtn.style.pointerEvents='';submitBtn.textContent='Отправить заявку \u2192';
var errP=document.getElementById('errPhone');if(errP){errP.textContent='Ошибка отправки. Попробуйте ещё раз или напишите в WhatsApp.';errP.classList.add('show')}
});
return;
}
if(dir===1&&qStep<qTotal-1){const cur=document.querySelectorAll('.quiz-step')[qStep];if(!cur.querySelector('.quiz-option.selected')){cur.style.animation='shake .4s';setTimeout(()=>{cur.style.animation=''},400);var hint=cur.querySelector('.quiz-hint');if(!hint){hint=document.createElement('div');hint.className='quiz-hint';hint.style.cssText='color:#ff5252;font-size:13px;font-family:var(--mono);margin-top:12px;animation:fadeInUp .3s ease';hint.textContent='Выберите хотя бы один вариант';cur.querySelector('.quiz-options').after(hint);setTimeout(function(){if(hint.parentNode)hint.remove()},3000)}return}}
const next=qStep+dir;
if(next<0||next>=qTotal)return;
if(next===qTotal-1&&dir===1){document.getElementById('quizNext').textContent='Отправить заявку \u2192';var qNote=document.getElementById('quizContactNote');if(qNote){var h=new Date().getHours();if(h>=22||h<9){qNote.textContent='Сейчас нерабочее время — отвечу утром в рабочие часы'}else{qNote.textContent='Я свяжусь с вами в течение 2 часов'}}}
else{document.getElementById('quizNext').textContent='Далее \u2192'}
steps[qStep].classList.remove('active');
qStep=next;
steps[qStep].classList.add('active');
bars.forEach((b,i)=>b.classList.toggle('active',i<=qStep));
document.getElementById('quizBack').style.display=qStep>0?'block':'none';
var stepText=document.getElementById('quizStepText');if(stepText){var remaining=qTotal-(qStep+1);stepText.textContent='Шаг '+(qStep+1)+' из '+qTotal+(remaining>0?' — осталось '+remaining:'');}
}
// Floating demo chat
(function(){
const toggle=document.getElementById('demoToggle'),win=document.getElementById('demoWindow'),closeBtn=document.getElementById('demoClose'),msgs=document.getElementById('demoMessages'),input=document.getElementById('demoInput'),typing=document.getElementById('demoTyping');
if(!toggle||!win||!closeBtn||!msgs||!input||!typing)return;
const CHAT_URL='https://adsytd.space/webhook/dos-chat';
var sessionId=sessionStorage.getItem('dosSessionId')||'site-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);sessionStorage.setItem('dosSessionId',sessionId);
let sending=false;
var dtt=document.getElementById('demoTooltip');
setTimeout(function(){if(dtt)dtt.style.display='none'},8000);
function hideFloating(hide){var els=document.querySelectorAll('.floating-wa,.floating-call,.btt,.mobile-cta');els.forEach(function(el){if(hide){el.classList.add('floating-hidden')}else{el.classList.remove('floating-hidden')}})}
toggle.addEventListener('click',function(){if(dtt)dtt.style.display='none';win.classList.toggle('open');var isOpen=win.classList.contains('open');toggle.style.display=isOpen?'none':'flex';toggle.setAttribute('aria-expanded',String(isOpen));hideFloating(isOpen);if(isOpen){document.body.style.overflow='hidden';var firstInput=win.querySelector('input,button');if(firstInput)firstInput.focus()}else{document.body.style.overflow=''}if(typeof gEvent==='function')gEvent('demo_chat_open')});
closeBtn.addEventListener('click',function(){win.classList.remove('open');toggle.style.display='flex';toggle.setAttribute('aria-expanded','false');hideFloating(false);document.body.style.overflow='';toggle.focus()});
// Close demo chat on Escape
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&win.classList.contains('open')){win.classList.remove('open');toggle.style.display='flex';toggle.setAttribute('aria-expanded','false');hideFloating(false);document.body.style.overflow='';toggle.focus()}});
input.addEventListener('keydown',function(e){if(e.key==='Enter')demoSendInput()});
function addMsg(text,cls){var d=document.createElement('div');d.className='demo-msg '+cls;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
window.demoSend=function(text){
if(sending)return;
sending=true;
addMsg(text,'user');
typing.classList.add('show');
input.disabled=true;
var ac=new AbortController();var tid=setTimeout(function(){ac.abort()},15000);
fetch(CHAT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,sessionId:sessionId}),signal:ac.signal})
.then(function(res){if(!res.ok)throw new Error('Server '+res.status);return res.json()})
.then(function(data){
clearTimeout(tid);typing.classList.remove('show');
var rt=data.reply||data.output||data.text||data.message||'Напишите в WhatsApp — обсудим подробнее!';addMsg(rt.replace(/\*\*(.*?)\*\*/g,'$1').replace(/\n/g,' '),'bot');
}).catch(function(err){
clearTimeout(tid);typing.classList.remove('show');
if(err&&err.name==='AbortError'){addMsg('Превышено время ожидания. Попробуйте ещё раз или напишите в WhatsApp: +7 705 205 1992','bot')}
else{addMsg('Не удалось связаться с сервером. Напишите в WhatsApp: +7 705 205 1992','bot')}
}).finally(function(){input.disabled=false;input.focus();sending=false});
};
window.demoSendInput=function(){var v=input.value.trim();if(!v)return;demoSend(v);input.value=''};
})();

(function(){
var shown=false;
function showExit(){
  if(shown)return;
  try{if(sessionStorage.getItem('exitShown'))return}catch(e){}
  shown=true;
  try{sessionStorage.setItem('exitShown','1')}catch(e){}
  var ep=document.getElementById('exitPopup');
  if(ep){ep.classList.add('show');var firstBtn=ep.querySelector('button,a,[tabindex]');if(firstBtn)firstBtn.focus()}
  if(typeof gEvent==='function')gEvent('exit_popup_shown');
}
window.closeExit=function(){var ep=document.getElementById('exitPopup');if(ep)ep.classList.remove('show')};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var ep=document.getElementById('exitPopup');if(ep&&ep.classList.contains('show'))closeExit()}});
document.addEventListener('mouseout',function(e){
  if(!e.relatedTarget&&e.clientY<0)showExit();
});
var exitPopupEl=document.getElementById('exitPopup');
if(exitPopupEl){exitPopupEl.addEventListener('click',function(e){
  if(e.target===this||e.target.closest('.exit-close')||e.target.closest('.exit-close-action'))closeExit();
});}
var scrollDepth=0;
onScroll(function(){
  var denom=document.body.scrollHeight-window.innerHeight;var pct=denom>0?window.scrollY/denom*100:0;
  if(pct>scrollDepth)scrollDepth=pct;
});
// Exit popup only triggered by mouseout (cursor leaving viewport) — no timer fallback
})();

// Back to top visibility
onScroll(function(){var btt=document.getElementById('btt');if(btt)btt.classList.toggle('visible',window.scrollY>600)});
// Auto-hide navbar on mobile scroll
(function(){var nav=document.querySelector('.navbar');if(!nav)return;var lastY=0;onScroll(function(){if(window.innerWidth>768)return;var y=window.scrollY;if(y>300&&y>lastY+5){nav.classList.add('navbar--hidden')}else if(y<lastY-5){nav.classList.remove('navbar--hidden')}lastY=y})})();
// Counter animation for aggregate numbers
(function(){
  var animated=false;
  function animateCounters(){
    if(animated)return;
    var section=document.querySelector('.agg-grid');
    if(!section)return;
    var rect=section.getBoundingClientRect();
    if(rect.top<window.innerHeight-100){
      animated=true;
      var nums=section.querySelectorAll('.agg-num');
      nums.forEach(function(el){
        var text=el.textContent;
        var match=text.match(/(\d+)/);
        if(!match)return;
        var target=parseInt(match[0],10);
        var prefix=text.slice(0,text.indexOf(match[0]));
        var suffix=text.slice(text.indexOf(match[0])+match[0].length);
        var duration=1500;var startTime=null;
        function step(ts){
          if(!startTime)startTime=ts;
          var progress=Math.min((ts-startTime)/duration,1);
          var eased=1-Math.pow(1-progress,3);
          var current=Math.round(eased*target);
          el.textContent=prefix+current+suffix;
          if(progress<1)requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
  }
  onScroll(animateCounters);
  window.addEventListener('load',animateCounters);
})();
// WA tooltip — show after 5s, hide after 10s
setTimeout(function(){var t=document.getElementById('waTooltip');if(t){t.classList.add('show');setTimeout(function(){t.classList.remove('show')},5000)}},5000);
// Hero rotating words
(function(){
var words=document.querySelectorAll('.hero-rotate-word'),i=0;
if(!words.length)return;
var heroRotateInterval=null,heroRotateVisible=false;
function startRotation(){if(heroRotateInterval)return;heroRotateInterval=setInterval(function(){
words[i].classList.remove('active');words[i].classList.add('exit');
i=(i+1)%words.length;
words[i].classList.remove('exit');words[i].classList.add('active');
setTimeout(function(){words.forEach(function(w){if(!w.classList.contains('active'))w.classList.remove('exit')})},500);
},2500)}
function stopRotation(){if(heroRotateInterval){clearInterval(heroRotateInterval);heroRotateInterval=null}}
var heroSection=words[0].closest('.hero')||words[0].parentElement;
var heroRotateObs=new IntersectionObserver(function(entries){
heroRotateVisible=entries[0].isIntersecting;
if(heroRotateVisible){startRotation()}else{stopRotation()}
},{threshold:0.1});
heroRotateObs.observe(heroSection);
})();
// Pain counter — ticks up to show lost leads
(function(){
var el=document.getElementById('painCounter'),count=0;
if(!el)return;
var painInterval=null,painStarted=false;
function tick(){
if(count>=50)return;
count++;el.textContent=count;
el.classList.add('bump');setTimeout(function(){el.classList.remove('bump')},300);
}
function startPain(){if(painInterval)return;if(!painStarted){painStarted=true;tick()}painInterval=setInterval(tick,4000)}
function stopPain(){if(painInterval){clearInterval(painInterval);painInterval=null}}
var painSection=el.closest('section')||el.parentElement;
var painObs=new IntersectionObserver(function(entries){
if(entries[0].isIntersecting){startPain()}else{stopPain()}
},{threshold:0.1});
painObs.observe(painSection);
})();

// Hero Bot — scripted dialog
(function(){
var box=document.getElementById('heroBotMsgs');
if(!box)return;
var script=[
  {type:'bot',html:'Привет! &#128075; Я — <b>ИИ-ассистент DOS</b>.<br><br>Помогаю бизнесу автоматизировать продажи и коммуникации.',delay:2500},
  {type:'bot',html:'Расскажите, какой у вас бизнес — подберу решение &#128161;',delay:1800},
  {type:'voice',text:'0:08',delay:4500},
  {type:'bot',html:'Отличный вопрос! &#128077;<br><br><b>ИИ-ассистент</b> — это бот, который общается как живой менеджер.',delay:3000},
  {type:'bot',html:'Он умеет:<br>&#10003; Отвечать клиентам <b>24/7</b><br>&#10003; Квалифицировать лиды<br>&#10003; Записывать на услуги<br>&#10003; Принимать оплату через <b>Kaspi</b><br>&#10003; Работать с возражениями',delay:2000},
  {type:'bot',html:'И главное — <b>не ошибается, не хамит, не уходит в отпуск</b> &#128640;',delay:1800},
  {type:'user',text:'А сколько стоит?',delay:5000},
  {type:'bot',html:'Зависит от задачи:<br><br>&#128312; <b>Мини-решение</b> — от $200<br>&#128313; <b>Базовый пакет</b> — от $500<br>&#128314; <b>Система под ключ</b> — индивидуально',delay:3000},
  {type:'bot',html:'Оплата в <b>2 этапа:</b><br>&#8226; 50% перед началом<br>&#8226; 50% перед запуском<br><br>Первая консультация — <b>бесплатно</b> &#127775;',delay:2000},
  {type:'user',text:'В WhatsApp работает?',delay:5000},
  {type:'bot',html:'Да! &#128242; Подключаем:<br><br>&#8226; <b>WhatsApp</b><br>&#8226; <b>Telegram</b><br>&#8226; <b>Instagram</b><br>&#8226; CRM и Google Sheets<br><br>Все каналы <b>одновременно</b>.',delay:3500},
  {type:'user',text:'Какие результаты у других?',delay:5000},
  {type:'bot',html:'&#128200; <b>Amadey Music</b> — 1 500+ сделок, 150+ продаж ИИ без менеджера<br><b>Personal Lawyer</b> — 3 807 лидов, конверсия 49.6%<br><b>KazGeoTech</b> — сотни заявок кандидатов, 85% без HR',delay:3500},
  {type:'bot',html:'Это реальные цифры наших клиентов &#128170;',delay:1800},
  {type:'user',text:'Как начать?',delay:5000},
  {type:'bot',html:'Напишите в <b>WhatsApp</b> — обсудим задачу за 15 минут и подберём решение.<br><br>&#128073; wa.me/77052051992',delay:3500},
  {type:'time',text:'— начнём заново —',delay:8000}
];
var typing=null;
var step=0;
var running=true;
var heroTimeout=null;

function showTyping(){
  typing=document.createElement('div');
  typing.className='hero-bot-typing';
  typing.innerHTML='<span></span><span></span><span></span>';
  box.appendChild(typing);
  box.scrollTop=box.scrollHeight;
}
function hideTyping(){
  if(typing&&typing.parentNode){typing.parentNode.removeChild(typing);typing=null;}
}
function addMsg(item){
  hideTyping();
  var el=document.createElement('div');
  if(item.type==='time'){
    el.className='hero-bot-time';
    el.textContent=item.text;
  }else if(item.type==='voice'){
    el.className='hero-bot-voice';
    var bars='';for(var b=0;b<18;b++){bars+='<span style="height:'+Math.round(4+Math.random()*14)+'px"></span>';}
    el.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5zM14 3.23v2.06A6.98 6.98 0 0121 12a6.98 6.98 0 01-7 6.71v2.06A9 9 0 0023 12 9 9 0 0014 3.23z"/></svg><div class="hero-bot-voice-bar">'+bars+'</div><span class="hero-bot-voice-dur">'+item.text+'</span>';
    el.onclick=function(){var a=document.getElementById('heroBotAudio');if(a){if(a.paused){a.load();var p=a.play();if(p&&p.catch)p.catch(function(){});}else{a.pause();}el.classList.toggle('playing');a.onended=function(){el.classList.remove('playing');};}};
  }else{
    el.className='hero-bot-msg hero-bot-msg--'+item.type;
    if(item.html){el.innerHTML=item.html;}else{el.textContent=item.text;}
  }
  box.appendChild(el);
  box.scrollTop=box.scrollHeight;
}
function playStep(){
  if(!running)return;
  if(step>=script.length){
    step=0;
    heroTimeout=setTimeout(function(){
      box.innerHTML='';
      playStep();
    },2000);
    return;
  }
  var item=script[step];
  if(item.type==='bot'){
    showTyping();
    var typingTime=800+Math.min(item.html?item.html.length:40,200)*5+Math.random()*600;
    heroTimeout=setTimeout(function(){
      addMsg(item);
      step++;
      heroTimeout=setTimeout(playStep,item.delay);
    },typingTime);
  }else if(item.type==='voice'){
    addMsg(item);
    step++;
    heroTimeout=setTimeout(playStep,item.delay);
  }else if(item.type==='user'){
    addMsg(item);
    step++;
    heroTimeout=setTimeout(playStep,item.delay);
  }else{
    addMsg(item);
    step++;
    heroTimeout=setTimeout(playStep,item.delay);
  }
}
// Start after page loads with a small delay
heroTimeout=setTimeout(playStep,1200);

// Pause when not visible
var observer=new IntersectionObserver(function(entries){
  running=entries[0].isIntersecting;
  if(!running){clearTimeout(heroTimeout);hideTyping()}
  else if(running&&step>0){heroTimeout=setTimeout(playStep,1000)}
},{threshold:0.1});
observer.observe(box.parentElement);
// Cleanup on page hide
document.addEventListener('visibilitychange',function(){
  if(document.hidden){clearTimeout(heroTimeout);running=false}
  else if(!running){running=true;heroTimeout=setTimeout(playStep,500)}
});
})();

document.addEventListener('DOMContentLoaded',function(){
  var ph=document.getElementById('qPhone');
  if(ph&&window.IMask){
    try{IMask(ph,{mask:'+{7} (000) 000-00-00'})}catch(e){}
  }
});

// TRUST PROGRESS BAR
(function(){
var tp=document.getElementById('trustProgress'),tf=document.getElementById('trustFill'),tt=document.getElementById('trustText');
if(!tp||!tf||!tt)return;
var heroH=document.querySelector('.hero');
var shown=false;
onScroll(function(){
  var scrollTop=window.pageYOffset||document.documentElement.scrollTop;
  var denom=document.documentElement.scrollHeight-window.innerHeight;
  if(denom<=0)return;
  var pct=Math.min(Math.round(scrollTop/denom*100),100);
  if(scrollTop>600&&pct<95){
    tp.classList.add('visible');shown=true;
  }else{
    tp.classList.remove('visible');
  }
  if(shown){
    tf.style.width=pct+'%';
    if(pct<40)tt.textContent='Изучено '+pct+'%';
    else if(pct<70)tt.textContent='Изучено '+pct+'% — обычно тут уже пишут';
    else tt.textContent='Изучено '+pct+'% — вы серьёзно подходите к делу';
  }
});
})();
// HUMAN TIMER
(function(){
var ht=document.getElementById('humanTimer'),hl=document.getElementById('humanTimerLabel');
if(!ht||!hl)return;
var startTime=Date.now();
var labels=['Ещё не прочитал сообщение...','Увидел, но занят...','Может быть обедает...','Или в отпуске...','Клиент уже ушёл к конкуренту'];
var humanInterval=null;
function humanTick(){
  var elapsed=Math.floor((Date.now()-startTime)/1000);
  var h=String(Math.floor(elapsed/3600)).padStart(2,'0');
  var m=String(Math.floor(elapsed%3600/60)).padStart(2,'0');
  var s=String(elapsed%60).padStart(2,'0');
  ht.textContent=h+':'+m+':'+s;
  if(elapsed<30)hl.textContent=labels[0];
  else if(elapsed<120)hl.textContent=labels[1];
  else if(elapsed<300)hl.textContent=labels[2];
  else if(elapsed<600)hl.textContent=labels[3];
  else hl.textContent=labels[4];
}
function startHuman(){if(humanInterval)return;humanTick();humanInterval=setInterval(humanTick,1000)}
function stopHuman(){if(humanInterval){clearInterval(humanInterval);humanInterval=null}}
var humanSection=ht.closest('section')||ht.parentElement;
var humanObs=new IntersectionObserver(function(entries){
if(entries[0].isIntersecting){startHuman()}else{stopHuman()}
},{threshold:0.1});
humanObs.observe(humanSection);
})();
// MAP TOOLTIPS
function showMapTipDiv(el){
  var tip=document.getElementById('mapTooltip'),wrap=document.getElementById('kzMap');
  if(!tip||!wrap)return;
  var city=el.getAttribute('data-city'),info=el.getAttribute('data-info');
  var safeCity=city.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');var safeInfo=info.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');tip.innerHTML='<div style="font-weight:700;margin-bottom:2px">'+safeCity+'</div><div style="color:var(--text-muted)">'+safeInfo+'</div>';
  var rect=el.getBoundingClientRect(),wRect=wrap.getBoundingClientRect();
  tip.style.left=(rect.left-wRect.left+rect.width/2)+'px';
  tip.style.top=(rect.top-wRect.top-40)+'px';
  tip.classList.add('show');
}
function hideMapTip(){var t=document.getElementById('mapTooltip');if(t)t.classList.remove('show')}
// INLINE DEMO CHAT
var inlineDemoSid='site-'+Date.now()+'-'+Math.random().toString(36).substring(2,8);
var inlineDemoUserCount=0;
function sendInlineDemo(){
  if(window._inlineSending)return;
  var input=document.getElementById('inlineDemoInput'),msgs=document.getElementById('inlineDemoMsgs');
  if(!input||!msgs)return;
  var text=input.value.trim();if(!text)return;
  window._inlineSending=true;
  input.value='';
  inlineDemoUserCount++;
  // user msg
  var um=document.createElement('div');
  um.style.cssText='font-size:13px;padding:10px 14px;background:var(--accent);color:#000;font-weight:500;border-radius:12px 12px 4px 12px;align-self:flex-end;max-width:80%';
  um.textContent=text;msgs.appendChild(um);
  msgs.scrollTop=msgs.scrollHeight;
  // typing
  var tp=document.createElement('div');
  tp.style.cssText='font-size:13px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:12px 12px 12px 4px;align-self:flex-start;color:var(--text-muted)';
  tp.innerHTML='<span style="animation:pulse 1.2s infinite">&#9679; &#9679; &#9679;</span>';
  msgs.appendChild(tp);msgs.scrollTop=msgs.scrollHeight;
  // AI response
  var controller=new AbortController();var timeoutId=setTimeout(function(){controller.abort()},15000);
  fetch('https://adsytd.space/webhook/dos-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,sessionId:inlineDemoSid}),signal:controller.signal})
  .then(function(r){if(!r.ok)throw new Error('Server error');return r.json()})
  .then(function(d){
    clearTimeout(timeoutId);
    tp.remove();
    var bm=document.createElement('div');
    bm.style.cssText='font-size:13px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:12px 12px 12px 4px;align-self:flex-start;max-width:80%';
    var replyText=d.reply||d.output||d.text||d.message||'Напишите в WhatsApp — обсудим подробнее!';
    var safeReply=replyText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');bm.innerHTML=safeReply.replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');
    msgs.appendChild(bm);msgs.scrollTop=msgs.scrollHeight;
    window._inlineSending=false;
    if(inlineDemoUserCount===3){
      setTimeout(function(){
        var cm=document.createElement('div');
        cm.style.cssText='font-size:13px;padding:10px 14px;background:var(--accent-dim);border:1px solid rgba(0,230,118,.25);border-radius:12px 12px 12px 4px;align-self:flex-start;max-width:85%';
        cm.innerHTML='Хотите такого же бота для вашего бизнеса? <a href="https://wa.me/77052051992" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700;text-decoration:underline">Напишите мне</a> \u2014 обсудим за 15 минут';
        msgs.appendChild(cm);msgs.scrollTop=msgs.scrollHeight;
      },1500);
    }
  }).catch(function(){
    tp.remove();
    window._inlineSending=false;
    var em=document.createElement('div');
    em.style.cssText='font-size:13px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:12px 12px 12px 4px;align-self:flex-start;max-width:80%';
    em.innerHTML='Сервер временно недоступен. Напишите в <a href="https://wa.me/77052051992" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">WhatsApp</a> — я отвечу лично за 15 минут.';
    msgs.appendChild(em);msgs.scrollTop=msgs.scrollHeight;
  });
}
var inlineDemoInputEl=document.getElementById('inlineDemoInput');if(inlineDemoInputEl)inlineDemoInputEl.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendInlineDemo()}});

(function(){
  var sideNav=document.getElementById('sideNav');
  if(!sideNav)return;
  var items=sideNav.querySelectorAll('.side-nav-item');
  var sectionIds=[];
  items.forEach(function(item){sectionIds.push(item.getAttribute('data-target'))});

  // Click/keyboard to scroll
  items.forEach(function(item){
    function nav(){var id=item.getAttribute('data-target');var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}
    item.addEventListener('click',nav);
    item.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();nav()}});
  });

  // Show/hide based on scroll position (visible after scrolling past hero)
  var lastActive='';
  function updateSideNav(){
    var scrollY=window.scrollY;
    var winH=window.innerHeight;
    // Show after 400px scroll
    if(scrollY>400){sideNav.classList.add('visible')}else{sideNav.classList.remove('visible')}
    // Find active section
    var current='';
    for(var i=sectionIds.length-1;i>=0;i--){
      var sec=document.getElementById(sectionIds[i]);
      if(sec&&sec.getBoundingClientRect().top<=winH*0.4){current=sectionIds[i];break}
    }
    if(current!==lastActive){
      lastActive=current;
      items.forEach(function(item){
        if(item.getAttribute('data-target')===current){item.classList.add('active')}
        else{item.classList.remove('active')}
      });
    }
  }
  onScroll(updateSideNav);
  updateSideNav();
})();

// Lite YouTube — load iframe on click
document.querySelectorAll('lite-yt').forEach(function(el){
el.addEventListener('click',function(){
var id=el.getAttribute('data-id');
var iframe=document.createElement('iframe');
iframe.src='https://www.youtube.com/embed/'+id+'?autoplay=1';
iframe.title=el.getAttribute('title')||'';
iframe.frameBorder='0';
iframe.allow='accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
iframe.allowFullscreen=true;
iframe.style.cssText='width:100%;height:100%;flex:1;border:none';
el.parentNode.replaceChild(iframe,el);
});
});

(function(){
  var lb=document.getElementById('lightbox');
  if(!lb)return;
  var lbImg=lb.querySelector('img');
  var lbClose=lb.querySelector('.lightbox-close');
  var origOverflow='';
  document.querySelectorAll('.review-media img').forEach(function(img){
    img.addEventListener('click',function(){
      var src=img.currentSrc||img.src;
      lbImg.src=src;
      lbImg.alt=img.alt;
      lb.classList.add('active');
      origOverflow=document.body.style.overflow;
      document.body.style.overflow='hidden';
      lbClose.focus();
    });
  });
  function close(){lb.classList.remove('active');document.body.style.overflow=origOverflow}
  lbClose.addEventListener('click',close);
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('active'))return;
    if(e.key==='Escape'){close();return}
    if(e.key==='Tab'){e.preventDefault();lbClose.focus()}
  });
})();

(function(){
  function sendToGA(metric){
    if(typeof gtag==='function'){
      gtag('event',metric.name,{
        event_category:'Web Vitals',
        event_label:metric.id,
        value:Math.round(metric.name==='CLS'?metric.delta*1000:metric.delta),
        non_interaction:true
      });
    }
  }
  var s=document.createElement('script');
  s.src='https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';s.crossOrigin='anonymous';
  s.onload=function(){
    try{
      webVitals.onCLS(sendToGA);
      webVitals.onFID(sendToGA);
      webVitals.onLCP(sendToGA);
    }catch(e){}
  };
  document.head.appendChild(s);
})();

// FAQ accordion — rotate indicator span on toggle
(function(){
document.querySelectorAll('details').forEach(function(det){
det.addEventListener('toggle',function(){
var span=det.querySelector('summary span');
if(span){span.style.transition='transform .3s ease';span.style.transform=det.open?'rotate(45deg)':'rotate(0deg)'}
});
});
})();

// Refactored inline onclick handlers
// Mobile toggle
var mt=document.querySelector('.mobile-toggle');
if(mt)mt.addEventListener('click',function(){
  this.closest('.navbar').classList.toggle('nav-open');
  this.setAttribute('aria-expanded',this.closest('.navbar').classList.contains('nav-open'));
});
// Objection accordion headers
document.querySelectorAll('.objection-header').forEach(function(btn){
  btn.addEventListener('click',function(){
    this.parentElement.classList.toggle('open');
    this.setAttribute('aria-expanded',this.parentElement.classList.contains('open'));
  });
});
// Benefit-more accordion buttons
document.querySelectorAll('.benefit-more').forEach(function(btn){
  btn.addEventListener('click',function(){
    this.closest('.benefit-card').classList.toggle('open');
    this.setAttribute('aria-expanded',this.closest('.benefit-card').classList.contains('open'));
  });
});
// Quiz option toggle (multi-select)
document.querySelectorAll('.quiz-option').forEach(function(opt){
  // Skip options that use qSelect (single-select with .qmark)
  if(opt.querySelector('.qmark'))return;
  opt.addEventListener('click',function(){this.classList.toggle('selected')});
});
// Quiz option single-select (qSelect)
document.querySelectorAll('.quiz-option').forEach(function(opt){
  if(!opt.querySelector('.qmark'))return;
  opt.addEventListener('click',function(){qSelect(this)});
});

// Stagger hero channels — add class for CSS-driven initial state
document.querySelectorAll('.hero-channel').forEach(function(ch,i){
  ch.classList.add('hero-channel--hidden');
  setTimeout(function(){ch.classList.remove('hero-channel--hidden');ch.classList.add('hero-channel--visible')},600+i*100);
});

// Trust stats count-up
(function(){
  var trustBar=document.querySelector('.trust-bar');
  if(!trustBar)return;
  var trustObs=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){
      trustBar.querySelectorAll('.trust-stat-num, [data-count]').forEach(function(el){
        var text=el.textContent;
        var match=text.match(/([\d\s]+)/);
        if(!match)return;
        var target=parseInt(match[1].replace(/\s/g,''),10);
        var suffix=text.replace(match[1],'');
        var start=0;var duration=1200;var startTime=null;
        function step(ts){
          if(!startTime)startTime=ts;
          var p=Math.min((ts-startTime)/duration,1);
          var eased=1-Math.pow(1-p,3);
          var current=Math.round(eased*target);
          el.textContent=current.toLocaleString('ru-RU').replace(/,/g,' ')+suffix;
          if(p<1)requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      trustObs.unobserve(trustBar);
    }
  },{threshold:.3});
  trustObs.observe(trustBar);
})();

// Project card tilt (disabled on touch/reduced-motion)
(function(){
  var prefersReduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch='ontouchstart' in window;
  if(prefersReduced||isTouch)return;
  document.querySelectorAll('.project-card').forEach(function(card){
    var rafId=null;
    card.addEventListener('mousemove',function(e){
      if(rafId)cancelAnimationFrame(rafId);
      rafId=requestAnimationFrame(function(){
        var rect=card.getBoundingClientRect();
        var x=(e.clientX-rect.left)/rect.width-.5;
        var y=(e.clientY-rect.top)/rect.height-.5;
        card.style.transform='perspective(800px) rotateY('+x*4+'deg) rotateX('+(-y*4)+'deg) scale(1.01)';
        rafId=null;
      });
    });
    card.addEventListener('mouseleave',function(){
      if(rafId){cancelAnimationFrame(rafId);rafId=null}
      card.style.transform='';card.style.transition='transform .4s ease';
      setTimeout(function(){card.style.transition=''},400);
    });
    card.addEventListener('mouseenter',function(){card.style.transition='none'});
  });
})();

// Video play button pulse
document.querySelectorAll('.abs-center, [class*="play"]').forEach(function(btn){
  btn.addEventListener('mouseenter',function(){btn.style.animation='playPulse 1s ease infinite'});
  btn.addEventListener('mouseleave',function(){btn.style.animation=''});
});

if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){/* SW registration failed - silent in production */})}

// FIX: Update urgency month dynamically
(function(){
  var el=document.getElementById('urgencyMonth');
  if(!el)return;
  var months=['В январе','В феврале','В марте','В апреле','В мае','В июне','В июле','В августе','В сентябре','В октябре','В ноябре','В декабре'];
  el.textContent=months[new Date().getMonth()];
})();

// FIX: Add ARIA live region for carousel page changes
(function(){
  var pageIndicator=document.querySelector('.carousel-page-indicator');
  if(pageIndicator){pageIndicator.setAttribute('aria-live','polite');pageIndicator.setAttribute('role','status')}
})();

// FIX: Lightbox trap focus to close button and prevent background scroll
(function(){
  var lb=document.getElementById('lightbox');
  if(!lb)return;
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Просмотр изображения');
})();

// FIX: Back to top smooth scroll with null check
(function(){
  var btt=document.getElementById('btt');
  if(!btt)return;
  btt.addEventListener('click',function(e){
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  });
})();

// FIX: Reduce motion - check and disable project card tilt
(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.project-card').forEach(function(card){
      card.style.transition='border-color .3s ease';
      card.onmousemove=null;
    });
  }
})();

// FIX: Inline demo input Enter key - prevent double send
var _inlineDemoDebounce=false;
var _origSendInlineDemo=window.sendInlineDemo;
window.sendInlineDemo=function(){
  if(_inlineDemoDebounce)return;
  _inlineDemoDebounce=true;
  if(typeof _origSendInlineDemo==='function')_origSendInlineDemo();
  setTimeout(function(){_inlineDemoDebounce=false},500);
};

// FIX: Event listeners for inline onclick handlers removed from HTML
// Quiz navigation buttons
document.querySelectorAll('[data-quiz-go]').forEach(function(btn){
  btn.addEventListener('click',function(){quizGo(+this.dataset.quizGo)});
});
// Demo quick message buttons
document.querySelectorAll('[data-demo-msg]').forEach(function(btn){
  btn.addEventListener('click',function(){if(typeof demoSend==='function')demoSend(this.dataset.demoMsg)});
});
// Demo chat send button
var demoSendBtn=document.getElementById('demoSendBtn');
if(demoSendBtn)demoSendBtn.addEventListener('click',function(){if(typeof demoSendInput==='function')demoSendInput()});
// Inline demo send button
var inlineDemoSendBtn=document.getElementById('inlineDemoSendBtn');
if(inlineDemoSendBtn)inlineDemoSendBtn.addEventListener('click',function(){if(typeof sendInlineDemo==='function')sendInlineDemo()});
// Exit popup close buttons
var exitCloseBtn=document.getElementById('exitCloseBtn');
if(exitCloseBtn)exitCloseBtn.addEventListener('click',function(){if(typeof closeExit==='function')closeExit()});
document.querySelectorAll('.exit-close-action').forEach(function(el){
  el.addEventListener('click',function(){if(typeof closeExit==='function')closeExit()});
});
// Map city tooltips (moved from inline onmouseenter/onmouseleave/onfocus/onblur)
document.querySelectorAll('.map-city').forEach(function(el){
  el.addEventListener('mouseenter',function(){if(typeof showMapTipDiv==='function')showMapTipDiv(el)});
  el.addEventListener('mouseleave',function(){if(typeof hideMapTip==='function')hideMapTip()});
  el.addEventListener('focus',function(){if(typeof showMapTipDiv==='function')showMapTipDiv(el)});
  el.addEventListener('blur',function(){if(typeof hideMapTip==='function')hideMapTip()});
});
// Side nav tabindex toggle — make items focusable when visible
(function(){
  var sideNav=document.getElementById('sideNav');
  if(!sideNav)return;
  var items=sideNav.querySelectorAll('.side-nav-item');
  function updateTabindex(){
    var visible=sideNav.classList.contains('visible');
    items.forEach(function(item){item.setAttribute('tabindex',visible?'0':'-1')});
  }
  var mo=new MutationObserver(updateTabindex);
  mo.observe(sideNav,{attributes:true,attributeFilter:['class']});
  updateTabindex();
})();
// Honeypot spam check for quiz
(function(){
  var origQuizGo=window.quizGo;
  if(!origQuizGo)return;
  var _quizGoWrapped=function(dir){
    var hp=document.getElementById('qWebsite');
    if(hp&&hp.value){return;}
    origQuizGo(dir);
  };
  window.quizGo=_quizGoWrapped;
})();