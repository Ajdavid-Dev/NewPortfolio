/* Renders a case study from window.PROJECTS based on the ?p= in the URL. */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const PROJECTS = window.PROJECTS || {};

  /* theme */
  const stored = localStorage.getItem('theme');
  if (stored){ root.classList.toggle('dark', stored==='dark'); root.classList.toggle('light', stored!=='dark'); }
  const syncIcons = () => { const d=root.classList.contains('dark'); document.querySelector('.moon').classList.toggle('hidden',d); document.querySelector('.sun').classList.toggle('hidden',!d); };
  syncIcons();
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const d=!root.classList.contains('dark'); root.classList.toggle('dark',d); root.classList.toggle('light',!d);
    localStorage.setItem('theme', d?'dark':'light'); syncIcons();
  });

  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const key = new URLSearchParams(location.search).get('p');
  const p = PROJECTS[key];
  const out = document.getElementById('case-root');

  if (!p){
    out.innerHTML = `<div class="pt-24 text-center">
      <p class="label mb-3">404</p>
      <h1 class="font-bold text-3xl tracking-tight">Project not found</h1>
      <p class="mt-3 text-[color:var(--muted)]">That case study doesn't exist yet.</p>
      <a href="index.html#work" class="inline-block mt-6 btn btn-dark px-6 py-3 text-sm font-semibold">See all work</a>
    </div>`;
    return;
  }

  document.title = p.title + " — David Ajala";

  const mediaBlock = (src, cls, label, ratio) =>
    `<div class="card ${src?'':cls}" style="aspect-ratio:${ratio}">${
      src ? `<img src="${esc(src)}" alt="${esc(p.title)}" class="w-full h-full object-cover">`
          : `<div class="w-full h-full grid place-items-center"><span class="label text-white/70">${esc(label)}</span></div>`
    }</div>`;

  out.innerHTML = `
    <section class="pt-10 sm:pt-14 reveal in">
      <div class="flex flex-wrap gap-x-3 gap-y-1 label mb-4">
        <span>${esc(p.category)}</span><span>·</span><span>${esc(p.role)}</span><span>·</span><span>${esc(p.year)}</span>
      </div>
      <h1 class="font-bold tracking-tight leading-[1.05] text-[clamp(2rem,5vw,3.4rem)]">${esc(p.title)}</h1>
      <p class="mt-5 text-lg leading-relaxed text-[color:var(--muted)] max-w-2xl">${esc(p.summary)}</p>
    </section>

    <div class="mt-9 reveal">${mediaBlock(p.cover, p.coverClass, p.coverClass + ' · cover image', '16/9')}</div>

    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 reveal">
      <div class="card p-5"><p class="label mb-1">Role</p><p class="font-semibold text-sm">${esc(p.role)}</p></div>
      <div class="card p-5"><p class="label mb-1">Timeline</p><p class="font-semibold text-sm">${esc(p.timeline)}</p></div>
      <div class="card p-5"><p class="label mb-1">Team</p><p class="font-semibold text-sm">${esc(p.team)}</p></div>
      <div class="card p-5"><p class="label mb-1">Platform</p><p class="font-semibold text-sm">${esc(p.platform)}</p></div>
    </section>

    <section class="mt-14 sm:mt-20 grid md:grid-cols-3 gap-8 reveal">
      <h2 class="font-bold text-2xl tracking-tight md:col-span-1">The challenge</h2>
      <p class="md:col-span-2 text-lg leading-relaxed text-[color:var(--muted)]">${esc(p.challenge)}</p>
    </section>

    <section class="mt-14 sm:mt-20 grid md:grid-cols-3 gap-8 reveal">
      <h2 class="font-bold text-2xl tracking-tight md:col-span-1">What I did</h2>
      <ol class="md:col-span-2 space-y-4">
        ${p.approach.map((a,i)=>`<li class="flex gap-4"><span class="shrink-0 w-7 h-7 grid place-items-center rounded-full text-xs font-semibold" style="background:var(--accent-soft);color:var(--accent)">${String(i+1).padStart(2,'0')}</span><span class="text-lg leading-relaxed text-[color:var(--muted)] pt-0.5">${esc(a)}</span></li>`).join('')}
      </ol>
    </section>

    <section class="mt-14 sm:mt-20 grid sm:grid-cols-2 gap-4 sm:gap-5 reveal">
      ${p.gallery.map((g,i)=>mediaBlock(g, p.galleryClass[i]||'ph1', (p.galleryClass[i]||'ph1') + ' · detail', '4/3')).join('')}
    </section>

    <section class="mt-14 sm:mt-20 reveal">
      <h2 class="font-bold text-2xl tracking-tight mb-6">Outcome</h2>
      <div class="grid grid-cols-3 gap-4 sm:gap-5">
        ${p.outcomes.map(o=>`<div class="card p-6"><div class="font-bold text-3xl sm:text-4xl tracking-tight">${esc(o.v)}</div><p class="label mt-1.5">${esc(o.l)}</p></div>`).join('')}
      </div>
    </section>

    <section class="mt-16 sm:mt-24 card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 reveal" style="background:var(--accent)">
      <div>
        <p class="text-white/70 font-medium text-sm">Next project</p>
        <a href="case.html?p=${esc(p.next)}" class="font-bold text-2xl sm:text-3xl tracking-tight text-white hover:underline">${esc(PROJECTS[p.next] ? PROJECTS[p.next].title : 'See more work')} →</a>
      </div>
      <a href="index.html#contact" class="btn bg-white text-[#141414] px-6 py-3 text-sm font-semibold whitespace-nowrap">Work with me</a>
    </section>
  `;

  if (reduce){ document.querySelectorAll('.reveal').forEach(r=>r.classList.add('in')); }
  else {
    const io = new IntersectionObserver((es)=>{ es.forEach((e,i)=>{ if(e.isIntersecting){ e.target.style.transitionDelay=(i%4)*60+'ms'; e.target.classList.add('in'); io.unobserve(e.target);} }); }, { threshold:0.1, rootMargin:'0px 0px -6% 0px' });
    document.querySelectorAll('.reveal:not(.in)').forEach(r=>io.observe(r));
  }
})();
