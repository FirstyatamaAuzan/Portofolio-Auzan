import { createDiscsGallery } from './discs-gallery.js';

const S = window.SITE, $ = (s, e = document) => e.querySelector(s);
const E = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const R = (s) => E(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
const rnd = (i) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const app = $('#app');

/* Per-item theme palette */
const ITEM_THEMES = {
  'cohive':           { accent: '#38BDF8', accent2: '#F59E0B', bg: '#0B1C33', label: 'FIN-TECH WEB PLATFORM', badge: 'PROJECT-01' },
  'semsim':           { accent: '#C084FC', accent2: '#22D3EE', bg: '#180A30', label: 'NLP ACADEMIC RESEARCH', badge: 'PROJECT-02' },
  'chatbot':          { accent: '#34D399', accent2: '#FBBF24', bg: '#032015', label: 'GENERATIVE AI / NLP', badge: 'PROJECT-03' },
  'green-ranger':     { accent: '#F59E0B', accent2: '#10B981', bg: '#261404', label: 'CIRCULAR ECONOMY WEB', badge: 'PROJECT-04' },
  'bandung-techno-park': { accent: '#FF6A1A', accent2: '#60A5FA', bg: '#0C1E32', label: 'STARTUP INCUBATION', badge: 'EXP-01' },
  'cmlabs':           { accent: '#FB7185', accent2: '#38BDF8', bg: '#1A0E26', label: 'SEO & PLAGIARISM RADAR', badge: 'EXP-02' },
  'asisten-riset':    { accent: '#F43F5E', accent2: '#FDE047', bg: '#220816', label: 'COMPUTER VISION OCR', badge: 'EXP-03' },
  'hima':             { accent: '#F59E0B', accent2: '#FEF3C7', bg: '#281703', label: 'STUDENT LEADERSHIP', badge: 'EXP-04' },
};
const DEFAULT_THEME = { accent: '#ff6a1a', accent2: '#f5f5f7', bg: '#111116', label: 'PORTFOLIO', badge: '—' };
function getTheme(slug) { return ITEM_THEMES[slug] || DEFAULT_THEME; }

/* Themed SVG disc hero artwork per slug */
function discDetail(it, idx, k) {
  const slug = (it.slug || '').toLowerCase();
  const th = getTheme(slug);
  const cx = 100, cy = 100, R = 96;

  // Base disc rings
  let rings = '';
  for (let r = R; r > 28; r -= 14)
    rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.8"/>`;

  // Unique inner artwork per slug
  let art = '';
  if (slug === 'cohive') {
    // Hexagonal mesh
    const hexPts = (hx, hy, hr) => Array.from({length: 6}, (_,k) => {
      const a = (k/6)*Math.PI*2 + Math.PI/6;
      return `${(hx+Math.cos(a)*hr).toFixed(1)},${(hy+Math.sin(a)*hr).toFixed(1)}`;
    }).join(' ');
    [[-18,-18],[18,-18],[0,14],[-35,5],[35,5]].forEach(([dx,dy]) => {
      art += `<polygon points="${hexPts(cx+dx, cy+dy, 14)}" fill="none" stroke="${th.accent}" stroke-width="1" opacity="0.7"/>`;
    });
    art += `<line x1="${cx-40}" y1="${cy}" x2="${cx+40}" y2="${cy}" stroke="${th.accent2}" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.6"/>`;
    art += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="7" font-family="monospace" fill="${th.accent}" opacity="0.9">COOP LEDGER</text>`;

  } else if (slug === 'semsim') {
    // Dual sine waves
    const pts1 = [], pts2 = [];
    for (let x = -40; x <= 40; x += 2) {
      pts1.push(`${cx+x},${cy-8+Math.sin(x*0.18)*14}`);
      pts2.push(`${cx+x},${cy+8+Math.sin(x*0.18+Math.PI)*14}`);
    }
    art += `<polyline points="${pts1.join(' ')}" fill="none" stroke="${th.accent}" stroke-width="1.5" opacity="0.8"/>`;
    art += `<polyline points="${pts2.join(' ')}" fill="none" stroke="${th.accent2}" stroke-width="1.5" opacity="0.8"/>`;
    [-28,0,28].forEach(ox => {
      art += `<circle cx="${cx+ox}" cy="${cy}" r="2.5" fill="${ox===0?th.accent:th.accent2}"/>`;
    });
    art += `<text x="${cx}" y="${cy+28}" text-anchor="middle" font-size="6.5" font-family="monospace" fill="white" opacity="0.7">cos(θ)=0.89</text>`;

  } else if (slug === 'chatbot') {
    // Radial attention spokes
    for (let i = 0; i < 12; i++) {
      const a = (i/12)*Math.PI*2, x1 = cx+Math.cos(a)*20, y1 = cy+Math.sin(a)*20;
      const x2 = cx+Math.cos(a)*44, y2 = cy+Math.sin(a)*44;
      art += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i%2===0?th.accent:th.accent2}" stroke-width="1" opacity="0.7"/>`;
    }
    [20, 35, 48].forEach(r => art += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${th.accent}" stroke-width="0.8" opacity="0.4"/>`);
    art += `<circle cx="${cx}" cy="${cy}" r="5" fill="${th.accent}"/>`;
    art += `<text x="${cx}" y="${cy+30}" text-anchor="middle" font-size="6.5" font-family="monospace" fill="white" opacity="0.7">12-HEAD ATTN</text>`;

  } else if (slug === 'green-ranger') {
    // Recycling loop
    for (let l = 0; l < 3; l++) {
      const r = 28 + l*12;
      const pts = [];
      for (let a = 0; a <= Math.PI*2; a += 0.12)
        pts.push(`${(cx+Math.cos(a)*r+Math.sin(a*3)*5).toFixed(1)},${(cy+Math.sin(a)*r+Math.cos(a*3)*5).toFixed(1)}`);
      art += `<polyline points="${pts.join(' ')}" fill="none" stroke="${l%2?th.accent2:th.accent}" stroke-width="1.2" opacity="0.7"/>`;
    }
    art += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="7" font-family="monospace" fill="${th.accent}" opacity="0.9">RECYCLE</text>`;

  } else if (slug === 'bandung-techno-park') {
    // Blueprint grid + arrow
    for (let d = -36; d <= 36; d += 12) {
      art += `<line x1="${cx+d}" y1="${cy-38}" x2="${cx+d}" y2="${cy+38}" stroke="${th.accent2}" stroke-width="0.5" opacity="0.3"/>`;
      art += `<line x1="${cx-38}" y1="${cy+d}" x2="${cx+38}" y2="${cy+d}" stroke="${th.accent2}" stroke-width="0.5" opacity="0.3"/>`;
    }
    art += `<line x1="${cx-28}" y1="${cy+16}" x2="${cx+28}" y2="${cy-16}" stroke="${th.accent}" stroke-width="2" stroke-linecap="round"/>`;
    art += `<polygon points="${cx+28},${cy-16} ${cx+14},${cy-16} ${cx+28},${cy-4}" fill="${th.accent}"/>`;
    art += `<text x="${cx}" y="${cy+30}" text-anchor="middle" font-size="6.5" font-family="monospace" fill="white" opacity="0.7">STARTUP LAUNCH</text>`;

  } else if (slug === 'cmlabs') {
    // Radar half-circle
    [20,32,44].forEach(r => art += `<path d="M${cx-r},${cy} A${r},${r} 0 0,1 ${cx+r},${cy}" fill="none" stroke="${th.accent}" stroke-width="1" opacity="0.5"/>`);
    art += `<line x1="${cx}" y1="${cy}" x2="${cx+38}" y2="${cy-22}" stroke="${th.accent}" stroke-width="1.8" stroke-linecap="round"/>`;
    [[cx-24,cy-28],[cx+16,cy-38],[cx+36,cy-12]].forEach(([bx,by]) => {
      art += `<circle cx="${bx}" cy="${by}" r="3" fill="${th.accent2}"/>`;
      art += `<circle cx="${bx}" cy="${by}" r="6" fill="none" stroke="${th.accent2}" stroke-width="0.8" opacity="0.5"/>`;
    });
    art += `<line x1="${cx-44}" y1="${cy}" x2="${cx+44}" y2="${cy}" stroke="${th.accent}" stroke-width="0.8" opacity="0.4"/>`;
    art += `<text x="${cx}" y="${cy+22}" text-anchor="middle" font-size="6.5" font-family="monospace" fill="white" opacity="0.7">RADAR SWEEP</text>`;

  } else if (slug === 'asisten-riset') {
    // OCR bounding box
    art += `<rect x="${cx-36}" y="${cy-18}" width="72" height="36" fill="none" stroke="${th.accent}" stroke-width="1" opacity="0.5"/>`;
    const corners2 = [[cx-36,cy-18,1,1],[cx+36,cy-18,-1,1],[cx-36,cy+18,1,-1],[cx+36,cy+18,-1,-1]];
    corners2.forEach(([bx,by,sx,sy]) => {
      art += `<path d="M${bx},${by+sy*10} L${bx},${by} L${bx+sx*10},${by}" fill="none" stroke="${th.accent}" stroke-width="2"/>`;
    });
    art += `<line x1="${cx-28}" y1="${cy}" x2="${cx+28}" y2="${cy}" stroke="${th.accent2}" stroke-width="1.5" opacity="0.8"/>`;
    art += `<text x="${cx}" y="${cy+3}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent2}" opacity="0.9">TCLU 782019-4</text>`;
    art += `<text x="${cx}" y="${cy+28}" text-anchor="middle" font-size="6" font-family="monospace" fill="white" opacity="0.7">99.4% CONFIDENCE</text>`;

  } else if (slug === 'hima') {
    // Tri-ring leadership crest
    [[cx,cy-12],[cx-10,cy+6],[cx+10,cy+6]].forEach(([rx,ry]) => {
      art += `<circle cx="${rx}" cy="${ry}" r="16" fill="none" stroke="${th.accent}" stroke-width="1.4" opacity="0.6"/>`;
    });
    const starPts = Array.from({length:10},(_,s) => {
      const a = (s/10)*Math.PI*2 - Math.PI/2;
      const r = s%2===0 ? 10 : 4;
      return `${(cx+Math.cos(a)*r).toFixed(1)},${(cy+Math.sin(a)*r).toFixed(1)}`;
    }).join(' ');
    art += `<polygon points="${starPts}" fill="${th.accent}"/>`;
    art += `<text x="${cx}" y="${cy+34}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent}" opacity="0.9">TEMATICS 2024</text>`;

  } else {
    // Fallback generic
    const arc = (60 + rnd(idx) * 140).toFixed(0), rot = (rnd(idx+3)*360).toFixed(0);
    art = `<circle cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${th.accent}" stroke-width="2" stroke-linecap="round" stroke-dasharray="${arc} 600" transform="rotate(${rot} ${cx} ${cy})"/>`;
  }

  return `<svg viewBox="0 0 200 200" aria-hidden="true" style="filter:drop-shadow(0 0 24px ${th.accent}22)">
    <circle cx="${cx}" cy="${cy}" r="99" fill="${th.bg}"/>
    ${rings}
    <circle cx="${cx}" cy="${cy}" r="99" fill="none" stroke="${th.accent}" stroke-width="0.6" opacity="0.3"/>
    <circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    ${art}
    <circle cx="${cx}" cy="${cy}" r="4" fill="${th.accent}" opacity="0.9"/>
    <circle cx="${cx}" cy="${cy}" r="8" fill="none" stroke="${th.accent}" stroke-width="0.8" opacity="0.5"/>
  </svg>`;
}

/* Compact disc for "Berikutnya" row */
const disc = (it, i, k='') => discDetail(it, i, k);

/* ---------- Views ---------- */
const H = S.home, C = H.contact;
const home = `<div class="home"><div>
  <p class="mono rise">${E(H.kicker)}</p>
  <h1 class="rise" aria-label="${E(S.name)}">${H.headline.map(R).join('<br>')}</h1>
  <p class="lead rise">${E(H.text)}</p>
  <div class="stats rise">${H.stats.map((s) => `<div><b>${E(s[0])}</b><span class="lbl">${E(s[1])}</span></div>`).join('')}</div>
  ${H.available ? `<div class="available-badge rise"><span class="available-dot"></span><span>${E(H.availableNote || 'Open to Work')}</span></div>` : ''}</div>
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
  const isOrg = type === 'organization';
  const labelDetail = isOrg ? 'Detail Organisasi' : (isExp ? 'Detail Pengalaman' : 'Detail Proyek');
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


const achievementsMarkup = `<div class="achievements-view">
  <div class="ach-header rise">
    <p class="mono">${E(S.name)} — CERTIFICATIONS & HONORS</p>
    <h1>Lisensi, Sertifikasi & <span style="color:var(--accent,#ff6a1a)">Prestasi</span></h1>
    <p class="lead">Sertifikasi profesional di bidang Cloud AI, Data Science, Backend Engineering, kepengurusan resmi HIMA, dan pengakuan akademik.</p>
  </div>
  <div class="ach-grid rise">
    ${(S.achievements || []).map((a, i) => `
      <article class="ach-card" data-idx="${i}">
        <div class="ach-card-top">
          <span class="ach-tag">${E(a.tag || 'Credential')}</span>
          <span class="ach-year mono">${E(a.year || '')}</span>
        </div>
        <h3 class="ach-title">${E(a.title)}</h3>
        <p class="ach-issuer">${E(a.issuer)}</p>
        <div class="ach-actions">
          ${a.file ? `<a class="btn" href="${E(a.file)}" target="_blank" rel="noopener noreferrer">Lihat Sertifikat ↗</a>` : ''}
        </div>
      </article>
    `).join('')}
  </div>
</div>`;

const views = {
  home,
  me,
  projects: renderA24Markup('projects'),
  experience: renderA24Markup('experience'),
  organization: renderA24Markup('organization'),
  achievements: achievementsMarkup
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

try {
  const oEl = $('#v-organization .a24-gallery');
  if (oEl && S.organization) {
    galleries.organization = createDiscsGallery(oEl, S.organization, (slug) => {
      location.hash = `#/organization/${slug}`;
    }, { type: 'organization' });
  }
} catch (err) {
  console.warn('Organization gallery init error:', err);
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
  const isExp = k === 'experience';
  if (galleries[k]) galleries[k].vai(i);

  const th = getTheme((it.slug || '').toLowerCase());
  const thNx = getTheme((nx.slug || '').toLowerCase());

  const linksHtml = it.links && it.links.length
    ? `<div class="p-links">${it.links.map((l) => `<a class="btn dt-link" href="${E(l[1])}" target="_blank" rel="noopener noreferrer">${E(l[0])} <span class="arr">↗</span></a>`).join('')}</div>`
    : '';

  const categoryLabel = isExp ? 'REKAM JEJAK' : 'PROYEK TEKNIS';
  const archiveCode = `FA-ARCHIVE // ${isExp ? 'EXP' : 'PRJ'}-0${i+1}`;

  det.style.setProperty('--dt-accent', th.accent);
  det.style.setProperty('--dt-accent2', th.accent2);
  det.style.setProperty('--dt-bg', th.bg);

  det.innerHTML = `
  <div class="dt">
    <!-- Bar navigasi atas -->
    <div class="dt-bar">
      <a class="x" href="#/${k}">← Kembali <span class="kbd">ESC</span></a>
      <div class="dt-meta-bar">
        <span class="dt-category-badge">${categoryLabel}</span>
        <span class="dt-archive-code">${archiveCode}</span>
        <span class="dt-theme-label">${E(th.label)}</span>
      </div>
    </div>

    <!-- Hero: disc + heading -->
    <div class="dt-hero">
      <div class="dt-disc-wrap">
        <div class="dd dt-disc">${discDetail(it, i, k)}</div>
        <div class="dt-disc-glow" style="--glow:${th.accent}"></div>
      </div>
      <div class="dt-heading">
        <div class="dt-heading-meta">
          <span class="dt-kind-tag" style="--c:${th.accent}">${E(it.kind)}</span>
          <span class="dt-year-tag">${E(it.year)}</span>
        </div>
        <h1 class="dt-title">${E(it.title)}</h1>
        <p class="dt-summary">${E(it.summary)}</p>
        ${it.links && it.links.length ? linksHtml : ''}
      </div>
    </div>

    <!-- Metadata strip -->
    <dl class="dt-credits">
      ${it.meta.map((m) => `<div><dt>${E(m[0])}</dt><dd>${E(m[1])}</dd></div>`).join('')}
    </dl>

    <!-- Separator with accent line -->
    <div class="dt-divider" style="--c:${th.accent}"></div>

    <!-- Isi: poin pencapaian + tag skill -->
    <div class="dt-body">
      <div class="dt-points">
        <h2 class="dt-section-title">Pencapaian & Kontribusi</h2>
        <ul class="pts">${it.points.map((p) => `<li>${E(p)}</li>`).join('')}</ul>
      </div>
      <div class="dt-sidebar">
        <h2 class="dt-section-title">Teknologi & Keahlian</h2>
        <ul class="tags dt-tags">${it.tags.map((t) => `<li style="--tc:${th.accent}">${E(t)}</li>`).join('')}</ul>
        ${!it.links || !it.links.length ? '' : ''}
      </div>
    </div>



    <!-- Interactive Live Preview Frame (Injected from Project) -->
    ${it.livePreview ? `
      <div class="dt-preview-section">
        <div class="dt-preview-header">
          <div class="dt-preview-badge">
            <span class="dt-live-dot"></span>
            <span>LIVE INTERACTIVE PROJECT PREVIEW</span>
          </div>
          <h2 class="dt-section-title">Antarmuka Aplikasi Web (Live Demo)</h2>
          <p class="dt-evidence-sub">Anda dapat berinteraksi langsung dengan simulasi sistem web ini di bawah tanpa meninggalkan halaman:</p>
        </div>
        <div class="dt-frame-wrapper">
          <div class="dt-frame-topbar">
            <div class="dt-frame-dots">
              <span class="f-dot red"></span>
              <span class="f-dot yellow"></span>
              <span class="f-dot green"></span>
            </div>
            <div class="dt-frame-url">https://firstyatama.dev/projects/${E(it.slug)}</div>
            <a class="dt-frame-pop" href="${E(it.livePreview)}" target="_blank" rel="noopener noreferrer" title="Buka di tab baru">Buka Fullscreen ↗</a>
          </div>
          <iframe class="dt-preview-iframe" src="${E(it.livePreview)}" title="Preview ${E(it.title)}" loading="lazy"></iframe>
        </div>
      </div>
    ` : ''}

    <!-- Verified Evidence & Artifacts Section -->
    ${it.evidences && it.evidences.length ? `
      <div class="dt-evidence-section">
        <div class="dt-evidence-header">
          <div class="dt-evidence-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>VERIFIED ARTIFACTS & EVIDENCE</span>
          </div>
          <h2 class="dt-section-title">Bukti Autentik, Hasil Riset & Laporan</h2>
          <p class="dt-evidence-sub">Berkas resmi, grafik evaluasi, dan dokumen teknis yang dapat Anda telaah langsung.</p>
        </div>
        <div class="dt-evidence-grid">
          ${it.evidences.map((ev, ei) => `
            <div class="dt-evidence-card ${ev.type}">
              <div class="dt-ev-icon">
                ${ev.type === 'pdf' ? `
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                ` : `
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                `}
              </div>
              <div class="dt-ev-info">
                <span class="dt-ev-tag">${ev.type.toUpperCase()} DOCUMENT</span>
                <h3 class="dt-ev-title">${E(ev.title)}</h3>
                <p class="dt-ev-desc">${E(ev.desc || '')}</p>
              </div>
              <div class="dt-ev-action">
                <a class="btn solid dt-ev-btn" href="${E(ev.file)}" target="_blank" rel="noopener noreferrer">
                  <span>Lihat Bukti</span>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Navigasi berikutnya -->
    <div class="dt-next">
      <span class="dt-next-label">Berikutnya</span>
      <a class="dt-next-link" href="#/${k}/${nx.slug}">
        <div class="dt-next-disc" style="--glow:${thNx.accent}">${discDetail(nx, (i+1) % items.length, k)}</div>
        <div class="dt-next-info">
          <span class="dt-kind-tag" style="--c:${thNx.accent}">${E(nx.kind)}</span>
          <h3 class="dt-next-title">${E(nx.title)}</h3>
          <p class="dt-next-year">${E(nx.year)}</p>
        </div>
        <svg class="dt-next-arrow" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>`;

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
