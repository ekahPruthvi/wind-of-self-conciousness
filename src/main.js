const { invoke } = window.__TAURI__.core;
import { open } from '@tauri-apps/plugin-opener';


async function greet() {
  const isEmpty = await invoke('is_wind_empty');
  console.log("Is the folder empty?", isEmpty);
  if (isEmpty) {
    const screen = document.getElementById("screen");
    const pbtn = document.getElementById("pri_btn");
    screen.innerHTML="No Save FIles found";
    pbtn.innerText="Create New";
  }
}

function primary_btn_action() {
  
}


greet()

