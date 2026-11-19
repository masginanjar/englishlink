// Englishlink Translator — generator situs statis.
// Jalankan: `npm run build` (hasil di dist/) atau `npm run preview` (satu file demo di preview/index.html).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import id from './src/data/id.mjs';
import en from './src/data/en.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = 'https://englishlink.co.id';
const WA_NUMBER = '6285174132344';
const WA_DISPLAY = { id: '0851-7413-2344', en: '+62 851-7413-2344' };
const EMAIL = 'info@englishlink.co.id';
const PREVIEW = process.env.PREVIEW === '1';
// Akun media sosial. Untuk sementara semua ikon diarahkan ke Instagram (permintaan pemilik); ganti IG dengan alamat akun aslinya kalau sudah ada.
const IG = 'https://www.instagram.com/englishlink.co.id/';
const SOCIAL = [
  ['Instagram', IG, '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'],
  ['Threads', IG, '<path d="M16.5 11.2c-.3-3-2-4.7-4.6-4.7-2.8 0-4.9 2.100-4.900 5.500s2.100 5.500 5 5.500c2.600 0 4.300-1.300 4.300-3.200 0-1.800-1.500-2.900-3.700-2.900-1.700 0-2.900.800-2.900 2"/>'],
  ['X', IG, '<path d="M5 4l14 16M19 4L5 20"/>'],
  ['YouTube', IG, '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="M10.500 9.500v5l4.500-2.500z" fill="currentColor"/>'],
  ['LinkedIn', IG, '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.500V17M8 7.500v.1M12 17v-3.500a2 2 0 0 1 4 0V17M12 10.500V17"/>'],
].filter((x) => x[1]);
const socialLinks = (cls = 'social') => (SOCIAL.length ? `<ul class="${cls}">${SOCIAL.map(([n, u, d]) => `<li><a href="${u}" rel="me noopener" aria-label="${n} Englishlink"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg><span>${n}</span></a></li>`).join('')}</ul>` : '');
// Selama belum pakai domain sendiri (belum ada file CNAME), situs tayang di sub-folder GitHub Pages.
const BASE = fs.existsSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'CNAME')) ? '' : (process.env.BASE_PATH || '');
const withBase = (h) => (BASE ? h.replace(/(href|src)="\//g, `$1="${BASE}/`).replace('url=/id/', `url=${BASE}/id/`) : h);
const LANGS = { id, en };

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const arrow = '<svg class="arr" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const waIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.3-.4.300-.4.700-1.300.1-.2 0-.3 0-.5l-.800-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.300-.200.300-.900.900-.900 2.200s.900 2.500 1.100 2.700c.100.200 1.900 2.900 4.600 4 1.700.700 2.300.700 3.200.600.500-.100 1.500-.600 1.700-1.200.200-.600.200-1.100.100-1.200 0-.2-.2-.200-.4-.300Z"/></svg>';
const stamp = (text) => `<svg class="stamp" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="sp" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs><circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.5"/><text font-size="10.5" font-weight="700" letter-spacing="2.2" fill="currentColor"><textPath href="#sp">${text}</textPath></text><text x="60" y="57" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">EN ⇄ ID</text><text x="60" y="72" text-anchor="middle" font-size="7.500" font-weight="700" letter-spacing="1.500" fill="currentColor">ENGLISHLINK</text></svg>`;

const ICONS = {
  swap: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  stamp: '<path d="M9 3h6v5l2 4v2H7v-2l2-4zM5 18h14M6 21h12"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c2 2 10 2 12 0v-4.5M22 9v6"/>',
  building: '<path d="M4 21V5l8-2v18M12 9h8v12M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c1-2 5-2 6 0M15 10h3M15 14h3"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
  users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6M15 20c0-2 1-4 3-4s3 1 3 3"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  scale: '<path d="M12 4v16M6 20h12M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',
  bank: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.500-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
};
const ico = (n) => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.doc}</svg>`;
const SVC_ICONS = ['swap', 'globe', 'stamp', 'cap', 'building', 'idcard', 'scan'];
const DOC_ICONS = ['users', 'cap', 'idcard', 'heart', 'building', 'scale', 'bank'];
const hl = (t) => esc(t).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

// Foto hero (opsional): dibuat oleh tools/prep-hero.py
const HERO = fs.existsSync(path.join(ROOT, 'src/img/hero.json')) ? JSON.parse(read('src/img/hero.json')) : [];
const heroSrc = (h) => (PREVIEW ? `data:image/webp;base64,${fs.readFileSync(path.join(ROOT, 'src/img', h.file)).toString('base64')}` : `/assets/img/${h.file}`);
const photo = (n, alt) => (HERO[n] ? `<img class="slide-photo" src="${heroSrc(HERO[n])}" alt="${esc(alt)}" width="${HERO[n].w}" height="${HERO[n].h}"${n ? ' loading="lazy"' : ' fetchpriority="high"'}>` : '');
const photoAttr = (n) => (HERO[n] ? ` has-photo${HERO[n].light ? ' on-light' : ''}" style="background-color:${HERO[n].bg}` : '');

// Gambar cover (kartu layanan dan artikel). File ada di src/img/covers/<nama>.webp
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const coverImg = (name, alt = '', cls = 'cover') => `<img class="${cls}" ${PREVIEW ? `src="${BLANK}" data-img="${name}"` : `src="/assets/img/covers/${name}.webp"`} alt="${esc(alt)}" width="800" height="450" loading="lazy">`;
const DEFAULT_COVER = 'periksa';
const DOC_COVERS = ['stempel', 'ijazah', 'svc-5', 'svc-2', 'svc-4', 'timbangan', 'periksa'];
// Cover bertulisan: panel warna + judul singkat + ilustrasi. Dipakai artikel dan halaman kota.
const textCover = (key, kicker, text, img) => { let h = 0; for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % 997; return `<div class="tcover tc${h % 4}${text.length > 38 ? ' long' : ''}"><div class="tc-text"><span class="tc-kicker">${esc(kicker)}</span><strong>${esc(text)}</strong><span class="tc-brand">englishlink.co.id</span></div>${coverImg(img, '', 'tc-img')}</div>`; };

// ---------- Artikel ----------
function parsePost(file, lang) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Frontmatter tidak ditemukan: ${file}`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1');
  }
  for (const k of ['title', 'description', 'date', 'answer']) if (!fm[k]) throw new Error(`"${k}" wajib diisi: ${file}`);
  const body = m[2].trim();
  const faq = [];
  const faqPart = body.split(/^## FAQ\s*$/m)[1];
  if (faqPart) {
    for (const block of faqPart.split(/^### /m).slice(1)) {
      const [q, ...rest] = block.split('\n');
      faq.push({ q: q.trim(), a: rest.join(' ').replace(/\s+/g, ' ').trim() });
    }
  }
  const slug = path.basename(file, '.md');
  const words = body.split(/\s+/).length;
  const cover = fm.cover && fs.existsSync(path.join(ROOT, 'src/img/covers', `${fm.cover}.webp`)) ? fm.cover : DEFAULT_COVER;
  return { ...fm, cover, slug, lang, faq, html: marked.parse(body), minutes: Math.max(2, Math.round(words / 200)), updated: fm.updated || fm.date };
}
function loadPosts(lang) {
  const dir = path.join(ROOT, 'src/content/blog', lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parsePost(path.join(dir, f), lang))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}
const fmtDate = (d, lang) => new Date(d + 'T00:00:00Z').toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// ---------- Komponen ----------
const btnWa = (t, msg, cls = 'btn btn-wa') => `<a class="${cls}" href="${wa(msg)}" rel="noopener">${waIcon}<span>${esc(t)}</span></a>`;
const sectionHead = (title, lead, link) => `<div class="sec-head"><h2>${hl(title)}</h2>${lead ? `<p>${esc(lead)}</p>` : ''}${link ? `<a class="more" href="${link.href}">${esc(link.label)} ${arrow}</a>` : ''}</div>`;
const cards = (L, items, cls = '') => `<ul class="cards ${cls}">${items.map((c, i) => `<li><a class="card${c.cover ? ' has-cover' : ''}" href="${c.href}">${c.cover ? coverImg(c.cover) : `<span class="ico t${i % 4}">${ico(c.icon)}</span>`}<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><span class="more">${esc(L.ui.readMore)} ${arrow}</span></a></li>`).join('')}</ul>`;
const stepsList = (steps) => `<ol class="steps">${steps.map((s, i) => `<li><span class="step-n">${i + 1}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('')}</ol>`;
const faqList = (faq) => `<div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
const points = (items) => `<ul class="points">${items.map((p) => `<li><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join('')}</ul>`;
const ticks = (items) => `<ul class="ticks">${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
const crumbsHtml = (crumbs) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<li><a href="${c.href}">${esc(c.label)}</a></li>` : `<li aria-current="page">${esc(c.label)}</li>`)).join('')}</ol></nav>`;
const pageHero = (L, crumbs, h1, lead, extra = '', cover = '') => `<section class="page-hero"><div class="wrap${cover ? ' ph-grid' : ''}"><div>${crumbsHtml(crumbs)}<h1>${esc(h1)}</h1><p class="lead">${esc(lead)}</p>${extra}</div>${cover ? coverImg(cover, '', 'ph-cover') : ''}</div></section>`;

function quoteForm(L) {
  const f = L.ui.form;
  return `<section class="sec form-sec" id="estimasi"><div class="wrap form-grid">
  <div><h2>${hl(f.title)}</h2><p>${esc(f.lead)}</p><ul class="ticks">${[L.ui.hours, L.ui.address].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
  <form class="quote" data-wa-form data-wa="${WA_NUMBER}" data-msg='${esc(JSON.stringify(f.msg))}'>
    <label>${esc(f.name)}<input name="name" autocomplete="name"></label>
    <label>${esc(f.service)}<select name="service">${L.services.map((s) => `<option>${esc(s.title)}</option>`).join('')}</select></label>
    <label>${esc(f.doc)}<input name="doc" placeholder="${esc(f.docPh)}"></label>
    <label>${esc(f.deadline)}<input name="deadline" placeholder="${esc(f.deadlinePh)}"></label>
    <a class="btn btn-wa btn-block" data-wa-link href="${wa(f.fallback)}" rel="noopener">${waIcon}<span>${esc(f.submit)}</span></a>
  </form></div></section>`;
}
const ctaBand = (L) => `<section class="sec"><div class="wrap"><div class="band"><div><h2>${esc(L.ui.ctaBand.title)}</h2><p>${esc(L.ui.ctaBand.text)}</p></div>${btnWa(L.ui.waCta, L.ui.form.fallback, 'btn btn-white')}</div></div></section>`;
const postCards = (L, posts) => `<ul class="posts">${posts.map((p) => `<li data-k="${esc(p.kicker || L.ui.kicker)}"><a class="post-card" href="${L.paths.blog}${p.slug}/">${textCover(p.slug, p.kicker || L.ui.kicker, p.coverText || p.title, p.cover)}<time datetime="${p.date}">${fmtDate(p.date, L.lang)}</time><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="more">${esc(L.ui.readMore)} ${arrow}</span></a></li>`).join('')}</ul>`;

// ---------- Schema ----------
const orgSchema = (L) => ({
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${SITE}/#org`, name: 'Englishlink Translator', url: `${SITE}${L.paths.home}`,
  description: L.meta.home.desc, telephone: `+${WA_NUMBER}`, email: EMAIL,
  parentOrganization: { '@type': 'Organization', name: 'PT. Penerjemah Tersumpah Indonesia' },
  address: { '@type': 'PostalAddress', streetAddress: 'Caraka Tower', addressLocality: 'Jakarta Selatan', addressRegion: 'DKI Jakarta', addressCountry: 'ID' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '20:00' }],
  areaServed: 'ID', knowsLanguage: ['id', 'en'], sameAs: [...new Set(SOCIAL.map((x) => x[1]))], priceRange: 'Mulai Rp75.000',
});
const faqSchema = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const crumbSchema = (crumbs) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: SITE + c.href })) });

