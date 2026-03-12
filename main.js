// Scroll throttle — collect all scroll callbacks into one rAF-batched handler
var _scrollCbs=[];
function onScroll(fn){_scrollCbs.push(fn)}
(function(){var ticking=false;window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(function(){for(var i=0;i<_scrollCbs.length;i++)_scrollCbs[i]();ticking=false})}},{passive:true})})();
// GA4 Event Tracking
function gEvent(name,params){if(typeof gtag==='function')gtag('event',name,params||{})}
document.querySelectorAll('a[href*="wa.me"]').forEach(a=>a.addEventListener('click',()=>gEvent('whatsapp_click',{link_url:a.href})));
// Reveal
const ro=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){t.target.classList.add('visible');ro.unobserve(t.target)}})},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal,.reveal-children').forEach(e=>ro.observe(e));
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(l.getAttribute('href'));if(t){t.scrollIntoView({behavior:'smooth',block:'start'});document.querySelector('.navbar').classList.remove('nav-open')}})});
// Close mobile menu on outside click
document.addEventListener('click',function(e){var nav=document.querySelector('.navbar');if(nav.classList.contains('nav-open')&&!e.target.closest('.navbar')){nav.classList.remove('nav-open')}});
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
if(window.innerWidth<=768){
  var origPages=track.querySelectorAll('.review-page');
  origPages.forEach(function(pg){
    var cards=pg.querySelectorAll('.review-card');
    if(cards.length<=2)return;
    // Show all cards in original (they were hidden by CSS nth-child)
    cards.forEach(function(c){c.style.display=''});
    // Create new page for cards 3+
    var newPage=document.createElement('div');
    newPage.className='review-page review-page--mobile';
    for(var i=2;i<cards.length;i++)newPage.appendChild(cards[i]);
    pg.parentNode.insertBefore(newPage,pg.nextSibling);
  });
}
const pages=track.querySelectorAll('.review-page');
let current=0,total=pages.length;
function bD(){if(!dotsC)return;dotsC.innerHTML='';for(let i=0;i<total;i++){const d=document.createElement('div');d.className='carousel-dot'+(i===current?' active':'');d.onclick=()=>{userInteract();goTo(i)};dotsC.appendChild(d)}updatePageIndicator()}
var pageIndicator=document.createElement('div');pageIndicator.className='carousel-page-indicator';if(dotsC&&dotsC.parentNode)dotsC.parentNode.insertBefore(pageIndicator,dotsC.nextSibling);
function updatePageIndicator(){pageIndicator.textContent=(current+1)+'/'+total}
function goTo(i){track.querySelectorAll('video').forEach(v=>v.pause());current=Math.max(0,Math.min(i,total-1));track.style.transform='translateX(-'+(current*100)+'%)';document.querySelectorAll('.carousel-dot').forEach((d,idx)=>d.className='carousel-dot'+(idx===current?' active':''));updatePageIndicator()}
// --- Autoplay ---
let autoplayTimer=null,userStopped=false;
function autoAdv(){if(userStopped)return;goTo(current<total-1?current+1:0);autoplayTimer=setTimeout(autoAdv,10000)}
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
if(prevBtn)prevBtn.onclick=()=>{userInteract();goTo(current-1)};
if(nextBtn)nextBtn.onclick=()=>{userInteract();goTo(current+1)};
// Touch swipe
let sx=0;
track.addEventListener('touchstart',e=>{sx=e.touches[0].pageX;track.style.transition='none'},{passive:true});
track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].pageX-sx;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';if(Math.abs(dx)>50){userInteract();goTo(dx>0?current-1:current+1)}},{passive:true});
// Mouse drag
let md=false,mx=0;
track.addEventListener('mousedown',e=>{md=true;mx=e.pageX;track.style.transition='none'});
window.addEventListener('mouseup',()=>{if(md){md=false;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)'}});
track.addEventListener('mousemove',e=>{if(!md)return;const dx=e.pageX-mx;if(Math.abs(dx)>60){md=false;track.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';userInteract();goTo(dx>0?current-1:current+1)}});
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
function fmt(n){return n.toLocaleString('ru-RU')}
function lossRate(h){if(h<=0)return 0.05;if(h<=0.5)return 0.2;if(h<=1)return 0.35;if(h<=2)return 0.5;if(h<=4)return 0.65;if(h<=8)return 0.75;return 0.9}
function calc(){
const leads=+sR.value,check=+cR.value,conv=+cvR.value,hrs=tR?+tR.value:2;
sV.textContent=leads;cV.textContent=fmt(check);cvV.textContent=conv+'%';
if(tV)tV.textContent=hrs>0?hrs+' ч':'< 5 мин';
const curSales=Math.round(leads*conv/100);
const rev=curSales*check;
const newConv=Math.min(conv*1.3,100);
const newSales=Math.round(leads*newConv/100);
const newRev=newSales*check;
const diff=newRev-rev;
const lost=Math.round(leads*lossRate(hrs));
const saved=Math.round(lost*0.95);
oE.innerHTML=fmt(rev)+' &#8376;';nE.innerHTML=fmt(newRev)+' &#8376;';
dE.innerHTML='+'+fmt(diff)+' &#8376;';
if(lE)lE.textContent=lost+' заявок/мес';
if(svE)svE.textContent='+'+saved+' заявок/мес';
const totalExtra=diff+Math.round(saved*check*newConv/100);
var yearlyVal=totalExtra*12;
yE.innerHTML='+'+fmt(yearlyVal)+' &#8376;/год';
var hl=document.getElementById('calcHighlight');
if(hl){if(yearlyVal>5000000){hl.style.display=''}else{hl.style.display='none'}}
}
sR.oninput=calc;cR.oninput=calc;cvR.oninput=calc;if(tR)tR.oninput=calc;calc();
// Mini calculator sync
var miniEl=document.getElementById('miniCalcLoss');
if(miniEl){
function miniCalc(){var l=+sR.value,c=+cR.value,cv=+cvR.value,h=+tR.value;var lost=Math.round(l*lossRate(h));var dailyLoss=Math.round(lost*c*cv/100/30);miniEl.textContent='~'+fmt(dailyLoss)+' ₸/день';if(miniEl.parentElement){var lastDiv=miniEl.parentElement.querySelector('div:last-of-type');if(lastDiv)lastDiv.textContent='при '+l+' заявок/мес и среднем чеке '+fmt(c)+' ₸'}}
sR.addEventListener('input',miniCalc);cR.addEventListener('input',miniCalc);cvR.addEventListener('input',miniCalc);tR.addEventListener('input',miniCalc);miniCalc();
}
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
else if(ph.replace(/\D/g,'').length<11){errP.textContent='Номер должен быть +7 (XXX) XXX-XX-XX';errP.classList.add('show');phoneI.classList.add('error');hasErr=true}
if(hasErr)return;
var submitBtn=document.getElementById('quizNext');
submitBtn.disabled=true;submitBtn.style.opacity='.6';submitBtn.style.pointerEvents='none';submitBtn.textContent='Отправляем...';
const answers={};document.querySelectorAll('.quiz-step').forEach((s,i)=>{if(i<qTotal-1){const sel=s.querySelectorAll('.quiz-option.selected');answers['step'+(i+1)]=Array.from(sel).map(o=>o.textContent.trim()).join(', ')||'не выбрано'}});
const data={name:nm,phone:ph,niche:ni,answers:answers,source:'dos-site-quiz',timestamp:new Date().toISOString()};
fetch('https://adsytd.space/webhook/dos-quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).finally(function(){
gEvent('quiz_submit',{niche:ni,name:nm});
window.location.href='thank-you.html?name='+encodeURIComponent(nm)+'&niche='+encodeURIComponent(ni||'');
});
return;
}
if(dir===1&&qStep<qTotal-1){const cur=document.querySelectorAll('.quiz-step')[qStep];if(!cur.querySelector('.quiz-option.selected')){cur.style.animation='shake .4s';setTimeout(()=>{cur.style.animation=''},400);var hint=cur.querySelector('.quiz-hint');if(!hint){hint=document.createElement('div');hint.className='quiz-hint';hint.style.cssText='color:#ff5252;font-size:13px;font-family:var(--mono);margin-top:12px;animation:fadeInUp .3s ease';hint.textContent='Выберите хотя бы один вариант';cur.querySelector('.quiz-options').after(hint);setTimeout(()=>{if(hint.parentNode)hint.remove()},3000)}return}}
const next=qStep+dir;
if(next<0||next>=qTotal)return;
if(next===qTotal-1&&dir===1){document.getElementById('quizNext').textContent='Отправить заявку \u2192'}
else{document.getElementById('quizNext').textContent='Далее \u2192'}
steps[qStep].classList.remove('active');
qStep=next;
steps[qStep].classList.add('active');
bars.forEach((b,i)=>b.classList.toggle('active',i<=qStep));
document.getElementById('quizBack').style.display=qStep>0?'block':'none';
var stepText=document.getElementById('quizStepText');if(stepText){var remaining=qTotal-(qStep+1);stepText.textContent='Шаг '+(qStep+1)+' из '+qTotal+(remaining>0?' — осталось '+remaining:'');}
}
// Demo Chat — Real AI via n8n webhook
(function(){
const toggle=document.getElementById('demoToggle'),win=document.getElementById('demoWindow'),closeBtn=document.getElementById('demoClose'),msgs=document.getElementById('demoMessages'),input=document.getElementById('demoInput'),typing=document.getElementById('demoTyping');
if(!toggle||!win||!closeBtn||!msgs||!input||!typing)return;
const CHAT_URL='https://adsytd.space/webhook/dos-chat';
const sessionId='site-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);
let sending=false;
var dtt=document.getElementById('demoTooltip');
setTimeout(function(){if(dtt)dtt.style.display='none'},8000);
toggle.addEventListener('click',()=>{if(dtt)dtt.style.display='none';win.classList.toggle('open');toggle.style.display=win.classList.contains('open')?'none':'flex';if(win.classList.contains('open')){gEvent('demo_chat_open');var ib=document.getElementById('heroBotMsgs');if(ib)ib.closest('.hero-bot').style.opacity='.3'}else{var ib=document.getElementById('heroBotMsgs');if(ib)ib.closest('.hero-bot').style.opacity='1'}});
closeBtn.addEventListener('click',()=>{win.classList.remove('open');toggle.style.display='flex'});
input.addEventListener('keydown',e=>{if(e.key==='Enter')demoSendInput()});
function addMsg(text,cls){const d=document.createElement('div');d.className='demo-msg '+cls;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
window.demoSend=async function(text){
if(sending)return;
sending=true;
addMsg(text,'user');
typing.classList.add('show');
input.disabled=true;
try{
var ac=new AbortController();var tid=setTimeout(function(){ac.abort()},15000);
const res=await fetch(CHAT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,sessionId:sessionId}),signal:ac.signal});
clearTimeout(tid);
const data=await res.json();
typing.classList.remove('show');
addMsg(data.output||data.text||data.message||data.reply||'Произошла ошибка. Напишите нам в WhatsApp: +7 705 205 1992','bot');
}catch(e){
typing.classList.remove('show');
addMsg('Не удалось связаться с сервером. Напишите в WhatsApp: +7 705 205 1992','bot');
}
input.disabled=false;
input.focus();
sending=false;
};
window.demoSendInput=function(){const v=input.value.trim();if(!v)return;demoSend(v);input.value=''};
})();

