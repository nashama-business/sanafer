// Modern small JS for theme toggle and copy links
(function(){
  const toast = document.getElementById('toast');

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(()=> toast.classList.remove('show'), 2500);
  }

  // theme: default to dark (no toggle button)
  // remove any data-theme attribute so root CSS variables (dark) apply
  document.documentElement.removeAttribute('data-theme');

  // no copy button — feature removed per request

  // ripple effect for link buttons
  function addRipple(e){
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    circle.style.position = 'absolute';
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 60%)';
    circle.style.borderRadius = '50%';
    circle.style.pointerEvents = 'none';
    circle.style.transform = 'scale(0)';
    circle.style.opacity = '0.9';
    circle.style.transition = 'transform 420ms ease-out, opacity 420ms ease-out';
    btn.style.position = 'relative';
    btn.appendChild(circle);
    requestAnimationFrame(()=>{
      circle.style.transform = 'scale(1)';
      circle.style.opacity = '0';
    });
    setTimeout(()=> circle.remove(), 520);
  }

  document.querySelectorAll('.link-btn').forEach(b=> b.addEventListener('click', addRipple));

  // ensure footer news text link opens even if some overlay blocks default anchor click
  const newsLink = document.querySelector('.news-link');
  if(newsLink){
    newsLink.addEventListener('click', function(e){
      // If default prevented or click on non-anchor, force open
      if(e.defaultPrevented) return;
      const href = this.getAttribute('href');
      if(href){
        // open in new tab
        window.open(href, '_blank', 'noopener');
        e.preventDefault();
      }
    });
  }

})();