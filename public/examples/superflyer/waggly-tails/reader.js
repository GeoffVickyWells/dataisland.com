(function () {
  var book = document.querySelector('.book');
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var pw = parseFloat(book.dataset.pw), ph = parseFloat(book.dataset.ph);
  var count = document.querySelector('.count');
  var prev = document.querySelector('.prev'), next = document.querySelector('.next');
  var index = 0;
  var first = true;   // the opening page appears without a page-turn animation

  function fit() {
    var w = Math.min(window.innerWidth - 32, (window.innerHeight - 96) * pw / ph);
    book.style.width = w + 'px';
    book.style.height = (w * ph / pw) + 'px';
    book.style.setProperty('--u', (w / pw) + 'px');
  }

  function videos(page, play) {
    page.querySelectorAll('video').forEach(function (v) {
      if (play) { v.currentTime = 0; var p = v.play(); if (p) p.catch(function () {}); } else { v.pause(); }
    });
  }

  function show(n, forward) {
    if (n < 0 || n >= pages.length) return;
    var old = pages[index];
    if (old && n !== index) { old.className = 'page leaving'; videos(old, false);
      setTimeout(function () { if (old.classList.contains('leaving')) old.className = 'page'; }, 600); }
    var page = pages[n];
    var turn = page.dataset.turn || 'turn';
    page.className = 'page';
    void page.offsetWidth;   // restart animations
    page.className = 'page active' + (first || turn === 'none' || n === index ? '' : (forward ? ' enter-' : ' back-') + turn);
    first = false;
    videos(page, true);
    index = n;
    count.textContent = (n + 1) + ' / ' + pages.length;
    prev.disabled = n === 0;
    next.disabled = n === pages.length - 1;
    if (history.replaceState) history.replaceState(null, '', '#' + (n + 1));
  }

  prev.onclick = function () { show(index - 1, false); };
  next.onclick = function () { show(index + 1, true); };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); show(index + 1, true); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(index - 1, false); }
  });
  book.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    var r = book.getBoundingClientRect();
    if (e.clientX - r.left < r.width / 2) show(index - 1, false); else show(index + 1, true);
  });
  var startX = null;
  book.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  book.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { if (dx < 0) show(index + 1, true); else show(index - 1, false); }
    startX = null;
  });
  window.addEventListener('resize', fit);
  fit();
  var start = parseInt((location.hash || '#1').slice(1), 10);
  show(isNaN(start) ? 0 : Math.min(Math.max(start - 1, 0), pages.length - 1), true);
})();