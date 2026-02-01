const { invoke } = window.__TAURI__.core;

const screentxt = document.getElementById("sctxt");
const pbtn = document.getElementById("pri_btn");
const inp = document.getElementById("saveinp");
const ryt = document.getElementById("nav_r");
const lft = document.getElementById("nav_l");
const container = document.getElementById("saves");

async function greet() {
  const isEmpty = await invoke('is_wind_empty');
  console.log("Is the folder empty?", isEmpty);
  if (isEmpty) {
    pbtn.innerText="Create New";
  } else {
    screentxt.classList.add("hiddden");
    pbtn.innerText="Create New";
    ryt.classList.add("usable_btn");
    lft.classList.add("usable_btn");
    initSaveViewer();
  }
}

async function create(name) {
  try {
    await invoke('create_save_file', { name });
    console.log("Save created!");
  } catch (err) {
    console.error("Rust threw an error:", err);
  }
}

pbtn.addEventListener("click", () => {
  if (pbtn.textContent === "Create New"){
    screentxt.classList.add("hiddden")
    inp.classList.remove("hiddden");
    pbtn.textContent = "back";
    container.classList.add("hiddden");
    ryt.classList.remove("usable_btn");
    lft.classList.remove("usable_btn");
  } else {
    container.classList.remove("hiddden");
    inp.classList.add("hiddden");
    pbtn.textContent = "Create New";
    ryt.classList.add("usable_btn");
    lft.classList.add("usable_btn");
  }
});

inp.addEventListener("keydown", (event) =>{
  if (event.key === "Enter") {
    create(inp.value);
    container.classList.remove("hiddden");
    inp.classList.add("hiddden");
    pbtn.textContent = "Create New";
    ryt.classList.add("usable_btn");
    lft.classList.add("usable_btn");
  }
});

let saveFiles = [];
let currentIndex = 0;

async function initSaveViewer() {
  try {
    saveFiles = await invoke('get_save_files');
    
    if (saveFiles.length > 0) {
      updateDisplay();
    } else {
      document.getElementById("saves").textContent = "No Saves Found";
    }
  } catch (err) {
    console.error(err);
  }
}

function updateDisplay() {
  container.classList.remove("hiddden");
  container.innerHTML = "";

  const fileName = saveFiles[currentIndex];

  const saveDiv = document.createElement("div");
  saveDiv.className = "save-item";

  const nameText = document.createElement("div");
  nameText.className = "file-name";
  nameText.textContent = fileName;

  // saveDiv.appendChild(icon);
  saveDiv.appendChild(nameText);
  container.appendChild(saveDiv);
}

ryt.addEventListener("click", () => {
  if (currentIndex < saveFiles.length - 1 && ryt.classList.contains("usable_btn")) {
    currentIndex++;
    updateDisplay();
  }
})

lft.addEventListener("click", () => {
  if (currentIndex > 0 && lft.classList.contains("usable_btn") ) {
    currentIndex--;
    updateDisplay();
  }
})


greet()