// ---------- Halaman ----------
const pages = [];
const add = (p) => pages.push(p);

for (const L of Object.values(LANGS)) {
  const P = L.paths, U = L.ui, lang = L.lang;
  const posts = P.blog ? loadPosts(lang) : [];
  L._posts = posts;
  const homeCrumb = { label: U.home, href: P.home };
  const svcHref = (i) => `${P.services}${L.services[i].slug}/`;
  const docHref = (i) => `${P.docs}${L.docTypes[i].slug}/`;
  const svcCard = (i) => ({ href: svcHref(i), title: L.services[i].title, text: L.services[i].short, icon: SVC_ICONS[i], cover: `svc-${i}` });
  const docCard = (i) => ({ href: docHref(i), title: L.docTypes[i].title, text: L.docTypes[i].short, icon: DOC_ICONS[i], cover: DOC_COVERS[i] });

  // Beranda
  const H = L.home;
  const chip = (icon, label, cls) => `<span class="chip ${cls}">${ico(icon)}${esc(label)}</span>`;
  const slideBtns = (primaryHref, primaryLabel, msg) => `<div class="actions"><a class="btn btn-cta" href="${primaryHref}">${esc(primaryLabel)} ${arrow}</a>${btnWa(U.waCta, msg, 'btn btn-white')}</div>`;
  const slides = [
    `<div class="slide s-blue${photoAttr(0)}">${photo(0, H.photoAlt[0])}<div class="slide-text"><p class="pill">${esc(H.eyebrow)}</p><h1>${H.h1}</h1><p class="lead">${esc(H.lead)}</p>${slideBtns('#estimasi', U.estimateCta, U.form.fallback)}</div>
      <div class="art" aria-hidden="true"><div class="doc doc-a"><span class="tag">ID</span><b>${esc(H.docA)}</b><i></i><i></i><i class="s"></i><i></i></div><span class="swap">⇄</span><div class="doc doc-b"><span class="tag">EN</span><b>${esc(H.docB)}</b><i></i><i></i><i class="s"></i><i></i>${stamp('SWORN TRANSLATION • TERJEMAHAN TERSUMPAH • ')}</div></div></div>`,
    ...H.slides.map((sl, k) => `<div class="slide ${k ? 's-coral' : 's-amber'}${photoAttr(k + 1)}">${photo(k + 1, H.photoAlt[k + 1])}<div class="slide-text"><p class="pill">${esc(sl.tag)}</p><p class="slide-title">${esc(sl.title)}</p><p class="lead">${esc(sl.text)}</p>${slideBtns(svcHref(sl.service), U.readMore, `${U.form.fallback} (${L.services[sl.service].title})`)}</div>
      <div class="art art-chips" aria-hidden="true"><span class="big">${ico(SVC_ICONS[sl.service])}</span>${sl.chips.map((c, n) => chip('doc', c, `c${n}`)).join('')}</div></div>`),
  ];
  add({ lang, key: 'home', path: P.home, ...L.meta.home, schema: [orgSchema(L), faqSchema(L.faq.slice(0, 4))], body: `
<section class="hero"><div class="wrap"><div class="slides" data-slides tabindex="0" aria-label="${esc(H.eyebrow)}">${slides.join('')}</div>
<div class="dots">${slides.map((_, n) => `<button type="button" data-dot="${n}"${n ? '' : ' class="on"'} aria-label="Slide ${n + 1}"></button>`).join('')}</div></div></section>
<section class="trust"><div class="wrap trust-in"><p>${esc(H.trustLabel)}</p><ul>${[['bank', H.price], ['clock', U.hours], ['pin', U.address], ['phone', H.facts[2]]].map(([i, t]) => `<li>${ico(i)}<span>${esc(t)}</span></li>`).join('')}</ul></div></section>
<section class="sec"><div class="wrap">${sectionHead(H.servicesTitle, H.servicesLead)}${cards(L, L.services.map((s, i) => svcCard(i)), 'four')}</div></section>
<section class="sec"><div class="wrap"><div class="extra"><div><h3>${esc(H.extraTitle)}</h3><p>${esc(H.extraText)}</p></div>${btnWa(U.waCta, H.extraWa, 'btn btn-amber')}</div></div></section>
<section class="sec sec-soft"><div class="wrap">${sectionHead(H.whyTitle, H.whyLead)}<div class="why-grid"><div class="why-photo">${coverImg('orang-2', H.photoAlt[1], 'photo')}<span class="chip c0">${ico('check')}${esc(H.why[1].t)}</span><span class="chip c2">${ico('clock')}${esc(H.why[2].t)}</span></div><ul class="why">${H.why.map((w, n) => `<li><span class="ico">${ico(['swap', 'check', 'clock', 'phone'][n])}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></li>`).join('')}</ul></div></div></section>
<section class="sec"><div class="wrap">${sectionHead(H.stepsTitle, H.stepsLead)}${stepsList(L.steps)}</div></section>
<section class="sec sec-soft"><div class="wrap">${sectionHead(H.docsTitle, H.docsLead)}${cards(L, L.docTypes.map((d, i) => docCard(i)), 'four')}</div></section>
${posts.length ? `<section class="sec"><div class="wrap">${sectionHead(H.blogTitle, '', { href: P.blog, label: U.seeAll })}${postCards(L, posts.slice(0, 3))}</div></section>` : ''}
<section class="sec ${posts.length ? 'sec-soft' : ''}"><div class="wrap narrow">${sectionHead(H.faqTitle, '', { href: P.faq, label: U.seeAll })}${faqList(L.faq.slice(0, 4))}</div></section>
${quoteForm(L)}` });

  // Layanan
  let crumbs = [homeCrumb, { label: U.nav.services, href: P.services }];
  add({ lang, key: 'services', path: P.services, ...L.meta.services, schema: [crumbSchema(crumbs)], body: `${pageHero(L, crumbs, L.servicesPage.h1, L.servicesPage.lead)}
<section class="sec"><div class="wrap">${cards(L, L.services.map((s, i) => svcCard(i)))}
<div class="extra"><div><h3>${esc(L.home.extraTitle)}</h3><p>${esc(L.home.extraText)}</p></div>${btnWa(U.waCta, L.home.extraWa, 'btn btn-amber')}</div></div></section>${ctaBand(L)}` });
  L.services.forEach((s, i) => {
    const c = [...crumbs, { label: s.title, href: svcHref(i) }];
    const others = L.services.map((o, j) => ({ o, j })).filter((x) => x.j !== i).slice(0, 3);
    add({ lang, key: `service:${i}`, path: svcHref(i), title: `${s.title} | Englishlink Translator`, desc: s.lead.slice(0, 158),
      schema: [crumbSchema(c), { '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.lead, serviceType: 'Sworn translation', provider: { '@id': `${SITE}/#org` }, areaServed: 'ID', url: SITE + svcHref(i) }],
      body: `${pageHero(L, c, s.title, s.lead, `<div class="actions">${btnWa(U.waCta, `${U.form.fallback} (${s.title})`)}<a class="btn btn-ghost" href="#estimasi">${esc(U.estimateCta)} ${arrow}</a></div>`, `svc-${i}`)}
<section class="sec"><div class="wrap two">
  <div><h2>${esc(U.docsCommon)}</h2>${ticks(s.docs)}<div class="note"><h3>${esc(U.sendTitle)}</h3><p>${esc(U.sendText)}</p></div></div>
  <div><h2>${esc(U.goodToKnow)}</h2>${points(s.points)}</div>
</div></section>
<section class="sec sec-tint"><div class="wrap">${sectionHead(L.home.stepsTitle, L.home.stepsLead)}${stepsList(L.steps)}</div></section>
<section class="sec"><div class="wrap">${sectionHead(U.relatedServices)}${cards(L, others.map(({ j }) => svcCard(j)), 'three')}</div></section>
${quoteForm(L)}` });
  });

  // Jenis dokumen
  crumbs = [homeCrumb, { label: U.nav.docs, href: P.docs }];
  add({ lang, key: 'docs', path: P.docs, ...L.meta.docs, schema: [crumbSchema(crumbs)], body: `${pageHero(L, crumbs, L.docsPage.h1, L.docsPage.lead)}
<section class="sec"><div class="wrap">${cards(L, L.docTypes.map((d, i) => docCard(i)))}<p class="req">${esc(U.reqNote)}</p></div></section>${ctaBand(L)}` });
  L.docTypes.forEach((d, i) => {
    const c = [...crumbs, { label: d.title, href: docHref(i) }];
    add({ lang, key: `doc:${i}`, path: docHref(i), title: lang === 'id' ? `Terjemahan ${d.title} | Englishlink` : `${d.title} | Englishlink`, desc: d.lead.slice(0, 158), schema: [crumbSchema(c)],
      body: `${pageHero(L, c, d.title, d.lead, `<div class="actions">${btnWa(U.waCta, `${U.form.fallback} (${d.title})`)}</div>`, DOC_COVERS[i])}
<section class="sec"><div class="wrap two">
  <div><h2>${esc(U.includes)}</h2>${ticks(d.items)}</div>
  <div><h2>${esc(U.checkBefore)}</h2>${ticks(d.tips)}<p class="req">${esc(U.reqNote)}</p></div>
</div></section>
<section class="sec sec-tint"><div class="wrap">${sectionHead(U.relatedServices)}${cards(L, d.services.map((j) => svcCard(j)), 'three')}</div></section>
<section class="sec"><div class="wrap">${sectionHead(U.otherDocs)}<ul class="chips">${L.docTypes.map((o, j) => (j === i ? '' : `<li><a href="${docHref(j)}">${esc(o.title)} ${arrow}</a></li>`)).join('')}</ul></div></section>
${quoteForm(L)}` });
  });

  // Cara kerja
  crumbs = [homeCrumb, { label: U.nav.how, href: P.how }];
  add({ lang, key: 'how', path: P.how, ...L.meta.how, schema: [crumbSchema(crumbs), { '@context': 'https://schema.org', '@type': 'HowTo', name: L.howPage.h1, step: L.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.t, text: s.d })) }],
    body: `${pageHero(L, crumbs, L.howPage.h1, L.howPage.lead)}
<section class="sec"><div class="wrap">${stepsList(L.steps)}</div></section>
<section class="sec sec-tint"><div class="wrap two"><div><h2>${esc(L.prepareTitle)}</h2>${ticks(L.prepare)}</div><div>${coverImg('orang-3', L.home.photoAlt[2], 'photo wide')}<div class="note"><h3>${esc(U.sendTitle)}</h3><p>${esc(U.sendText)}</p></div></div></div></section>${quoteForm(L)}` });

  // Tentang
  crumbs = [homeCrumb, { label: U.nav.about, href: P.about }];
  const A = L.about;
  add({ lang, key: 'about', path: P.about, ...L.meta.about, schema: [crumbSchema(crumbs), orgSchema(L)], body: `${pageHero(L, crumbs, A.h1, A.lead)}
<section class="sec"><div class="wrap two"><div class="prose">${A.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
<div>${coverImg('orang-1', L.home.photoAlt[0], 'photo wide')}<div class="idcard"><h2>${esc(A.identityTitle)}</h2><dl>${A.identity.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div></div></div></section>
<section class="sec sec-tint"><div class="wrap">${sectionHead(A.standardsTitle)}${points(A.standards)}</div></section>
<section class="sec"><div class="wrap narrow"><h2>${esc(A.privacyTitle)}</h2><p>${esc(A.privacyText)} <a href="${P.privacy}">${esc(U.privacy)}</a>.</p></div></section>${ctaBand(L)}` });

  // FAQ
  crumbs = [homeCrumb, { label: U.nav.faq, href: P.faq }];
  add({ lang, key: 'faq', path: P.faq, ...L.meta.faq, schema: [crumbSchema(crumbs), faqSchema(L.faq)], body: `${pageHero(L, crumbs, L.faqPage.h1, L.faqPage.lead)}
<section class="sec"><div class="wrap narrow">${faqList(L.faq)}</div></section>${ctaBand(L)}` });

  // Kontak
  crumbs = [homeCrumb, { label: U.nav.contact, href: P.contact }];
  const C = L.contact;
  add({ lang, key: 'contact', path: P.contact, ...L.meta.contact, schema: [crumbSchema(crumbs), orgSchema(L)], body: `${pageHero(L, crumbs, C.h1, C.lead, `<div class="actions">${btnWa(U.waCta, C.waMsg)}</div>`)}
<section class="sec"><div class="wrap"><dl class="contact-grid">
<div><dt>${esc(C.waLabel)}</dt><dd><a href="${wa(C.waMsg)}" rel="noopener">${WA_DISPLAY[lang]}</a></dd></div>
<div><dt>${esc(C.emailLabel)}</dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
<div><dt>${esc(C.addressLabel)}</dt><dd>${esc(U.address)}</dd></div>
<div><dt>${esc(C.hoursLabel)}</dt><dd>${esc(C.hoursValue)}</dd></div>${SOCIAL.length ? `<div><dt>Media sosial</dt><dd>${socialLinks('social dark')}</dd></div>` : ''}</dl></div></section>${quoteForm(L)}` });

  // Privasi
  crumbs = [homeCrumb, { label: U.privacy, href: P.privacy }];
  add({ lang, key: 'privacy', path: P.privacy, ...L.meta.privacy, schema: [crumbSchema(crumbs)], body: `${pageHero(L, crumbs, L.privacy.h1, L.privacy.lead)}
<section class="sec"><div class="wrap narrow prose">${L.privacy.sections.map((s) => `<h2>${esc(s.t)}</h2><p>${esc(s.d)}</p>`).join('')}</div></section>` });

  // Area layanan (halaman per kota/kabupaten)
  if (P.area) {
    const dir = path.join(ROOT, 'src/content/kota');
    const cities = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parsePost(path.join(dir, f), lang)).sort((a, b) => (a.city || a.slug).localeCompare(b.city || b.slug)) : [];
    L._cities = cities;
    crumbs = [homeCrumb, { label: U.area, href: P.area }];
    const cityChips = (skip) => `<ul class="chips">${cities.filter((c) => c.slug !== skip).map((c) => `<li><a href="${P.area}${c.slug}/">${esc(c.city || c.title)} ${arrow}</a></li>`).join('')}</ul>`;
    add({ lang, key: 'area', path: P.area, ...L.meta.area, schema: [crumbSchema(crumbs)], body: `${pageHero(L, crumbs, L.areaPage.h1, L.areaPage.lead, `<div class="actions">${btnWa(U.waCta, U.form.fallback)}</div>`, 'svc-1')}
<section class="sec"><div class="wrap">${sectionHead(L.areaPage.listTitle)}${[...new Set(cities.map((c) => c.province || ''))].sort().map((pv) => `<h3 class="prov">${esc(pv)}</h3><ul class="chips left">${cities.filter((c) => (c.province || '') === pv).map((c) => `<li><a href="${P.area}${c.slug}/">${esc(c.city || c.title)} ${arrow}</a></li>`).join('')}</ul>`).join('')}<p class="req">${esc(L.areaPage.note)}</p></div></section>${quoteForm(L)}` });
    for (const c of cities) {
      const href = `${P.area}${c.slug}/`;
      const cr = [...crumbs, { label: c.city || c.title, href }];
      const schema = [crumbSchema(cr), { '@context': 'https://schema.org', '@type': 'Service', name: c.title, description: c.description, serviceType: 'Sworn translation', provider: { '@id': `${SITE}/#org` }, areaServed: { '@type': 'City', name: c.city || c.title }, url: SITE + href }];
      if (c.faq.length) schema.push(faqSchema(c.faq));
      add({ lang, key: `city:${c.slug}`, path: href, title: c.title.length > 50 ? c.title : `${c.title} | Englishlink`, desc: c.description, schema, body: `<article class="post"><div class="wrap narrow">${crumbsHtml(cr)}
<h1>${esc(c.title)}</h1>
<p class="post-meta">${esc(U.by)} <a href="${P.about}">${esc(U.author)}</a> · ${esc(U.updated)} <time datetime="${c.updated}">${fmtDate(c.updated, lang)}</time></p>
<figure class="cover-fig">${textCover(c.slug, U.area, `${L.areaPage.coverPrefix} ${c.city || ''}`, c.cover)}</figure>
<div class="answer"><strong>${esc(U.shortAnswer)}</strong><p>${esc(c.answer)}</p></div>
<div class="prose">${c.html}</div>
<div class="band small"><div><h2>${esc(U.ctaBand.title)}</h2><p>${esc(U.ctaBand.text)}</p></div>${btnWa(U.waCta, `${U.form.fallback} (${c.city || ''})`, 'btn btn-white')}</div>
</div></article>
<section class="sec sec-tint"><div class="wrap">${sectionHead(L.areaPage.otherTitle, '', { href: P.area, label: U.seeAll })}${cityChips(c.slug)}</div></section>` });
    }
  }

  // Artikel
  if (P.blog) {
    crumbs = [homeCrumb, { label: U.nav.blog, href: P.blog }];
    add({ lang, key: 'blog', path: P.blog, ...L.meta.blog, schema: [crumbSchema(crumbs)], body: `${pageHero(L, crumbs, L.blogPage.h1, L.blogPage.lead)}
<section class="sec"><div class="wrap"><div class="filters" data-filter>${['', ...new Set(posts.map((x) => x.kicker || U.kicker))].map((k, n) => `<button type="button" data-k="${esc(k)}"${n ? '' : ' class="on"'}>${esc(k || U.allTopics)}</button>`).join('')}</div>${postCards(L, posts)}</div></section>${ctaBand(L)}` });
    for (const p of posts) {
      const href = `${P.blog}${p.slug}/`;
      const c = [...crumbs, { label: p.title, href }];
      const schema = [crumbSchema(c), { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.updated, inLanguage: lang, image: `${SITE}/assets/img/covers/${p.cover}.webp`, mainEntityOfPage: SITE + href, keywords: p.keywords || '',
        author: { '@type': 'Organization', name: U.author, url: SITE + P.about }, publisher: { '@id': `${SITE}/#org`, '@type': 'Organization', name: 'Englishlink Translator' } }];
      if (p.faq.length) schema.push(faqSchema(p.faq));
      add({ lang, key: `post:${p.ref || p.slug}`, path: href, title: p.title.length > 50 ? p.title : `${p.title} | Englishlink`, desc: p.description, ogType: 'article', ogImage: `${SITE}/assets/img/covers/${p.cover}.webp`, schema, body: `<article class="post"><div class="wrap narrow">${crumbsHtml(c)}
<h1>${esc(p.title)}</h1>
<p class="post-meta">${esc(U.by)} <a href="${P.about}">${esc(U.author)}</a> · ${esc(U.published)} <time datetime="${p.date}">${fmtDate(p.date, lang)}</time>${p.updated !== p.date ? ` · ${esc(U.updated)} <time datetime="${p.updated}">${fmtDate(p.updated, lang)}</time>` : ''} · ${p.minutes} ${esc(U.minRead)}</p>
<figure class="cover-fig">${textCover(p.slug, p.kicker || U.kicker, p.coverText || p.title, p.cover)}</figure>
<div class="answer"><strong>${esc(U.shortAnswer)}</strong><p>${esc(p.answer)}</p></div>
<div class="prose">${p.html}</div>
<div class="band small"><div><h2>${esc(U.ctaBand.title)}</h2><p>${esc(U.ctaBand.text)}</p></div>${btnWa(U.waCta, U.form.fallback, 'btn btn-white')}</div>
</div></article>
<section class="sec sec-tint"><div class="wrap">${sectionHead(U.moreArticles, '', { href: P.blog, label: U.seeAll })}${postCards(L, posts.filter((o) => o.slug !== p.slug).slice(0, 3))}</div></section>` });
    }
  }
}

