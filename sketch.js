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
  
  // Firefox with privacy settings may not return a proper canvas object
  // Check if canvas and parent method exist before calling
  if (canvas && typeof canvas.parent === 'function') {
    canvas.parent("#sketchContainer");
  } else if (canvas) {
    // Fallback: manually append canvas to container if parent method doesn't exist
    const container = document.getElementById('sketchContainer');
    if (container) {
      container.appendChild(canvas);
    }
  }
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
  return color('rgba(${[red(c), green(c), blue(c), a].join(', ')})');
}
