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
