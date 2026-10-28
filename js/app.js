import { createDiscsGallery } from './discs-gallery.js';

const S = window.SITE, $ = (s, e = document) => e.querySelector(s);
const E = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const R = (s) => E(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
const rnd = (i) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const app = $('#app');

/* Generative disc SVG for Detail view hero */
const disc = (it, i) => {
  const s = i * 7 + it.title.length;
  const ring = (r, k) => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="#3a3a45" stroke-width="${k ? 1 : .6}" stroke-dasharray="${(1 + rnd(s + r) * 22).toFixed(1)} ${(2 + rnd(s + r + 1) * 12).toFixed(1)}"/>`;
  const arc = (60 + rnd(s) * 140).toFixed(0), rot = (rnd(s + 3) * 360).toFixed(0);
  return `<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="98" fill="#111116" stroke="#26262e"/>${ring(84, 1)}${ring(68)}${ring(52, 1)}${ring(36)}<circle cx="100" cy="100" r="84" fill="none" stroke="#ff6a1a" stroke-width="2" stroke-linecap="round" stroke-dasharray="${arc} 600" transform="rotate(${rot} 100 100)"/><circle cx="100" cy="100" r="3" fill="#ff6a1a"/></svg>`;
};

/* ---------- Views ---------- */
const H = S.home, C = H.contact;
const home = `<div class="home"><div>
  <p class="mono rise">${E(H.kicker)}</p>
  <h1 class="rise" aria-label="${E(S.name)}">${H.headline.map(R).join('<br>')}</h1>
  <p class="lead rise">${E(H.text)}</p>
  <div class="stats rise">${H.stats.map((s) => `<div><b>${E(s[0])}</b><span class="lbl">${E(s[1])}</span></div>`).join('')}</div></div>
  <div class="contact rise"><span class="mail">${E(C.email)}</span><div class="row">
    <button class="btn solid" id="copy" type="button">Salin email</button>
    ${C.links.map((l) => `<a class="btn" href="${E(l[1])}" target="_blank" rel="noopener noreferrer">${E(l[0])}</a>`).join('')}</div></div></div>`;

const M = S.me;
const me = `<div class="me"><figure class="ph"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".5" aria-hidden="true"><circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="14"/></svg>
  <img src="${E(M.photo)}" alt="Foto ${E(S.name)}" onerror="this.remove()"></figure>
  <div><h2 class="rise">${R(M.lead)}</h2><p class="txt rise">${E(M.text)}</p>
  <dl class="kv rise">${M.facts.map((f) => `<div><dt class="lbl">${E(f[0])}</dt><dd>${E(f[1])}</dd></div>`).join('')}</dl>
  <h3 class="rise">Keahlian</h3><dl class="kv rise">${M.skills.map((f) => `<div><dt class="lbl">${E(f[0])}</dt><dd>${E(f[1])}</dd></div>`).join('')}</dl></div></div>`;

// Template for A24 3D Physical Disc Gallery
function renderA24Markup(type) {
  const isExp = type === 'experience';
  const labelDetail = isExp ? 'Detail Pengalaman' : 'Detail Proyek';
  const hintText = isExp
    ? 'Putar roda mouse, geser, atau gunakan panah keyboard untuk menelusuri rekam jejak. Klik kaset depan untuk membalik sisi holografisnya.'
    : 'Putar roda mouse, geser, atau gunakan panah keyboard untuk menelusuri kaset. Klik kaset depan untuk membalik sisi holografisnya.';
  const prevLabel = isExp ? 'Pengalaman sebelumnya' : 'Proyek sebelumnya';
  const nextLabel = isExp ? 'Pengalaman berikutnya' : 'Proyek berikutnya';

  return `<div class="a24-gallery" data-gallery>
    <canvas class="a24-canvas" data-canvas aria-hidden="true"></canvas>
    <canvas class="a24-marker" data-marker aria-hidden="true"></canvas>

    <section class="a24-card" aria-live="polite">
      <div class="a24-kicker">
        <span class="a24-badge" data-badge>01 / 04</span>
        <span class="a24-kind" data-kind>${isExp ? 'Kerja' : 'Aplikasi Web'}</span>
      </div>
      <h1 class="a24-title"><span class="a24-mask"><span data-title>${isExp ? 'Bandung Techno Park' : 'CoHive'}</span></span></h1>
      <p class="a24-desc" data-desc>Memuat informasi...</p>
      
      <dl class="a24-credits">
        <div><dt data-dt1>${isExp ? 'Posisi' : 'Peran'}</dt><dd class="a24-mask"><span data-m1>—</span></dd></div>
        <div><dt data-dt2>${isExp ? 'Program' : 'Konteks'}</dt><dd class="a24-mask"><span data-m2>—</span></dd></div>
        <div><dt data-dt3>${isExp ? 'Periode' : 'Tahun'}</dt><dd class="a24-mask"><span data-m3>—</span></dd></div>
        <div><dt data-dt4>${isExp ? 'Lokasi' : 'Stack'}</dt><dd class="a24-mask"><span data-m4>—</span></dd></div>
      </dl>

      <div class="a24-actions">
        <button type="button" class="btn solid a24-open-btn" data-detail-btn>
          <span>${labelDetail}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button type="button" class="btn a24-flip-btn" data-flip-btn title="Balikkan kaset untuk melihat sisi metalik holografis">
          <span>Balik Kaset ⟲</span>
        </button>
        <a class="btn a24-link-btn" data-link-btn href="#" target="_blank" rel="noopener noreferrer" style="display:none">
          <span>Tautan ↗</span>
        </a>
      </div>
    </section>

    <p class="a24-hint" data-hint>${hintText}</p>

    <div class="a24-controls">
      <button class="a24-ctrl-btn" type="button" data-prev aria-label="${prevLabel}">
        <svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
      </button>
      <div class="a24-dots" data-dots></div>
      <button class="a24-ctrl-btn" type="button" data-next aria-label="${nextLabel}">
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  </div>`;
}

const views = {
  home,
  me,
  projects: renderA24Markup('projects'),
  experience: renderA24Markup('experience')
};

Object.keys(views).forEach((k) => {
  const v = document.createElement('section');
  v.className = 'view';
  v.id = 'v-' + k;
  v.innerHTML = views[k];
  app.appendChild(v);
});

const det = document.createElement('section');
det.className = 'view';
det.id = 'detail';
app.appendChild(det);

$('#nav').innerHTML = S.nav.map((n) => `<a href="#/${n[0]}" data-v="${n[0]}">${E(n[1])}</a>`).join('');

// Email copy handler with fallback
$('#copy').addEventListener('click', (e) => {
  const b = e.currentTarget;
  const done = (t) => { b.textContent = t; setTimeout(() => (b.textContent = 'Salin email'), 1800); };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(C.email).then(() => done('Tersalin ✓'), () => fallbackCopy(C.email, done));
  } else {
    fallbackCopy(C.email, done);
  }
});
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    cb('Tersalin ✓');
  } catch (_) {
    cb('Salin manual');
  }
  ta.remove();
}

/* ---------- Inisialisasi Galeri A24 (Projects & Experience) ---------- */
const galleries = {};

try {
  const pEl = $('#v-projects .a24-gallery');
  galleries.projects = createDiscsGallery(pEl, S.projects, (slug) => {
    location.hash = `#/projects/${slug}`;
  }, { type: 'projects' });
} catch (err) {
  console.warn('Projects gallery init error:', err);
}

