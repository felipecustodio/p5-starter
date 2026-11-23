import p5 from 'p5';

const defaults = {
  aspect: '16 / 9', background: '#eeeeea', projection: 'perspective', lighting: 'none',
  fpsLimit: 0, pixelDensity: 1, webglVersion: 2, antialias: true, transparent: false,
  depth: true, stencil: true, premultipliedAlpha: true, preserveDrawingBuffer: true, perPixelLighting: true,
  cubeVisible: true, cubeMode: 'wireframe', cubeSize: 100, cubeX: 0, cubeY: 0, cubeZ: 0,
  cubeStroke: 2, cubeColor: '#151515', rotationSpeed: 0.6, rotateX: true, rotateY: true,
  sphereVisible: true, sphereMode: 'solid', sphereRadius: 25, sphereX: 0, sphereY: 0, sphereZ: 0,
  sphereDetailX: 12, sphereDetailY: 8, sphereColor: '#151515',
  cursorVisible: true, cursorShape: 'circle', cursorSize: 50, cursorColor: '#ff743d',
};
type SettingKey = keyof typeof defaults;
type Settings = { [K in SettingKey]: typeof defaults[K] };
type Control = { key: SettingKey; label: string } & (
  | { kind: 'toggle' | 'color' }
  | { kind: 'range'; min: number; max: number; step?: number }
  | { kind: 'select'; options: readonly (readonly [string, string])[] }
);
type Group = { title: string; controls: Control[]; open?: boolean; note?: string };
const groups: Group[] = [
  { title: 'Canvas', open: true, controls: [
    { key: 'aspect', label: 'Proporção', kind: 'select', options: [['16 / 9', '16:9'], ['4 / 3', '4:3'], ['1 / 1', '1:1']] },
    { key: 'background', label: 'Fundo', kind: 'color' },
    { key: 'projection', label: 'Projeção', kind: 'select', options: [['perspective', 'Perspectiva'], ['orthographic', 'Ortográfica']] },
    { key: 'lighting', label: 'Iluminação', kind: 'select', options: [['none', 'Nenhuma'], ['ambient', 'Ambiente'], ['directional', 'Direcional']] },
    { key: 'fpsLimit', label: 'Limite de FPS', kind: 'select', options: [['0', 'Sem limite'], ['30', '30'], ['60', '60'], ['120', '120'], ['240', '240']] },
    { key: 'pixelDensity', label: 'Densidade de pixels', kind: 'select', options: [['1', '1× · rápido'], ['2', '2× · nítido'], ['0', 'Tela · automático']] },
  ] },
  { title: 'Contexto WebGL', note: 'Estas opções recriam o canvas automaticamente.', controls: [
    { key: 'webglVersion', label: 'Versão', kind: 'select', options: [['2', 'WebGL 2'], ['1', 'WebGL 1']] },
    { key: 'antialias', label: 'Antialiasing', kind: 'toggle' },
    { key: 'transparent', label: 'Fundo transparente', kind: 'toggle' },
    { key: 'depth', label: 'Depth buffer', kind: 'toggle' },
    { key: 'stencil', label: 'Stencil buffer', kind: 'toggle' },
    { key: 'premultipliedAlpha', label: 'Alpha pré-multiplicado', kind: 'toggle' },
    { key: 'preserveDrawingBuffer', label: 'Preservar buffer', kind: 'toggle' },
    { key: 'perPixelLighting', label: 'Luz por pixel', kind: 'toggle' },
  ] },
  { title: 'Cubo', open: true, controls: [
    { key: 'cubeVisible', label: 'Exibir', kind: 'toggle' },
    { key: 'cubeMode', label: 'Estilo', kind: 'select', options: [['wireframe', 'Contorno'], ['solid', 'Sólido']] },
    { key: 'cubeSize', label: 'Tamanho', kind: 'range', min: 30, max: 240 },
    { key: 'cubeX', label: 'Posição X', kind: 'range', min: -200, max: 200 },
    { key: 'cubeY', label: 'Posição Y', kind: 'range', min: -200, max: 200 },
    { key: 'cubeZ', label: 'Posição Z', kind: 'range', min: -200, max: 200 },
    { key: 'cubeStroke', label: 'Traço', kind: 'range', min: 1, max: 10, step: 0.5 },
    { key: 'cubeColor', label: 'Cor', kind: 'color' },
    { key: 'rotationSpeed', label: 'Rotação', kind: 'range', min: 0, max: 3, step: 0.1 },
    { key: 'rotateX', label: 'Eixo X', kind: 'toggle' },
    { key: 'rotateY', label: 'Eixo Y', kind: 'toggle' },
  ] },
  { title: 'Esfera', controls: [
    { key: 'sphereVisible', label: 'Exibir', kind: 'toggle' },
    { key: 'sphereMode', label: 'Estilo', kind: 'select', options: [['solid', 'Sólido'], ['wireframe', 'Contorno']] },
    { key: 'sphereRadius', label: 'Raio', kind: 'range', min: 5, max: 100 },
    { key: 'sphereX', label: 'Posição X', kind: 'range', min: -200, max: 200 },
    { key: 'sphereY', label: 'Posição Y', kind: 'range', min: -200, max: 200 },
    { key: 'sphereZ', label: 'Posição Z', kind: 'range', min: -200, max: 200 },
    { key: 'sphereDetailX', label: 'Detalhe horizontal', kind: 'select', options: [['8', '8'], ['12', '12'], ['16', '16'], ['24', '24'], ['32', '32']] },
    { key: 'sphereDetailY', label: 'Detalhe vertical', kind: 'select', options: [['6', '6'], ['8', '8'], ['12', '12'], ['16', '16'], ['24', '24']] },
    { key: 'sphereColor', label: 'Cor', kind: 'color' },
  ] },
  { title: 'Cursor', controls: [
    { key: 'cursorVisible', label: 'Exibir', kind: 'toggle' },
    { key: 'cursorShape', label: 'Forma', kind: 'select', options: [['circle', 'Círculo'], ['square', 'Quadrado']] },
    { key: 'cursorSize', label: 'Tamanho', kind: 'range', min: 5, max: 120 },
    { key: 'cursorColor', label: 'Cor', kind: 'color' },
  ] },
];

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error('Missing sketch element: ' + selector);
  return element;
}
const container = required<HTMLElement>('#sketchContainer');
const fps = required<HTMLOutputElement>('#fps');
const controls = required<HTMLElement>('#controls');
const reset = required<HTMLButtonElement>('#reset');

