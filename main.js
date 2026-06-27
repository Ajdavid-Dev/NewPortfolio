/* Homepage interactions: theme, menu, scroll-reveal, counters,
   "How I work" tabs, testimonials carousel, magnetic buttons. */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* Theme */
  const stored = localStorage.getItem('theme');
  if (stored){ root.classList.toggle('dark', stored==='dark'); root.classList.toggle('light', stored!=='dark'); }
  const syncIcons = () => {
    const dark = root.classList.contains('dark');
    document.querySelector('.moon').classList.toggle('hidden', dark);
    document.querySelector('.sun').classList.toggle('hidden', !dark);
  };
  syncIcons();
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark); root.classList.toggle('light', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light'); syncIcons();
  });

  /* Menu */
  const menu = document.getElementById('menu'), menuBtn = document.getElementById('menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', open); menuBtn.setAttribute('aria-expanded', String(!open));
  });
  document.querySelectorAll('.menu-link').forEach(a => a.addEventListener('click', () => { menu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded','false'); }));

  /* Reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reduce){ reveals.forEach(r => r.classList.add('in')); }
  else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const sibs = Array.from(e.target.parentElement.children).filter(c => c.classList.contains('reveal'));
        e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target),6)*70 + 'ms';
        e.target.classList.add('in'); io.unobserve(e.target);
      });
    }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
    reveals.forEach(r => io.observe(r));
  }

  /* Counters */
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el=e.target, target=+el.dataset.count, suffix=el.dataset.suffix||'';
      if (reduce){ el.textContent=target+suffix; cIO.unobserve(el); return; }
      const dur=1400, t0=performance.now();
      const tick=(t)=>{ const p=Math.min((t-t0)/dur,1); el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix; if(p<1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); cIO.unobserve(el);
    });
  }, { threshold:0.5 });
  document.querySelectorAll('[data-count]').forEach(c => cIO.observe(c));

  /* How I work — step tabs.  EDIT the wording here. */
  const steps = [
    ['01 Discovery Call', "First we have a discovery call to align on your goals, users, and constraints. This sets a shared vision and the foundation for a focused, successful collaboration."],
    ['02 Research & Strategy', "I dig into users, competitors, and the problem space, then turn findings into a clear strategy — what we build, for whom, and why it matters."],
    ['03 Wireframe & Prototype', "Low-fidelity flows first, then interactive prototypes. We test the structure of ideas before investing in pixels."],
    ['04 Design & Test', "High-fidelity interface design backed by a system, validated with real users so decisions are evidence-led, not opinion-led."],
    ['05 Launch & Iterate', "Ship, measure, and refine. I partner with engineering through launch and keep improving against real-world data."],
  ];
  const titleEl = document.querySelector('[data-step-title]');
  const bodyEl = document.querySelector('[data-step-body]');
  document.querySelectorAll('.step-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const i = +tab.dataset.i;
      document.querySelectorAll('.step-tab').forEach(t => { t.classList.remove('btn-dark'); t.classList.add('text-[color:var(--muted)]'); });
      tab.classList.add('btn-dark'); tab.classList.remove('text-[color:var(--muted)]');
      titleEl.textContent = steps[i][0]; bodyEl.textContent = steps[i][1];
    });
  });

  /* Testimonials carousel */
  const track = document.getElementById('t-track');
  const slides = track ? track.children.length : 0;
  let idx=0, timer; const dotsWrap = document.getElementById('t-dots');
  for (let i=0;i<slides;i++){ const d=document.createElement('button'); d.className='w-2.5 h-2.5 rounded-full transition'; d.style.background=i===0?'var(--accent)':'var(--hairline)'; d.setAttribute('aria-label','Go to testimonial '+(i+1)); d.addEventListener('click',()=>go(i)); dotsWrap.appendChild(d); }
  function go(n){ idx=(n+slides)%slides; track.style.transform=`translateX(-${idx*100}%)`; [...dotsWrap.children].forEach((d,i)=>d.style.background=i===idx?'var(--accent)':'var(--hairline)'); restart(); }
  function restart(){ if(reduce) return; clearInterval(timer); timer=setInterval(()=>go(idx+1),6000); }
  document.getElementById('t-next')?.addEventListener('click',()=>go(idx+1));
  document.getElementById('t-prev')?.addEventListener('click',()=>go(idx-1));
  if (slides) restart();

  /* Magnetic primary buttons */
  if (!reduce && window.matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => { const r=el.getBoundingClientRect(); el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.28}px)`; });
      el.addEventListener('mouseleave', () => el.style.transform='');
    });
  }
})();
