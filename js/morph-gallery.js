// morph-gallery.js
// 3D Perspective Cascading Morph Gallery (as seen on morph-template.modulify.website)
// Features: 3D cascading depth cards, pointer drag & wheel scroll, camera tilt, click to inspect/open,
// side info swap, settings panel, full responsive touch/mouse controls.

export function createMorphGallery(mountEl, items, onOpenDetail) {
  if (!mountEl || !items || !items.length) return null;

  const total = items.length;
  const rad = Math.PI / 180;

  // Defaults based on Morph template engine
  const defaults = {
    camX: 0.74,
    camY: 0.243,
    dolly: 0,
    fov: 87,
    yaw: -24,
    roll: 3,
    size: 0.51,
    stepX: 0.14,
    stepY: -0.138,
    stepZ: 15,
    pushX: 0.5,
    pushY: 0.4,
    pushZ: 0.3
  };

  const params = { ...defaults };

  // Utility helpers
  const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
  const wrap = (v, m) => (v % m + m) % m;
  const sstep = (t) => t * t * (3 - 2 * t);
  const seg = (val, a, b) => clamp((val - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;
  const inOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const outQuint = (t) => 1 - Math.pow(1 - t, 5);

  // Point in quad 2D tester
  function pointInQuad(quad, px, py) {
    let sign = 0;
    for (let i = 0; i < 4; i++) {
      const x1 = quad[2 * i];
      const y1 = quad[2 * i + 1];
      const x2 = quad[((i + 1) % 4) * 2];
      const y2 = quad[((i + 1) % 4) * 2 + 1];
      const cross = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1);
      if (cross === 0) continue;
      const s = cross > 0 ? 1 : -1;
      if (sign === 0) sign = s;
      else if (s !== sign) return false;
    }
    return true;
  }

  // Setup DOM Structure
  mountEl.innerHTML = `
    <section class="mo" tabindex="0" role="region" aria-label="Organization Certificates Morph Gallery" data-open="false" data-stack="false" data-intro="true">
      <div class="mo-grain" aria-hidden="true"></div>
      <div class="mo-vignette" aria-hidden="true"></div>
      <div class="mo-frame" aria-hidden="true"></div>

      <div class="mo-scene" aria-hidden="true">
        ${items.map((it, idx) => {
    const img = it.certCover || (it.evidences && it.evidences[0]?.file) || '';
    return `
            <div class="mo-card" data-idx="${idx}">
              <img src="${img}" alt="${it.title}" draggable="false" class="mo-img" style="object-position:center center" />
              <div class="mo-veil"></div>
              <span class="mo-edge mo-edge-t"></span>
              <span class="mo-edge mo-edge-r"></span>
            </div>
          `;
  }).join('')}
      </div>

      <div class="mo-titleblock">
        <h1 class="mo-title">ORGANIZATION</h1>
        <div class="mo-titlemeta">
          <span class="mo-rule"></span>
          <div class="mo-swap" data-out="false" id="moSwap">
            <p class="mo-desc">Rekam jejak kepengurusan organisasi, kepemimpinan forum, dan kepanitiaan resmi Telkom University Surabaya.</p>
            <div class="mo-scroll">Scroll atau geser kartu untuk eksplorasi</div>
          </div>
        </div>
      </div>

      <!-- Simplified roles list -->
      <aside class="mo-roles-panel" aria-label="Daftar Peran Organisasi">
        <p class="mo-roles-kicker">ROLES &amp; LEADERSHIP</p>
        <ul class="mo-roles-list">
          ${items.map((it, idx) => `
            <li class="mo-role-item" data-role-idx="${idx}" tabindex="0" role="button" aria-label="Lihat ${it.role} - ${it.title}">
              <span class="mo-role-name">${it.role}</span>
            </li>
          `).join('')}
        </ul>
      </aside>

      <div class="mo-controls">
        <button type="button" class="mo-settingsbtn" id="moSettingsBtn" aria-expanded="false" aria-controls="mo-settings-panel">
          <span class="mo-mark" aria-hidden="true">+</span>Settings
        </button>
      </div>

      <div id="moSettingsPanel" class="mo-settings" style="display:none">
        <div class="mo-settings-head">
          <span>Camera & 3D Settings</span>
          <button type="button" class="mo-settings-close" id="moSettingsClose" aria-label="Tutup pengaturan">✕</button>
        </div>
        <div class="mo-settings-body">
          <div class="mo-group">Perspective</div>
          <label class="mo-slider">
            <span>FOV</span>
            <input type="range" id="param-fov" min="40" max="130" step="1" value="${params.fov}" />
            <output id="out-fov">${params.fov}</output>
          </label>
          <label class="mo-slider">
            <span>Cam X</span>
            <input type="range" id="param-camX" min="-0.4" max="1.6" step="0.01" value="${params.camX}" />
            <output id="out-camX">${params.camX}</output>
          </label>
          <label class="mo-slider">
            <span>Cam Y</span>
            <input type="range" id="param-camY" min="-0.6" max="1.2" step="0.01" value="${params.camY}" />
            <output id="out-camY">${params.camY}</output>
          </label>

          <div class="mo-group">Canvas & Cascade</div>
          <label class="mo-slider">
            <span>Yaw</span>
            <input type="range" id="param-yaw" min="-60" max="10" step="1" value="${params.yaw}" />
            <output id="out-yaw">${params.yaw}</output>
          </label>
          <label class="mo-slider">
            <span>Card Size</span>
            <input type="range" id="param-size" min="0.2" max="1.1" step="0.01" value="${params.size}" />
            <output id="out-size">${params.size}</output>
          </label>
          <label class="mo-slider">
            <span>Step X</span>
            <input type="range" id="param-stepX" min="0" max="0.34" step="0.005" value="${params.stepX}" />
            <output id="out-stepX">${params.stepX}</output>
          </label>
          <label class="mo-slider">
            <span>Step Y</span>
            <input type="range" id="param-stepY" min="-0.34" max="0.04" step="0.005" value="${params.stepY}" />
            <output id="out-stepY">${params.stepY}</output>
          </label>

          <div class="mo-settings-actions">
            <button type="button" class="mo-btn" id="moResetBtn">Reset</button>
            <button type="button" class="mo-btn mo-btn-primary" id="moCloseSettings">OK</button>
          </div>
        </div>
      </div>
    </section>
  `;

  const moSec = mountEl.querySelector('.mo');
  const moScene = mountEl.querySelector('.mo-scene');
  const cardEls = Array.from(mountEl.querySelectorAll('.mo-card'));
  const swapEl = mountEl.querySelector('#moSwap');
  const settingsBtn = mountEl.querySelector('#moSettingsBtn');
  const settingsPanel = mountEl.querySelector('#moSettingsPanel');
  const settingsClose = mountEl.querySelector('#moSettingsClose');
  const settingsOk = mountEl.querySelector('#moCloseSettings');
  const resetBtn = mountEl.querySelector('#moResetBtn');

  // State
  const state = {
    posCur: 0,
    posTarget: 0,
    tiltX: 0,
    tiltY: 0,
    tiltTX: 0,
    tiltTY: 0,
    clock: 0,
    introT: 0,
    last: 0,
    dragging: false,
    dragY: 0,
    dragMoved: 0,
    hoverTarget: -1,
    opening: -1,
    boxW: 0,
    px: 0,
    py: 0,
    inside: false,
    stack: false,
    locked: false,
    vis: new Array(total).fill(0),
    op: new Array(total).fill(-1),
    lift: new Array(total).fill(-1),
    open: new Array(total).fill(0),
    hover: new Array(total).fill(0),
    depth: new Array(total).fill(0),
    onStage: new Array(total).fill(false),
    quads: Array.from({ length: total }, () => new Float64Array(8))
  };

  let animationId = null;
  let isRunning = false;
  let infoState = { mode: 'idle', index: -1 };
  let infoTimeout = null;

  // Reduced motion
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Settings panel toggling
  function toggleSettings(open) {
    const show = open ?? (settingsPanel.style.display === 'none');
    settingsPanel.style.display = show ? 'block' : 'none';
    settingsBtn.setAttribute('aria-expanded', String(show));
    const mark = settingsBtn.querySelector('.mo-mark');
    if (mark) mark.textContent = show ? '×' : '+';
  }

  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettings();
  });
  settingsClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettings(false);
  });
  settingsOk?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettings(false);
  });

  resetBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    Object.assign(params, defaults);
    ['fov', 'camX', 'camY', 'yaw', 'size', 'stepX', 'stepY'].forEach(k => {
      const input = mountEl.querySelector(`#param-${k}`);
      const out = mountEl.querySelector(`#out-${k}`);
      if (input) input.value = params[k];
      if (out) out.textContent = params[k];
    });
  });

  ['fov', 'camX', 'camY', 'yaw', 'size', 'stepX', 'stepY'].forEach(k => {
    const input = mountEl.querySelector(`#param-${k}`);
    const out = mountEl.querySelector(`#out-${k}`);
    input?.addEventListener('input', (e) => {
      params[k] = parseFloat(e.target.value);
      if (out) out.textContent = params[k];
    });
  });

  // Update text in side titleblock with smooth swap
  function updateSideInfo(mode, index) {
    if (infoState.mode === mode && infoState.index === index) return;
    infoState = { mode, index };

    if (infoTimeout) clearTimeout(infoTimeout);
    swapEl.setAttribute('data-out', 'true');

    infoTimeout = setTimeout(() => {
      if (index >= 0 && index < total) {
        const it = items[index];
        const isDetailOpen = mode === 'open';

        swapEl.innerHTML = `
          <h2 class="mo-workname">${it.title}</h2>
          <div class="mo-workline">${it.institution || 'Telkom University Surabaya'} · ${it.year}</div>
          <div class="mo-workline mo-workline-sub">${it.kind} · ${it.role || 'Panitia'}</div>
          <p class="mo-desc">${it.summary}</p>
          <div class="mo-actions-row">
            ${isDetailOpen ? `
              <button type="button" class="mo-close-btn" id="moCloseCardBtn">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                Tutup Kartu
              </button>

            ` : `
              <span class="mo-hint-click">Klik kartu untuk inspeksi dokumen</span>
            `}
          </div>
        `;

        mountEl.querySelector('#moCloseCardBtn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          closeOpenCard();
        });

        mountEl.querySelector('#moOpenFullBtn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (onOpenDetail) onOpenDetail(it.slug);
        });
        mountEl.querySelectorAll('.mo-role-item').forEach((rEl, rIdx) => {
          rEl.classList.toggle('active', rIdx === index);
        });
      } else {
        mountEl.querySelectorAll('.mo-role-item').forEach(rEl => rEl.classList.remove('active'));
        swapEl.innerHTML = `
          <p class="mo-desc">Rekam jejak kepengurusan organisasi, kepemimpinan forum, dan kepanitiaan resmi Telkom University Surabaya.</p>
          <div class="mo-scroll">Scroll atau geser kartu untuk eksplorasi</div>
        `;
      }
      swapEl.setAttribute('data-out', 'false');
    }, mode === 'open' ? 240 : 120);
  }

  // Allow clicking roles in top-right panel to jump/open card
  mountEl.querySelectorAll('.mo-role-item').forEach(rEl => {
    const idx = parseInt(rEl.dataset.roleIdx || '0', 10);
    rEl.addEventListener('click', (e) => {
      e.stopPropagation();
      openCard(idx);
    });
    rEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard(idx);
      }
    });
  });

  function openCard(idx) {
    if (state.opening !== idx) {
      state.opening = idx;
      moSec.dataset.open = 'true';
    }
  }

  function closeOpenCard() {
    if (state.opening >= 0) {
      state.opening = -1;
      moSec.dataset.open = 'false';
    }
  }

  // Pointer & Scroll Event Listeners
  function onPointerDown(e) {
    if (e.target.closest('.mo-settings') || e.target.closest('.mo-settingsbtn') || e.target.closest('#moCloseCardBtn') || e.target.closest('#moOpenFullBtn')) {
      return;
    }
    state.dragging = true;
    state.dragY = e.clientY;
    state.dragMoved = 0;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { }
  }

  function onPointerMove(e) {
    const rect = moSec.getBoundingClientRect();
    state.inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    state.px = e.clientX - rect.left;
    state.py = e.clientY - rect.top;

    if (!reducedMotion) {
      state.tiltTX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.tiltTY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    if (!state.dragging) return;
    const dy = e.clientY - state.dragY;
    state.dragY = e.clientY;
    state.dragMoved += Math.abs(dy);

    if (state.opening < 0) {
      state.posTarget -= dy * 0.009;
    }
  }

  function onPointerUp(e) {
    if (!state.dragging) return;
    state.dragging = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) { }

    if (state.dragMoved > 6) return; // was drag, not click

    if (state.opening >= 0) {
      closeOpenCard();
      return;
    }

    // Raycast click on quads from top depth to lowest
    const rect = moSec.getBoundingClientRect();
    const lx = e.clientX - rect.left;
    const ly = e.clientY - rect.top;
    let clicked = -1;
    let maxDepth = -Infinity;

    for (let i = 0; i < total; i++) {
      if (state.onStage[i] && pointInQuad(state.quads[i], lx, ly) && state.depth[i] > maxDepth) {
        maxDepth = state.depth[i];
        clicked = i;
      }
    }

    if (clicked >= 0) {
      openCard(clicked);
    }
  }

  function onWheel(e) {
    const rect = moSec.getBoundingClientRect();
    const inBounds = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (inBounds) {
      e.preventDefault();
      if (state.opening >= 0) {
        closeOpenCard();
        return;
      }
      state.posTarget += e.deltaY * 0.0032;
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      closeOpenCard();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (state.opening < 0) state.posTarget += 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (state.opening < 0) state.posTarget -= 1;
    }
  }

  moSec.addEventListener('pointerdown', onPointerDown);
  moSec.addEventListener('pointermove', onPointerMove);
  moSec.addEventListener('pointerup', onPointerUp);
  moSec.addEventListener('pointercancel', onPointerUp);
  moSec.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);

  // Resize handler
  function onResize() {
    const cw = moSec.clientWidth || window.innerWidth;
    const ch = moSec.clientHeight || window.innerHeight;
    const wideAspect = clamp((1.5 - cw / ch) / 1) > 0.5;
    const stackTop = (ch * (wideAspect ? 0.33 : 0.5) + (cw * (wideAspect ? 0.88 : 0.54)) / 1.3 / 2 + 26);
    moSec.style.setProperty('--stackTop', `${stackTop.toFixed(1)}px`);
  }
  window.addEventListener('resize', onResize);
  onResize();

  // Animation Frame Loop
  function tick(timestamp) {
    if (!isRunning) return;
    animationId = requestAnimationFrame(tick);

    const delta = state.last ? Math.min(0.05, (timestamp - state.last) / 1000) : 0;
    state.last = timestamp;

    if (document.hidden) return;

    if (!reducedMotion) state.clock += 0.006;
    state.introT += reducedMotion ? total + 1 : delta;

    // Smooth position interpolation
    if (reducedMotion) {
      state.posCur = state.posTarget;
    } else {
      state.posCur += (state.posTarget - state.posCur) * 0.1;
      if (Math.abs(state.posTarget - state.posCur) < 1e-4) state.posCur = state.posTarget;
    }

    // Keep within bounds
    if (Math.abs(state.posTarget) > 6 * total) {
      const wrapOffset = Math.round(state.posTarget / total) * total;
      state.posTarget -= wrapOffset;
      state.posCur -= wrapOffset;
    }

    // Smooth tilt
    if (reducedMotion) {
      state.tiltX = 0;
      state.tiltY = 0;
    } else {
      state.tiltX += (state.tiltTX - state.tiltX) * 0.06;
      state.tiltY += (state.tiltTY - state.tiltY) * 0.06;
    }

    const cw = moSec.clientWidth || window.innerWidth;
    const ch = moSec.clientHeight || window.innerHeight;

    const aspectWeight = clamp((1.5 - cw / ch) / 1);
    const aspectScale = 1 + 1.3 * aspectWeight;
    const isStack = aspectWeight > 0.5;

    const baseSize = params.size * aspectScale;
    const stepX = params.stepX * aspectScale * (1 - 0.45 * aspectWeight);
    const stepY = params.stepY * (1 + 0.1 * aspectWeight);

    if (isStack !== state.stack) {
      state.stack = isStack;
      moSec.dataset.stack = String(isStack);
    }

    // Interpolate card opening/closing
    let maxOpen = 0;
    let openCardIdx = -1;

    for (let i = 0; i < total; i++) {
      const targetOpen = state.opening === i ? 1 : 0;
      if (reducedMotion) {
        state.open[i] = targetOpen;
      } else if (state.open[i] !== targetOpen) {
        const rate = delta / (targetOpen === 1 ? 1.2 : 0.82);
        state.open[i] = targetOpen === 1 ? Math.min(1, state.open[i] + rate) : Math.max(0, state.open[i] - rate);
      }
      if (state.open[i] > maxOpen) {
        maxOpen = state.open[i];
        openCardIdx = i;
      }

      const targetHover = state.hoverTarget === i ? 1 : 0;
      state.hover[i] += reducedMotion ? targetHover : (targetHover - state.hover[i]) * 0.14;
    }

    const openPos = openCardIdx >= 0 ? wrap(openCardIdx - state.posCur + 2.6, total) - 2.6 : 0;
    const openSmooth = maxOpen > 0 ? sstep(seg(maxOpen, 0.05, 0.9)) : 0;

    // 3D Camera Math
    const fov = params.fov + 5 * openSmooth;
    const perspectiveZ = (cw / 2) / Math.tan(fov * rad / 2) * aspectScale;
    const bobZ = reducedMotion ? 0 : Math.sin(state.clock) * params.pushZ * 0.012;
    const bobY = reducedMotion ? 0 : Math.cos(state.clock * 0.9) * params.pushZ * 0.009;

    const originX = params.camX + (-0.07) * openSmooth + state.tiltX * params.pushX * 0.045 * (1 - openSmooth) + bobZ;
    const originY = params.camY + (0.06) * openSmooth + state.tiltY * params.pushY * 0.035 * (1 - openSmooth) + bobY;

    moScene.style.perspective = `${perspectiveZ.toFixed(2)}px`;
    moScene.style.perspectiveOrigin = `${(100 * originX).toFixed(3)}% ${(100 * originY).toFixed(3)}%`;

    const focusPlane = 0.34 * perspectiveZ;
    const focalRatio = perspectiveZ / (perspectiveZ - focusPlane);
    const targetSize = (isStack ? 0.88 : 0.54) / focalRatio;
    const targetCenterX = originX * cw + (cw * (isStack ? 0.5 : 0.665) - originX * cw) / focalRatio;
    const targetCenterY = originY * ch + (ch * (isStack ? 0.33 : 0.5) - originY * ch) / focalRatio;

    const baseBoxW = cw * Math.max(baseSize, targetSize) * 1.02;

    if (Math.abs(baseBoxW - state.boxW) >= 1) {
      state.boxW = baseBoxW;
      const boxH = baseBoxW / 1.3;
      cardEls.forEach(c => {
        c.style.width = `${baseBoxW.toFixed(2)}px`;
        c.style.height = `${boxH.toFixed(2)}px`;
        c.style.setProperty('--edgeT', `${(0.0075 * baseBoxW).toFixed(2)}px`);
        c.style.setProperty('--edgeS', `${(0.014 * baseBoxW).toFixed(2)}px`);
      });
    }

    const boxW = state.boxW;
    const boxH = boxW / 1.3;
    const yawSin = Math.max(0.06, Math.abs(Math.sin(params.yaw * rad)));

    // Render Cards in 3D
    for (let i = 0; i < total; i++) {
      const card = cardEls[i];
      if (!card) continue;

      let n = wrap(i - state.posCur + 2.6, total) - 2.6;
      const o = state.open[i];
      const isCardOpen = i === openCardIdx;

      // Card separation when another card is opened
      if (maxOpen > 0 && !isCardOpen) {
        const separationDist = 0.02 + 0.04 * Math.min(Math.abs(n - openPos), 4);
        const splitFactor = Math.pow(seg(maxOpen, separationDist, Math.min(0.99, separationDist + 0.56)), 1.7);
        n += (n - openPos >= 0 ? 1 : -1) * splitFactor * 6.4;
      }

      const hov = state.hover[i];
      let posX = (0.208 + stepX * n) * cw;
      let posY = (1.206 + stepY * n) * ch;
      let posZ = (-15 - params.stepZ * n + 26 * hov) * aspectScale + params.dolly;
      let rotYaw = params.yaw;
      let rotRoll = params.roll;
      let curScale = baseSize;
      let alpha = 1;

      // Animate card toward front view when open
      if (isCardOpen && o > 0) {
        const openCurve = sstep(seg(o, 0.1, 0.94));
        const rotCurve = inOutCubic(seg(o, 0.22, 0.99));
        const popArc = Math.sin(seg(o, 0.66, 1) * Math.PI);

        rotYaw = lerp(rotYaw, 0, rotCurve);
        rotRoll = lerp(rotRoll, 0, rotCurve);
        curScale = lerp(baseSize, targetSize, openCurve);
        posX = lerp(posX, targetCenterX, openCurve);
        posY = lerp(posY, targetCenterY, openCurve) - 0.05 * ch * Math.sin(openCurve * Math.PI);
        posZ = lerp(posZ, focusPlane, openCurve) + 38 * popArc * aspectScale;
      }

      // Calculate 4 corners projected to screen for hover/click test
      const cosRoll = Math.cos(rotRoll * rad);
      const sinRoll = Math.sin(rotRoll * rad);
      const cosYaw = Math.cos(rotYaw * rad);
      const sinYaw = Math.sin(rotYaw * rad);

      const renderW = cw * curScale;
      const renderH = renderW / 1.3;
      const halfW = renderW / 2;
      const halfH = renderH / 2;
      const quad = state.quads[i];

      let visible = true;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

      for (let c = 0; c < 4; c++) {
        const cxLocal = (c === 0 || c === 3) ? -halfW : halfW;
        const cyLocal = (c === 0 || c === 1) ? -halfH : halfH;

        const rx = cxLocal * cosRoll - cyLocal * sinRoll;
        const ry = cxLocal * sinRoll + cyLocal * cosRoll;
        const rz = posZ - rx * sinYaw;

        if (rz > perspectiveZ - 24) {
          visible = false;
          break;
        }

        const projScale = perspectiveZ / (perspectiveZ - rz);
        const scrX = originX * cw + (posX + rx * cosYaw - originX * cw) * projScale;
        const scrY = originY * ch + (posY + ry - originY * ch) * projScale;

        quad[2 * c] = scrX;
        quad[2 * c + 1] = scrY;

        if (scrX < minX) minX = scrX;
        if (scrX > maxX) maxX = scrX;
        if (scrY < minY) minY = scrY;
        if (scrY > maxY) maxY = scrY;
      }

      const onScreen = visible && maxX > -120 && minX < cw + 120 && maxY > -120 && minY < ch + 120;
      state.onStage[i] = onScreen;
      state.depth[i] = posZ;

      card.style.visibility = 'visible';

      // Apply CSS 3D transform
      card.style.transform = `translate3d(${(posX - boxW / 2).toFixed(2)}px, ${(posY - boxH / 2).toFixed(2)}px, ${posZ.toFixed(2)}px) rotateY(${rotYaw.toFixed(3)}deg) rotateZ(${rotRoll.toFixed(3)}deg) scale(${(renderW / boxW).toFixed(5)})`;

      const roundedAlpha = Math.round(1000 * alpha) / 1000;
      if (state.op[i] !== roundedAlpha) {
        state.op[i] = roundedAlpha;
        card.style.opacity = `${roundedAlpha}`;
      }

      // Shading veil & edge glow based on angle
      const darkness = clamp(0.18 * clamp(n / 9) - 0.14 * hov + (isCardOpen ? 0 : 0.4), 0, 1);
      const edgeAlpha = clamp(Math.abs(sinYaw) / yawSin, 0, 1);

      card.style.setProperty('--dark', darkness.toFixed(3));
      card.style.setProperty('--edgeA', edgeAlpha.toFixed(3));

      const lift = Math.round(100 * (o > 0 ? seg(o, 0.1, 0.6) : 0)) / 100;
      if (state.lift[i] !== lift) {
        state.lift[i] = lift;
        card.style.setProperty('--lift', `${lift}`);
      }
    }

    // Raycast hover selection
    if (maxOpen < 0.02 && state.inside && !state.dragging) {
      let hovered = -1;
      let maxDepth = -Infinity;
      for (let i = 0; i < total; i++) {
        if (state.onStage[i] && pointInQuad(state.quads[i], state.px, state.py) && state.depth[i] > maxDepth) {
          maxDepth = state.depth[i];
          hovered = i;
        }
      }
      if (hovered !== state.hoverTarget) {
        state.hoverTarget = hovered;
        moSec.style.cursor = hovered >= 0 ? 'pointer' : '';
      }
    }

    // Update info description
    if (state.opening >= 0) {
      updateSideInfo('open', state.opening);
    } else if (maxOpen > 0.02 && openCardIdx >= 0) {
      updateSideInfo('hover', openCardIdx);
    } else if (state.hoverTarget >= 0) {
      updateSideInfo('hover', state.hoverTarget);
    } else {
      updateSideInfo('idle', -1);
    }
  }

  return {
    mount() {
      if (isRunning) return;
      isRunning = true;
      state.last = 0;
      animationId = requestAnimationFrame(tick);
    },
    unmount() {
      isRunning = false;
      if (animationId) cancelAnimationFrame(animationId);
      closeOpenCard();
    },
    next() {
      if (state.opening < 0) state.posTarget += 1;
    },
    prev() {
      if (state.opening < 0) state.posTarget -= 1;
    }
  };
}