let settings: Settings = { ...defaults };
let sketch: p5 | undefined;
let ready = false;
let angle = 0;
let frameCount = 0;
let fpsStart = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const contextSettings = new Set<SettingKey>([
  'webglVersion', 'antialias', 'transparent', 'depth', 'stencil',
  'premultipliedAlpha', 'preserveDrawingBuffer', 'perPixelLighting',
]);

function renderControls(): void {
  groups.forEach((group, index) => {
    const details = document.createElement('details');
    details.open = group.open ?? false;
    const summary = document.createElement('summary');
    summary.append(document.createTextNode(group.title));
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    summary.append(number);
    details.append(summary);
    const list = document.createElement('div');
    list.className = 'control-list';
    if (group.note) {
      const note = document.createElement('p');
      note.className = 'group-note';
      note.textContent = group.note;
      list.append(note);
    }
    group.controls.forEach((control) => {
      const label = document.createElement('label');
      label.className = 'control';
      const name = document.createElement('span');
      name.textContent = control.label;
      label.append(name);
      let input: HTMLInputElement | HTMLSelectElement;
      if (control.kind === 'select') {
        input = document.createElement('select');
        for (const [value, text] of control.options) input.add(new Option(text, value));
        input.value = String(settings[control.key]);
      } else {
        input = document.createElement('input');
        input.type = control.kind === 'toggle' ? 'checkbox' : control.kind;
        if (control.kind === 'range') {
          input.min = String(control.min);
          input.max = String(control.max);
          input.step = String(control.step ?? 1);
        }
        if (control.kind === 'toggle') input.checked = Boolean(settings[control.key]);
        else input.value = String(settings[control.key]);
      }
      input.dataset.setting = control.key;
      label.append(input);
      if (control.kind === 'range') {
        const value = document.createElement('output');
        value.textContent = input.value;
        label.append(value);
      }
      list.append(label);
    });
    details.append(list);
    controls.append(details);
  });
}

function applyProjection(p: p5): void {
  if (settings.projection === 'orthographic') p.ortho();
  else p.perspective();
}

function applyMotion(): void {
  if (!sketch || !ready) return;
  if (reducedMotion.matches) {
    sketch.noLoop();
    sketch.redraw();
    fps.textContent = '—';
  } else {
    frameCount = 0;
    fpsStart = performance.now();
    sketch.loop();
  }
}

