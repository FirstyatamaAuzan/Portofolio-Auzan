import { createDiscsGallery } from './discs-gallery.js';
import { createMorphGallery } from './morph-gallery.js';
import { createLanyard } from './lanyard.js';

const S = window.SITE, $ = (s, e = document) => e.querySelector(s);
const E = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const R = (s) => E(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
const rnd = (i) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const app = $('#app');

/* Per-item theme palette */
const ITEM_THEMES = {
  'cohive':              { accent: '#38BDF8', accent2: '#F59E0B', bg: '#0B1C33', label: 'FIN-TECH WEB PLATFORM', badge: 'PROJECT-01' },
  'semsim':             { accent: '#C084FC', accent2: '#22D3EE', bg: '#180A30', label: 'NLP ACADEMIC RESEARCH', badge: 'PROJECT-02' },
  'chatbot':            { accent: '#34D399', accent2: '#FBBF24', bg: '#032015', label: 'GENERATIVE AI / NLP', badge: 'PROJECT-03' },
  'green-ranger':       { accent: '#F59E0B', accent2: '#10B981', bg: '#261404', label: 'CIRCULAR ECONOMY WEB', badge: 'PROJECT-04' },
  'knn-kontainer':      { accent: '#F43F5E', accent2: '#FDE047', bg: '#1A0510', label: 'COMPUTER VISION / ML', badge: 'PROJECT-05' },
  'bandung-techno-park': { accent: '#FF6A1A', accent2: '#60A5FA', bg: '#0C1E32', label: 'STARTUP INCUBATION', badge: 'EXP-01' },
  'cmlabs':             { accent: '#FB7185', accent2: '#38BDF8', bg: '#1A0E26', label: 'SEO & PLAGIARISM RADAR', badge: 'EXP-02' },
  'asisten-riset':      { accent: '#F43F5E', accent2: '#FDE047', bg: '#220816', label: 'COMPUTER VISION OCR', badge: 'EXP-03' },
  'hima':               { accent: '#F59E0B', accent2: '#FEF3C7', bg: '#281703', label: 'STUDENT LEADERSHIP', badge: 'EXP-04' },
  'tematics-2024':      { accent: '#A78BFA', accent2: '#F472B6', bg: '#1A0A30', label: 'ANNUAL INFORMATICS EVENT', badge: 'ORG-02' },
  'funsportika-2024':   { accent: '#34D399', accent2: '#60A5FA', bg: '#031A12', label: 'SPORTS & CULTURAL EVENT', badge: 'ORG-03' },
  'tus-championship':   { accent: '#F59E0B', accent2: '#FB923C', bg: '#1C1203', label: 'UNIVERSITY SPORTS TOUR', badge: 'ORG-04' },
  'diesnatalis-2024':   { accent: '#22D3EE', accent2: '#818CF8', bg: '#031224', label: 'CAMPUS ANNIVERSARY', badge: 'ORG-05' },
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

  } else if (slug === 'knn-kontainer') {
    // KNN scatter plot & bounding boxes
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, r = 18 + (i % 3) * 14;
      const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
      const colors = [th.accent, th.accent2, 'rgba(255,255,255,0.5)'];
      art += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="${colors[i % 3]}" opacity="0.8"/>`;
    }
    [[cx-20,cy-14,16,10],[cx+8,cy+10,14,10],[cx-8,cy+6,10,8]].forEach(([bx,by,bw,bh]) => {
      art += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="none" stroke="${th.accent}" stroke-width="1" opacity="0.6"/>`;
    });
    art += `<text x="${cx}" y="${cy+32}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent}" opacity="0.9">K=3 CLASSIFIER</text>`;

  } else if (slug === 'tematics-2024') {
    // Star burst event
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      art += `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(a)*40).toFixed(1)}" y2="${(cy + Math.sin(a)*40).toFixed(1)}" stroke="${th.accent}" stroke-width="1.2" opacity="0.6"/>`;
    }
    art += `<circle cx="${cx}" cy="${cy}" r="14" fill="${th.accent}" opacity="0.15"/>`;
    art += `<circle cx="${cx}" cy="${cy}" r="6" fill="${th.accent}"/>`;
    art += `<text x="${cx}" y="${cy+30}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent2}" opacity="0.9">TEMATICS '24</text>`;

  } else if (slug === 'funsportika-2024') {
    // Trophy shape
    art += `<path d="M${cx-16},${cy-20} L${cx+16},${cy-20} L${cx+10},${cy+4} L${cx+6},${cy+4} L${cx+6},${cy+14} L${cx+14},${cy+14} L${cx+14},${cy+18} L${cx-14},${cy+18} L${cx-14},${cy+14} L${cx-6},${cy+14} L${cx-6},${cy+4} L${cx-10},${cy+4} Z" fill="none" stroke="${th.accent}" stroke-width="1.5"/>`;
    art += `<circle cx="${cx}" cy="${cy-10}" r="8" fill="${th.accent}" opacity="0.15"/>`;
    art += `<text x="${cx}" y="${cy+32}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent2}" opacity="0.9">FUNSPORTIKA</text>`;

  } else if (slug === 'tus-championship') {
    // Laurel wreath
    for (let i = -3; i <= 3; i++) {
      const a = (i / 6) * Math.PI * 0.8;
      art += `<ellipse cx="${(cx - 28 + Math.abs(i) * 3).toFixed(1)}" cy="${(cy + Math.sin(a) * 18).toFixed(1)}" rx="8" ry="5" fill="none" stroke="${th.accent}" stroke-width="1" transform="rotate(${a * 57},${cx},${cy})" opacity="0.7"/>`;
    }
    art += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="7" font-family="monospace" fill="${th.accent2}" opacity="0.9">TUS CUP</text>`;
    art += `<text x="${cx}" y="${cy+30}" text-anchor="middle" font-size="5.5" font-family="monospace" fill="${th.accent}" opacity="0.8">CHAMPIONSHIP</text>`;

  } else if (slug === 'diesnatalis-2024') {
    // Radial firework burst
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const len = 20 + (i % 3) * 10;
      art += `<line x1="${(cx + Math.cos(a)*10).toFixed(1)}" y1="${(cy + Math.sin(a)*10).toFixed(1)}" x2="${(cx + Math.cos(a)*len).toFixed(1)}" y2="${(cy + Math.sin(a)*len).toFixed(1)}" stroke="${i % 2 === 0 ? th.accent : th.accent2}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>`;
    }
    art += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="6" font-family="monospace" fill="${th.accent}" opacity="0.9">DIES 2024</text>`;

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
const home = `<div class="home home-minimal">
  <div class="home-center-card">
    ${H.available ? `<div class="home-badge rise"><span class="badge-dot"></span><span>${E(H.availableNote || 'Open to Work')}</span></div>` : ''}
    <h1 class="home-title rise" aria-label="I'm Firstyatama Auzan Farhadi, Software Developer">
      <span class="home-im">I'm</span> <span class="home-name">${E(H.name || S.name)}</span>
      <span class="home-role">${E(H.role || 'Software Developer')}</span>
    </h1>
    <p class="home-desc rise">${E(H.shortDesc || H.text || '')}</p>
    
    <div class="home-socials rise">
      <a href="${E(C.linkedin || 'https://www.linkedin.com/in/firstyatama/')}" target="_blank" rel="noopener noreferrer" class="social-logo-btn" aria-label="LinkedIn Profile" title="LinkedIn">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0-.01-2.92 1.46 1.46 0 0 0 .01 2.92M7.86 18.5V10.13H5.06V18.5h2.8z"/>
        </svg>
      </a>

      <a href="${E(C.github || 'https://github.com/FirstyatamaAuzan')}" target="_blank" rel="noopener noreferrer" class="social-logo-btn" aria-label="GitHub Profile" title="GitHub">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </a>

      <a href="mailto:${E(C.email)}" class="social-logo-btn" id="emailBtn" aria-label="Send Email" title="${E(C.email)}">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </a>
    </div>

    <div class="home-resume-bottom rise">
      <a href="${E(C.resume || 'assets/cv-auzan.pdf')}" target="_blank" rel="noopener noreferrer" class="resume-pill-btn" title="Unduh Curriculum Vitae">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <span class="resume-label">RESUME</span>
        <span class="resume-arrow">↗</span>
      </a>
    </div>
  </div>
