(() => {
  const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dot')],prev=document.querySelector('.prev'),next=document.querySelector('.next'),menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks'),hero=document.querySelector('.hero');
  const heroMessages=[
    {eyebrow:'WATER · ENVIRONMENT · CONSTRUCTION',title:'Engineering water systems that keep life moving.',copy:'From groundwater exploration and borehole drilling to water treatment, construction and environmental engineering.'},
    {eyebrow:'TREATMENT · DESIGN · DELIVERY',title:'Water infrastructure designed for real-world conditions.',copy:'Audits, testing, design and engineering of practical treatment solutions.'},
    {eyebrow:'STEEL · TANKS · NETWORKS',title:'Built with technical depth. Delivered with discipline.',copy:'Steel structures, storage tanks, pipe networking and related construction operations.'}
  ];
  slides.forEach((slide,i)=>{const h=slide.querySelector('h1,h2'),p=slide.querySelector('.eyebrow'),copy=slide.querySelector('.copy');if(heroMessages[i]){if(h)h.textContent=heroMessages[i].title;if(p)p.textContent=heroMessages[i].eyebrow;if(copy)copy.textContent=heroMessages[i].copy;}});
  let current=0,timer,paused=false;
  function show(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>{const on=n===current;s.classList.toggle('active',on);s.setAttribute('aria-hidden',String(!on))});dots.forEach((d,n)=>d.classList.toggle('active',n===current))}
  function start(){clearInterval(timer);timer=setInterval(()=>{if(!paused&&!document.hidden)show(current+1)},6500)}
  prev?.addEventListener('click',()=>{show(current-1);start()});next?.addEventListener('click',()=>{show(current+1);start()});dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);start()}));hero?.addEventListener('mouseenter',()=>paused=true);hero?.addEventListener('mouseleave',()=>paused=false);hero?.addEventListener('focusin',()=>paused=true);hero?.addEventListener('focusout',()=>paused=false);
  let startX=null;hero?.addEventListener('touchstart',e=>startX=e.changedTouches[0].screenX,{passive:true});hero?.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].screenX-startX;if(Math.abs(dx)>45){show(current+(dx<0?1:-1));start()}startX=null},{passive:true});
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation')}));
  start();
})();