// ---------- Layout ----------
const altOf = (page) => pages.filter((p) => p.key === page.key && p.lang !== page.lang)[0];
function chrome(page) {
  const L = LANGS[page.lang], P = L.paths, U = L.ui;
  const alt = altOf(page) || pages.find((p) => p.key === 'home' && p.lang !== page.lang);
  const navItems = ['services', 'docs', 'how', 'blog', 'about', 'faq'].filter((k) => P[k]);
  const cur = (k) => (page.path.startsWith(P[k]) ? ' aria-current="page"' : '');
  const chev = '<svg class="chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const mega = (k, items) => `<li class="has-mega"><details><summary${cur(k)}>${esc(U.nav[k])}${chev}</summary><div class="mega"><ul>${items.map((it, n) => `<li><a href="${it.href}"><span class="mi t${n % 4}">${ico(it.icon)}</span><span><b>${esc(it.title)}</b><small>${esc(it.text)}</small></span></a></li>`).join('')}</ul><a class="more" href="${P[k]}">${esc(U.seeAll)} ${arrow}</a></div></details></li>`;
  const megaItems = { services: L.services.map((x, n) => ({ href: `${P.services}${x.slug}/`, title: x.title, text: x.short, icon: SVC_ICONS[n] })), docs: L.docTypes.map((x, n) => ({ href: `${P.docs}${x.slug}/`, title: x.title, text: x.short, icon: DOC_ICONS[n] })) };
  const nav = navItems.map((k) => (megaItems[k] ? mega(k, megaItems[k]) : `<li><a href="${P[k]}"${cur(k)}>${esc(U.nav[k])}</a></li>`)).join('');
  const header = `<a class="skip" href="#main">${esc(U.skip)}</a>
<header class="site-header"><div class="wrap bar">
  <a class="logo" href="${P.home}" aria-label="Englishlink Translator"><span class="logo-mark">E<span>⇄</span></span><span class="logo-text">english<b>link</b></span></a>
  <nav class="nav" id="nav" aria-label="${esc(U.menu)}"><ul>${nav}<li class="nav-contact"><a href="${P.contact}"${cur('contact')}>${esc(U.nav.contact)}</a></li></ul></nav>
  <div class="bar-end"><a class="lang" href="${alt.path}" hreflang="${alt.lang}" lang="${alt.lang}">${esc(U.langSwitch)}</a>${btnWa(U.waCta, U.form.fallback, 'btn btn-primary btn-sm hide-m')}
  <button class="menu-btn" type="button" data-menu aria-controls="nav" aria-expanded="false"><span></span><span></span><span class="sr">${esc(U.menu)}</span></button></div>
</div></header>`;
  const footer = `<footer class="site-footer"><div class="wrap foot">
  <div><a class="logo on-dark" href="${P.home}"><span class="logo-mark">E<span>⇄</span></span><span class="logo-text">english<b>link</b></span></a><p>${esc(U.footerTag)}</p></div>
  <div><h2>${esc(U.footerExplore)}</h2><ul>${navItems.map((k) => `<li><a href="${P[k]}">${esc(U.nav[k])}</a></li>`).join('')}${P.area ? `<li><a href="${P.area}">${esc(U.area)}</a></li>` : ''}<li><a href="${P.privacy}">${esc(U.privacy)}</a></li></ul></div>
  <div><h2>${esc(U.footerContact)}</h2><ul><li><a href="${wa(U.form.fallback)}" rel="noopener">WhatsApp ${WA_DISPLAY[page.lang]}</a></li><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li>${esc(U.address)}</li><li>${esc(U.hours)}</li></ul>${socialLinks()}</div>
</div><div class="wrap copy">© ${new Date().getFullYear()} Englishlink Translator · PT. Penerjemah Tersumpah Indonesia</div></footer>
<a class="wa-float" href="${wa(U.form.fallback)}" rel="noopener">${waIcon}<span>${esc(U.waCta)}</span></a>
<div class="online-pop" data-online hidden data-on="${esc(U.online.on)}" data-off="${esc(U.online.off)}" role="status"><span class="dot"></span><div><strong>${esc(U.online.hi)}</strong><p data-online-text></p></div><a class="btn btn-sm btn-wa" href="${wa(U.form.fallback)}" rel="noopener">${waIcon}<span>Chat</span></a><button type="button" data-online-close aria-label="${esc(U.online.close)}">×</button></div>`;
  return `${header}<main id="main">${page.body}</main>${footer}`;
}
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">';
function html(page) {
  const L = LANGS[page.lang];
  const alt = altOf(page);
  const url = SITE + page.path;
  const alts = alt ? `<link rel="alternate" hreflang="${page.lang}" href="${url}"><link rel="alternate" hreflang="${alt.lang}" href="${SITE + alt.path}"><link rel="alternate" hreflang="x-default" href="${SITE + (page.lang === 'id' ? page.path : alt.path)}">` : '';
  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<link rel="canonical" href="${url}">${alts}
<meta property="og:type" content="${page.ogType || 'website'}"><meta property="og:site_name" content="Englishlink Translator"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.desc)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${L.locale}">
${page.ogImage ? `<meta property="og:image" content="${page.ogImage}">` : ''}<meta name="twitter:card" content="${page.ogImage ? 'summary_large_image' : 'summary'}"><meta name="theme-color" content="#1b5cff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${FONTS}
<link rel="stylesheet" href="/assets/styles.css">
${page.schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body>
${chrome(page)}
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

// ---------- Tulis file ----------
const css = read('src/styles.css');
const js = read('src/site.js');
const favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#1b5cff"/><text x="32" y="44" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="36" fill="#ffffff">E</text></svg>';
const write = (rel, content) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, rel.endsWith('.html') && !PREVIEW ? withBase(content) : content); };

