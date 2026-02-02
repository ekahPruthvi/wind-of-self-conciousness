const { invoke } = window.__TAURI__.core;

// document.addEventListener('contextmenu', (event) => {
//   event.preventDefault();
// }, false);

// const params = new URLSearchParams(window.location.search);
// const fileName = params.get('file');
// const bgColor = params.get('bg');

// document.getElementById("title").textContent = fileName;

// if (bgColor) {
//     document.getElementById("main-body").style.backgroundColor = bgColor;
// } color changing logic based on savefiles

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 50, size: 2, color: '#00ff00', speed: 1 };
let keys = {};

window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
  if (keys['ArrowUp'])    player.y -= player.speed;
  if (keys['ArrowDown'])  player.y += player.speed;
  if (keys['ArrowLeft'])  player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();