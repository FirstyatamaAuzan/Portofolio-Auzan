/* =====================================================================
   A24 3D PHYSICAL DISC ROW SHOWCASE
   Inspired by Ravi Klaassens (A24) & Animorio
   Three.js WebGL physical discs with iridescent backs & spring physics
   Reusable for Projects and Experience
   ===================================================================== */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createDiscsGallery(rootEl, items, onOpenDetail, options = {}) {
  const type = options.type || 'projects';
  const RIDOTTO = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TONDO = Math.PI * 2;

  // Constants
  const PASSO = 2.2;
  const CURVA = 0.12;
  const PICCOLI = 0.8;
  const MOLLA = 80;
  const FRENO = 11;
  const PIEGA = 0.11;
  const INCLINA = 0.24;
  const GIRA = 0.12;
  const PENNARELLO = { giri: 2, punti: 32, trema: 0.028, fps: 10, entra: 0.45, esce: 0.3 };

  // Elements
  const tela = rootEl.querySelector('[data-canvas]');
  const segno = rootEl.querySelector('[data-marker]');
  const sg = segno.getContext('2d');

  const elBadge = rootEl.querySelector('[data-badge]');
  const elKind = rootEl.querySelector('[data-kind]');
  const elTitle = rootEl.querySelector('[data-title]');
  const elDesc = rootEl.querySelector('[data-desc]');
  const elActionLink = rootEl.querySelector('[data-link-btn]');
  const elDots = rootEl.querySelector('[data-dots]');
  const btnPrev = rootEl.querySelector('[data-prev]');
  const btnNext = rootEl.querySelector('[data-next]');
  const btnFlip = rootEl.querySelector('[data-flip-btn]');
  const btnDetail = rootEl.querySelector('[data-detail-btn]');

  const elDts = [
    rootEl.querySelector('[data-dt1]'),
    rootEl.querySelector('[data-dt2]'),
    rootEl.querySelector('[data-dt3]'),
    rootEl.querySelector('[data-dt4]'),
  ];
  const elMds = [
    rootEl.querySelector('[data-m1]'),
    rootEl.querySelector('[data-m2]'),
    rootEl.querySelector('[data-m3]'),
    rootEl.querySelector('[data-m4]'),
  ];

  // Build dots
  elDots.innerHTML = items.map((_, i) => `<button type="button" class="a24-dot ${i === 0 ? 'on' : ''}" data-i="${i}" aria-label="Item ${i + 1}"></button>`).join('');
  const dotBtns = [...elDots.children];
  dotBtns.forEach((b) => b.addEventListener('click', () => vai(+b.dataset.i)));

  // Text along perimeter
  function scriviIntorno(g, testo, r, inizio) {
    let a = inizio;
    for (const ch of testo) {
      const w = g.measureText(ch).width;
      a += w / 2 / r;
      g.save();
      g.rotate(a);
      g.fillText(ch, 0, -r);
      g.restore();
      a += w / 2 / r;
    }
  }

  // Characteristic Themes for each project and experience
  function getItemTheme(p, isExp) {
    const slug = (p.slug || '').toLowerCase();
    if (!isExp) {
      if (slug.includes('cohive')) {
        return {
          style: 'cohive',
          bg1: '#0B1C33', bg2: '#020713',
          retroColor: '#081628',
          accent: '#38BDF8', accent2: '#F59E0B',
          text: '#F8FAFC', sub: '#7DD3FC',
          specTitle: 'COOPERATIVE FIN-TECH PLATFORM',
          specCode: 'MVP v1.0 · LARAVEL 11 & MYSQL',
        };
      } else if (slug.includes('semsim')) {
        return {
          style: 'semsim',
          bg1: '#180A30', bg2: '#05010E',
          retroColor: '#120524',
          accent: '#C084FC', accent2: '#22D3EE',
          text: '#FAF5FF', sub: '#D8B4FE',
          specTitle: 'INDONESIAN NLP ACADEMIC RESEARCH',
          specCode: 'SIAMESE BI-ENCODER · INDOBERT & FLASK',
        };
      } else if (slug.includes('chatbot')) {
        return {
          style: 'chatbot',
          bg1: '#032015', bg2: '#010A07',
          retroColor: '#02160E',
          accent: '#34D399', accent2: '#FBBF24',
          text: '#ECFDF5', sub: '#6EE7B7',
          specTitle: 'GENERATIVE CONVERSATIONAL AI',
          specCode: 'SEQ2SEQ T5 · ATTENTION TRANSFORMER',
        };
      } else {
        return {
          style: 'green',
          bg1: '#261404', bg2: '#090401',
          retroColor: '#1A0D02',
          accent: '#F59E0B', accent2: '#10B981',
          text: '#FFFBEB', sub: '#FCD34D',
          specTitle: 'CIRCULAR ECONOMY & RECYCLING',
          specCode: 'WASTE-TO-VALUE · ESCROW PAYMENT',
        };
      }
    } else {
      if (slug.includes('bandung') || slug.includes('btp')) {
        return {
          style: 'btp',
          bg1: '#0C1E32', bg2: '#030910',
          retroColor: '#071422',
          accent: '#FF6A1A', accent2: '#60A5FA',
          text: '#F8FAFC', sub: '#93C5FD',
          specTitle: 'STARTUP INCUBATION & ACCELERATION',
          specCode: 'WRAP ENTREPRENEURSHIP · SURABAYA',
        };
      } else if (slug.includes('cmlabs')) {
        return {
          style: 'cmlabs',
          bg1: '#1A0E26', bg2: '#07030C',
          retroColor: '#12081C',
          accent: '#FB7185', accent2: '#38BDF8',
          text: '#FFF1F2', sub: '#FDA4AF',
          specTitle: 'ENTERPRISE SEO & PLAGIARISM RADAR',
          specCode: 'BACKEND NODE.JS · MALANG HEADQUARTERS',
        };
      } else if (slug.includes('riset') || slug.includes('asisten')) {
        return {
          style: 'riset',
          bg1: '#220816', bg2: '#080106',
          retroColor: '#18040F',
          accent: '#F43F5E', accent2: '#FDE047',
          text: '#FFF1F2', sub: '#FDA4AF',
          specTitle: 'COMPUTER VISION RESEARCH LABORATORY',
          specCode: 'CONTAINER CODE OCR · KERAS & TENSORFLOW',
        };
      } else {
        return {
          style: 'hima',
          bg1: '#281703', bg2: '#0C0600',
          retroColor: '#1A0F02',
          accent: '#F59E0B', accent2: '#FEF3C7',
          text: '#FEF3C7', sub: '#FCD34D',
          specTitle: 'HUMAN CAPITAL TALENT DEVELOPMENT',
          specCode: 'TEMATICS · FORTASTICS · FUNSPORTIKA 2024',
        };
      }
    }
  }

  // Cover Canvas Generator (1024x1024) with distinct characteristics for each Project & Experience
  function generaCopertina(p, idx) {
    const N = 1024;
    const m = N / 2;
    const c = document.createElement('canvas');
    c.width = N;
    c.height = N;
    const g = c.getContext('2d');

    const isExp = type === 'experience';
    const th = getItemTheme(p, isExp);

    // Radial gradient background
    const bgGrad = g.createRadialGradient(m, m * 0.72, 60, m, m, N * 0.72);
    bgGrad.addColorStop(0, th.bg1);
    bgGrad.addColorStop(1, th.bg2);
    g.fillStyle = bgGrad;
    g.fillRect(0, 0, N, N);

    // Micro optical disc grooves
    g.save();
    for (let r = 210; r < 495; r += 6.5) {
      g.beginPath();
      g.arc(m, m, r, 0, TONDO);
      g.strokeStyle = (r % 26 === 0) ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.015)';
      g.lineWidth = 1;
      g.stroke();
    }
    g.restore();

    // ==========================================
    // PROCEDURAL ARTWORK PER CHARACTERISTIC
    // Placed in the spacious lower disc zone: y = 730
    // ==========================================
    g.save();

    if (th.style === 'cohive') {
      // 1. COHIVE: Hexagonal Cooperative Honeycomb Mesh & Financial Ledger
      const cy = 725;
      const hexR = 36;
      const hexCenters = [
        [m - 120, cy - 32], [m, cy - 32], [m + 120, cy - 32],
        [m - 60, cy + 24], [m + 60, cy + 24],
        [m - 180, cy + 24], [m + 180, cy + 24],
      ];
      g.lineWidth = 1.8;
      g.strokeStyle = 'rgba(56, 189, 248, 0.35)';

      hexCenters.forEach(([hx, hy], hIdx) => {
        g.beginPath();
        for (let k = 0; k < 6; k++) {
          const ka = (k / 6) * TONDO + Math.PI / 6;
          const px = hx + Math.cos(ka) * hexR;
          const py = hy + Math.sin(ka) * hexR;
          k === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
        }
        g.closePath();
        g.stroke();

        if (hIdx === 1 || hIdx === 3 || hIdx === 4) {
          g.fillStyle = 'rgba(56, 189, 248, 0.08)';
          g.fill();
        }
        g.fillStyle = (hIdx % 2 === 0) ? th.accent : th.accent2;
        g.beginPath();
        g.arc(hx, hy, 4, 0, TONDO);
        g.fill();
      });

      // Horizontal dashed balance line
      g.beginPath();
      g.moveTo(m - 200, cy - 4);
      g.lineTo(m + 200, cy - 4);
      g.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      g.lineWidth = 1.4;
      g.setLineDash([6, 6]);
      g.stroke();
      g.setLineDash([]);

      // FinTech Ledger Badge
      g.fillStyle = 'rgba(11, 28, 51, 0.92)';
      g.fillRect(m - 150, cy + 54, 300, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 150, cy + 54, 300, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('IDR / SHU LEDGER · COOPERATIVE CORE', m, cy + 70);

    } else if (th.style === 'semsim') {
      // 2. SEMSIM: Siamese Dual Waveform Interference & Cosine Metric
      const cy = 725;
      for (let wave = 0; wave < 6; wave++) {
        g.beginPath();
        const isEncoderA = wave % 2 === 0;
        g.strokeStyle = isEncoderA ? 'rgba(192, 132, 252, 0.65)' : 'rgba(34, 211, 238, 0.65)';
        g.lineWidth = 2.2;
        const phase = wave * 0.8;
        const amp = 32 - wave * 4;
        for (let x = m - 230; x <= m + 230; x += 6) {
          const t = (x - (m - 230)) / 460;
          const env = Math.sin(t * Math.PI);
          const y = cy + Math.sin(t * Math.PI * 4 + phase) * amp * env;
          x === m - 230 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.stroke();
      }

      // Latent space vector embedding points
      [-150, -75, 0, 75, 150].forEach((ox, idx) => {
        const py = cy + (idx % 2 === 0 ? -20 : 20);
        g.fillStyle = idx % 2 === 0 ? th.accent : th.accent2;
        g.beginPath();
        g.arc(m + ox, py, 4.5, 0, TONDO);
        g.fill();
        g.beginPath();
        g.moveTo(m + ox, cy - 32);
        g.lineTo(m + ox, cy + 32);
        g.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        g.lineWidth = 1;
        g.stroke();
      });

      // Cosine Metric Badge
      g.fillStyle = 'rgba(24, 10, 48, 0.92)';
      g.fillRect(m - 165, cy + 54, 330, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 165, cy + 54, 330, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('cos(u,v) = (u·v)/(||u||||v||)  →  SIM: 0.89', m, cy + 70);

    } else if (th.style === 'chatbot') {
      // 3. CHATBOT: 12-Head Multi-Head Attention Graph
      const cy = 720;
      [34, 70, 108].forEach((r, idx) => {
        g.beginPath();
        g.arc(m, cy, r, 0, TONDO);
        g.strokeStyle = idx === 1 ? 'rgba(52, 211, 153, 0.45)' : 'rgba(52, 211, 153, 0.2)';
        g.lineWidth = 1.4;
        g.stroke();
      });

      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * TONDO;
        const x1 = m + Math.cos(ang) * 34;
        const y1 = cy + Math.sin(ang) * 34;
        const x2 = m + Math.cos(ang) * 108;
        const y2 = cy + Math.sin(ang) * 108;
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.strokeStyle = 'rgba(52, 211, 153, 0.35)';
        g.lineWidth = 1.4;
        g.stroke();

        if (i % 3 === 0) {
          const angNext = ((i + 4) / 12) * TONDO;
          g.beginPath();
          g.moveTo(x2, y2);
          g.quadraticCurveTo(m, cy, m + Math.cos(angNext) * 108, cy + Math.sin(angNext) * 108);
          g.strokeStyle = 'rgba(251, 191, 36, 0.4)';
          g.lineWidth = 1.2;
          g.stroke();
        }

        g.fillStyle = i % 2 === 0 ? th.accent : th.accent2;
        g.beginPath();
        g.arc(x2, y2, 4, 0, TONDO);
        g.fill();
      }

      g.fillStyle = th.accent;
      g.beginPath();
      g.arc(m, cy, 5.5, 0, TONDO);
      g.fill();

      // Transformer Attention Badge
      g.fillStyle = 'rgba(4, 29, 20, 0.92)';
      g.fillRect(m - 160, cy + 56, 320, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 160, cy + 56, 320, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('12-HEAD SELF-ATTENTION // GOOGLE T5-BASE', m, cy + 72);

    } else if (th.style === 'green') {
      // 4. GREEN RANGER: Circular Möbius Loop & Waste-to-Value Flow
      const cy = 720;
      for (let l = 0; l < 3; l++) {
        g.beginPath();
        const rBase = 62 + l * 24;
        for (let a = 0; a <= TONDO; a += 0.04) {
          const r = rBase + Math.sin(a * 3) * 16;
          const x = m + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          a === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.closePath();
        g.strokeStyle = l === 1 ? 'rgba(245, 158, 11, 0.55)' : 'rgba(16, 185, 129, 0.45)';
        g.lineWidth = 2.4;
        g.stroke();
      }

      [0, (1 / 3) * TONDO, (2 / 3) * TONDO].forEach((ang, idx) => {
        const r = 86;
        const nx = m + Math.cos(ang - Math.PI / 2) * r;
        const ny = cy + Math.sin(ang - Math.PI / 2) * r;
        g.fillStyle = idx === 0 ? th.accent : th.accent2;
        g.beginPath();
        g.arc(nx, ny, 5.5, 0, TONDO);
        g.fill();
      });

      // Waste-to-Value Escrow Badge
      g.fillStyle = 'rgba(38, 20, 4, 0.92)';
      g.fillRect(m - 165, cy + 56, 330, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 165, cy + 56, 330, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('WASTE-TO-VALUE LEDGER · ESCROW VERIFIED', m, cy + 72);

    } else if (th.style === 'btp') {
      // 5. BANDUNG TECHNO PARK: Technical Blueprint & Launch Vector
      const cy = 725;
      g.strokeStyle = 'rgba(96, 165, 250, 0.22)';
      g.lineWidth = 1.2;
      for (let k = -5; k <= 5; k++) {
        g.beginPath();
        g.moveTo(m + k * 28, cy - 50);
        g.lineTo(m + k * 28, cy + 50);
        g.stroke();
      }
      for (let j = -3; j <= 3; j++) {
        g.beginPath();
        g.moveTo(m - 150, cy + j * 16);
        g.lineTo(m + 150, cy + j * 16);
        g.stroke();
      }

      // Launch vector arrow
      g.strokeStyle = th.accent;
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(m - 85, cy + 32);
      g.lineTo(m + 85, cy - 32);
      g.lineTo(m + 55, cy - 32);
      g.moveTo(m + 85, cy - 32);
      g.lineTo(m + 85, cy - 10);
      g.stroke();

      [-55, 0, 55].forEach((ox) => {
        g.fillStyle = th.accent2;
        g.beginPath();
        g.arc(m + ox, cy - (ox * 32) / 85, 4, 0, TONDO);
        g.fill();
      });

      // Incubation Badge
      g.fillStyle = 'rgba(12, 30, 50, 0.92)';
      g.fillRect(m - 170, cy + 54, 340, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 170, cy + 54, 340, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('COORD: 7°17\'S 112°47\'E // SURABAYA INCUBATOR', m, cy + 70);

    } else if (th.style === 'cmlabs') {
      // 6. CMLABS: Plagiarism 180° Radar & SEO Search Engine Graph
      const cy = 735;
      for (let arc = 1; arc <= 4; arc++) {
        g.beginPath();
        g.arc(m, cy, arc * 26, Math.PI, 0);
        g.strokeStyle = 'rgba(251, 113, 133, 0.3)';
        g.lineWidth = 1.4;
        g.stroke();
      }
      g.strokeStyle = 'rgba(251, 113, 133, 0.22)';
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(m - 120, cy);
      g.lineTo(m + 120, cy);
      g.moveTo(m, cy);
      g.lineTo(m - Math.cos(Math.PI / 4) * 104, cy - Math.sin(Math.PI / 4) * 104);
      g.moveTo(m, cy);
      g.lineTo(m + Math.cos(Math.PI / 4) * 104, cy - Math.sin(Math.PI / 4) * 104);
      g.stroke();

      // Active radar sweep line
      const beamA = Math.PI * 0.38;
      g.beginPath();
      g.moveTo(m, cy);
      g.lineTo(m + Math.cos(beamA) * 104, cy - Math.sin(beamA) * 104);
      g.strokeStyle = th.accent;
      g.lineWidth = 2.4;
      g.stroke();

      // Detected similarity match blips
      [[m - 55, cy - 46], [m + 40, cy - 64], [m + 75, cy - 22]].forEach(([bx, by]) => {
        g.fillStyle = th.accent2;
        g.beginPath();
        g.arc(bx, by, 4, 0, TONDO);
        g.fill();
        g.beginPath();
        g.arc(bx, by, 8, 0, TONDO);
        g.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        g.lineWidth = 1;
        g.stroke();
      });

      // Plagiarism Telemetry Badge
      g.fillStyle = 'rgba(26, 14, 38, 0.92)';
      g.fillRect(m - 165, cy + 44, 330, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 165, cy + 44, 330, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('RADAR SCAN // SIMILARITY & SEO ENGINE ACTIVE', m, cy + 60);

    } else if (th.style === 'riset') {
      // 7. TELKOM SURABAYA RESEARCH: Computer Vision OCR Bounding Box
      const cy = 725;
      const boxW = 250;
      const boxH = 64;
      g.strokeStyle = 'rgba(244, 63, 94, 0.35)';
      g.lineWidth = 1.4;
      g.strokeRect(m - boxW / 2, cy - boxH / 2, boxW, boxH);

      const cr = 15;
      const corners = [
        [m - boxW / 2 - 4, cy - boxH / 2 - 4, 1, 1],
        [m + boxW / 2 + 4, cy - boxH / 2 - 4, -1, 1],
        [m - boxW / 2 - 4, cy + boxH / 2 + 4, 1, -1],
        [m + boxW / 2 + 4, cy + boxH / 2 + 4, -1, -1],
      ];
      g.strokeStyle = th.accent;
      g.lineWidth = 2.8;
      corners.forEach(([cx, cyc, sx, sy]) => {
        g.beginPath();
        g.moveTo(cx, cyc + sy * cr);
        g.lineTo(cx, cyc);
        g.lineTo(cx + sx * cr, cyc);
        g.stroke();
      });

      // Scanning yellow laser bar
      g.strokeStyle = th.accent2;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(m - boxW / 2 + 8, cy);
      g.lineTo(m + boxW / 2 - 8, cy);
      g.stroke();

      // ISO 6346 OCR Code
      g.fillStyle = '#FFFFFF';
      g.font = '700 16px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('TCLU 782019-4 / 45G1', m, cy - 9);

      // Lab Accuracy Badge
      g.fillStyle = 'rgba(34, 8, 22, 0.92)';
      g.fillRect(m - 165, cy + 54, 330, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 165, cy + 54, 330, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('KERAS-OCR + TENSORFLOW // ACCURACY 99.4%', m, cy + 70);

    } else {
      // 8. HIMA: Leadership Tri-Ring Crest & Stars
      const cy = 720;
      const ringR = 32;
      [[m, cy - 22], [m - 26, cy + 18], [m + 26, cy + 18]].forEach(([rx, ry]) => {
        g.beginPath();
        g.arc(rx, ry, ringR, 0, TONDO);
        g.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        g.lineWidth = 2.2;
        g.stroke();
      });

      // Central star
      g.fillStyle = th.accent;
      g.beginPath();
      for (let s = 0; s < 10; s++) {
        const sa = (s / 10) * TONDO - Math.PI / 2;
        const sr = s % 2 === 0 ? 11 : 4.5;
        const sx = m + Math.cos(sa) * sr;
        const sy = (cy + 3) + Math.sin(sa) * sr;
        s === 0 ? g.moveTo(sx, sy) : g.lineTo(sx, sy);
      }
      g.closePath();
      g.fill();

      // Satellite star dots
      [-85, -42, 42, 85].forEach((angDeg) => {
        const rad = (angDeg * Math.PI) / 180;
        const sx = m + Math.sin(rad) * 90;
        const sy = cy - Math.cos(rad) * 42;
        g.fillStyle = th.accent2;
        g.beginPath();
        g.arc(sx, sy, 3.5, 0, TONDO);
        g.fill();
      });

      // Event Ribbon Badge
      g.fillStyle = 'rgba(40, 23, 3, 0.92)';
      g.fillRect(m - 175, cy + 56, 350, 24);
      g.strokeStyle = th.accent;
      g.lineWidth = 1.2;
      g.strokeRect(m - 175, cy + 56, 350, 24);
      g.fillStyle = '#FFFFFF';
      g.font = '600 11px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.fillText('TEMATICS · FORTASTICS · FUNSPORTIKA 2024', m, cy + 72);
    }

    g.restore();

    // Circular rim guide lines
    g.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    g.lineWidth = 1.8;
    g.beginPath();
    g.arc(m, m, N * 0.47, 0, TONDO);
    g.stroke();

    g.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    g.lineWidth = 1;
    g.beginPath();
    g.arc(m, m, N * 0.21, 0, TONDO);
    g.stroke();

    // ==========================================
    // TOP TITLE & SUBTITLE
    // ==========================================
    g.fillStyle = th.text;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    let fs = isExp ? 92 : 110;
    g.font = `italic 500 ${fs}px "Instrument Serif", Georgia, serif`;
    const tw = g.measureText(p.title).width;
    if (tw > N * 0.64) fs *= (N * 0.64) / tw;
    g.font = `italic 500 ${fs}px "Instrument Serif", Georgia, serif`;
    g.fillText(p.title, m, N * 0.28);

    // Subtitle & kind
    g.font = '600 14px "JetBrains Mono", monospace';
    g.fillStyle = th.sub;
    g.letterSpacing = '3px';
    g.fillText(`${p.kind.toUpperCase()} · ${p.year}`, m, N * 0.35);

    // ==========================================
    // BOTTOM ARCHIVE STAMP
    // ==========================================
    g.font = '500 12px "JetBrains Mono", monospace';
    g.fillStyle = 'rgba(255, 255, 255, 0.62)';
    const tagSpec = p.tags && p.tags[0] ? p.tags[0].toUpperCase() : 'CORE';
    const catPrefix = isExp ? 'CAREER RECORD' : 'ENGINEERING PROJECT';
    g.fillText(`FA-ARCHIVE // ${catPrefix} 0${idx + 1} // ${tagSpec}`, m, 866);
    g.fillText(th.specCode, m, 888);

    // ==========================================
    // PERIMETER CIRCULAR TEXT (VINYL RIM)
    // ==========================================
    g.save();
    g.translate(m, m);
    g.font = '600 19px "Inter Tight", system-ui, sans-serif';
    g.fillStyle = 'rgba(255, 255, 255, 0.72)';

    const tagsStr = p.tags ? p.tags.join(' · ').toUpperCase() : '';
    let perimeterStr = '';
    if (isExp) {
      perimeterStr = `FIRSTYATAMA AUZAN FARHADI     ${p.title.toUpperCase()}     ${p.year}     ${p.kind.toUpperCase()}     ${th.specTitle}     `;
    } else {
      perimeterStr = `FIRSTYATAMA AUZAN FARHADI     ${p.title.toUpperCase()}     ${p.year}     ${tagsStr}     ${th.specTitle}     `;
    }
    scriviIntorno(g, perimeterStr, N * 0.445, -Math.PI * 0.85);
    g.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }

  // Dimensions
  const R_BUCO = 0.075;
  const R_MOZZO = 0.165;
  const R_ANELLO = 0.2;
  const R_FUORI = 0.988;
  const SPESSORE = 0.014;

  const geoFaccia = new THREE.RingGeometry(R_ANELLO, R_FUORI, 160, 1);
  const geoMozzo = new THREE.RingGeometry(R_BUCO, R_MOZZO, 96, 1);
  const geoAnello = new THREE.RingGeometry(R_MOZZO, R_ANELLO, 96, 1);
  const geoBordo = new THREE.CylinderGeometry(1, 1, SPESSORE, 160, 1, true).rotateX(Math.PI / 2);

  // Shared Core Materials
  const matBordo = new THREE.MeshPhysicalMaterial({
    color: '#D8D8DF',
    metalness: 0.8,
    roughness: 0.12,
    clearcoat: 0.8
  });
  const matMozzo = new THREE.MeshPhysicalMaterial({
    color: '#E9EEF2',
    roughness: 0.25,
    transparent: true,
    opacity: 0.45,
    clearcoat: 1,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const matAnello = new THREE.MeshPhysicalMaterial({
    color: '#C8C8D0',
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.6,
    side: THREE.DoubleSide
  });

  // Create single 3D disc assembly with custom iridescent substrate back
  function creaDisco(p, i) {
    const isExp = type === 'experience';
    const th = getItemTheme(p, isExp);

    const esterno = new THREE.Group();
    const inclina = new THREE.Group();
    const capovolgi = new THREE.Group();
    const perno = new THREE.Group();

    esterno.add(inclina);
    inclina.add(capovolgi);
    capovolgi.add(perno);

    const fronte = new THREE.Mesh(geoFaccia, new THREE.MeshPhysicalMaterial({
      map: generaCopertina(p, i),
      roughness: 0.38,
      metalness: 0.16,
      clearcoat: 0.7,
      clearcoatRoughness: 0.16,
      envMapIntensity: 0.75,
    }));
    fronte.position.z = SPESSORE / 2 + 0.0005;

    // Distinct holographic iridescent backside tailored with custom substrate tint
    const matRetroInstance = new THREE.MeshPhysicalMaterial({
      color: th.retroColor,
      metalness: 1,
      roughness: 0.16,
      iridescence: 1,
      iridescenceIOR: 1.48,
      iridescenceThicknessRange: [120, 1100],
      clearcoat: 0.45,
      clearcoatRoughness: 0.08,
    });

    const retro = new THREE.Mesh(geoFaccia, matRetroInstance);
    retro.rotation.y = Math.PI;
    retro.position.z = -SPESSORE / 2 - 0.0005;

    perno.add(fronte, retro, new THREE.Mesh(geoBordo, matBordo), new THREE.Mesh(geoMozzo, matMozzo), new THREE.Mesh(geoAnello, matAnello));
    return { esterno, inclina, capovolgi, perno, girato: 0, spinta: 0, velSpinta: 0, inX: 0, inY: 0 };
  }

  // WebGL Scene Setup
  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: tela, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
  } catch (err) {
    console.error('WebGL not available:', err);
    return null;
  }

  const scena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0, 4.6);

  const fila = new THREE.Group();
  fila.rotation.set(-0.42, -0.5, 0);
  scena.add(fila);

  const dischi = [];
  let passo = PASSO;
  let testa = 0;
  let meta = 0;
  let vel = 0;
  let piega = 0;
  let attivo = -1;
  let puntX = 0;
  let puntY = 0;
  let dentro = 0;
  let dentroVoluto = 0;
  let running = false;

  // Environment Lighting
  const pmrem = new THREE.PMREMGenerator(renderer);
  scena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const chiave = new THREE.DirectionalLight('#FFF2DC', 2.0);
  chiave.position.set(3, 4, 5);
  const taglio = new THREE.DirectionalLight('#499FF5', 1.6);
  taglio.position.set(-4, -1, -3);
  const warmRim = new THREE.DirectionalLight('#FF6A1A', 1.4);
  warmRim.position.set(1, -3, 2);
  scena.add(chiave, taglio, warmRim);

  // Resize handler
  function misura() {
    if (!rootEl.isConnected) return;
    const w = rootEl.clientWidth || innerWidth;
    const h = rootEl.clientHeight || innerHeight;
    const dpr = Math.min(1.8, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    fila.scale.setScalar(Math.min(1, camera.aspect * 1.3));
    passo = camera.aspect < 1 ? 1.7 : PASSO;
    fila.position.set(camera.aspect > 1 ? 0.38 : 0, camera.aspect > 1 ? -0.12 : -0.22, 0);

    segno.width = Math.round(w * dpr);
    segno.height = Math.round(h * dpr);
    sg.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Update HUD Card with masked slide transitions
  function aggiornaScheda(i) {
    const p = items[i];
    if (!p) return;

    dotBtns.forEach((b, j) => b.classList.toggle('on', j === i));
    elBadge.textContent = `0${i + 1} / 0${items.length}`;
    elKind.textContent = p.kind;
    elDesc.textContent = p.summary;

    if (p.links && p.links[0] && elActionLink) {
      elActionLink.href = p.links[0][1];
      const span = elActionLink.querySelector('span');
      if (span) span.textContent = `${p.links[0][0]} ↗`;
      elActionLink.style.display = 'inline-flex';
    } else if (elActionLink) {
      elActionLink.style.display = 'none';
    }

    const metaList = p.meta.slice(0, 4);
    const metaEntries = metaList.map((m, idx) => ({
      dt: elDts[idx],
      dtVal: m[0],
      dd: elMds[idx],
      ddVal: m[1]
    }));

    if (window.gsap && !RIDOTTO) {
      window.gsap.timeline()
        .to(elTitle, { yPercent: -110, duration: 0.22, ease: 'power2.in' })
        .add(() => { elTitle.textContent = p.title; })
        .fromTo(elTitle, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'expo.out', immediateRender: false });

      metaEntries.forEach((entry, idx) => {
        if (!entry.dt || !entry.dd) return;
        entry.dt.textContent = entry.dtVal;
        window.gsap.timeline()
          .to(entry.dd, { yPercent: -110, duration: 0.22, ease: 'power2.in', delay: (idx + 1) * 0.03 })
          .add(() => { entry.dd.textContent = entry.ddVal; })
          .fromTo(entry.dd, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'expo.out', immediateRender: false });
      });
    } else {
      elTitle.textContent = p.title;
      metaEntries.forEach((entry) => {
        if (entry.dt) entry.dt.textContent = entry.dtVal;
        if (entry.dd) entry.dd.textContent = entry.ddVal;
      });
    }
  }

  // Flip disc action
  function capovolgi(d) {
    d.girato += 1;
    if (window.gsap && !RIDOTTO) {
      window.gsap.to(d.capovolgi.rotation, {
        y: d.girato * Math.PI,
        duration: 1.2,
        ease: 'back.out(1.35)',
        overwrite: true
      });
    } else {
      d.capovolgi.rotation.y = d.girato * Math.PI;
    }
  }

  // Set target disc
  function vai(i) {
    meta = Math.max(0, Math.min(items.length - 1, i));
    if (RIDOTTO) testa = meta;
  }

  // Hand-drawn trembling marker
  let traccia = 0;
  let prossimoTremito = 0;
  let tremiti = [];
  function nuoviTremiti() {
    tremiti = [];
    for (let l = 0; l < PENNARELLO.giri; l++) {
      const giro = {
        da: Math.random() * TONDO,
        largo: 1.08 + l * 0.05 + Math.random() * 0.02,
        fin: 1.04 + Math.random() * 0.14,
        punti: []
      };
      for (let k = 0; k <= PENNARELLO.punti; k++) giro.punti.push(1 + (Math.random() - 0.5) * 2 * PENNARELLO.trema);
      tremiti.push(giro);
    }
  }
  nuoviTremiti();

  const v3 = new THREE.Vector3();
  function sulloSchermo(d, ang, r) {
    v3.set(Math.cos(ang) * r, Math.sin(ang) * r, 0);
    d.inclina.localToWorld(v3);
    v3.project(camera);
    return [(v3.x + 1) * 0.5 * rootEl.clientWidth, (1 - v3.y) * 0.5 * rootEl.clientHeight];
  }

  function sopraAlDisco(d, x, y) {
    let dentroPoligono = false;
    const n = 24;
    let [px, py] = sulloSchermo(d, ((n - 1) / n) * TONDO, 1);
    for (let k = 0; k < n; k++) {
      const [qx, qy] = sulloSchermo(d, (k / n) * TONDO, 1);
      if ((qy > y) !== (py > y) && x < ((px - qx) * (y - qy)) / (py - qy) + qx) dentroPoligono = !dentroPoligono;
      px = qx;
      py = qy;
    }
    return dentroPoligono;
  }

  function renderPennarello(d) {
    sg.clearRect(0, 0, rootEl.clientWidth, rootEl.clientHeight);
    if (traccia <= 0.001 || !d) return;
    sg.strokeStyle = '#ff6a1a';
    sg.lineWidth = 2.4;
    sg.lineCap = 'round';
    sg.lineJoin = 'round';
    sg.shadowColor = 'rgba(255, 106, 26, 0.6)';
    sg.shadowBlur = 8;

    tremiti.forEach((giro, l) => {
      const parte = Math.min(1, Math.max(0, traccia * PENNARELLO.giri - l * 0.6));
      if (parte <= 0) return;
      const quanti = Math.max(2, Math.round(PENNARELLO.punti * giro.fin * parte));
      const pts = [];
      for (let k = 0; k <= quanti; k++) {
        const a = giro.da + (k / PENNARELLO.punti) * TONDO;
        pts.push(sulloSchermo(d, a, giro.largo * giro.punti[k % giro.punti.length]));
      }
      sg.beginPath();
      sg.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length - 1; k++) {
        const mx = (pts[k][0] + pts[k + 1][0]) / 2;
        const my = (pts[k][1] + pts[k + 1][1]) / 2;
        sg.quadraticCurveTo(pts[k][0], pts[k][1], mx, my);
      }
      sg.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
      sg.stroke();
    });
    sg.shadowBlur = 0;
  }

  // Animation Loop
  let prima = 0;
  let lastTime = 0;
  function fotogramma(timeMs) {
    if (!running) return;
    const now = timeMs || performance.now();
    const dt = Math.min(now - lastTime, 64) / 1000;
    lastTime = now;

    prima = testa;
    if (!trascina && !RIDOTTO) {
      vel += (meta - testa) * MOLLA * dt;
      vel *= Math.exp(-FRENO * dt);
      testa += vel * dt;
      if (Math.abs(meta - testa) < 0.0005 && Math.abs(vel) < 0.002) {
        testa = meta;
        vel = 0;
      }
    }

    const corsa = dt > 0 ? (testa - prima) / dt : 0;
    const voluta = RIDOTTO ? 0 : Math.max(-0.3, Math.min(0.3, Math.sign(corsa) * Math.sqrt(Math.abs(corsa)) * PIEGA));
    piega += (voluta - piega) * (1 - Math.exp(-8 * dt));

    const ora = Math.round(Math.max(0, Math.min(items.length - 1, testa)));
    if (ora !== attivo) {
      if (attivo !== -1) aggiornaScheda(ora);
      if (dischi[attivo] && dischi[attivo].girato % 2) capovolgi(dischi[attivo]);
      attivo = ora;
    }

    dentro += (dentroVoluto - dentro) * (1 - Math.exp(-6 * dt));

    dischi.forEach((d, i) => {
      const m = i - testa;
      const davanti = Math.max(0, 1 - Math.abs(m));
      d.esterno.position.set(m * passo, -Math.abs(m) * 0.05 - Math.abs(piega) * 0.2, -m * m * CURVA - d.spinta);
      d.esterno.scale.setScalar(PICCOLI + (1 - PICCOLI) * davanti);
      d.esterno.rotation.z = -piega;

      const vx = RIDOTTO ? 0 : -puntY * INCLINA * dentro * davanti;
      const vy = RIDOTTO ? 0 : puntX * INCLINA * dentro * davanti;
      d.inX += (vx - d.inX) * (1 - Math.exp(-7 * dt));
      d.inY += (vy - d.inY) * (1 - Math.exp(-7 * dt));
      d.inclina.rotation.set(d.inX, d.inY, 0);

      d.velSpinta += -d.spinta * 160 * dt;
      d.velSpinta *= Math.exp(-12 * dt);
      d.spinta += d.velSpinta * dt;

      if (!RIDOTTO) d.perno.rotation.z -= GIRA * dt * davanti;
    });

    renderer.render(scena, camera);

    const d = dischi[attivo];
    const sopra = puntatoreSopra && d && sopraAlDisco(d, sopraX, sopraY) && Math.abs(testa - attivo) < 0.2;
    traccia += ((sopra ? 1 : 0) - traccia) * Math.min(1, (dt / (sopra ? PENNARELLO.entra : PENNARELLO.esce)) * 3);

    if (!RIDOTTO && now >= prossimoTremito) {
      nuoviTremiti();
      prossimoTremito = now + 1000 / PENNARELLO.fps;
    }
    renderPennarello(d);

    rootEl.style.cursor = sopra ? 'pointer' : '';
    requestAnimationFrame(fotogramma);
  }

  // Pointer & Touch interactions
  let trascina = null;
  let puntatoreSopra = false;
  let sopraX = 0;
  let sopraY = 0;
  let accumulo = 0;
  let fermoFino = 0;

  rootEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const adesso = performance.now();
    if (adesso < fermoFino) return;
    accumulo += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(accumulo) > 55) {
      vai(meta + Math.sign(accumulo));
      accumulo = 0;
      fermoFino = adesso + 300;
    }
  }, { passive: false });

  const pixelPerDisco = () => Math.max(160, rootEl.clientWidth * 0.28);

  tela.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    trascina = { x0: e.clientX, testa0: testa, ultimoX: e.clientX, ultimoT: e.timeStamp, v: 0, mosso: false };
    if (tela.setPointerCapture) try { tela.setPointerCapture(e.pointerId); } catch (_) {}
  });

  tela.addEventListener('pointermove', (e) => {
    const r = rootEl.getBoundingClientRect();
    sopraX = e.clientX - r.left;
    sopraY = e.clientY - r.top;
    puntX = (sopraX / r.width) * 2 - 1;
    puntY = (sopraY / r.height) * 2 - 1;
    if (e.pointerType === 'mouse') {
      puntatoreSopra = true;
      dentroVoluto = 1;
    }
    if (!trascina) return;
    const dx = e.clientX - trascina.x0;
    if (Math.abs(dx) > 6) trascina.mosso = true;
    testa = Math.max(-0.4, Math.min(items.length - 0.6, trascina.testa0 - dx / pixelPerDisco()));
    const dtp = Math.max(4, e.timeStamp - trascina.ultimoT);
    trascina.v = (e.clientX - trascina.ultimoX) / dtp;
    trascina.ultimoX = e.clientX;
    trascina.ultimoT = e.timeStamp;
  });

  function lascia(e) {
    if (!trascina) return;
    if (trascina.mosso) {
      const lancio = (-trascina.v * 280) / pixelPerDisco();
      vai(Math.round(testa + lancio));
      vel = (-trascina.v * 1000) / pixelPerDisco() * 0.5;
    } else if (dischi[attivo] && sopraAlDisco(dischi[attivo], trascina.x0 - rootEl.getBoundingClientRect().left, e.clientY - rootEl.getBoundingClientRect().top)) {
      dischi[attivo].velSpinta = 4;
      capovolgi(dischi[attivo]);
    }
    trascina = null;
  }

  tela.addEventListener('pointerup', lascia);
  tela.addEventListener('pointercancel', lascia);
  rootEl.addEventListener('pointerleave', () => {
    puntatoreSopra = false;
    dentroVoluto = 0;
  });

  btnPrev.addEventListener('click', () => vai(meta - 1));
  btnNext.addEventListener('click', () => vai(meta + 1));
  btnFlip.addEventListener('click', () => {
    if (dischi[attivo]) {
      dischi[attivo].velSpinta = 3;
      capovolgi(dischi[attivo]);
    }
  });

  btnDetail.addEventListener('click', () => {
    if (onOpenDetail && items[attivo]) {
      onOpenDetail(items[attivo].slug);
    }
  });

  // Init discs
  items.forEach((p, i) => {
    const d = creaDisco(p, i);
    dischi.push(d);
    fila.add(d.esterno);
  });

  misura();
  attivo = 0;
  aggiornaScheda(0);
  window.addEventListener('resize', misura);

  return {
    mount() {
      running = true;
      lastTime = performance.now();
      misura();
      if (!RIDOTTO) {
        testa = -2.2;
        vel = 0;
      }
      requestAnimationFrame(fotogramma);
    },
    unmount() {
      running = false;
    },
    vai(index) {
      vai(index);
    },
    next() {
      vai(meta + 1);
    },
    prev() {
      vai(meta - 1);
    },
    getCurrentSlug() {
      return items[attivo] ? items[attivo].slug : null;
    }
  };
}
