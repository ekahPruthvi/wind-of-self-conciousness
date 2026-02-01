const { invoke } = window.__TAURI__.core;

const screentxt = document.getElementById("sctxt");
const pbtn = document.getElementById("pri_btn");
const inp = document.getElementById("saveinp")

async function greet() {
  const isEmpty = await invoke('is_wind_empty');
  console.log("Is the folder empty?", isEmpty);
  if (isEmpty) {
    pbtn.innerText="Create New";
  } else {
    screentxt.classList.add("hiddden");
    pbtn.innerText="Login";
    pbtn.classList.remove("usable_btn");

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
  if (pbtn.textContent === "Create New") {
    screentxt.classList.add("hiddden")
    inp.classList.remove("hiddden");
    pbtn.textContent = "Login";
  }
});

inp.addEventListener("keydown", (event) =>{
  if (event.key === "Enter") {
    create(inp.value);
    // login page and shi
  }
});


greet()

