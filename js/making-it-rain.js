"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d") //video used 2D
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 400); // to make a circle
let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // to make it linear
gradient.addColorStop(0.5, 'red');
// gradient.addColorStop(0.5, 'purple');
// gradient.addColorStop(0.3, 'red');
// gradient.addColorStop(0.4, 'purple');
// gradient.addColorStop(0.5, 'red');
// gradient.addColorStop(0.6, 'purple');
// gradient.addColorStop(0.7, 'red');
// gradient.addColorStop(0.8, 'purple');
// gradient.addColorStop(0.9, 'darkred');

class symbolObject {
    constructor (x, y, fontSize, canvasHeight) {
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ 😑"
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    draw (context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x *this.fontSize, this.y *this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor (canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontsize = 25;
        this.columns = this.canvasWidth/this.fontsize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize () {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new symbolObject(i, 0, this.fontsize, this.canvasHeight);
        }
    }
    resize (width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontsize;
        this.symbols = [];
        this.#initialize();
    }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate (timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient//"hotpink"
        ctx.font = effect.fontsize + "px monospace";
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
});