// Interaksi ringan: menu mobile dan formulir estimasi -> pesan WhatsApp. Tidak ada data yang disimpan.
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-menu]');
    if (btn) {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.body.classList.toggle('nav-open', !open);
      return;
    }
    if (e.target.closest && e.target.closest('.nav a')) document.body.classList.remove('nav-open');
  });
  // Menu dropdown: satu terbuka dalam satu waktu, tutup saat klik di luar
  document.addEventListener('click', function (e) {
    var sum = e.target.closest && e.target.closest('.has-mega summary');
    document.querySelectorAll('.has-mega details[open]').forEach(function (d) {
      if (!sum || d !== sum.parentNode) { if (!d.contains(e.target) || e.target.closest('a')) d.removeAttribute('open'); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-mega details[open]').forEach(function (d) { d.removeAttribute('open'); });
      document.body.classList.remove('nav-open');
      var b = document.querySelector('[data-menu]');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });
  function update(form) {
    var m = JSON.parse(form.getAttribute('data-msg'));
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var lines = [(v('name') ? m[0] + ' ' + v('name') : m[0].replace(/,.*$/, '')) + '.', m[1] + ' ' + v('service') + '.'];
    if (v('doc')) lines.push(m[2] + ' ' + v('doc'));
    if (v('deadline')) lines.push(m[3] + ' ' + v('deadline'));
    lines.push(m[4]);
    var link = form.querySelector('[data-wa-link]');
    link.href = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(lines.join('\n'));
  }
  ['input', 'change'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      var form = e.target.closest && e.target.closest('[data-wa-form]');
      if (form) update(form);
    });
  });
  document.addEventListener('click', function (e) {
    var dot = e.target.closest && e.target.closest('[data-dot]');
    if (!dot) return;
    var track = document.querySelector('[data-slides]');
    if (track) track.scrollTo({ left: Number(dot.getAttribute('data-dot')) * track.clientWidth, behavior: 'smooth' });
  });
  document.addEventListener('scroll', function (e) {
    var t = e.target;
    if (!t || !t.matches || !t.matches('[data-slides]')) return;
    var n = Math.round(t.scrollLeft / t.clientWidth);
    document.querySelectorAll('[data-dot]').forEach(function (d, i) { d.classList.toggle('on', i === n); });
  }, true);
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-filter] button');
    if (!b) return;
    var k = b.getAttribute('data-k');
    b.parentNode.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
    document.querySelectorAll('.posts li').forEach(function (li) { li.hidden = !!k && li.getAttribute('data-k') !== k; });
  });
  // Popup status admin: jujur mengikuti jam layanan 08.00–20.00 WIB, bukan status palsu
  var popClosed = false;
  try { popClosed = sessionStorage.getItem('el-pop') === '1'; } catch (err) {}
  function showPop() {
    var pop = document.querySelector('[data-online]');
    if (!pop || popClosed || pop.getAttribute('data-ready')) return;
    var h = (new Date().getUTCHours() + 7) % 24;
    var on = h >= 8 && h < 20;
    pop.querySelector('[data-online-text]').textContent = pop.getAttribute(on ? 'data-on' : 'data-off');
    pop.classList.toggle('is-on', on);
    pop.setAttribute('data-ready', '1');
    pop.hidden = false;
  }
  setTimeout(function () { showPop(); setInterval(showPop, 1500); }, 4000);
  document.addEventListener('click', function (e) {
    if (!(e.target.closest && e.target.closest('[data-online-close]'))) return;
    popClosed = true;
    try { sessionStorage.setItem('el-pop', '1'); } catch (err) {}
    document.querySelectorAll('[data-online]').forEach(function (p) { p.hidden = true; });
  });
  document.addEventListener('submit', function (e) {
    if (e.target.matches && e.target.matches('[data-wa-form]')) e.preventDefault();
  });
})();
