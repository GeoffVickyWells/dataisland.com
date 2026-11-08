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

  // Page curl: a fold line sweeps from the bottom-right corner; the page left of it
  // stays flat and the rest flips over it, showing the paper's back (same geometry as
  // the app's Preview).
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var shadow = document.createElement('div'); shadow.className = 'curl-shadow';
  var flap = document.createElement('div'); flap.className = 'curl-flap';
  shadow.appendChild(flap); book.appendChild(shadow);
  function fold(t, w, h) {
    var bx = w - t * 1.45 * w, tx = bx + 0.5 * w * (1 - t) + 0.06 * w;
    return [{ x: tx, y: 0 }, { x: bx, y: h }];
  }
  function clipRect(w, h, a, b) {   // corners left of a→b, clipped to the line
    function side(p) { return (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x); }
    var c = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }], out = [];
    for (var i = 0; i < 4; i++) {
      var p = c[i], q = c[(i + 1) % 4], sp = side(p), sq = side(q);
      if (sp >= 0) out.push(p);
      if ((sp >= 0) !== (sq >= 0)) { var k = sp / (sp - sq); out.push({ x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k }); }
    }
    return out;
  }
  function mirror(p, a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy;
    var k = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l, fx = a.x + dx * k, fy = a.y + dy * k;
    return { x: 2 * fx - p.x, y: 2 * fy - p.y };
  }
  function poly(pts) { return 'polygon(' + pts.map(function (p) { return p.x + 'px ' + p.y + 'px'; }).join(',') + ')'; }
  function curl(top, under, away, done) {
    var w = book.clientWidth, h = book.clientHeight, start = null, ms = 800;
    top.style.zIndex = 3; under.style.zIndex = 2;
    top.style.visibility = 'visible'; under.style.visibility = 'visible';
    shadow.style.display = 'block';
    var finished = false;
    function end() {
      if (finished) return;
      finished = true;
      shadow.style.display = 'none';
      top.style.clipPath = ''; top.style.zIndex = ''; top.style.visibility = '';
      under.style.zIndex = ''; under.style.visibility = '';
      done();
    }
    // Browsers pause animation frames in background tabs; the turn still completes.
    setTimeout(end, ms + 150);
    function frame(now) {
      if (finished) return;
      if (start === null) start = now;
      var e = Math.min(1, (now - start) / ms); e = e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
      var t = away ? e : 1 - e, line = fold(t, w, h);
      top.style.clipPath = poly(clipRect(w, h, line[0], line[1]));
      flap.style.clipPath = poly(clipRect(w, h, line[1], line[0]).map(function (p) { return mirror(p, line[0], line[1]); }));
      if ((now - start) < ms) { requestAnimationFrame(frame); return; }
      end();
    }
    requestAnimationFrame(frame);
  }

  function show(n, forward) {
    if (n < 0 || n >= pages.length) return;
    var old = pages[index];
    var page = pages[n];
    var turn = page.dataset.turn || 'turn';
    if (turn === 'curl' && !first && !reduced && old && n !== index) {
      videos(old, false);
      page.className = 'page active';
      old.className = 'page leaving';
      // Forward: the old page curls away over the new one. Back: the new page uncurls on top.
      curl(forward ? old : page, forward ? page : old, forward, function () {
        if (old.classList.contains('leaving')) old.className = 'page';
      });
      finish(page, n);
      return;
    }
    if (old && n !== index) { old.className = 'page leaving'; videos(old, false);
      setTimeout(function () { if (old.classList.contains('leaving')) old.className = 'page'; }, 600); }
    page.className = 'page';
    void page.offsetWidth;   // restart animations
    page.className = 'page active' + (first || turn === 'none' || n === index ? '' : (forward ? ' enter-' : ' back-') + turn);
    finish(page, n);
  }

  function finish(page, n) {
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
    var sound = e.target.closest('.sound');
    if (sound) {
      var v = sound.parentNode.querySelector('video');
      v.muted = !v.muted; if (!v.muted) { v.currentTime = 0; v.play(); }
      sound.textContent = v.muted ? '🔊' : '🔇';
      return;
    }
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