</div>`;

const M = S.me;

function getTechIcon(iconKey) {
  const icons = {
    // Python official logo
    python: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M11.914 0C5.82 0 6.146 2.64 6.146 2.64l.006 2.735h5.88v.834H3.84S0 5.766 0 11.916c0 6.15 3.344 5.95 3.344 5.95h1.996v-2.825s-.109-3.344 3.33-3.344h5.727s3.224.053 3.224-3.155V3.155S18.064 0 11.914 0zm-3.11 1.803a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08zm6.273 6.425v2.825s.109 3.344-3.33 3.344H6.02s-3.224-.053-3.224 3.155v5.334S2.353 24 8.503 24c6.094 0 5.768-2.64 5.768-2.64l-.006-2.735h-5.88v-.834h8.192s3.84.443 3.84-5.707c0-6.15-3.344-5.95-3.344-5.95h-1.996zm-3.163 13.892a1.04 1.04 0 1 1 0-2.08 1.04 1.04 0 0 1 0 2.08z"/></svg>`,
    // JavaScript official JS shield / badge
    javascript: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.268c-.126-.814-.62-1.493-2.003-2.043-.632-.258-1.29-.46-1.91-.715-.55-.23-.84-.5-1.01-.84-.36-.71-.24-1.7.4-2.28.66-.6 1.63-.71 2.45-.4.65.25 1.15.75 1.34 1.41.05.17.13.25.32.22l1.62-.38c.17-.04.22-.16.16-.31-.38-1.1-1.09-1.91-2.1-2.31-1.28-.51-2.79-.4-3.95.27-1.39.81-1.99 2.27-1.63 3.79.35 1.48 1.49 2.37 2.89 2.92.74.29 1.52.54 2.24.85.53.23.86.53.97.97.23.88-.19 1.77-1.07 2.15-.9.39-2.04.29-2.79-.27-.6-.45-.88-1.06-.99-1.78-.02-.15-.1-.23-.25-.21l-1.8.44c-.13.03-.18.12-.16.24.23 1.32.93 2.31 2.08 2.85 1.39.65 3.09.61 4.38-.11 1.44-.81 2.06-2.28 1.8-3.77zm-9.39 1.1c-.05-.41-.09-.79-.12-1.18-.04-.54-.08-1.08-.1-1.62-.05-1.42-.08-2.84-.13-4.26-.01-.39-.08-.51-.48-.49-1.05.05-2.09.11-3.14.16-.27.01-.39.11-.38.38.05 1.55.1 3.1.15 4.65.04 1.25.07 2.51.14 3.76.04.81.33 1.5.88 2.08.76.79 1.74 1.16 2.82 1.12 1.05-.04 1.95-.49 2.59-1.33.22-.29.17-.43-.16-.62l-1.46-.86c-.22-.13-.34-.1-.5.13-.39.54-.91.79-1.57.65-.62-.13-.88-.56-.91-1.16-.01-.13-.01-.26-.01-.41z"/></svg>`,
    // PHP official logo
    php: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.002 2C6.478 2 2 6.478 2 12s4.478 10 10.002 10c5.52 0 9.998-4.478 9.998-10s-4.478-10-9.998-10zm-4.71 13.5l.84-4.42h1.68c1.32 0 2.2.62 1.88 2.12-.34 1.58-1.54 2.3-2.92 2.3H7.29zm7.74 0l.84-4.42h1.68c1.32 0 2.2.62 1.88 2.12-.34 1.58-1.54 2.3-2.92 2.3H15.03zm-2.82-.7h-1.42l1.32-6.5h1.42l-1.32 6.5zm-3.86-1.5h.76c.72 0 1.34-.34 1.52-1.22.18-.84-.24-1.2-1.02-1.2h-.74l-.52 2.42zm7.74 0h.76c.72 0 1.34-.34 1.52-1.22.18-.84-.24-1.2-1.02-1.2h-.74l-.52 2.42z"/></svg>`,
    // SQL / Database
    sql: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    // HTML5 official shield
    html: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.938l-.234-2.625h11.438l.235-2.625H5.422l.703 7.875h9.188l-.328 3.563-3.008.844-3.047-.844-.188-2.156H6.117l.375 4.547 5.485 1.547 5.531-1.547.75-8.418H8.531v-.17z"/></svg>`,
    // CSS3 official shield
    css: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.688H5.422l.234 2.625h12.656l-.234 2.625H8.531l.235 2.625h6.656l-.328 3.563-3.117.844-3.094-.844-.188-2.156H6.258l.375 4.547 5.344 1.547 5.39-1.547.891-10.047.234-3.813z"/></svg>`,
    // Node.js official hexagonal icon
    nodejs: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 1.5L2.5 7v10L12 22.5l9.5-5.5V7L12 1.5zm0 2.3l7.5 4.3v8.6L12 21.1l-7.5-4.3V8.1L12 3.8zm-1.8 5.7c-.4 0-.8.1-1.1.4-.4.3-.5.7-.5 1.2v3.7c0 .5.2.9.5 1.2.4.3.7.4 1.1.4h3.6c.4 0 .8-.1 1.1-.4.4-.3.5-.7.5-1.2v-3.7c0-.5-.2-.9-.5-1.2-.4-.3-.7-.4-1.1-.4h-3.6zm.5 1.5h2.6v3.7h-2.6V11z"/></svg>`,
    // Express.js minimalist
    express: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M7 12h10M13 8l4 4-4 4"/></svg>`,
    // Laravel official geometric mark
    laravel: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8.2 2.5l5.5 3.2v6.4l-5.5-3.2V2.5zm7.3 4.2l5.5 3.2v6.4l-5.5-3.2V6.7zM3 11.2l5.5 3.2v6.4L3 17.6v-6.4z"/></svg>`,
    // React official atomic orbits
    react: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="4.5" ry="11" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="4.5" ry="11" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="4.5" ry="11" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
    // Tailwind CSS official waves
    tailwind: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/></svg>`,
    // TensorFlow official isometric T mark
    tensorflow: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M1.292 5.856L11.54 0v24l-4.088-2.39V15.74l-3.08 1.79v-4.14l3.08-1.79V8.212L1.292 5.856zm21.416 0L12.46 0v24l4.088-2.39V15.74l3.08 1.79v-4.14l-3.08-1.79V8.212l6.16-2.356z"/></svg>`,
    // Keras official red/monochrome K
    keras: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M24 0H0v24h24V0zM8.45 5.16h2.21v5.74l4.55-5.74h2.72l-4.84 5.95 5.15 7.73h-2.67l-3.91-6.04-1.01 1.24v4.8H8.45V5.16z"/></svg>`,
    // Hugging Face official smiley mark
    huggingface: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 2.24.74 4.31 1.99 5.98.24.32.72.33.97.02l1.09-1.34c.16-.19.14-.48-.04-.66A7.94 7.94 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8a7.94 7.94 0 0 1-1.99 5.34c-.18.2-.19.49-.03.68l1.08 1.32c.25.31.73.3 1-.02A9.95 9.95 0 0 0 22 12c0-5.523-4.477-10-10-10zm-3.5 8c-.83 0-1.5.67-1.5 1.5S7.67 13 8.5 13s1.5-.67 1.5-1.5S9.33 10 8.5 10zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-3.5 5c-2.33 0-3.5 1.5-3.5 1.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5-1.17-1.5-3.5-1.5z"/></svg>`,
    // Scikit-Learn
    scikitlearn: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><circle cx="6.5" cy="6.5" r="3.5"/><circle cx="17.5" cy="6.5" r="3.5"/><circle cx="12" cy="18" r="3.5"/><path d="M9 8.5l6 6M15 8.5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>`,
    // Pandas data grid
    pandas: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 4.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 7c2.2 0 4 1.34 4 3H8c0-1.66 1.8-3 4-3z"/></svg>`,
    // NumPy
    numpy: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M3 3h4.2l6.6 11.2V3H18v18h-4.2L7.2 9.8V21H3V3z"/></svg>`,
    // MySQL official dolphin / mark
    mysql: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.6 1.6 5 4.1 6.5l-.8 3.5 3.6-1.9c1 .3 2.1.4 3.1.4 5.5 0 10-3.6 10-8s-4.5-8-10-8zm-1.8 11.2c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm4.8 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>`,
    // Git official branch mark
    git: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.8 2.8c.4-.1.9 0 1.2.3.5.5.5 1.4 0 1.9l2.7 2.7c.5-.1 1.1 0 1.5.4.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.4-.4-.5-1-.4-1.5l-2.6-2.6v5.8c.2.2.4.5.4.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.4-.9v-5.9c-.3-.2-.4-.5-.4-.9 0-.5.2-1 .6-1.3L7.3 6.3 2.4 11.2c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.4z"/></svg>`,
    // GitHub official Octocat
    github: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    // Postman official spaceman / mark
    postman: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5l-4-2.5 4-2.5v5zm3-5.5l-7 4.5V7l7 4z"/></svg>`,
    // Jupyter official mark
    jupyter: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3" fill="currentColor"/><ellipse cx="12" cy="5" rx="7" ry="2.2"/><ellipse cx="12" cy="19" rx="7" ry="2.2"/></svg>`,
    // VS Code official mark
    vscode: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.5 2.5L7.8 10.8 3.5 7.5 2 8.3v7.4l1.5.8 4.3-3.3 9.7 8.3L22 20.2V3.8l-4.5-1.3zm0 3.8v11.4l-7-5.7 7-5.7z"/></svg>`,
    // Figma official logo
    figma: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M15.333 8c1.472 0 2.667-1.194 2.667-2.667S16.805 2.667 15.333 2.667H12v5.333h3.333zM8.667 8C10.139 8 11.333 6.806 11.333 5.333S10.139 2.667 8.667 2.667 6 3.861 6 5.333 7.194 8 8.667 8zm0 5.333C10.139 13.333 11.333 12.139 11.333 10.667S10.139 8 8.667 8 6 9.194 6 10.667s1.194 2.666 2.667 2.666zm3.333 0v-5.333h3.333c1.472 0 2.667 1.194 2.667 2.667s-1.195 2.666-2.667 2.666H12zm-3.333 8c1.472 0 2.666-1.195 2.666-2.666V16H8.667C7.194 16 6 17.195 6 18.667 6 20.139 7.194 21.333 8.667 21.333z"/></svg>`
  };
  return icons[iconKey] || `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="m9 12 2 2 4-4"/></svg>`;
}

