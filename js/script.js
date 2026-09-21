// ---- Tools & Technologies data ----
const tools = [
  { name: "KiCad",         icon: "assets/icons/kicad.svg" },
  { name: "EasyEDA",       icon: "assets/icons/easyeda.svg" },
  { name: "Proteus",       icon: "assets/icons/proteus.svg" },
  { name: "LTspice",       icon: "assets/icons/ltspice.svg" },
  { name: "Multisim",      icon: "assets/icons/multisim.svg" },
  { name: "Arduino",       icon: "assets/icons/arduino.svg" },
  { name: "Python",        icon: "assets/icons/python.svg" },
  { name: "MATLAB",        icon: "assets/icons/matlab.svg" },
  { name: "VS Code",       icon: "assets/icons/vscode.svg" },
  { name: "Visual Studio", icon: "assets/icons/visualstudio.svg" },
  { name: "PyCharm",       icon: "assets/icons/pycharm.svg" },
  { name: "Wokwi",         icon: "assets/icons/wokwi.svg" },
  { name: "Tinkercad",     icon: "assets/icons/tinkercad.svg" },
  { name: "GitHub",        icon: "assets/icons/github.svg" },
];

function renderTools() {
  const track = document.getElementById("toolsTrack");
  if (!track) return;
  track.innerHTML = tools.map((t, i) => `
    <div class="tool-item">
      <img class="tool-icon" src="${t.icon}" alt="${t.name}"
           width="42" height="42"
           style="animation-delay:${i * 0.18}s"
           onerror="this.style.display='none'">
      <span>${t.name}</span>
    </div>`).join("");
}

function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav    = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTools();
  setupNav();
  setYear();
});