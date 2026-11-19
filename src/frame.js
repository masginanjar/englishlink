// Pengaman clickjacking. Direktif frame-ancestors tidak berlaku lewat <meta> CSP,
// dan GitHub Pages tidak bisa mengirim header X-Frame-Options.
(function () {
  if (window.top === window.self) return;
  try { window.top.location = window.self.location; }
  catch (e) { /* bingkai lintas-asal menolak navigasi; header Cloudflare/Vercel yang menutup celah ini */ }
})();
