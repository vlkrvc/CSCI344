let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function setup () {
    createCanvas(canvasWidth, canvasHeight);

    draw5Circles ();
    draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);


}


function draw5CirclesWhile() {
    noFill();
    let count = 0;
    let x = 100;
    let y = 200;
    let diameter = 50;
    let yOffset = 50;

    while (count < 5) {
        circle(x, y + count * yOffset, diameter); 
        count++;
    }
}

function draw5CirclesFor() {
    noFill();
    let x = 150;
    let y = 200;
    let diameter = 50;
    let yOffset = 50;

    for (let i = 0; i < 5; i++) {
        circle(x, y + i * yOffset, diameter);
    }
}

function drawNCircles(n) {
    noFill();
    let x = 200;
    let y = 200;
    let diameter = 50;
    let yOffset = 50;

    for (let i = 0; i < n; i++) {
        circle(x, y + 1 * yOffset, diameter);

    }
}


function drawNCirclesFlexible(n, size, x, y) {
    noFill();
    let yOffset = size + 10;

    for (let i = 0; i < n; i++) {
        circle(x, y + 1 * yOffset, size);
    }
}


function drawNShapesFlexible(n, size, x, y, shape) {
    let yOffset = size + 10; 

    for (let i = 0; i < n; i++) {
        if (shape === "circle") {
            circle(x, y + i * yOffset, size);
        } else {
            square(x - size / 2, y + i * yOffset - size / 2, size);
        }
    }
}


function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
    let offset = size + 10; 

    for (let i = 0; i < n; i++) {
        if (shape === "circle") {
            if (direction === "row") {
                circle(x + i * offset, y, size);
            } else {
                circle(x, y + i * offset, size);
            }
        } else {
            if (direction === "row") {
                square(x + i * offset - size / 2, y - size / 2, size);
            } else {
                square(x - size / 2, y + i * offset - size / 2, size);
            }
        }
    }
}

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    draw5CirclesFor(); 
    drawNCircles(20); 
    drawNCirclesFlexible(30, 25, 400, 0);
    drawNShapesFlexible(10, 40, 500, 100, "square"); 
    drawNShapesDirectionFlexible(10, 30, 600, 200, "circle", "row"); 

    drawGrid(canvasWidth, canvasHeight);
}
