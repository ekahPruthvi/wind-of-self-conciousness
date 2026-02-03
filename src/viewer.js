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

const TILE_SIZE = 5;
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 50, size: 5, color: '#00ff00', speed: 1 };
const playerSprite = new Image();
playerSprite.src = '/assets/javascript.svg';
let playerFacing = 1;
let keys = {};

window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function canMoveTo(x, y) {
  const left = x;
  const right = x + player.size;
  const top = y;
  const bottom = y + player.size;

  const corners = [
    { x: left,  y: top },    
    { x: right, y: top },    
    { x: left,  y: bottom }, 
    { x: right, y: bottom }  
  ];

  for (let p of corners) {
    const gridX = Math.floor(p.x / TILE_SIZE);
    const gridY = Math.floor(p.y / TILE_SIZE);

    if (map[gridY] && map[gridY][gridX] === 1) {
        return false;
    }
  }

  return true; 
}

function update() {
  const BASE_SPEED = 1;
  const SPRINT_SPEED = 2;
  
  player.speed = keys['ShiftLeft'] ? SPRINT_SPEED : BASE_SPEED;
  
  let movx = 0;
  let movy = 0;
  
  if (keys['ArrowUp'])    movy = -player.speed;
  if (keys['ArrowDown'])  movy = player.speed;
  if (keys['ArrowLeft'])  movx = -player.speed;
  if (keys['ArrowRight']) movx = player.speed;

  let nextx = player.x + movx;
  if (canMoveTo(nextx, player.y)) {
    player.x = nextx;
  }

  let nexty = player.y + movy;
  if (canMoveTo(player.x, nexty)) {
    player.y = nexty;
  }
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) {
        ctx.fillStyle = '#444';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });

  ctx.save();
  ctx.translate(player.x + player.size / 2, player.y + player.size / 2);
  ctx.scale(playerFacing, 1); 
  
  ctx.drawImage(
    playerSprite, 
    -player.size / 2, 
    -player.size / 2, 
    player.size, 
    player.size
  );
  ctx.restore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();