try {
  const eEl = $('#v-experience .a24-gallery');
  galleries.experience = createDiscsGallery(eEl, S.experience, (slug) => {
    location.hash = `#/experience/${slug}`;
  }, { type: 'experience' });
} catch (err) {
  console.warn('Experience gallery init error:', err);
}

/* ---------- Navigasi Keyboard ---------- */
addEventListener('keydown', (e) => {
  if (det.classList.contains('on')) {
    const [, k, slug] = location.hash.split('/');
    if (e.key === 'Escape') {
      location.hash = `#/${k || cur}`;
      return;
    }
    if (k && S[k] && Array.isArray(S[k])) {
      const items = S[k], i = items.findIndex((x) => x.slug === slug);
      if (i !== -1) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const nx = items[(i + 1) % items.length];
          location.hash = `#/${k}/${nx.slug}`;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const pv = items[(i - 1 + items.length) % items.length];
          location.hash = `#/${k}/${pv.slug}`;
        }
      }
    }
    return;
  }
  if (galleries[cur]) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') galleries[cur].next();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') galleries[cur].prev();
  }
});

/* ---------- Tampilan Detail Sheet ---------- */
function openDetail(k, slug) {
  const items = S[k], i = Math.max(0, items.findIndex((x) => x.slug === slug)), it = items[i], nx = items[(i + 1) % items.length];
  if (galleries[k]) {
    galleries[k].vai(i);
  }
  const linksHtml = it.links && it.links.length
    ? `<div class="p-links">${it.links.map((l) => `<a class="btn" href="${E(l[1])}" target="_blank" rel="noopener noreferrer">${E(l[0])} <span class="arr">↗</span></a>`).join('')}</div>`
    : '';
  det.innerHTML = `<div class="dt"><div class="dt-bar"><a class="x" href="#/${k}">← Kembali <span class="kbd">ESC</span></a></div>
    <div class="hero"><div class="dd">${disc(it, i)}</div><div><span class="lbl">${E(it.kind)} · ${E(it.year)}</span><h1>${E(it.title)}</h1></div></div>
    <dl class="dm">${it.meta.map((m) => `<div><dt class="lbl">${E(m[0])}</dt><dd>${E(m[1])}</dd></div>`).join('')}</dl>
    <div class="body"><p class="sum">${E(it.summary)}</p><div><ul class="pts">${it.points.map((p) => `<li>${E(p)}</li>`).join('')}</ul>
    <ul class="tags">${it.tags.map((t) => `<li>${E(t)}</li>`).join('')}</ul>
    ${linksHtml}</div></div>
    <div class="up"><span class="lbl">Berikutnya</span><a href="#/${k}/${nx.slug}"><h3>${E(nx.title)}</h3><div class="dd">${disc(nx, (i + 1) % items.length)}</div></a></div></div>`;
  det.scrollTop = 0;
  det.classList.add('on');
}

