import p5 from 'p5';

const container = document.querySelector<HTMLElement>('#sketchContainer');
const fps = document.querySelector<HTMLElement>('#fps');

if (!container || !fps) {
  throw new Error('Sketch container or FPS element is missing.');
}

let angle = 0;

new p5((p: p5) => {
  const size = () => {
    const { width, height } = container.getBoundingClientRect();
    return { width, height };
  };

  p.windowResized = () => {
    const { width, height } = size();
    p.resizeCanvas(width, height);
  };

  p.setup = () => {
    const { width, height } = size();
    p.createCanvas(width, height, p.WEBGL);
    p.smooth();
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background('#fffff8');

    p.stroke('#c7b198');
    p.fill('#c7b198');
    p.ellipse(p.mouseX, p.mouseY, 50, 50);

    p.push();
    p.strokeWeight(2);
    p.translate(p.width / 2, p.height / 2);
    p.noFill();
    p.rotateY(angle);
    p.rotateX(angle);
    p.box(100, 100);

    p.stroke('#321f28');
    p.fill('#321f28');
    p.sphere(25);
    p.pop();

    p.stroke('#222831');
    p.noFill();
    p.strokeWeight(5);
    p.rectMode(p.CORNERS);
    p.rect(0, 0, p.width, p.height);

    angle += 0.01;
    fps.textContent = p.frameRate().toFixed(2);
  };
}, container);
