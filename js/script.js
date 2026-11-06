// Tools strip under the hero (scrolls left to right, pauses on hover) and the hero carousel.
const tools = [
  { name: "KiCad", icon: "assets/icons/kicad.svg" }, { name: "EasyEDA", icon: "assets/icons/easyeda.svg" },
  { name: "Proteus", icon: "assets/icons/proteus.svg" }, { name: "LTspice", icon: "assets/icons/ltspice.svg" },
  { name: "Multisim", icon: "assets/icons/multisim.svg" }, { name: "MATLAB", icon: "assets/icons/matlab.svg" },
  { name: "AutoCAD", icon: "assets/icons/autocad.svg" }, { name: "Fusion 360", icon: "assets/icons/fusion360.svg" },
  { name: "Python", icon: "assets/icons/python.svg" }, { name: "C / C++", icon: "assets/icons/cpp-lang.png" },
  { name: "Arduino", icon: "assets/icons/arduino.svg" }, { name: "ESP32", icon: "assets/icons/esp32.jpg" },
  { name: "Raspberry Pi", icon: "assets/icons/raspberry-pi.webp" }, { name: "STM32", icon: "assets/icons/stm32.png" },
  { name: "VS Code", icon: "assets/icons/vscode.svg" }, { name: "Visual Studio", icon: "assets/icons/visualstudio.svg" },
  { name: "PyCharm", icon: "assets/icons/pycharm.svg" }, { name: "Wokwi", icon: "assets/icons/wokwi.svg" },
  { name: "Tinkercad", icon: "assets/icons/tinkercad.svg" }, { name: "ThingSpeak", icon: "assets/icons/thingspeak.png" },
  { name: "Firebase", icon: "assets/icons/firebase.png" }, { name: "GitHub", icon: "assets/icons/github.svg" }
];
function renderTools() {
  const track = document.getElementById('toolsTrack'); if (!track) return;
  // The list is rendered twice so the left-to-right loop is seamless (the second copy is hidden from assistive tech).
  // Scrolling pauses on hover (CSS) and every tool blinks gently, staggered.
  [0, 1].forEach((copy) => {
    const list = document.createElement('div');
    list.className = 'hx-tools__list';
    if (copy === 1) list.setAttribute('aria-hidden', 'true');
    tools.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'hx-tool';
      item.style.animationDelay = (i % 6) * 0.45 + 's';
      const img = document.createElement('img');
      img.src = t.icon; img.alt = ''; img.width = 26; img.height = 26; img.loading = 'lazy';
      img.addEventListener('error', () => { img.hidden = true; });
      const label = document.createElement('span');
      label.textContent = t.name;
      item.append(img, label);
      list.append(item);
    });
    track.append(list);
  });
}

// Hero carousel: slides advance automatically from right to left.
// Dots, arrows, swipe and the keyboard override it; the timer restarts from the slide the visitor picked.
function setupHero() {
  const hero = document.getElementById('hero'); if (!hero) return;
  const dots = [...hero.querySelectorAll('.hx-dot')];
  const count = dots.length; if (count < 2) return;
  const label = document.getElementById('hxLabel');
  const INTERVAL = 6500;
  const panes = (i) => [...hero.querySelectorAll('.hx-pane[data-slide="' + i + '"]')];
  let current = 0, timer = null, paused = false;

  function go(to, dir) {
    to = ((to % count) + count) % count;
    if (to === current) return;
    if (dir === undefined) dir = to > current ? 1 : -1;
    const leaving = panes(current), entering = panes(to);
    // Place the incoming slide off-screen (right when moving forward, left when moving back) without animating.
    entering.forEach((p) => {
      p.classList.add('no-anim');
      p.classList.remove('is-active', 'is-left');
      if (dir < 0) p.classList.add('is-left');
    });
    void hero.offsetWidth; // flush styles so the jump is not animated
    entering.forEach((p) => {
      p.classList.remove('no-anim', 'is-left');
      p.classList.add('is-active');
      p.removeAttribute('aria-hidden');
    });
    leaving.forEach((p) => {
      p.classList.remove('is-active');
      if (dir > 0) p.classList.add('is-left'); // forward: exits to the left
      p.setAttribute('aria-hidden', 'true');
    });
    // Only the visible image carries alt text.
    hero.querySelectorAll('.hx-slide-img img').forEach((img) => {
      const on = img.closest('.hx-pane').classList.contains('is-active');
      if (!img.dataset.alt) img.dataset.alt = img.getAttribute('alt') || '';
      img.setAttribute('alt', on ? img.dataset.alt : '');
    });
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === to);
      if (i === to) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    if (label) label.textContent = dots[to].getAttribute('aria-label');
    current = to;
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (paused) return;
    timer = setTimeout(() => go(current + 1, 1), INTERVAL);
  }

  // Start state: slide 0 is active; the others wait on the right and are hidden from assistive tech.
  hero.querySelectorAll('.hx-pane').forEach((p) => {
    if (p.dataset.slide !== '0') p.setAttribute('aria-hidden', 'true');
  });
  hero.querySelectorAll('.hx-slide-img img').forEach((img) => { img.dataset.alt = img.getAttribute('alt') || ''; if (img.closest('.hx-pane').dataset.slide !== '0') img.setAttribute('alt', ''); });

  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  hero.querySelectorAll('.hx-arrow').forEach((b) => b.addEventListener('click', () => {
    const dir = Number(b.dataset.dir);
    go(current + dir, dir);
  }));
  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(current + 1, 1);
    if (e.key === 'ArrowLeft') go(current - 1, -1);
  });
  // Only a real mouse hover pauses; touch and clicks never leave the carousel stuck.
  hero.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { paused = true; clearTimeout(timer); } });
  hero.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { paused = false; schedule(); } });
  let touchX = null;
  hero.addEventListener('touchstart', (e) => { touchX = e.touches[0] ? e.touches[0].clientX : null; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = (e.changedTouches[0] ? e.changedTouches[0].clientX : touchX) - touchX; touchX = null;
    if (Math.abs(dx) > 48) go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });
  schedule();
}
function setupNav(){const toggle=document.getElementById('navToggle'),nav=document.getElementById('nav');if(!toggle||!nav)return;toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
function setYear(){document.querySelectorAll('#year').forEach(y=>y.textContent=new Date().getFullYear());}
document.addEventListener('DOMContentLoaded',()=>{renderTools();setupHero();setupNav();setYear();});