/* ---------- Router ---------- */
let cur = 'home';
function route() {
  const [, v, slug] = location.hash.split('/');
  cur = views[v] ? v : 'home';
  document.querySelectorAll('.view:not(#detail)').forEach((e) => e.classList.toggle('on', e.id === 'v-' + cur));
  document.querySelectorAll('#nav a').forEach((a) => a.classList.toggle('on', a.dataset.v === cur));

  // Mount/unmount 3D galleries based on active view
  Object.entries(galleries).forEach(([key, gal]) => {
    if (!gal) return;
    if (cur === key && !slug) {
      gal.mount();
    } else {
      gal.unmount();
    }
  });

  if (slug && S[cur] && Array.isArray(S[cur])) openDetail(cur, slug);
  else det.classList.remove('on');
}

addEventListener('hashchange', route);

/* ---------- Bola Titik Latar Belakang (Home) ---------- */
const cv = $('#bg'), g = cv.getContext('2d');
let W = 0, Hh = 0, mx = 0, my = 0, tx = 0, ty = 0, al = 1, cx = .68;
const N = 420, P = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996;
  P.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, h: i % 53 === 0 });
}
const fit = () => {
  const d = Math.min(2, devicePixelRatio || 1);
  W = innerWidth;
  Hh = innerHeight;
  cv.width = W * d;
  cv.height = Hh * d;
  g.setTransform(d, 0, 0, d, 0, 0);
};
fit();
addEventListener('resize', fit);
addEventListener('pointermove', (e) => {
  tx = e.clientX / W - .5;
  ty = e.clientY / Hh - .5;
}, { passive: true });
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

function orb(t) {
  al += ((cur === 'home' ? 1 : 0) - al) * .05;
  cx += ((cur === 'home' && W > 820 ? .7 : .5) - cx) * .05;
  mx += (tx - mx) * .05;
  my += (ty - my) * .05;
  if (al < 0.01) return; // Skip drawing when not in Home

  const ry = t * .09 + mx * .4, rx = .35 + my * .2, c1 = Math.cos(ry), s1 = Math.sin(ry), c2 = Math.cos(rx), s2 = Math.sin(rx);
  const F = Math.min(W, Hh) * .62, X = W * cx, Y = Hh * .52;
  g.clearRect(0, 0, W, Hh);
  P.forEach((p) => {
    const x = p.x * c1 + p.z * s1, z = -p.x * s1 + p.z * c1, y = p.y * c2 - z * s2, z2 = p.y * s2 + z * c2 + 3;
    const k = F / z2 * 1.9, a = clamp((3.6 - z2) * .55 + .35, .08, 1) * al;
    g.fillStyle = p.h ? `rgba(255,106,26,${Math.min(1, a * 1.1).toFixed(3)})` : `rgba(245,245,247,${(a * .5).toFixed(3)})`;
    g.beginPath();
    g.arc(X + x * k, Y + y * k, p.h ? 2.4 : 1.1, 0, 6.2832);
    g.fill();
  });
}

(function loop(ms) {
  orb(calm ? 0 : ms / 1000);
  requestAnimationFrame(loop);
})(0);

route();