function mountSketch(): void {
  ready = false;
  sketch?.remove();
  container.replaceChildren();
  fps.textContent = '—';
  frameCount = 0;
  fpsStart = performance.now();
  sketch = new p5((p: p5) => {
    p.setup = async () => {
      await p.createCanvas(container.clientWidth, container.clientHeight, p.WEBGL);
      p.setAttributes({
        version: settings.webglVersion, antialias: settings.antialias, alpha: settings.transparent,
        depth: settings.depth, stencil: settings.stencil, premultipliedAlpha: settings.premultipliedAlpha,
        preserveDrawingBuffer: settings.preserveDrawingBuffer, perPixelLighting: settings.perPixelLighting,
      });
      await (p as p5 & { _renderer: { contextReady: Promise<void> } })._renderer.contextReady;
      p.pixelDensity(settings.pixelDensity || window.devicePixelRatio);
      p.frameRate(settings.fpsLimit || Infinity);
      applyProjection(p);
      ready = true;
      if (reducedMotion.matches) {
        p.noLoop();
        p.redraw();
      }
    };
    p.draw = () => {
      if (settings.transparent) p.clear();
      else p.background(settings.background);
      if (settings.lighting === 'ambient') p.ambientLight(255);
      if (settings.lighting === 'directional') {
        p.ambientLight(80);
        p.directionalLight(255, 255, 255, -0.5, -1, -1);
      }
      if (settings.cursorVisible && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        p.push();
        p.translate(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
        p.noStroke();
        p.fill(settings.cursorColor);
        if (settings.cursorShape === 'square') p.square(0, 0, settings.cursorSize);
        else p.circle(0, 0, settings.cursorSize);
        p.pop();
      }
      if (settings.cubeVisible) {
        p.push();
        p.translate(settings.cubeX, settings.cubeY, settings.cubeZ);
        if (settings.rotateY) p.rotateY(angle);
        if (settings.rotateX) p.rotateX(angle);
        if (settings.cubeMode === 'wireframe') {
          p.noFill();
          p.stroke(settings.cubeColor);
          p.strokeWeight(settings.cubeStroke);
        } else {
          p.noStroke();
          p.fill(settings.cubeColor);
        }
        p.box(settings.cubeSize);
        p.pop();
      }
      if (settings.sphereVisible) {
        p.push();
        p.translate(settings.sphereX, settings.sphereY, settings.sphereZ);
        if (settings.rotateY) p.rotateY(angle);
        if (settings.rotateX) p.rotateX(angle);
        if (settings.sphereMode === 'wireframe') {
          p.noFill();
          p.stroke(settings.sphereColor);
          p.strokeWeight(settings.cubeStroke);
        } else {
          p.noStroke();
          p.fill(settings.sphereColor);
        }
        p.sphere(settings.sphereRadius, settings.sphereDetailX, settings.sphereDetailY);
        p.pop();
      }
      if (!reducedMotion.matches) {
        angle += settings.rotationSpeed * Math.min(p.deltaTime, 50) / 1000;
        frameCount++;
        const now = performance.now();
        if (now - fpsStart >= 1000) {
          fps.textContent = (frameCount * 1000 / (now - fpsStart)).toFixed(1);
          frameCount = 0;
          fpsStart = now;
        }
      }
    };
    p.mouseMoved = () => { if (reducedMotion.matches) p.redraw(); };
  }, container);
}

function updateSetting(key: SettingKey): void {
  if (key === 'aspect') container.style.aspectRatio = settings.aspect;
  if (key === 'transparent') container.classList.toggle('transparent', settings.transparent);
  if (contextSettings.has(key)) {
    mountSketch();
    return;
  }
  if (!sketch || !ready) return;
  if (key === 'pixelDensity') sketch.pixelDensity(settings.pixelDensity || window.devicePixelRatio);
  if (key === 'fpsLimit') sketch.frameRate(settings.fpsLimit || Infinity);
  if (key === 'projection') applyProjection(sketch);
  if (reducedMotion.matches) sketch.redraw();
}

renderControls();
controls.addEventListener('input', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;
  const key = input.dataset.setting as SettingKey | undefined;
  if (!key || !Object.hasOwn(settings, key)) return;
  const value = input instanceof HTMLInputElement && input.type === 'checkbox'
    ? input.checked
    : typeof defaults[key] === 'number' ? Number(input.value) : input.value;
  (settings as Record<SettingKey, string | number | boolean>)[key] = value;
  const output = input.parentElement?.querySelector('output');
  if (output) output.textContent = input.value;
  updateSetting(key);
});
reset.addEventListener('click', () => {
  settings = { ...defaults };
  controls.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-setting]').forEach((input) => {
    const key = input.dataset.setting as SettingKey;
    if (input instanceof HTMLInputElement && input.type === 'checkbox') input.checked = Boolean(settings[key]);
    else input.value = String(settings[key]);
    const output = input.parentElement?.querySelector('output');
    if (output) output.textContent = input.value;
  });
  container.style.aspectRatio = settings.aspect;
  container.classList.remove('transparent');
  angle = 0;
  mountSketch();
});
reducedMotion.addEventListener('change', applyMotion);
new ResizeObserver(() => {
  if (!sketch || !ready || container.clientWidth === 0 || container.clientHeight === 0) return;
  if (sketch.width === container.clientWidth && sketch.height === container.clientHeight) return;
  sketch.resizeCanvas(container.clientWidth, container.clientHeight);
  applyProjection(sketch);
  if (reducedMotion.matches) sketch.redraw();
}).observe(container);
mountSketch();