(function(){
let shown=false;
function showExit(){
  if(shown)return;
  if(sessionStorage.getItem('exitShown'))return;
  shown=true;
  sessionStorage.setItem('exitShown','1');
  var ep=document.getElementById('exitPopup');
  if(ep)ep.classList.add('show');
  if(typeof gEvent==='function')gEvent('exit_popup_shown');
}
window.closeExit=function(){var ep=document.getElementById('exitPopup');if(ep)ep.classList.remove('show')};
document.addEventListener('mouseout',function(e){
  if(!e.relatedTarget&&e.clientY<5)showExit();
});
var exitPopupEl=document.getElementById('exitPopup');
if(exitPopupEl){exitPopupEl.addEventListener('click',function(e){
  if(e.target===this)closeExit();
});}
let scrollDepth=0;
onScroll(function(){
  var pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  if(pct>scrollDepth)scrollDepth=pct;
});
setTimeout(function(){if(scrollDepth>60&&!shown)showExit()},45000);
})();

// Back to top visibility
onScroll(function(){var btt=document.getElementById('btt');if(btt)btt.classList.toggle('visible',window.scrollY>600)});
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
setInterval(function(){
words[i].classList.remove('active');words[i].classList.add('exit');
i=(i+1)%words.length;
words[i].classList.remove('exit');words[i].classList.add('active');
setTimeout(function(){words.forEach(function(w){if(!w.classList.contains('active'))w.classList.remove('exit')})},500);
},2500);
})();
// Pain counter — ticks up to show lost leads
(function(){
var el=document.getElementById('painCounter'),count=0;
if(!el)return;
function tick(){
count++;el.textContent=count;
el.classList.add('bump');setTimeout(function(){el.classList.remove('bump')},300);
}
setTimeout(function(){tick();setInterval(tick,4000)},2000);
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
  {type:'bot',html:'&#128200; <b>Amadey Music</b> — 1 500+ сделок, ~130 продаж ИИ без менеджера<br><b>Personal Lawyer</b> — 3 807 лидов, конверсия 49.6%<br><b>KazGeoTech</b> — 500+ заявок, 85% без менеджера',delay:3500},
  {type:'bot',html:'Это реальные цифры наших клиентов &#128170;',delay:1800},
  {type:'user',text:'Как начать?',delay:5000},
  {type:'bot',html:'Напишите в <b>WhatsApp</b> — обсудим задачу за 15 минут и подберём решение.<br><br>&#128073; wa.me/77052051992',delay:3500},
  {type:'time',text:'— начнём заново —',delay:8000}
];
var typing=null;
var step=0;
var running=true;

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
    setTimeout(function(){
      box.innerHTML='';
      playStep();
    },2000);
    return;
  }
  var item=script[step];
  if(item.type==='bot'){
    showTyping();
    var typingTime=800+Math.min(item.html?item.html.length:40,200)*5+Math.random()*600;
    setTimeout(function(){
      addMsg(item);
      step++;
      setTimeout(playStep,item.delay);
    },typingTime);
  }else if(item.type==='voice'){
    addMsg(item);
    step++;
    setTimeout(playStep,item.delay);
  }else if(item.type==='user'){
    addMsg(item);
    step++;
    setTimeout(playStep,item.delay);
  }else{
    addMsg(item);
    step++;
    setTimeout(playStep,item.delay);
  }
}
// Start after page loads with a small delay
setTimeout(playStep,1200);