const me = `<div class="me me-compact-page">
  <div class="ph-sticky-wrap">
    <div class="lanyard-mount" id="meLanyardMount" title="Interactive 3D Physical Lanyard Badge">
      <figure class="ph ph-fallback">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".5" aria-hidden="true">
          <circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="14"/>
        </svg>
        <img src="${E(M.photo)}" alt="Foto ${E(S.name)}" onerror="this.remove()">
      </figure>
    </div>
    <div class="lanyard-hint" aria-hidden="true">
      <span class="hint-dot"></span>
      <span class="hint-text">INTERACTIVE PASS — DRAG TO SWING • CLICK TO FLIP</span>
    </div>
  </div>

  <div class="me-content">
    <div class="me-header-box rise">
      <div class="section-kicker">
        <span class="kicker-line"></span>
        <span class="kicker-title">${E(M.sectionTitle || 'ABOUT ME')}</span>
      </div>
      <h2 class="me-headline">${E(M.lead)}</h2>
      <p class="txt me-bio">${E(M.text)}</p>
    </div>

    <div class="profile-facts-inline rise">
      ${M.facts.map((f) => `
        <div class="fact-pill">
          <span class="fact-label">${E(f[0])}:</span>
          <span class="fact-value">${E(f[1])}</span>
        </div>
      `).join('')}
    </div>

    <!-- Unified My Stack Section (Like poulo.site/#stack) -->
    <section id="stack" class="poulo-stack-section rise">
      <div class="stack-header-row">
        <h3 class="stack-clean-title">My Stack</h3>
        <span class="stack-count-badge">${(M.stack || []).length} Tools</span>
      </div>

      <div class="poulo-logo-matrix">
        ${(M.stack || []).map((tech) => `
          <div class="poulo-logo-cell" data-tech="${E(tech.name)}" data-role="${E(tech.role || '')}" tabindex="0" role="img" aria-label="${E(tech.name)}">
            <div class="logo-svg-wrap">
              ${getTechIcon(tech.icon)}
            </div>
            <div class="poulo-tooltip">
              <span class="tip-title">${E(tech.name)}</span>
              ${tech.role ? `<span class="tip-role">${E(tech.role)}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>
</div>`;

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
    ${(S.achievements || []).map((a, i) => {
      const coverSrc = a.cover || a.file;
      const isPdf = (a.file || '').toLowerCase().endsWith('.pdf');
      const fileTypeLabel = isPdf ? 'PDF DOKUMEN' : 'IMAGE BERKAS';

      return `
      <article class="ach-card" data-idx="${i}">
        <div class="ach-cover-wrap" style="cursor:pointer" data-cert-file="${E(a.file)}" data-cert-title="${E(a.title)}" data-cert-pdf="${isPdf ? '1' : '0'}" title="Lihat sertifikat ${E(a.title)}">
          <img class="ach-cover-img" src="${E(coverSrc)}" alt="Sertifikat ${E(a.title)}" loading="lazy" onerror="this.style.opacity='0.2'">
          <span class="ach-cover-zoom-hint">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <span>Lihat Sertifikat</span>
          </span>
        </div>
        <div class="ach-body">
          <div class="ach-card-meta">
            <span class="ach-tag">${E(a.tag || 'Credential')}</span>
            <span class="ach-year mono">${E(a.year || '')}</span>
          </div>
          <h3 class="ach-title">${E(a.title)}</h3>
          <p class="ach-issuer">${E(a.issuer)}</p>
          <div class="ach-actions">
            <span class="ach-file-badge mono">${fileTypeLabel}</span>
            <button class="ach-btn" data-cert-file="${E(a.file)}" data-cert-title="${E(a.title)}" data-cert-pdf="${isPdf ? '1' : '0'}">
              <span>Lihat Sertifikat</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
        </div>
      </article>
      `;
    }).join('')}
  </div>
</div>

<!-- Certificate Viewer Modal -->
<div class="cert-modal-backdrop" id="certModal" aria-modal="true" role="dialog" aria-label="Lihat Sertifikat">
  <div class="cert-modal-box">
    <div class="cert-modal-topbar">
      <span class="cert-modal-title" id="certModalTitle">Sertifikat</span>
      <div style="display:flex;gap:8px;align-items:center;">
        <a class="cert-modal-open-btn" id="certModalOpenBtn" href="#" target="_blank" rel="noopener noreferrer" title="Buka di tab baru">↗ Buka</a>
        <button class="cert-modal-close" id="certModalClose" aria-label="Tutup">✕</button>
      </div>
    </div>
    <div class="cert-modal-body" id="certModalBody"></div>
  </div>
</div>`;

function renderOrganizationView() {
  return `<div class="org-morph-container" id="orgMorphMount"></div>`;
}

const views = {
  home,
  me,
  projects: renderA24Markup('projects'),
  experience: renderA24Markup('experience'),
  organization: renderOrganizationView(),
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
$('#copy')?.addEventListener('click', (e) => {
  const b = e.currentTarget;
  const done = (t) => { b.textContent = t; setTimeout(() => (b.textContent = 'Salin email'), 1800); };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(C.email).then(() => { done('Tersalin ✓'); showToast('Email tersalin ke clipboard! ✉'); }, () => fallbackCopy(C.email, done));
  } else {
    fallbackCopy(C.email, done);
  }
});

$('#emailBtn')?.addEventListener('click', () => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(C.email).then(() => {
      showToast(`Email ${C.email} tersalin ke clipboard! ✉`);
    });
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

// Floating Toast Notification
const toastEl = document.createElement('div');
toastEl.className = 'dt-toast';
document.body.appendChild(toastEl);
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// Contact Modal (Formspree)
const contactModal = document.createElement('div');
contactModal.className = 'contact-modal-backdrop';
contactModal.innerHTML = `
  <div class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button type="button" class="contact-modal-close" id="closeContact" aria-label="Tutup modal">✕</button>
    <h2 id="modalTitle">Kirim Pesan Langsung</h2>
    <p>Silakan kirim pesan atau ajakan proyek. Pesan akan terkirim langsung ke email resmi <b>${E(C.email)}</b>.</p>
    <form class="contact-form" action="https://formspree.io/f/xvzgbvvw" method="POST" id="contactForm">
      <div class="form-field">
        <label for="cName">Nama Lengkap</label>
        <input type="text" id="cName" name="name" required placeholder="Nama Anda / Perusahaan" autocomplete="name">
      </div>
      <div class="form-field">
        <label for="cEmail">Email Anda</label>
        <input type="email" id="cEmail" name="_replyto" required placeholder="email@domain.com" autocomplete="email">
      </div>
      <div class="form-field">
        <label for="cMsg">Pesan / Penawaran</label>
        <textarea id="cMsg" name="message" rows="4" required placeholder="Tuliskan pesan atau detail kebutuhan kolaborasi..."></textarea>
      </div>
      <button type="submit" class="btn solid" style="justify-content:center;margin-top:6px">Kirim Pesan ↗</button>
    </form>
  </div>
`;
document.body.appendChild(contactModal);

$('#openContact')?.addEventListener('click', () => contactModal.classList.add('on'));
$('#closeContact')?.addEventListener('click', () => contactModal.classList.remove('on'));
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) contactModal.classList.remove('on');
});

/* ---------- Certificate Viewer Modal ---------- */
function initCertModal() {
  const achView = document.querySelector('#v-achievements');
  if (!achView) return;

  const certModal = document.getElementById('certModal');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalBody = document.getElementById('certModalBody');
  const certModalClose = document.getElementById('certModalClose');
  const certModalOpenBtn = document.getElementById('certModalOpenBtn');

  if (!certModal) return;

  function openCertModal(file, title, isPdf) {
    certModalTitle.textContent = title;
    if (certModalOpenBtn) {
      certModalOpenBtn.href = file;
    }
    if (isPdf) {
      certModalBody.innerHTML = `<iframe src="${file}#toolbar=0&navpanes=0" title="${title}" class="cert-modal-iframe"></iframe>`;
    } else {
      certModalBody.innerHTML = `<img src="${file}" alt="${title}" class="cert-modal-img" loading="lazy">`;
    }
    certModal.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('on');
    certModalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  achView.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cert-file]');
    if (!btn) return;
    e.preventDefault();
    const file = btn.dataset.certFile;
    const title = btn.dataset.certTitle;
    const isPdf = btn.dataset.certPdf === '1';
    openCertModal(file, title, isPdf);
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('on')) closeCertModal();
  });
}
initCertModal();

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
  const oEl = $('#orgMorphMount');
  if (oEl) {
    galleries.organization = createMorphGallery(oEl, S.organization, (slug) => {
      location.hash = `#/organization/${slug}`;
    });
  }
} catch (err) {
  console.warn('Organization morph gallery init error:', err);
}

