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

  // Cover Canvas Generator (1024x1024)
  function generaCopertina(p, idx) {
    const N = 1024;
    const m = N / 2;
    const c = document.createElement('canvas');
    c.width = N;
    c.height = N;
    const g = c.getContext('2d');

    // Color palettes & styles
    let th;
    if (type === 'projects') {
      const themes = [
        { bg1: '#131B2E', bg2: '#080E1C', accent: '#38BDF8', glow: '#0284C7', text: '#F8FAFC', sub: '#94A3B8', style: 'cohive' },
        { bg1: '#261338', bg2: '#10071C', accent: '#C084FC', glow: '#9333EA', text: '#FAF5FF', sub: '#A855F7', style: 'semsim' },
        { bg1: '#092B22', bg2: '#031410', accent: '#34D399', glow: '#059669', text: '#ECFDF5', sub: '#6EE7B7', style: 'chatbot' },
        { bg1: '#361D09', bg2: '#170B02', accent: '#F59E0B', glow: '#D97706', text: '#FFFBEB', sub: '#FBBF24', style: 'green' }
      ];
      th = themes[idx % themes.length];
    } else {
      // Experience themes
      const expThemes = [
        { bg1: '#0C1E36', bg2: '#050D18', accent: '#38BDF8', glow: '#0284C7', text: '#F8FAFC', sub: '#7DD3FC', style: 'btp' },
        { bg1: '#22152F', bg2: '#0A050F', accent: '#F43F5E', glow: '#E11D48', text: '#FFF1F2', sub: '#FDA4AF', style: 'cmlabs' },
        { bg1: '#240B1A', bg2: '#0F030B', accent: '#FB7185', glow: '#E11D48', text: '#FFF1F2', sub: '#F43F5E', style: 'riset' },
        { bg1: '#2D1B05', bg2: '#120A02', accent: '#F59E0B', glow: '#D97706', text: '#FEF3C7', sub: '#FCD34D', style: 'hima' }
      ];
      th = expThemes[idx % expThemes.length];
    }

    // Radial gradient background
    const bgGrad = g.createRadialGradient(m, m * 0.7, 40, m, m, N * 0.72);
    bgGrad.addColorStop(0, th.bg1);
    bgGrad.addColorStop(1, th.bg2);
    g.fillStyle = bgGrad;
    g.fillRect(0, 0, N, N);

    // Optical disc micro-grooves
    g.save();
    for (let r = 210; r < 495; r += 7) {
      g.beginPath();
      g.arc(m, m, r, 0, TONDO);
      g.strokeStyle = (r % 21 === 0) ? 'rgba(255, 255, 255, 0.045)' : 'rgba(255, 255, 255, 0.016)';
      g.lineWidth = 1;
      g.stroke();
    }
    g.restore();

    // Procedural graphic motif
    g.save();
    if (th.style === 'cohive' || th.style === 'btp') {
      // Hexagonal cooperative incubator mesh
      const hexS = 36;
      g.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      g.lineWidth = 2;
      for (let ring = 1; ring <= 3; ring++) {
        for (let a = 0; a < 6; a++) {
          const ang = (a / 6) * TONDO + Math.PI / 6;
          const hx = m + Math.cos(ang) * (ring * hexS * 2.2);
          const hy = m * 0.78 + Math.sin(ang) * (ring * hexS * 2.2);
          g.beginPath();
          for (let k = 0; k < 6; k++) {
            const ka = (k / 6) * TONDO + Math.PI / 6;
            const px = hx + Math.cos(ka) * hexS;
            const py = hy + Math.sin(ka) * hexS;
            k === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
          }
          g.closePath();
          g.stroke();
          if (ring === 2 && a % 2 === 0) {
            g.fillStyle = th.accent;
            g.beginPath();
            g.arc(hx, hy, 4.5, 0, TONDO);
            g.fill();
          }
        }
      }
    } else if (th.style === 'semsim') {
      // Dual semantic sine wave interference
      for (let wave = 0; wave < 6; wave++) {
        g.beginPath();
        g.strokeStyle = wave % 2 === 0 ? 'rgba(192, 132, 252, 0.45)' : 'rgba(56, 189, 248, 0.35)';
        g.lineWidth = 2.5;
        for (let x = N * 0.15; x <= N * 0.85; x += 6) {
          const t = (x - N * 0.15) / (N * 0.7);
          const y = m * 0.78 + Math.sin(t * Math.PI * 4 + wave * 0.7) * (36 - wave * 4);
          x === N * 0.15 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.stroke();
      }
    } else if (th.style === 'cmlabs') {
      // Plagiarism detection matrix & SEO radar curves
      g.strokeStyle = 'rgba(244, 63, 94, 0.3)';
      g.lineWidth = 1.8;
      for (let arc = 1; arc <= 4; arc++) {
        g.beginPath();
        g.arc(m, m * 0.78, arc * 34, 0, Math.PI);
        g.stroke();
      }
      for (let k = -3; k <= 3; k++) {
        g.beginPath();
        g.moveTo(m + k * 28, m * 0.78 - 60);
        g.lineTo(m + k * 28, m * 0.78 + 40);
        g.stroke();
      }
      g.fillStyle = th.accent;
      g.beginPath();
      g.arc(m, m * 0.78, 6, 0, TONDO);
      g.fill();
    } else if (th.style === 'chatbot') {
      // Attention graph / circular orbital network
      for (let r = 1; r <= 3; r++) {
        g.beginPath();
        g.arc(m, m * 0.76, r * 42, 0, TONDO);
        g.strokeStyle = 'rgba(52, 211, 153, 0.22)';
        g.lineWidth = 1.8;
        g.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * TONDO;
        const x1 = m + Math.cos(ang) * 42;
        const y1 = m * 0.76 + Math.sin(ang) * 42;
        const x2 = m + Math.cos(ang + 0.4) * 126;
        const y2 = m * 0.76 + Math.sin(ang + 0.4) * 126;
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.strokeStyle = 'rgba(52, 211, 153, 0.35)';
        g.stroke();
        g.fillStyle = th.accent;
        g.beginPath();
        g.arc(x2, y2, 4, 0, TONDO);
        g.fill();
      }
    } else if (th.style === 'riset') {
      // Computer vision OCR scanning crosshairs
      g.strokeStyle = 'rgba(251, 113, 133, 0.35)';
      g.lineWidth = 2;
      g.strokeRect(m - 90, m * 0.78 - 45, 180, 90);
      g.beginPath();
      g.moveTo(m - 110, m * 0.78);
      g.lineTo(m + 110, m * 0.78);
      g.stroke();
      g.strokeStyle = th.accent;
      g.beginPath();
      g.arc(m, m * 0.78, 28, 0, TONDO);
      g.stroke();
    } else if (th.style === 'hima') {
      // Leadership crest with concentric empowerment rings
      for (let r = 1; r <= 3; r++) {
        g.beginPath();
        g.arc(m, m * 0.76, r * 38, 0, TONDO);
        g.strokeStyle = 'rgba(245, 158, 11, 0.35)';
        g.lineWidth = 2;
        g.stroke();
      }
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * TONDO;
        g.fillStyle = th.accent;
        g.beginPath();
        g.arc(m + Math.cos(a) * 76, m * 0.76 + Math.sin(a) * 76, 5, 0, TONDO);
        g.fill();
      }
    } else {
      // Circular Möbius eco loop
      g.lineWidth = 3;
      for (let l = 0; l < 4; l++) {
        g.beginPath();
        const rBase = 90 + l * 18;
        for (let a = 0; a <= TONDO; a += 0.05) {
          const r = rBase + Math.sin(a * 3) * 14;
          const x = m + Math.cos(a) * r;
          const y = m * 0.76 + Math.sin(a) * r;
          a === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.closePath();
        g.strokeStyle = l % 2 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.2)';
        g.stroke();
      }
    }
    g.restore();

    // Circular rim boundaries
    g.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(m, m, N * 0.47, 0, TONDO);
    g.stroke();

    g.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    g.lineWidth = 1;
    g.beginPath();
    g.arc(m, m, N * 0.21, 0, TONDO);
    g.stroke();

    // Title Typography
    g.fillStyle = th.text;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    let fs = 110;
    g.font = `italic 500 ${fs}px "Instrument Serif", Georgia, serif`;
    const tw = g.measureText(p.title).width;
    if (tw > N * 0.65) fs *= (N * 0.65) / tw;
    g.font = `italic 500 ${fs}px "Instrument Serif", Georgia, serif`;
    g.fillText(p.title, m, N * 0.32);

    // Subtitle / category
    g.font = '500 16px "JetBrains Mono", monospace';
    g.fillStyle = th.sub;
    g.letterSpacing = '3px';
    g.fillText(`${p.kind.toUpperCase()} · ${p.year}`, m, N * 0.39);

    // Inner Catalog Stamp
    g.font = '400 13px "JetBrains Mono", monospace';
    g.fillStyle = 'rgba(255, 255, 255, 0.55)';
    const tagSpec = p.tags && p.tags[0] ? p.tags[0].toUpperCase() : 'PORTFOLIO';
    const catPrefix = type === 'projects' ? 'PROJECT' : 'EXP';
    g.fillText(`FA-ARCHIVE · ${catPrefix} 0${idx + 1} · ${tagSpec}`, m, N * 0.72);
    g.fillText('TELKOM UNIVERSITY SURABAYA · 2026', m, N * 0.75);

    // Perimeter Circular Text
    g.save();
    g.translate(m, m);
    g.font = '600 21px "Inter Tight", system-ui, sans-serif';
    g.fillStyle = 'rgba(255, 255, 255, 0.75)';
    const tagsStr = p.tags ? p.tags.join(' · ').toUpperCase() : '';
    const perimeterStr = `FIRSTYATAMA AUZAN FARHADI     ${p.title.toUpperCase()}     ${p.year}     ${tagsStr}     `;
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

  // Materials
  const matRetro = new THREE.MeshPhysicalMaterial({
    color: '#151926',
    metalness: 1,
    roughness: 0.18,
    iridescence: 1,
    iridescenceIOR: 1.48,
    iridescenceThicknessRange: [120, 1100],
    clearcoat: 0.4,
    clearcoatRoughness: 0.08,
  });
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

  // Create single 3D disc assembly
  function creaDisco(p, i) {
    const esterno = new THREE.Group();
    const inclina = new THREE.Group();
    const capovolgi = new THREE.Group();
    const perno = new THREE.Group();

    esterno.add(inclina);
    inclina.add(capovolgi);
    capovolgi.add(perno);

    const fronte = new THREE.Mesh(geoFaccia, new THREE.MeshPhysicalMaterial({
      map: generaCopertina(p, i),
      roughness: 0.4,
      metalness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.75,
    }));
    fronte.position.z = SPESSORE / 2 + 0.0005;

    const retro = new THREE.Mesh(geoFaccia, matRetro);
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