// Pause when not visible
var observer=new IntersectionObserver(function(entries){
  running=entries[0].isIntersecting;
},{threshold:0.1});
observer.observe(box.parentElement);
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
var messages=['Изучено ','На этом этапе клиенты уже пишут в WhatsApp','Вы почти дочитали — осталось чуть-чуть'];
onScroll(function(){
  var scrollTop=window.pageYOffset||document.documentElement.scrollTop;
  var docHeight=document.documentElement.scrollHeight-window.innerHeight;
  var pct=Math.min(Math.round(scrollTop/docHeight*100),100);
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
setInterval(function(){
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
},1000);
})();
// MAP TOOLTIPS
function showMapTipDiv(el){
  var tip=document.getElementById('mapTooltip'),wrap=document.getElementById('kzMap');
  if(!tip||!wrap)return;
  var city=el.getAttribute('data-city'),info=el.getAttribute('data-info');
  tip.innerHTML='<div style="font-weight:700;margin-bottom:2px">'+city+'</div><div style="color:var(--text-muted)">'+info+'</div>';
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
  var input=document.getElementById('inlineDemoInput'),msgs=document.getElementById('inlineDemoMsgs');
  if(!input||!msgs)return;
  var text=input.value.trim();if(!text)return;
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
  .then(function(r){return r.json()})
  .then(function(d){
    clearTimeout(timeoutId);
    tp.remove();
    var bm=document.createElement('div');
    bm.style.cssText='font-size:13px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:12px 12px 12px 4px;align-self:flex-start;max-width:80%';
    bm.textContent=d.output||d.text||d.message||d.reply||'Напишите в WhatsApp — обсудим подробнее!';
    msgs.appendChild(bm);msgs.scrollTop=msgs.scrollHeight;
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
    var em=document.createElement('div');
    em.style.cssText='font-size:13px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:12px 12px 12px 4px;align-self:flex-start;max-width:80%';
    em.textContent='Интересная задача! Я могу помочь автоматизировать общение с клиентами в вашей нише. Напишите мне в WhatsApp — разберём ваш случай за 15 минут.';
    msgs.appendChild(em);msgs.scrollTop=msgs.scrollHeight;
  });
}
var inlineDemoInputEl=document.getElementById('inlineDemoInput');if(inlineDemoInputEl)inlineDemoInputEl.addEventListener('keydown',function(e){if(e.key==='Enter')sendInlineDemo()});