let lanyardInstance = null;
function initMeLanyard() {
  const mount = $('#meLanyardMount');
  if (!mount) return;
  if (lanyardInstance) {
    if (typeof lanyardInstance.start === 'function') lanyardInstance.start();
    return;
  }
  try {
    lanyardInstance = createLanyard(mount, {
      frontImage: S.me?.photo || 'assets/foto.jpg',
      backImage: S.me?.photo || 'assets/foto.jpg',
      finish: 'matte',
      strapColor: '#FF5A1F',
      cardColor: '#0c0c0e',
      size: 0.62,
      strapLength: 0.64,
      interactive: true,
      breeze: 0.38
    });
    // If successfully initialized canvas, hide static fallback
    if (mount.querySelector('canvas')) {
      const fb = mount.querySelector('.ph-fallback');
      if (fb) fb.style.display = 'none';
    }
  } catch (err) {
    console.warn('Lanyard 3D init fallback to image:', err);
  }
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
/* ---------- Code Syntax Highlighting Helper ---------- */
function highlightCode(code, lang) {
  if (!code) return '';
  let escaped = E(code);
  // Comments
  escaped = escaped.replace(/(#.*$|\/\/.*$)/gm, '<span class="syn-com">$1</span>');
  // Strings
  escaped = escaped.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`|'[^'\n]*'|"[^"\n]*")/g, '<span class="syn-str">$1</span>');
  // Keywords
  const kwList = [
    'import', 'from', 'as', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'try', 'except', 'finally',
    'namespace', 'use', 'public', 'private', 'protected', 'function', 'new', 'static', 'const', 'let', 'var', 'async', 'await',
    'self', 'this', 'extends', 'implements', 'interface', 'throw', 'catch', 'true', 'false', 'null'
  ];
  const kwRegex = new RegExp(`\\b(${kwList.join('|')})\\b`, 'g');
  escaped = escaped.replace(kwRegex, '<span class="syn-kw">$1</span>');
  // Numbers
  escaped = escaped.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="syn-num">$1</span>');
  // Function / method calls
  escaped = escaped.replace(/\b([A-Za-z0-9_]+)(?=\()/g, '<span class="syn-fn">$1</span>');
  return escaped;
}


/* ---------- CoHive Slides & Evidence Preset Data ---------- */
const COHIVE_BENTO_PRESET = {
  slides: [
    {
      tag: 'Akses & Autentikasi',
      title: 'Autentikasi & Multi-Role Guard',
      route: '/login · /register',
      img: 'assets/shots/login.jpg',
      facts: [
        '3 middleware isolasi: LoginMiddleware, HarusLogoutMiddleware, AdminMiddleware',
        'Role Admin dan Karyawan; registrasi baru otomatis berstatus Karyawan',
        'Password dienkripsi bcrypt standar industri (Hash::make), validasi min:6'
      ],
      chips: ['Laravel Auth', 'Middleware', 'Bcrypt Hash'],
      file: 'app/Http/Controllers/AuthController.php'
    },
    {
      tag: 'Anggota Koperasi',
      title: 'Manajemen Anggota & Profil',
      route: '/anggota',
      img: 'assets/shots/anggota.jpg',
      facts: [
        'Daftar anggota dan profil dalam satu query eager loading relasional (tanpa N+1 overhead)',
        'Profil 1:1 per user: biodata, nomor kontak WhatsApp, simpanan pokok & wajib',
        'Upload foto tervalidasi server-side (mimes:jpg,png, maks 2 MB)'
      ],
      chips: ['Eager Loading', 'Form Validation', 'Storage API'],
      file: 'app/Http/Controllers/AnggotaController.php'
    },
    {
      tag: 'Inventaris Stok',
      title: 'Stok Barang Masuk & Keluar',
      route: '/stok-barang',
      img: 'assets/shots/stok.jpg',
      facts: [
        'Pencatatan barang masuk dan keluar digabung (UNION ALL) menjadi satu audit ledger realtime',
        'Ringkasan aktivitas 7 hari: metrik jumlah dan valuasi transaksi masuk/keluar',
        'Barang keluar otomatis ditolak bila stok tidak mencukupi; peringatan jika stok < 5'
      ],
      chips: ['Query Builder', 'UNION ALL', 'Alert Logic'],
      file: 'app/Http/Controllers/BarangController.php'
    },
    {
      tag: 'Keuangan & Ledger',
      title: 'Akun Kas, Kategori & Mutasi Transaksi',
      route: '/keuangan',
      img: 'assets/shots/keuangan.jpg',
      facts: [
        'Akun kas, kategori income/expense, dan transaksi terhubung foreign key terisolasi',
        'Saldo buku besar otomatis naik/turun atomik di dalam Database Transaction InnoDB',
        'Kategori baru dapat dibuat instan saat pencatatan mutasi kas; ekspor neraca PDF'
      ],
      chips: ['ACID Transaction', 'Decimal(15,2)', 'Audit Trail'],
      file: 'app/Http/Controllers/KeuanganTransactionController.php'
    },
    {
      tag: 'Agenda & Event',
      title: 'Kalender Event Anggota',
      route: '/jadwal_anggota · /events',
      img: 'assets/shots/jadwal.jpg',
      facts: [
        'Event kalender dengan tanggal, waktu mulai, dan waktu selesai',
        'Visibilitas public dan private: agenda privat hanya tampil untuk akun pembuat',
        'Data dimuat dinamis per rentang tanggal lewat REST endpoint JSON dan async fetch()'
      ],
      chips: ['REST JSON', 'Async Fetch', 'Visibility Scope'],
      file: 'app/Http/Controllers/EventController.php'
    }
  ],
  tables: {
    'Akses': [
      ['users', ['id', 'username *', 'email *', 'password (bcrypt)', 'role: Admin|Karyawan']],
      ['profiles', ['id', 'user_id → users *', 'name, gender, phone', 'birth_date, address', 'photo']]
    ],
    'Inventaris': [
      ['barangs', ['id_barang', 'nama_barang', 'varian', 'stok', 'harga_beli / harga_jual', 'tanggal_exp, gambar']],
      ['barang_masuks', ['barang_id → barangs', 'user_id → users', 'jumlah', 'tanggal']],
      ['barang_keluars', ['barang_id → barangs', 'user_id → users', 'jumlah', 'tanggal']]
    ],
    'Keuangan': [
      ['keuangan_accounts', ['user_id → users', 'name', 'balance: decimal(15,2)']],
      ['keuangan_categories', ['user_id → users', 'name', 'type: income|expense']],
      ['keuangan_transactions', ['account_id → accounts', 'category_id → categories', 'user_id → users', 'amount, transaction_date', 'description']]
    ],
    'Jadwal': [
      ['events', ['user_id → users', 'title, date', 'start_time, end_time', 'visibility: public|private']]
    ]
  },
  routes: {
    'Akses': [['GET', '/login'], ['POST', '/loginCheck'], ['POST', '/register'], ['GET', '/logout']],
    'Anggota & Profil': [['GET', '/anggota'], ['PUT', '/anggota/{user}'], ['GET', '/profile'], ['POST', '/profile/update']],
    'Stok Barang': [['GET', '/stok-barang'], ['POST', '/barangs'], ['PUT', '/barangs/{id}'], ['POST', '/barang/keluar'], ['GET', '/barangs/detail/{id}']],
    'Keuangan': [['GET', '/keuangan'], ['POST', '/keuangan-accounts'], ['PUT', '/keuangan-accounts/{id}'], ['POST', '/keuangan/transactions']],
    'Jadwal': [['GET', '/jadwal_anggota'], ['GET', '/events'], ['POST', '/events']]
  },
  evidence: [
    { type: 'pdf', badge: 'PDF RESMI', title: 'Sertifikat Kelulusan MBKM WRAP 2025', desc: 'Diterbitkan Telkom University & Bandung Techno Park', file: 'assets/evidence/cohive/sertifikat_mbkm_wrap.pdf', wide: true },
    { type: 'pdf', badge: 'PITCH DECK', title: 'Pitch Deck CoHive (System & Business)', desc: 'Presentasi arsitektur sistem & validasi pasar di inkubator BTP', file: 'assets/evidence/cohive/pitchdeck_cohive.pdf', wide: true },
    { type: 'code', badge: 'KODE', title: 'Source Code di GitHub', desc: 'Struktur MVC Laravel, 8 controller teruji, 9 model', kind: 'repo', stats: [{ v: '8', l: 'Controller' }, { v: '9', l: 'Model' }, { v: '13', l: 'Migrasi' }, { v: '9', l: 'Blade Views' }], tree: 'app/\n├── Http/Controllers/   8 file\n├── Http/Middleware/    3 file\n└── Models/             9 file\ndatabase/migrations/   13 file\nresources/views/       9 file Blade\nroutes/web.php' },
    { type: 'db', badge: 'SKEMA', title: 'Skema Database', desc: '9 tabel inti, relasi foreign key InnoDB', kind: 'schema' },
    { type: 'flow', badge: 'ARSITEKTUR', title: 'Alur Request', desc: 'Middleware → Route → Controller → Model → View', kind: 'flow', steps: [{ title: 'Request', sub: 'Browser client' }, { title: 'Middleware', sub: 'Login / RBAC Guard' }, { title: 'Route', sub: 'routes/web.php' }, { title: 'Controller', sub: '8 Controller' }, { title: 'Model', sub: 'Eloquent + ACID' }, { title: 'View', sub: 'Blade + Tailwind' }] },
    { type: 'route', badge: 'API', title: 'Peta Route', desc: 'Endpoint per modul di routes/web.php', kind: 'routes' }
  ]
};

/* Helper function to generate project slides from item data */
function getProjectSlides(it) {
  if (it.slug === 'cohive' || it.slug === 'bandung-techno-park') {
    return COHIVE_BENTO_PRESET.slides;
  }

  const cs = it.caseStudy;
  const slides = [];

  // Green Ranger: we have live preview screenshots in assets/previews/green-ranger-app/img/
  if (it.slug === 'green-ranger') {
    slides.push({
      tag: 'Payment Gateway',
      title: 'Integrasi Midtrans Snap & Webhook',
      route: '/donasi · /payment/callback',
      img: 'assets/previews/green-ranger-app/img/donate1.jpg',
      facts: [
        'Penanganan webhook asynchronous dengan validasi kriptografi SHA-512',
        'Idempotency lock untuk mencegah pencatatan donasi ganda saat re-try network',
        'Integrasi pop-up checkout Midtrans Snap SDK responsif multi-device'
      ],
      chips: ['Midtrans Snap', 'SHA-512', 'Laravel REST'],
      file: 'app/Http/Controllers/PaymentCallbackController.php'
    });
    slides.push({
      tag: 'Aksi Relawan',
      title: 'Pendaftaran & Verifikasi Sukarelawan',
      route: '/relawan · /event',
      img: 'assets/previews/green-ranger-app/img/event1.jpg',
      facts: [
        'Formulir pendaftaran relawan aksi penghijauan dengan alur persetujuan admin',
        'Pemberitahuan otomatis status keikutsertaan aksi lingkungan',
        'Database relasional peserta aksi dengan relasi InnoDB terisolasi'
      ],
      chips: ['Relawan', 'Event Action', 'MySQL Relational'],
      file: 'app/Http/Controllers/VolunteerController.php'
    });
    slides.push({
      tag: 'Eco-Marketplace',
      title: 'Katalog Produk Daur Ulang',
      route: '/marketplace · /shop',
      img: 'assets/previews/green-ranger-app/img/ss1.jpg',
      facts: [
        'Etalase produk daur ulang dari komunitas pengrajin sampah lokal',
        'Manajemen keranjang belanja dan rekonsiliasi stok otomatis setelah checkout',
        'Antarmuka ramah pengguna dibangun dengan Bootstrap 5 & JavaScript'
      ],
      chips: ['Eco-Commerce', 'Inventory Sync', 'Bootstrap 5'],
      file: 'app/Http/Controllers/ShopController.php'
    });
    return slides;
  }

  // SemSim
  if (it.slug === 'semsim') {
    slides.push({
      tag: 'Deep Learning & NLP',
      title: 'Siamese Bi-Encoder IndoBERT',
      route: '/api/similarity · /predict',
      img: 'assets/evidence/semsim/flowchart_arsitektur.png',
      facts: [
        'IndoBERT-base-p1 fine-tuned dengan Mean Pooling dan CosineSimilarityLoss',
        'Validasi GroupKFold 5-fold per ID dokumen untuk mencegah data leakage',
        'Representasi vektor padat 768 dimensi dengan korelasi Pearson 0.892'
      ],
      chips: ['IndoBERT', 'PyTorch', 'Siamese Bi-Encoder'],
      file: 'models/siamese_indobert.py'
    });
    slides.push({
      tag: 'Ekstraksi PDF',
      title: 'Parser Bab II & Anotasi Semantik',
      route: '/extract · /dataset',
      img: 'assets/evidence/semsim/distribusi_anotasi.png',
      facts: [
        'Ekstraksi teks cerdas dengan PyMuPDF memfilter header, footer, dan nomor halaman',
        'Segmentasi kalimat berpasangan otomatis untuk dokumen akademik Bab II',
        'Evaluasi F1-Score deteksi parafrasa mencapai 94.5%'
      ],
      chips: ['PyMuPDF', 'GroupKFold', 'Hugging Face'],
      file: 'extractors/pdf_parser.py'
    });
    if (cs && cs.implementation && cs.implementation.code) {
      slides.push({
        tag: 'Komputasi Vektor',
        title: cs.implementation.code.filename || 'PyTorch Similarity Engine',
        route: 'models/similarity.py',
        facts: [
          'Cosine similarity metric pada ruang vektor embedding 768 dimensi',
          'Pipeline inferensi seimbang antara akurasi leksikal dan semantik kontekstual',
          cs.implementation.code.desc || 'Implementasi PyTorch tensor operations'
        ],
        chips: ['PyTorch', 'Cosine Distance', 'Sentence Embedding'],
        file: cs.implementation.code.filename || 'models/siamese_indobert.py'
      });
    }
    return slides;
  }

  // Chatbot T5
  if (it.slug === 'chatbot') {
    slides.push({
      tag: 'Seq2Seq Architecture',
      title: 'Supervised Fine-Tuning Google T5',
      route: 'generator.py · /dialog',
      facts: [
        'Pelatihan supervised fine-tuning pada dataset 3,000+ dialog percakapan',
        'Formulasi paradigma text-to-text standar Google T5',
        'Optimasi learning rate dengan AdamW scheduler & gradient accumulation'
      ],
      chips: ['Google T5', 'Seq2Seq', 'Hugging Face'],
      file: 'chatbot/generator.py'
    });
    slides.push({
      tag: 'Inference Strategy',
      title: 'Beam Search & Repetition Mitigation',
      route: '/respond · /generate',
      facts: [
        'Beam search decoding dengan parameter num_beams=4 untuk kualitas narasi optimal',
        'Penalti perulangan n-gram (no_repeat_ngram_size=2) guna mengeliminasi looping',
        'Latensi inferensi rata-rata < 180ms per respons pengguna'
      ],
      chips: ['Beam Search', 'NLP Decoding', 'Latency Opt'],
      file: 'chatbot/inference.py'
    });
    return slides;
  }

  // KNN Kontainer
  if (it.slug === 'knn-kontainer') {
    slides.push({
      tag: 'Computer Vision',
      title: 'Ekstraksi Fitur Ruang Warna HSV',
      route: 'classifier/knn_container.py',
      facts: [
        'Transformasi ruang warna dari RGB ke HSV pada Region of Interest (ROI)',
        'Pemisahan komponen Hue dari intensitas cahaya (Value) untuk ketahanan terik matahari',
        'Akurasi klasifikasi mencapai 94.0% pada 4 kelas warna kontainer logistik'
      ],
      chips: ['OpenCV', 'HSV Color Space', 'Computer Vision'],
      file: 'classifier/knn_container.py'
    });
    slides.push({
      tag: 'Machine Learning',
      title: 'Klasifikasi K-Nearest Neighbor (K=3)',
      route: 'models/knn_eval.py',
      facts: [
        'Pencarian hyperparameter optimal K=3 dengan metrik jarak Euclidean',
        'Evaluasi menyeluruh: confusion matrix, precision, recall, dan F1-Score',
        'Waktu inferensi ultra-ringan < 50ms per citra kontainer'
      ],
      chips: ['Scikit-learn', 'KNN', 'Pattern Recognition'],
      file: 'classifier/colorDetection_KNN.py'
    });
    return slides;
  }

  // Generic fallback from case study or points
  if (cs && cs.implementation) {
    if (cs.implementation.feature1) {
      slides.push({
        tag: cs.implementation.feature1.tag || 'Fitur Utama',
        title: cs.implementation.feature1.title || it.title,
        route: `/modules/${it.slug}`,
        facts: [cs.implementation.feature1.desc || it.summary],
        chips: (it.tags || []).slice(0, 3),
        file: ''
      });
    }
    if (cs.implementation.feature2) {
      slides.push({
        tag: cs.implementation.feature2.tag || 'Arsitektur Teknis',
        title: cs.implementation.feature2.title || 'Implementasi Sistem',
        route: `/services/${it.slug}`,
        facts: [cs.implementation.feature2.desc || it.summary],
        chips: (it.tags || []).slice(3, 6),
        file: ''
      });
    }
  }

  if (!slides.length && it.points) {
    it.points.slice(0, 3).forEach((p, pi) => {
      slides.push({
        tag: `Modul 0${pi + 1}`,
        title: it.title,
        route: `/spec-0${pi + 1}`,
        facts: [p],
        chips: (it.tags || []).slice(0, 2),
        file: ''
      });
    });
  }

  return slides;
}

/* Helper function to get unified evidences */
function getProjectEvidences(it) {
  if (it.slug === 'cohive' || it.slug === 'bandung-techno-park') {
    const p = COHIVE_BENTO_PRESET;
    return p.evidence.map(e => {
      if (e.kind === 'schema') e.tables = p.tables;
      if (e.kind === 'routes') e.routes = p.routes;
      return e;
    });
  }

  const evList = (it.evidences ? [...it.evidences] : []).map(e => ({
    ...e,
    badge: e.type ? e.type.toUpperCase() : 'BUKTI',
    wide: e.type === 'pdf'
  }));

  // Append Code repo tile if github link exists
  const gh = (it.links && it.links.find(l => l[0].toLowerCase().includes('github')));
  if (gh) {
    evList.push({
      type: 'code',
      badge: 'KODE',
      title: 'Source Code di GitHub',
      desc: `Repositori resmi modul ${it.title} dengan arsitektur bersih dan terdokumentasi`,
      kind: 'repo',
      stats: [{ v: '100%', l: 'Selesai' }, { v: `${it.tags.length}+`, l: 'Teknologi' }, { v: 'Open', l: 'Source' }],
      tree: `${it.slug}/\n├── src/\n├── tests/\n├── docs/\n└── README.md`
    });
  }

  // Append Flow diagram tile
  evList.push({
    type: 'flow',
    badge: 'ARSITEKTUR',
    title: 'Alur Pemrosesan Sistem',
    desc: 'Pipeline end-to-end dari data ingestion hingga modul presentation',
    kind: 'flow',
    steps: [
      { title: 'Input Layer', sub: 'Request / Raw Data' },
      { title: 'Validation', sub: 'Integrity & Type Guard' },
      { title: 'Core Engine', sub: it.tags[0] || 'Core Processor' },
      { title: 'Data Store', sub: it.tags[1] || 'Persistence' },
      { title: 'Output API', sub: 'REST / View Layer' }
    ]
  });

  return evList;
}


/* ---------- Unified Project Bento Interactions & Animated Modal ---------- */
function initProjectDetailInteractions(slides, evidences, projectData) {
  const track   = $('#prjTrack', det);
  const dots    = $('#prjDots', det);
  const prevBtn = $('#prjPrev', det);
  const nextBtn = $('#prjNext', det);
  const nowEl   = $('#prjNow', det);

  if (track && dots) {
    const slideEls = [...track.children];
    const dotBtns  = [...dots.children];
    let curSlide = 0;
    const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setCur = (idx) => {
      curSlide = idx;
      if (nowEl) nowEl.textContent = idx + 1;
      dotBtns.forEach((b, k) => b.setAttribute('aria-current', String(k === idx)));
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === slideEls.length - 1;
    };

    const goTo = (idx) => {
      idx = Math.max(0, Math.min(slideEls.length - 1, idx));
      if (slideEls[idx]) {
        track.scrollTo({ left: slideEls[idx].offsetLeft - track.offsetLeft, behavior: reduce() ? 'auto' : 'smooth' });
      }
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) setCur(slideEls.indexOf(entry.target));
      });
    }, { root: track, threshold: [0.6] });
    slideEls.forEach(s => io.observe(s));

    if (prevBtn) prevBtn.onclick = () => goTo(curSlide - 1);
    if (nextBtn) nextBtn.onclick = () => goTo(curSlide + 1);
    dots.onclick = (e) => { const b = e.target.closest('[data-go]'); if (b) goTo(+b.dataset.go); };
    track.onkeydown = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(curSlide + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(curSlide - 1); }
    };

    // Mouse drag support matching the reference
    (() => {
      let down = false, sx = 0, sl = 0, moved = false;
      track.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
      });
      addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 4) {
          moved = true;
          track.style.scrollSnapType = 'none';
          track.scrollLeft = sl - dx;
        }
      });
      addEventListener('pointerup', () => {
        if (!down) return;
        down = false;
        track.style.scrollSnapType = '';
        if (moved && slideEls.length) {
          const w = slideEls[0].offsetWidth;
          goTo(Math.round(track.scrollLeft / (w + 16)));
        }
      });
    })();

    setCur(0);
  }

  // Evidence Modal Handler (Grow-from-clicked-tile FLIP animation)
  const proofGrid = $('#prjProofGrid', det);
  const modal     = $('#prjModal', det);
  const mCard     = $('#prjMCard', det);
  const mBg       = $('#prjMBg', det);
  const mBody     = $('#prjMBody', det);
  const mBadge    = $('#prjMBadge', det);
  const mTitle    = $('#prjMTitle', det);
  const mCount    = $('#prjMCount', det);
  const mClose    = $('#prjMClose', det);
  const mPrev     = $('#prjMPrev', det);
  const mNext     = $('#prjMNext', det);

  if (!modal || !proofGrid || !evidences || !evidences.length) return;

  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let openIdx = -1, lastTile = null, busy = false;

  const renderBody = (ev) => {
    if (ev.type === 'pdf') {
      return `
        <iframe src="${E(ev.file)}#toolbar=0&navpanes=0" title="${E(ev.title)}"></iframe>
        <p class="prj-modal-cap">${E(ev.desc || '')}. Pratinjau kosong? <a class="prj-modal-lnk" href="${E(ev.file)}" target="_blank" rel="noopener noreferrer">Buka dokumen PDF di tab baru</a></p>
      `;
    }
    if (ev.type === 'image') {
      return `
        <div style="display:grid;place-items:center;background:#080808;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;overflow:hidden">
          <img src="${E(ev.file)}" alt="${E(ev.title)}" style="max-width:100%;max-height:min(60vh,560px);object-fit:contain;border-radius:6px;display:block">
        </div>
        <p class="prj-modal-cap" style="margin-top:14px">${E(ev.desc || '')}. <a class="prj-modal-lnk" href="${E(ev.file)}" target="_blank" rel="noopener noreferrer">Lihat resolusi penuh</a></p>
      `;
    }
    if (ev.kind === 'routes' && ev.routes) {
      return `
        <div class="prj-modal-tables">
          ${Object.entries(ev.routes).map(([g, rs]) => `
            <div class="prj-modal-tbl">
              <h4>${E(g)}</h4>
              <ul class="prj-modal-rt">
                ${rs.map(([m, u]) => `<li><b class="prj-mt ${m}">${m}</b><span>${E(u)}</span></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <p class="prj-modal-cap">${E(ev.desc || 'Endpoint resmi dan peta routing aplikasi.')}</p>
      `;
    }
    if (ev.kind === 'schema' && ev.tables) {
      return `
        <div class="prj-modal-tables">
          ${Object.entries(ev.tables).map(([g, ts]) => `
            <div class="prj-modal-grp">${E(g)}</div>
            ${ts.map(([tblName, cols]) => `
              <div class="prj-modal-tbl">
                <h4>${E(tblName)}</h4>
                <ul>
                  ${cols.map(c => `<li class="${c.includes('→') ? 'fk' : ''}">${E(c)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          `).join('')}
        </div>
        <p class="prj-modal-cap">${E(ev.desc || '→ = Foreign Key relasional · * = Unique constraint.')}</p>
      `;
    }
    if (ev.kind === 'flow') {
      const steps = ev.steps || [
        { title: 'Client Request', sub: 'Browser / REST Client' },
        { title: 'Security Guard', sub: 'Auth / CSRF Middleware' },
        { title: 'Controller', sub: 'Business logic layer' },
        { title: 'Service / Model', sub: 'Database operations' },
        { title: 'Response', sub: 'Blade / JSON payload' }
      ];
      return `
        <div class="prj-modal-flow">
          ${steps.map((st, si) => `
            <div class="prj-modal-st">
              <b>${E(st.title)}</b>
              <small>${E(st.sub)}</small>
            </div>
            ${si < steps.length - 1 ? '<span class="prj-modal-ar">→</span>' : ''}
          `).join('')}
        </div>
        <p class="prj-modal-cap">${E(ev.desc || 'Arsitektur pipeline dan alur pemrosesan request sistem.')}</p>
      `;
    }
    if (ev.kind === 'repo') {
      const stats = ev.stats || [{ v: '100%', l: 'Verified' }, { v: 'Clean', l: 'Architecture' }];
      const tree = ev.tree || 'src/\n├── controllers/\n├── models/\n└── routes/';
      const repoUrl = (projectData && projectData.links && projectData.links.find(l => l[0].toLowerCase().includes('github')))?.[1] || '#';
      return `
        <div class="prj-modal-stats">
          ${stats.map(s => `<div><b>${E(s.v)}</b><span>${E(s.l)}</span></div>`).join('')}
        </div>
        <pre class="prj-modal-tree"><code>${E(tree)}</code></pre>
        ${repoUrl !== '#' ? `<p class="prj-modal-cap"><a class="prj-act-btn solid" style="margin-top:10px" href="${E(repoUrl)}" target="_blank" rel="noopener noreferrer">Buka Repositori GitHub</a></p>` : ''}
      `;
    }
    return `<p class="prj-modal-cap">${E(ev.desc || '')}</p>`;
  };

  const renderModal = (idx) => {
    const ev = evidences[idx];
    if (!ev) return;
    if (mBadge) mBadge.textContent = ev.badge || (ev.type ? ev.type.toUpperCase() : 'BUKTI');
    if (mTitle) mTitle.textContent = ev.title;
    if (mCount) mCount.textContent = `${idx + 1} / ${evidences.length}`;
    if (mBody)  mBody.innerHTML    = renderBody(ev);
  };

  const openModal = (idx, tile) => {
    if (busy) return;
    busy = true;
    openIdx = idx;
    lastTile = tile || document.querySelector(`[data-ev="${idx}"]`);
    [mCard, mBg, mBody].forEach(el => el && el.getAnimations().forEach(a => a.cancel()));
    renderModal(idx);
    document.documentElement.style.overflow = 'hidden';
    modal.hidden = false;
    modal.classList.add('on');

    const from = lastTile ? lastTile.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 10, height: 10 };
    const to   = mCard.getBoundingClientRect();
    const dx   = from.left - to.left;
    const dy   = from.top - to.top;
    const sx2  = from.width / to.width;
    const sy2  = from.height / to.height;

    if (mBg) mBg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
    mCard.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${sx2}, ${sy2})`, opacity: 0.2 }, { transform: 'none', opacity: 1 }],
      { duration: reduce() ? 1 : 460, easing: 'cubic-bezier(.2,.85,.25,1)', fill: 'both' }
    ).finished.then(() => { busy = false; });
    if (mBody) mBody.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 340, delay: 160, fill: 'both' });
    if (mClose) mClose.focus({ preventScroll: true });
  };

  const closeModal = () => {
    if (busy || openIdx < 0) return;
    busy = true;
    const from = lastTile ? lastTile.getBoundingClientRect() : null;
    const to   = mCard.getBoundingClientRect();
    const kf   = from ? { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`, opacity: 0 } : { transform: 'scale(.96)', opacity: 0 };
    if (mBg) mBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: 'forwards' });
    mCard.animate([{ transform: 'none', opacity: 1 }, kf], { duration: reduce() ? 1 : 320, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' }).finished.then(() => {
      modal.classList.remove('on');
      modal.hidden = true;
      if (mBody) mBody.innerHTML = '';
      document.documentElement.style.overflow = '';
      openIdx = -1;
      busy = false;
      if (lastTile) lastTile.focus({ preventScroll: true });
    });
  };

  const step = (d) => {
    if (busy) return;
    openIdx = (openIdx + d + evidences.length) % evidences.length;
    lastTile = document.querySelector(`[data-ev="${openIdx}"]`);
    renderModal(openIdx);
    if (mBody) mBody.animate([{ opacity: 0, transform: `translateX(${d * 24}px)` }, { opacity: 1, transform: 'none' }], { duration: 280, fill: 'both' });
  };

  proofGrid.onclick = (e) => {
    const t = e.target.closest('[data-ev]');
    if (t) openModal(+t.dataset.ev, t);
  };

  if (mClose) mClose.onclick = closeModal;
  if (mBg)    mBg.onclick    = closeModal;
  if (mPrev)  mPrev.onclick  = () => step(-1);
  if (mNext)  mNext.onclick  = () => step(1);

  const onKeydown = (e) => {
    if (openIdx < 0) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
  };
  document.addEventListener('keydown', onKeydown);
}


/* ---------- System Architecture Diagram Generator ---------- */
function renderArchitectureDiagram(slug, th) {
  const diagrams = {
    'cohive': [
      { num: '01', title: 'Web Client & Portal', tech: 'Blade, Tailwind CSS, Alpine.js', desc: 'Antarmuka responsif pengguna & kasir koperasi' },
      { num: '02', title: 'Auth & RBAC Middleware', tech: 'Laravel 11 Role Engine', desc: 'Isolasi hak akses kasir, ketua, & anggota' },
      { num: '03', title: 'Double-Entry Service', tech: 'Database Transactions', desc: 'Pencatatan mutasi kas & ledger buku besar' },
      { num: '04', title: 'InnoDB MySQL Store', tech: 'Row Locking (Pessimistic)', desc: 'Penyimpanan persisten ACID saldo & SHU' }
    ],
    'semsim': [
      { num: '01', title: 'PDF Bab II Parser', tech: 'PyMuPDF (fitz) Engine', desc: 'Ekstraksi naskah landasan teori dari proposal' },
      { num: '02', title: 'Text Normalizer', tech: 'Regex, Lowercase, NLTK', desc: 'Pembersihan stopword, sitasi, & format' },
      { num: '03', title: 'IndoBERT Bi-Encoder', tech: 'Sentence Transformers (768-D)', desc: 'Ekstraksi representasi semantik makna kalimat' },
      { num: '04', title: 'Cosine Similarity', tech: 'Scikit-Learn Metric', desc: 'Matriks pairwise kesamaan semantik antar kalimat' },
      { num: '05', title: 'Interactive Heatmap', tech: 'Flask API + Heatmap UI', desc: 'Visualisasi skor & pelaporan kemiripan konten' }
    ],
    'chatbot': [
      { num: '01', title: 'Dialog Input Stream', tech: 'Client Prompt Request', desc: 'Input percakapan pengguna secara conversational' },
      { num: '02', title: 'Subword Tokenizer', tech: 'SentencePiece Model', desc: 'Tokenisasi teks ke indeks kamus subword bahasa' },
      { num: '03', title: 'Google T5 Transformer', tech: '12-Head Self Attention', desc: 'Enkoder-dekoder sequence-to-sequence generatif' },
      { num: '04', title: 'Beam Search Decoder', tech: 'Repetition Penalty (Top-P)', desc: 'Pemilihan urutan token probabilitas tertinggi' },
      { num: '05', title: 'Generated Dialogue', tech: 'REST Response Payload', desc: 'Output jawaban alami dan relevan konteks' }
    ],
    'green-ranger': [
      { num: '01', title: 'Eco-Relawan & Donatur', tech: 'Responsive Web Platform', desc: 'Katalog kampanye lingkungan & bank sampah' },
      { num: '02', title: 'Midtrans Snap Gateway', tech: 'Multi-Channel Payment', desc: 'Tokenisasi transaksi QRIS, VA, & E-Wallet' },
      { num: '03', title: 'HMAC Webhook Guard', tech: 'SHA-512 Signature Check', desc: 'Verifikasi keamanan callback dari payment gateway' },
      { num: '04', title: 'Allocation & Settlement', tech: 'MySQL Database Engine', desc: 'Pembaruan status donasi & audit dana sosial' }
    ],
    'knn-kontainer': [
      { num: '01', title: 'Citra Kontainer Pelabuhan', tech: 'Camera / Open Dataset', desc: 'Pengambilan gambar peti kemas luar ruangan' },
      { num: '02', title: 'ROI Dinding Kontainer', tech: 'OpenCV Bounding Box', desc: 'Pemotongan area fokus bebas karat dan teks' },
      { num: '03', title: 'Ruang Warna HSV', tech: 'Hue & Saturation Channels', desc: 'Pemisahan nilai kromatik dari intensitas cahaya' },
      { num: '04', title: 'K-NN (K=3) Classifier', tech: 'Euclidean Distance Model', desc: 'Pencarian 3 tetangga terdekat vektor fitur' },
      { num: '05', title: 'Identifikasi Warna & Presisi', tech: 'Confusion Matrix (94.0%)', desc: 'Prediksi kelas: Merah, Biru, Hijau, Oranye' }
    ]
  };

  const steps = diagrams[slug] || [
    { num: '01', title: 'Input & Request Layer', tech: 'Client Web Interface', desc: 'Menerima input parameter dari antarmuka pengguna' },
    { num: '02', title: 'Core Processing Engine', tech: 'Controller / Service', desc: 'Eksekusi aturan bisnis dan komputasi data' },
    { num: '03', title: 'Data Persistence / AI', tech: 'Database / ML Pipeline', desc: 'Penyimpanan persisten atau inferensi model' },
    { num: '04', title: 'Output & Evaluation', tech: 'API Response / UI', desc: 'Penyajian hasil akhir kepada pengguna' }
  ];

  return `
    <div class="cs-arch-flow">
      ${steps.map((st, sIdx) => `
        <div class="cs-arch-step" style="--step-accent:${th.accent}">
          <div class="cs-arch-step-num">${st.num}</div>
          <div class="cs-arch-step-name">${E(st.title)}</div>
          <div class="cs-arch-step-desc">${E(st.desc)}</div>
          <div class="cs-arch-step-tech">${E(st.tech)}</div>
        </div>
        ${sIdx < steps.length - 1 ? `<div class="cs-arch-arrow" aria-hidden="true">→</div>` : ''}
      `).join('')}
    </div>
  `;
}

/* ---------- Tampilan Detail Sheet (Case Study Architecture) ---------- */
function openDetail(k, slug) {
  const items = S[k], i = Math.max(0, items.findIndex((x) => x.slug === slug)), it = items[i];
  const nx = items[(i + 1) % items.length];
  const pv = items[(i - 1 + items.length) % items.length];
  const isExp = k === 'experience';
  const isPrj = k === 'projects';
  const isOrg = k === 'organization';
  const cs = it.caseStudy;

  if (galleries[k]) galleries[k].vai(i);

  const th = getTheme((it.slug || '').toLowerCase());
  const thNx = getTheme((nx.slug || '').toLowerCase());

  det.style.setProperty('--dt-accent', th.accent);
  det.style.setProperty('--dt-accent2', th.accent2);
  det.style.setProperty('--dt-bg', th.bg);
  det.style.setProperty('--cs-accent', th.accent);

  if (isOrg) {
    /* ========================================================
       ORG DETAIL — MORPH DOSSIER / SEKAT DOKUMEN LAYOUT
       Matching morph-template aesthetic: top folder tabs, cert sekat card,
       and engineering meta specification sheet.
       ======================================================== */
    const cover = it.certCover || (it.evidences && it.evidences[0]?.file) || '';
    const certFile = it.certFile || (it.evidences && it.evidences[0]?.file) || '#';
    const orgs = S.organization || [];

    det.innerHTML = `
    <div class="dt-progress-container"><div class="dt-progress-bar" id="dtProgress"></div></div>

    <div class="org-detail-wrapper">
      <!-- Top Dossier Folder Tabs (Sekat Dokumen) -->
      <nav class="org-folder-tab-bar" aria-label="Sekat Dokumen Organisasi">
        ${orgs.map((o, oIdx) => {
          const isActive = o.slug === it.slug;
          return `
            <a href="#/organization/${o.slug}" class="org-folder-tab${isActive ? ' active' : ''}" title="${E(o.title)}">
              <span class="org-folder-tab-num">DOC-0${oIdx + 1}</span>
              <span>${E(o.role || o.title.split(' ')[0])}</span>
            </a>
          `;
        }).join('')}
      </nav>

      <!-- Main Dossier Folder Frame -->
      <article class="org-dossier-folder">
        <!-- Folder Header -->
        <header class="org-dossier-header">
          <div>
            <div class="org-dossier-kicker">BERKAS RESMI // TELKOM UNIVERSITY SURABAYA</div>
            <h1 class="org-dossier-title">${E(it.title)}</h1>
            <div class="org-dossier-role">${E(it.role || '')} · <span class="org-dossier-inst">${E(it.institution || '')} (${E(it.year)})</span></div>
          </div>
          <div class="org-dossier-actions">
            <a href="#/organization" class="btn" style="gap:6px;font-size:12px">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Galeri Morph
            </a>
            ${certFile !== '#' ? `
              <a href="${E(certFile)}" target="_blank" rel="noopener noreferrer" class="btn solid" style="gap:6px;font-size:12px">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                Buka Dokumen Asli
              </a>
            ` : ''}
            <button type="button" class="btn dt-share-btn" style="padding:8px 12px">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>
        </header>

        <!-- Folder Body (Sekat Sertifikat + Lembar Spesifikasi) -->
        <div class="org-dossier-body">
          <!-- Left: Sekat Sertifikat Viewer -->
          <div class="org-dossier-left">
            <div class="org-cert-sekat-card">
              <div class="org-cert-sekat-bar">
                <span>CERTIFICATE // ARCHIVE SPEC</span>
                <span class="org-cert-sekat-badge">${E(it.kind)}</span>
              </div>
              <div class="org-cert-sekat-img-wrap">
                ${cover ? `
                  <img src="${E(cover)}" alt="Sertifikat ${E(it.title)}" class="org-cert-sekat-img" />
                ` : `
                  <div style="color:var(--mo-faint);text-align:center;padding:40px">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <div style="font-family:var(--mo-font-mono);font-size:11px;margin-top:10px">ARSIP SERTIFIKAT DIGITAL</div>
                  </div>
                `}
              </div>
            </div>

            <!-- Evidences / Lampiran Berkas Sekat -->
            ${it.evidences && it.evidences.length ? `
              <div class="org-dossier-evidences">
                <div class="org-spec-block-title">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  LAMPIRAN DOKUMEN BUKTI (${it.evidences.length})
                </div>
                <div class="org-evidence-grid">
                  ${it.evidences.map(ev => `
                    <a href="${E(ev.file)}" target="_blank" rel="noopener noreferrer" class="org-evidence-card">
                      <div class="org-evidence-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                      </div>
                      <div class="org-evidence-meta">
                        <div class="org-evidence-title">${E(ev.title)}</div>
                        <div class="org-evidence-desc">${E(ev.desc || ev.type.toUpperCase())}</div>
                      </div>
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Right: Specification Sheet & Contributions -->
          <div class="org-dossier-specs">
            <!-- Ringkasan / Summary Block -->
            <div class="org-dossier-summary-box">
              <p>${E(it.summary)}</p>
            </div>

            <!-- Metadata Specs Grid -->
            <div>
              <div class="org-spec-block-title">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                METADATA &amp; INFORMASI PERAN
              </div>
              <dl class="org-meta-spec-grid">
                ${it.meta.map(m => `
                  <div class="org-meta-spec-cell">
                    <dt>${E(m[0])}</dt>
                    <dd>${E(m[1])}</dd>
                  </div>
                `).join('')}
              </dl>
            </div>

            <!-- Contributions & Activities -->
            <div>
              <div class="org-spec-block-title">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                KONTRIBUSI &amp; AKTIVITAS UTAMA
              </div>
              <div class="org-spec-points">
                ${it.points.map((p, pIdx) => `
                  <div class="org-spec-point-row">
                    <span class="org-spec-point-idx">0${pIdx + 1}</span>
                    <span>${E(p)}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Kompetensi / Tags -->
            ${it.tags && it.tags.length ? `
              <div>
                <div class="org-spec-block-title">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  KOMPETENSI &amp; KEAHLIAN
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:8px">
                  ${it.tags.map(t => `<span class="tag">${E(t)}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Footer Prev / Next Nav -->
        <footer class="org-dossier-footer-nav">
          <a href="#/organization/${pv.slug}" class="org-dossier-nav-btn">
            <span>←</span>
            <span>SEBELUMNYA: ${E(pv.title)}</span>
          </a>
          <a href="#/organization/${nx.slug}" class="org-dossier-nav-btn">
            <span>BERIKUTNYA: ${E(nx.title)}</span>
            <span>→</span>
          </a>
        </footer>
      </article>
    </div>`;


  } else if (isPrj || isExp || cs) {
    /* ========================================================
       UNIFIED BENTO PROJECT DETAIL (CINEMATIC REFINED BRUTALIST)
       Applied to ALL projects (CoHive, SemSim, Chatbot, Green Ranger, KNN, etc.)
       Features:
       - Bento hero grid (2x2 main hero + 4 metadata cards)
       - Screenshot/interactive carousel with live dots & controls
       - Impact & Metrics grid (if caseStudy.results exists)
       - Bento Evidence proof tiles (PDF, Image, Schema, Flow, Repo)
       - Animated expand/grow modal from clicked tile (FLIP technique)
       - Bottom project navigator (prev / next)
       ======================================================== */
    const prjGithub = (it.links && it.links.find(l => l[0].toLowerCase().includes('github'))) || null;
    const prjDemo   = (it.links && it.links.find(l => !l[0].toLowerCase().includes('github'))) || null;
    const prjSlides = getProjectSlides(it);
    const prjEv     = getProjectEvidences(it);
    const metaCards = (it.meta || []).slice(0, 4);

    const ICONS_MAP = {
      pdf:   '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12M24 32h18M24 40h18M24 48h12"/></svg>',
      image: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="52" height="44" rx="4"/><circle cx="22" cy="24" r="6"/><path d="M6 46l16-14 12 10 8-6 16 12"/></svg>',
      code:  '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 20 10 32l14 12M40 20l14 12-14 12M35 14 29 50"/></svg>',
      db:    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="14" rx="20" ry="8"/><path d="M12 14v36c0 4.4 9 8 20 8s20-3.6 20-8V14M12 32c0 4.4 9 8 20 8s20-3.6 20-8"/></svg>',
      flow:  '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="24" width="14" height="16" rx="3"/><rect x="25" y="24" width="14" height="16" rx="3"/><rect x="44" y="24" width="14" height="16" rx="3"/><path d="M20 32h5M39 32h5"/></svg>',
      route: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="16" r="6"/><circle cx="50" cy="32" r="6"/><circle cx="14" cy="48" r="6"/><path d="M20 16h14a8 8 0 0 1 8 8v2M44 32H34a8 8 0 0 0-8 8v2M20 48h6"/></svg>'
    };

    det.innerHTML = `
    <div class="dt-progress-container"><div class="dt-progress-bar" id="dtProgress"></div></div>

    <div class="prj-detail-wrap">

      <!-- Top Breadcrumb & Controls -->
      <header class="prj-topbar">
        <nav class="prj-crumb" aria-label="Breadcrumb">
          <a href="#/${k}" class="prj-crumb-link">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            ${isExp ? "Experience" : "Projects"}
          </a>
          <span class="prj-crumb-sep">/</span>
          <span class="prj-crumb-current">${E(it.title)}</span>
        </nav>
        <div class="prj-topbar-right">
          <span class="prj-top-badge">${E(it.kind || 'SOFTWARE')}</span>
          <a href="#/${k}" class="prj-btn-ghost">
            <span>Kembali</span>
            <span class="kbd">ESC</span>
          </a>
          <button type="button" class="prj-btn-ghost dt-share-btn" title="Bagikan proyek ini">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </header>

      <!-- Section 1: Bento Hero Grid -->
      <section class="prj-bento" aria-label="Ringkasan Proyek">
        <!-- Main 2x2 Hero Card -->
        <div class="prj-card prj-bento-main">
          <div class="prj-hero-tag-row">
            <span class="prj-kicker">${isExp ? "EXPERIENCE" : "PROJECT"} / ${E(it.title.toUpperCase())}</span>
            <span class="prj-chip">${E(it.kind || 'APLIKASI')}</span>
          </div>
          <div>
            <h1 class="prj-hero-title">${E(it.title)}</h1>
            <p class="prj-hero-lead">${E(cs ? cs.quote : it.summary)}</p>
          </div>
          <div class="prj-hero-tags">
            ${(it.tags || []).slice(0, 6).map(t => `<span class="prj-tag-chip">${E(t)}</span>`).join('')}
          </div>
          <div class="prj-hero-actions">
            ${prjGithub ? `
              <a class="prj-act-btn solid" href="${E(prjGithub[1])}" target="_blank" rel="noopener noreferrer">
                <span>GitHub Repositori</span>
                
              </a>
            ` : ''}
            ${prjEv.length ? `
              <a class="prj-act-btn" href="#prj-proof">
                <span>Lihat Bukti</span>
                <span class="arr">↓</span>
              </a>
            ` : ''}
            ${prjDemo && prjDemo[1] ? `
              <a class="prj-act-btn" href="${E(prjDemo[1])}" target="_blank" rel="noopener noreferrer">
                <span>${E(prjDemo[0])}</span>
                
              </a>
            ` : ''}
          </div>
        </div>

        <!-- 4 Meta Cards -->
        ${metaCards.map(m => `
          <div class="prj-card prj-bento-meta">
            <span class="prj-meta-label">${E(m[0])}</span>
            <b class="prj-meta-val">${E(m[1])}</b>
          </div>
        `).join('')}
      </section>

      <!-- Section 2: Screenshot & Modul Carousel -->
      ${prjSlides.length ? `
      <section class="prj-sec" aria-label="Tampilan Modul Aplikasi">
        <div class="prj-sec-head">
          <div>
            <span class="prj-kicker">MODUL UTAMA</span>
            <h2 class="prj-sec-title">Tampilan &amp; Fitur Aplikasi</h2>
          </div>
          <div class="prj-ctrl-row">
            <span class="prj-carousel-count" aria-live="polite"><b id="prjNow">1</b> / <span>${prjSlides.length}</span></span>
            <button class="prj-ctrl-btn" id="prjPrev" type="button" aria-label="Modul sebelumnya">
              <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <button class="prj-ctrl-btn" id="prjNext" type="button" aria-label="Modul berikutnya">
              <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>

        <div class="prj-track" id="prjTrack" tabindex="0" role="region" aria-label="Carousel modul ${E(it.title)}">
          ${prjSlides.map((s, si) => `
            <article class="prj-card prj-slide" data-idx="${si}">
              <div class="prj-slide-frame">
                <div class="prj-frame-bar">
                  <i></i><i></i><i></i>
                  <span>localhost${E((s.route || '').split(' ')[0])}</span>
                </div>
                ${s.img ? `
                  <img src="${E(s.img)}" alt="Tampilan modul ${E(s.title)}" ${si > 0 ? 'loading="lazy"' : ''}>
                ` : `
                  <div class="prj-frame-body">
                    <div class="prj-frame-tag">${E(s.tag)}</div>
                    <h4 class="prj-frame-title">${E(s.title)}</h4>
                    ${s.chips && s.chips.length ? `
                      <div class="prj-frame-chips">
                        ${s.chips.filter(Boolean).map(c => `<span>${E(c)}</span>`).join('')}
                      </div>
                    ` : ''}
                    <div class="prj-frame-lines">
                      <div class="prj-fl prj-fl--accent"></div>
                      <div class="prj-fl"></div>
                      <div class="prj-fl prj-fl--sm"></div>
                      <div class="prj-fl"></div>
                    </div>
                  </div>
                `}
              </div>
              <div class="prj-slide-copy">
                <span class="prj-slide-tag">${E(s.tag)}</span>
                <h3 class="prj-slide-title">${E(s.title)}</h3>
                ${s.route ? `<span class="prj-slide-route">${E(s.route)}</span>` : ''}
                ${s.facts && s.facts.length ? `
                  <ul class="prj-slide-facts">
                    ${s.facts.map(f => `<li>${E(f)}</li>`).join('')}
                  </ul>
                ` : (s.desc ? `<p class="prj-slide-desc">${E(s.desc)}</p>` : '')}
                ${s.chips && s.chips.length ? `
                  <div class="prj-slide-chips">
                    ${s.chips.filter(Boolean).map(c => `<span>${E(c)}</span>`).join('')}
                  </div>
                ` : ''}
                ${s.file ? `<span class="prj-slide-src">${E(s.file)}</span>` : ''}
              </div>
            </article>
          `).join('')}
        </div>

        <div class="prj-dots" id="prjDots" role="tablist" aria-label="Pilih modul">
          ${prjSlides.map((s, si) => `
            <button type="button" role="tab" aria-label="Modul ${si + 1}" data-go="${si}" aria-current="${si === 0}"></button>
          `).join('')}
        </div>
        <p class="prj-note">Arsitektur modul &amp; tangkapan layar aplikasi yang dijalankan pada environment demo.</p>
      </section>
      ` : ''}

      

      <!-- Section 3: Impact & Results Metrics -->
      ${cs && cs.results && cs.results.length ? `
      <section class="prj-sec" aria-label="Metrik & Evaluasi">
        <div class="prj-sec-head">
          <div>
            <span class="prj-kicker">IMPACT &amp; METRICS</span>
            <h2 class="prj-sec-title">Hasil Evaluasi &amp; Metrik Kunci</h2>
          </div>
        </div>
        <div class="prj-metrics-grid">
          ${cs.results.map(r => `
            <div class="prj-metric-card">
              <div class="prj-metric-val">${E(r.value)}</div>
              <div class="prj-metric-label">${E(r.label)}</div>
              <div class="prj-metric-sub">${E(r.sub)}</div>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Section 4: Bukti & Dokumen (Bento Proof Tiles) -->
      ${prjEv.length ? `
      <section class="prj-sec" id="prj-proof" aria-label="Bukti dan Dokumen">
        <span class="prj-kicker">BUKTI &amp; DOKUMEN</span>
        <div class="prj-sec-head" style="margin-bottom:0">
          <div>
            <h2 class="prj-sec-title">Lihat langsung, bukan hanya klaim.</h2>
            <p class="prj-proof-sub">Klik kotak mana pun untuk membuka pratinjau dokumen resmi, skema data, dan arsitektur kode.</p>
          </div>
        </div>
        <div class="prj-proof-grid" id="prjProofGrid">
          ${prjEv.map((ev, evIdx) => `
            <button class="prj-proof-tile${ev.wide ? ' wide' : ''}" type="button" data-ev="${evIdx}" aria-label="Buka: ${E(ev.title)}">
              <span class="prj-tile-open">Buka</span>
              <div class="prj-tile-art">
                ${ev.type === 'image' && ev.file
                  ? `<img src="${E(ev.file)}" class="prj-tile-thumb" loading="lazy" alt="${E(ev.title)}">`
                  : (ICONS_MAP[ev.type] || ICONS_MAP[ev.kind] || ICONS_MAP.code)
                }
              </div>
              <div class="prj-tile-body">
                <span class="prj-tile-badge">${E(ev.badge || ev.type || 'BUKTI')}</span>
                <h3 class="prj-tile-title">${E(ev.title)}</h3>
                <p class="prj-tile-desc">${E(ev.desc || '')}</p>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Footer Project Navigator -->
      <footer class="prj-footer-nav" aria-label="Navigasi Proyek">
        <a href="#/${k}/${pv.slug}" class="prj-nav-card prev">
          <span class="prj-nav-arrow" aria-hidden="true">←</span>
          <div>
            <span class="prj-nav-sub">${isExp ? "PENGALAMAN" : "PROYEK"} SEBELUMNYA</span>
            <span class="prj-nav-title">${E(pv.title)}</span>
          </div>
        </a>
        <a href="#/${k}/${nx.slug}" class="prj-nav-card next">
          <div>
            <span class="prj-nav-sub">${isExp ? "PENGALAMAN" : "PROYEK"} BERIKUTNYA</span>
            <span class="prj-nav-title">${E(nx.title)}</span>
          </div>
          <span class="prj-nav-arrow" aria-hidden="true">→</span>
        </a>
      </footer>
    </div>

    <!-- Animated Evidence Modal (Grows from clicked tile) -->
    <div class="prj-modal" id="prjModal" role="dialog" aria-modal="true" aria-labelledby="prjMTitle" hidden>
      <div class="prj-modal-bg" id="prjMBg"></div>
      <div class="prj-modal-card" id="prjMCard">
        <div class="prj-modal-top">
          <span class="prj-modal-badge" id="prjMBadge"></span>
          <h3 id="prjMTitle"></h3>
          <button class="prj-ctrl-btn" id="prjMClose" type="button" aria-label="Tutup (ESC)">✕</button>
        </div>
        <div class="prj-modal-body" id="prjMBody"></div>
        <div class="prj-modal-foot">
          <button class="prj-btn-ghost" id="prjMPrev" type="button">← Sebelumnya</button>
          <span class="prj-modal-count" id="prjMCount"></span>
          <button class="prj-btn-ghost" id="prjMNext" type="button">Berikutnya →</button>
        </div>
      </div>
    </div>`;

    // Initialize all interactive components for this project
    initProjectDetailInteractions(prjSlides, prjEv, it);


  } else if (false) {
    /* ========================================================
       STANDARD SHEET LAYOUT (for Experience & Organization)
       ======================================================== */
    const shareBtnHtml = `<button type="button" class="btn dt-link dt-share-btn" title="Bagikan halaman ini">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      <span>Bagikan</span>
    </button>`;

    const linksHtml = `<div class="p-links">${it.links && it.links.length ? it.links.map((l) => `<a class="btn dt-link" href="${E(l[1])}" target="_blank" rel="noopener noreferrer">${E(l[0])} <span class="arr">↗</span></a>`).join('') : ''}${shareBtnHtml}</div>`;
    const categoryLabel = isExp ? 'REKAM JEJAK' : 'ORGANISASI & KEPENGURUSAN';
    const archiveCode = `FA-ARCHIVE // ${isExp ? 'EXP' : 'ORG'}-0${i+1}`;

    det.innerHTML = `
    <div class="dt-progress-container"><div class="dt-progress-bar" id="dtProgress"></div></div>
    <div class="dt">
      <div class="dt-bar">
        <a class="x" href="#/${k}">← Kembali <span class="kbd">ESC</span></a>
        <div class="dt-meta-bar">
          <span class="dt-category-badge">${categoryLabel}</span>
          <span class="dt-archive-code">${archiveCode}</span>
          <span class="dt-theme-label">${E(th.label)}</span>
        </div>
      </div>

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

      <dl class="dt-credits">
        ${it.meta.map((m) => `<div><dt>${E(m[0])}</dt><dd>${E(m[1])}</dd></div>`).join('')}
      </dl>

      <div class="dt-divider" style="--c:${th.accent}"></div>

      <div class="dt-body">
        <div class="dt-points">
          <h2 class="dt-section-title">Pencapaian &amp; Kontribusi</h2>
          <ul class="pts">${it.points.map((p) => `<li>${E(p)}</li>`).join('')}</ul>
        </div>
        <div class="dt-sidebar">
          <h2 class="dt-section-title">Teknologi &amp; Keahlian</h2>
          <ul class="tags dt-tags">${it.tags.map((t) => `<li style="--tc:${th.accent}">${E(t)}</li>`).join('')}</ul>
        </div>
      </div>

      ${it.evidences && it.evidences.length ? `
        <div class="dt-evidence-section">
          <div class="dt-evidence-header">
            <div class="dt-evidence-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>VERIFIED ARTIFACTS & EVIDENCE</span>
            </div>
            <h2 class="dt-section-title">Bukti Autentik, Hasil Riset & Laporan</h2>
            <p class="dt-evidence-sub">Berkas resmi, sertifikat kelulusan, dan dokumen teknis yang dapat Anda telaah langsung.</p>
          </div>
          <div class="dt-evidence-grid">
            ${it.evidences.map((ev) => `
              <div class="dt-evidence-card ${ev.type}">
                <div class="dt-ev-icon">
                  ${ev.type === 'pdf' ? `
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  ` : `
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  `}
                </div>
                <div class="dt-ev-info">
                  <span class="dt-ev-tag">${ev.type.toUpperCase()} DOKUMEN</span>
                  <h3 class="dt-ev-title">${E(ev.title)}</h3>
                  <p class="dt-ev-desc">${E(ev.desc || '')}</p>
                </div>
                <div class="dt-ev-action">
                  <a class="btn solid dt-ev-btn" href="${E(ev.file)}" target="_blank" rel="noopener noreferrer">
                    <span>Lihat Berkas</span>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

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
  }

  det.scrollTop = 0;
  det.classList.add('on');

  // Reading progress tracker & ScrollSpy for TOC (if present)
  const tocLinks = det.querySelectorAll('.cs-toc-link');
  const sections = det.querySelectorAll('.cs-section');
  const tocLine = $('#csTocLine', det);

  const updateScroll = () => {
    const p = $('#dtProgress', det);
    if (p) {
      const max = det.scrollHeight - det.clientHeight;
      p.style.width = max > 0 ? (det.scrollTop / max * 100) + '%' : '0%';
    }

    if (sections.length && tocLinks.length) {
      let activeIndex = 0;
      const scrollPos = det.scrollTop + 140;

      sections.forEach((sec, sIdx) => {
        if (sec.offsetTop <= scrollPos) activeIndex = sIdx;
      });

      tocLinks.forEach((link, lIdx) => {
        const isActive = lIdx === activeIndex;
        link.classList.toggle('on', isActive);
        if (isActive && tocLine) {
          tocLine.style.top = link.offsetTop + 4 + 'px';
          tocLine.style.height = (link.offsetHeight - 8) + 'px';
        }
      });
    }
  };

  det.onscroll = updateScroll;
  setTimeout(updateScroll, 100);

  // TOC click smooth scrolling inside the #detail view container
  tocLinks.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      const secId = link.getAttribute('data-sec');
      const targetSec = det.querySelector('#' + secId);
      if (targetSec) {
        det.scrollTo({
          top: targetSec.offsetTop - 30,
          behavior: 'smooth'
        });
      }
    };
  });

  // Code Copy Button Handler
  det.querySelectorAll('.cs-code-copy-btn').forEach((btn) => {
    btn.onclick = () => {
      const rawCode = decodeURIComponent(btn.dataset.code || '');
      const span = btn.querySelector('span');
      const orig = span ? span.textContent : 'Salin';
      const onDone = () => {
        if (span) span.textContent = 'Tersalin! ✓';
        showToast('Potongan kode tersalin! 📋');
        setTimeout(() => { if (span) span.textContent = orig; }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(rawCode).then(onDone, () => fallbackCopy(rawCode, onDone));
      } else {
        fallbackCopy(rawCode, onDone);
      }
    };
  });

  // Share button handler
  det.querySelectorAll('.dt-share-btn').forEach((btn) => {
    btn.onclick = () => {
      const shareUrl = window.location.href;
      const shareTitle = `${it.title} — Firstyatama Auzan Farhadi`;
      if (navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      } else {
        fallbackCopy(shareUrl, () => showToast('Tautan tersalin ke clipboard! 🔗'));
      }
    };
  });
}

/* ---------- SEO & Dynamic Page Titles ---------- */
const PAGE_TITLES = {
  home: 'Firstyatama Auzan Farhadi — Software Engineer & AI Researcher',
  me: 'Tentang Saya — Firstyatama Auzan Farhadi',
  projects: 'Proyek Rekayasa Perangkat Lunak & AI — Firstyatama Auzan Farhadi',
  experience: 'Pengalaman & Rekam Jejak — Firstyatama Auzan Farhadi',
  organization: 'Kepengurusan & Organisasi — Firstyatama Auzan Farhadi',
  achievements: 'Lisensi & Sertifikasi — Firstyatama Auzan Farhadi'
};

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

  // Initialize 3D Lanyard when entering 'me' view
  if (cur === 'me' && !slug) {
    initMeLanyard();
  }


  if (slug && S[cur] && Array.isArray(S[cur])) {
    openDetail(cur, slug);
    const item = S[cur].find((x) => x.slug === slug);
    if (item) document.title = `${item.title} — Firstyatama Auzan Farhadi`;
  } else {
    det.classList.remove('on');
    document.title = PAGE_TITLES[cur] || PAGE_TITLES.home;
  }
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
  cx += (.5 - cx) * .05;
  mx += (tx - mx) * .05;
  my += (ty - my) * .05;
  if (al < 0.01) return; // Skip drawing when not in Home

  const ry = t * .09 + mx * .4, rx = .35 + my * .2, c1 = Math.cos(ry), s1 = Math.sin(ry), c2 = Math.cos(rx), s2 = Math.sin(rx);
  const F = Math.min(W, Hh) * .62, X = W * cx, Y = Hh * .5;
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