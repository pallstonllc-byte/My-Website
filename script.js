(function(){
  // Nav scroll state
  var nav = document.getElementById('siteNav');
  function onScroll(){
    if(window.scrollY > 40){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Hero convergence mark: trigger shortly after load
  var mark = document.getElementById('heroMark');
  if(mark){
    setTimeout(function(){ mark.classList.add('converged'); }, 450);
  }

  // Progress rail: show once hero is scrolled past, track active pillar section
  var rail = document.getElementById('rail');
  var railItems = document.querySelectorAll('.rail-item');
  var sections = ['pillars','analyze','transform'].map(function(id){ return document.getElementById(id); });
  var heroEl = document.getElementById('home');

  railItems.forEach(function(item){
    item.addEventListener('click', function(){
      var id = item.getAttribute('data-target');
      var el = document.getElementById(id);
      if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  function updateRail(){
    var heroBottom = heroEl.getBoundingClientRect().bottom;
    if(heroBottom < 0){ rail.classList.add('visible'); } else { rail.classList.remove('visible'); }

    var active = 0;
    sections.forEach(function(sec, i){
      if(!sec) return;
      var rect = sec.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.5){ active = i; }
    });
    railItems.forEach(function(item, i){
      item.classList.toggle('active', i === active);
    });
  }
  window.addEventListener('scroll', updateRail, {passive:true});
  updateRail();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinksEl = document.getElementById('navLinks');
  var navScrim = document.getElementById('navScrim');
  function closeMobileNav(){
    navLinksEl.classList.remove('open');
    navScrim.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMobileNav(){
    var isOpen = navLinksEl.classList.toggle('open');
    navScrim.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }
  if(navToggle){
    navToggle.addEventListener('click', toggleMobileNav);
    navScrim.addEventListener('click', closeMobileNav);
    navLinksEl.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMobileNav);
    });
  }

  // Smooth-scroll for in-page nav links
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  const prStages = [
    { title: "Legacy State", desc: "Manual workflows, siloed systems, compliance gaps" },
    { title: "Assess & Map", desc: "Current-state audit and modernization roadmap definition" },
    { title: "Redesign", desc: "Digital workflow redesign and system integration planning" },
    { title: "Modernize", desc: "Platform integration and automation rollout" },
    { title: "Modernized State", desc: "Integrated platforms, automated controls, audit-ready" },
  ];
  const prN = prStages.length;
  const prRoot = document.getElementById("pr-list");

  const prRows = [], prMarkers = [], prFills = [];

  prStages.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "pr-stage-row";
    row.dataset.index = i;

    const markerCol = document.createElement("div");
    markerCol.className = "pr-marker-col";

    const marker = document.createElement("div");
    marker.className = "pr-marker" + (i === 0 ? " pr-start" : "");
    marker.innerHTML = '<span class="pr-marker-dot"></span><span class="pr-marker-check">✓</span>';
    markerCol.appendChild(marker);

    if (i < prN - 1) {
      const connector = document.createElement("div");
      connector.className = "pr-connector";
      const fill = document.createElement("div");
      fill.className = "pr-fill";
      connector.appendChild(fill);
      markerCol.appendChild(connector);
      prFills.push(fill);
    }

    const content = document.createElement("div");
    content.className = "pr-stage-content";
    content.innerHTML = '<div class="pr-stage-title">' + s.title + '</div><div class="pr-stage-desc">' + s.desc + '</div>';

    row.appendChild(markerCol);
    row.appendChild(content);
    prRoot.appendChild(row);

    prRows.push(row);
    prMarkers.push(marker);

    row.addEventListener("click", function() { prAnimateTo(i / (prN - 1), 900); });
  });

  prRows[0].classList.add("pr-reached");

  function prEase(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  let prProgress = 0;
  let prRaf = null;
  const prPctEl = document.getElementById("pr-pct");

  function prRender(p) {
    prPctEl.textContent = Math.round(p * 100) + "%";
    const logical = p * (prN - 1);

    for (let i = 0; i < prN; i++) {
      const reached = logical >= i - 0.001;
      const isFinal = i === prN - 1;
      prMarkers[i].classList.toggle("pr-active", reached && i !== 0 && !isFinal);
      prMarkers[i].classList.toggle("pr-final", reached && isFinal);
      prRows[i].classList.toggle("pr-reached", reached);
      prRows[i].classList.toggle("pr-final-reached", reached && isFinal);
    }
    for (let i = 0; i < prFills.length; i++) {
      const h = Math.max(0, Math.min(1, logical - i)) * 100;
      prFills[i].style.height = h + "%";
    }
  }

  function prAnimateTo(target, duration) {
    if (prRaf) cancelAnimationFrame(prRaf);
    const start = prProgress;
    const delta = target - start;
    const t0 = performance.now();
    function step(now) {
      const t = Math.min(1, (now - t0) / duration);
      prProgress = start + delta * prEase(t);
      prRender(prProgress);
      if (t < 1) prRaf = requestAnimationFrame(step);
      else { prProgress = target; prRender(prProgress); }
    }
    prRaf = requestAnimationFrame(step);
  }

  prRender(0);
  setTimeout(function() { prAnimateTo(1, 3200); }, 700);

  document.getElementById("pr-replay-btn").addEventListener("click", function() {
    prAnimateTo(0, 500);
    setTimeout(function() { prAnimateTo(1, 3200); }, 600);
  });
});