(function(){
  var sideNav=document.getElementById('sideNav');
  if(!sideNav)return;
  var items=sideNav.querySelectorAll('.side-nav-item');
  var sectionIds=[];
  items.forEach(function(item){sectionIds.push(item.getAttribute('data-target'))});

  // Click to scroll
  items.forEach(function(item){
    item.addEventListener('click',function(){
      var id=this.getAttribute('data-target');
      var el=document.getElementById(id);
      if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
    });
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
iframe.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%';
el.parentNode.replaceChild(iframe,el);
});
});

(function(){
  var lb=document.getElementById('lightbox');
  if(!lb)return;
  var lbImg=lb.querySelector('img');
  var lbClose=lb.querySelector('.lightbox-close');
  document.querySelectorAll('.review-media img').forEach(function(img){
    img.addEventListener('click',function(){
      var src=img.currentSrc||img.src;
      lbImg.src=src;
      lbImg.alt=img.alt;
      lb.classList.add('active');
      document.body.style.overflow='hidden';
    });
  });
  function close(){lb.classList.remove('active');document.body.style.overflow=''}
  lbClose.addEventListener('click',close);
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('active'))close()});
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
  s.src='https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
  s.onload=function(){
    try{
      webVitals.onCLS(sendToGA);
      webVitals.onFID(sendToGA);
      webVitals.onLCP(sendToGA);
    }catch(e){}
  };
  document.head.appendChild(s);
})();

if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(err){console.warn('SW registration failed:',err)})}