const { invoke } = window.__TAURI__.core;

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
}, false);

const params = new URLSearchParams(window.location.search);
const fileName = params.get('file');
const bgColor = params.get('bg');

document.getElementById("title").textContent = fileName;

if (bgColor) {
    document.getElementById("main-body").style.backgroundColor = bgColor;
}