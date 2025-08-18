let font;
let textLayer;

let container;
let w;
let h;
let border;

let angle = 0;

function updateContainer() {
  container = select('#sketchContainer');
  w = parseFloat(getComputedStyle(container.elt).getPropertyValue('width'));
  h = parseFloat(getComputedStyle(container.elt).getPropertyValue('height'));
}

function windowResized() {
  updateContainer();
  resizeCanvas(w, h);
}

function setup() {
  updateContainer();
  canvas = createCanvas(w, h, WEBGL);
  smooth();
  canvas.parent("#sketchContainer");
}

function draw() {
  translate(-width / 2, -height / 2);

  background('#fffff8');

  strokeWeight(1);
  stroke('#222831');
  fill('#222831');

  stroke('#c7b198');
  fill('#c7b198');
  ellipse(mouseX, mouseY, 50, 50);

  // drawings
  push();
  stroke('#c7b198');
  strokeWeight(2);
  translate(width / 2, height / 2);
  noFill();
  rotateY(angle);
  rotateX(angle);
  box(100, 100);

  stroke('#321f28');
  fill('#321f28');
  // noFill();
  sphere(25);

  pop();

  // border
  stroke('#222831');
  noFill();
  strokeWeight(5);
  rectMode("corners");
  rect(0, 0, width, height);
  angle += 0.01;

  document.getElementById("fps").innerHTML = frameRate().toFixed(2);
}

function colorAlpha(aColor, alpha) {
  // allows usage of HEX colors with alpha
  const c = color(aColor);
  let a = alpha;
  if (alpha <= 0.1) {
    a = 0.1;
  }
  return color(`rgba(${[red(c), green(c), blue(c), a].join(', ')})`);
}