if (PREVIEW) {
  const map = {};
  for (const p of pages) map[p.path] = { t: p.title, l: p.lang, b: chrome(p) };
  const start = map['/id/'];
  write('preview/index.html', `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Englishlink Translator – Demo Website</title>
${FONTS}<style>${css}</style></head><body><div id="app">${start.b}</div>
<script>window.__IMG=${JSON.stringify(Object.fromEntries(fs.readdirSync(path.join(ROOT, 'src/img/covers')).map((f) => [f.replace('.webp', ''), 'data:image/webp;base64,' + fs.readFileSync(path.join(ROOT, 'src/img/covers', f)).toString('base64')])))};
function __hyd(){document.querySelectorAll('img[data-img]').forEach(function(i){var u=window.__IMG[i.getAttribute('data-img')];if(u)i.src=u;});}
window.__PAGES=${JSON.stringify(map).replace(/</g, '\\u003c')};
(function(){var app=document.getElementById('app');function go(p,hash){var pg=window.__PAGES[p];if(!pg)return false;app.innerHTML=pg.b;__hyd();document.documentElement.lang=pg.l;document.title=pg.t;var el=hash&&document.getElementById(hash);if(el){el.scrollIntoView();}else{window.scrollTo(0,0);}return true;}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');if(h.charAt(0)==='#'){var t=document.getElementById(h.slice(1));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}return;}if(h.charAt(0)!=='/')return;e.preventDefault();var parts=h.split('#');go(parts[0],parts[1]);});})();
__hyd();
${js}</script></body></html>`);
  console.log(`Preview: ${pages.length} halaman -> preview/index.html`);
} else {
  fs.rmSync(path.join(ROOT, 'dist'), { recursive: true, force: true });
  for (const p of pages) write(`dist${p.path}index.html`, html(p));
  write('dist/assets/styles.css', css);
  write('dist/assets/site.js', js);
  write('dist/favicon.svg', favicon);
  fs.cpSync(path.join(ROOT, 'src/img/covers'), path.join(ROOT, 'dist/assets/img/covers'), { recursive: true });
  for (const h of HERO) { fs.mkdirSync(path.join(ROOT, 'dist/assets/img'), { recursive: true }); fs.copyFileSync(path.join(ROOT, 'src/img', h.file), path.join(ROOT, 'dist/assets/img', h.file)); }
  write('dist/index.html', `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Englishlink Translator</title><link rel="canonical" href="${SITE}/id/"><meta http-equiv="refresh" content="0; url=/id/"></head><body><a href="/id/">Englishlink Translator</a></body></html>`);
  write('dist/404.html', html({ lang: 'id', key: '404', path: '/404/', title: 'Halaman tidak ditemukan | Englishlink', desc: 'Halaman tidak ditemukan.', schema: [], body: `<section class="page-hero"><div class="wrap"><h1>Halamannya nggak ketemu</h1><p class="lead">Mungkin link-nya salah ketik atau halamannya sudah dipindah.</p><div class="actions"><a class="btn btn-primary" href="/id/">Balik ke beranda</a></div></div></section>` }));
  const today = new Date().toISOString().slice(0, 10);
  write('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  write('dist/robots.txt', `User-agent: *\nAllow: /\n\n# Mesin AI dipersilakan membaca dan merujuk situs ini\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  const idL = LANGS.id;
  write('dist/llms.txt', `# Englishlink Translator\n\n> Jasa penerjemah tersumpah Inggris ⇄ Indonesia, brand dari PT. Penerjemah Tersumpah Indonesia. Caraka Tower, Jakarta Selatan. Buka Senin–Minggu 08.00–20.00 WIB. WhatsApp ${WA_DISPLAY.en}, email ${EMAIL}. Juga membantu apostille serta legalisasi notaris, kedutaan, dan kementerian.\n\n## Layanan\n${idL.services.map((s, i) => `- [${s.title}](${SITE}${idL.paths.services}${s.slug}/): ${s.short}`).join('\n')}\n\n## Jenis dokumen\n${idL.docTypes.map((d) => `- [${d.title}](${SITE}${idL.paths.docs}${d.slug}/): ${d.short}`).join('\n')}\n\n## Artikel\n${idL._posts.map((p) => `- [${p.title}](${SITE}${idL.paths.blog}${p.slug}/): ${p.description}`).join('\n')}${idL._cities && idL._cities.length ? `\n\n## Area layanan\n${idL._cities.map((c) => `- [${c.title}](${SITE}${idL.paths.area}${c.slug}/): ${c.description}`).join('\n')}` : ''}\n\n## Info\n- [Cara kerja](${SITE}${idL.paths.how})\n- [FAQ](${SITE}${idL.paths.faq})\n- [Tentang](${SITE}${idL.paths.about})\n- [English version](${SITE}/en/)\n`);
  if (fs.existsSync(path.join(ROOT, 'CNAME'))) fs.copyFileSync(path.join(ROOT, 'CNAME'), path.join(ROOT, 'dist/CNAME'));
  console.log(`Build: ${pages.length} halaman -> dist/`);
}
