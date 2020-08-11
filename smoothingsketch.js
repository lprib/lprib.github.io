var SMOOTHING_AMOUNT = 20;
var FADEOUT_COEF = 0.5;
let PIXEL_SIZE = 20;
let MIN_SIZE = 2;
let MAX_SIZE = 5;
var NUM_DOTS = 3;

scene = [];

function setup() {
    createCanvas(600, 600);
    initDots();
    noStroke();
    pixelDensity(1);
}

function draw() {
    updateInputs();

    scene[0].x = mouseX / PIXEL_SIZE;
    scene[0].y = mouseY / PIXEL_SIZE;
    let d = pixelDensity();
    for (let y = 0; y < Math.floor(height / PIXEL_SIZE); y++) {
        for (let x = 0; x < Math.floor(width / PIXEL_SIZE); x++) {
            fill(getColor(x, y));
            rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

function initDots() {
    scene = [];
    for (let i = 0; i < NUM_DOTS; i++) {
        scene.push(new Circle(
            random(0, width / PIXEL_SIZE),
            random(0, height / PIXEL_SIZE),
            random(MIN_SIZE, MAX_SIZE),
            randColor()
        ));
    }
}

class Circle {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    distanceTo(tx, ty) {
        return dist(tx, ty, this.x, this.y) - this.r;
    }

    getColor() {
        return this.c;
    }
}

function getColor(x, y) {
    var min = 1000;
    var col = color("#000000");
    scene.forEach(function (obj) {
        let minResult = smoothMin(min, obj.distanceTo(x, y), col, obj.getColor(), SMOOTHING_AMOUNT);
        min = minResult[0];
        col = minResult[1];
    });

    if (min < 0) {
        return col;
    } else {
        return lerpColor(color("#000000"), col, exp(FADEOUT_COEF * -min));
        // return color("#000000");
    }
}

function smoothMin(a, b, ca, cb, k) {
    let h = constrain(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    let dist = mix(a, b, h) - k * h * (1.0 - h);
    let c = lerpColor(ca, cb, h);
    return [dist, c];
}

function mix(x, y, t) {
    return x * (1 - t) + y * t;
}

function randColor() {
    return color(random(0, 255), random(0, 255), random(0, 255));
}

function keyPressed() {
    initDots();
}

function updateInputs() {
    let smoothSlider = document.getElementById("smoothing-slider");
    SMOOTHING_AMOUNT = parseFloat(smoothSlider.value);

    let fadeoutSlider = document.getElementById("fadeout-slider");
    FADEOUT_COEF = Math.pow(10, parseFloat(fadeoutSlider.value));
}