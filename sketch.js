/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/// <reference path="./p5/p5.global-mode.d.ts" />

// https://colorhunt.co/palette/117448

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('display', 'block');

  textFont('Computer Modern');
}


function draw() {
  background('#f8b595');
  stroke('#c06c84');
  fill('#c06c84');
  textSize(72);
  text('p5.js Boilerplate', 25, 90);
  stroke('#f67280');
  fill('#f67280');
  ellipse(mouseX, mouseY, 50, 50);
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
