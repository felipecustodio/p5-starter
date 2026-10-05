import p5 from 'p5';

const container = document.querySelector<HTMLElement>('#sketchContainer');
const fps = document.querySelector<HTMLElement>('#fps');

if (!container || !fps) {
  throw new Error('Sketch container or FPS element is missing.');
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let angle = 0;
let nextFpsUpdate = 0;

new p5((p: p5) => {
  const size = () => {
    return { width: container.clientWidth, height: container.clientHeight };
  };

  p.windowResized = () => {
    const { width, height } = size();
    p.resizeCanvas(width, height);
  };

  p.setup = () => {
    const { width, height } = size();
    p.pixelDensity(1);
    p.setAttributes('antialias', false);
    p.createCanvas(width, height, p.WEBGL);

    const syncMotion = () => {
      if (reducedMotion.matches) {
        p.noLoop();
        p.redraw();
        fps.textContent = '—';
      } else {
        p.loop();
      }
    };

    reducedMotion.addEventListener('change', syncMotion);
    syncMotion();
  };

  p.draw = () => {
    p.background('#eeeeea');

    p.push();
    p.translate(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
    p.noStroke();
    p.fill('#ff743d');
    p.circle(0, 0, 50);
    p.pop();

    p.push();
    p.stroke('#151515');
    p.strokeWeight(2);
    p.noFill();
    p.rotateY(angle);
    p.rotateX(angle);
    p.box(100, 100);

    p.noStroke();
    p.fill('#151515');
    p.sphere(25, 12, 8);
    p.pop();

    if (!reducedMotion.matches) {
      angle += 0.6 * Math.min(p.deltaTime, 50) / 1000;
      if (p.millis() >= nextFpsUpdate) {
        fps.textContent = p.frameRate().toFixed(1);
        nextFpsUpdate = p.millis() + 1000;
      }
    }
  };

  p.mouseMoved = () => {
    if (reducedMotion.matches) p.redraw();
  };
}, container);
