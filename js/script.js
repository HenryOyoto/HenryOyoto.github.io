// ---- Tools & Technologies data ----
// Uses the SVG files you already have in assets/icons/
const tools = [
  { name: "KiCad", icon: "assets/icons/kicad.svg" },
  { name: "EasyEDA", icon: "assets/icons/easyeda.svg" },
  { name: "Proteus", icon: "assets/icons/proteus.svg" },
  { name: "LTspice", icon: "assets/icons/ltspice.svg" },
  { name: "Multisim", icon: "assets/icons/multisim.svg" },
  { name: "Arduino", icon: "assets/icons/arduino.svg" },
  { name: "Python", icon: "assets/icons/python.svg" },
  { name: "MATLAB", icon: "assets/icons/matlab.svg" },
  { name: "VS Code", icon: "assets/icons/vscode.svg" },
  { name: "Visual Studio", icon: "assets/icons/visualstudio.svg" },
  { name: "PyCharm", icon: "assets/icons/pycharm.svg" },
  { name: "Wokwi", icon: "assets/icons/wokwi.svg" },
  { name: "Tinkercad", icon: "assets/icons/tinkercad.svg" },
  { name: "GitHub", icon: "assets/icons/github.svg" },
];

function renderTools() {
  const track = document.getElementById("toolsTrack");
  if (!track) return;

  track.innerHTML = tools
    .map(
      (t, i) => `
      <div class="tool-item">
        <img
          class="tool-icon"
          src="${t.icon}"
          alt="${t.name}"
          width="40"
          height="40"
          style="animation-delay:${i * 0.18}s"
          onerror="this.style.display='none'"
        />
        <span>${t.name}</span>
      </div>`,
    )
    .join("");
}

// ---- Mobile nav toggle ----
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Footer year ----
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTools();
  setupNav();
  setYear();
});
