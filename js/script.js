// ---- Tools & Technologies data ----
// Relative paths (no leading slash) — works on GitHub Pages
// whether the site is served from / or a subpath.
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

  tools.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "tool-item";

    const img = document.createElement("img");
    img.className = "tool-icon";
    img.src = t.icon;
    img.alt = t.name;
    img.width = 42;
    img.height = 42;
    img.style.animationDelay = (i * 0.18) + "s";
    // If an icon is missing, hide it gracefully — no inline JS.
    img.addEventListener("error", () => { img.style.visibility = "hidden"; });

    const label = document.createElement("span");
    label.textContent = t.name;

    item.appendChild(img);
    item.appendChild(label);
    track.appendChild(item);
  });
}

// ---- Mobile nav toggle ----
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav    = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Footer year ----
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTools();
  setupNav();
  setYear();
});