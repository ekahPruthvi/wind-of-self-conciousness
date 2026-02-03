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
const MAP_COLUMNS = Math.floor(300 / TILE_SIZE);
const MAP_ROWS = Math.floor(150 / TILE_SIZE);

function generateMap(cols, rows) {
  let newMap = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    newMap.push(row);
  }
  return newMap;
}


const map = generateMap(MAP_COLUMNS, MAP_ROWS);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 5, 
  y: 5,
  size: 5,
  speed: 1,
  stretchX: 1,
  stretchY: 1,
  animTimer: 0
};

const playerSprite = new Image();
playerSprite.src = '/assets/player.svg';
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
  const isMoving = keys['ArrowLeft'] || keys['ArrowRight'] || keys['ArrowUp'] || keys['ArrowDown'];
  
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

  if (isMoving) {
    player.stretchX = 0.8 + Math.sin(player.animTimer) * 0.1;
    player.stretchY = 1.2 - Math.sin(player.animTimer) * 0.1;
  } else {
    player.stretchX = 1.0 + Math.sin(player.animTimer) * 0.05;
    player.stretchY = 1.0 - Math.sin(player.animTimer) * 0.05;
  }
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) {
        ctx.fillStyle = '#000000ff';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });

  ctx.save();

  ctx.translate(player.x + player.size / 2, player.y + player.size);

  ctx.scale(player.stretchX, player.stretchY);

  if (keys['ArrowLeft']) ctx.scale(-1, 1);

  ctx.drawImage(
    playerSprite, 
    -player.size / 2, 
    -player.size,
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