// Technology carousel: automatic motion with manual pause and navigation override.
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
 const track=document.getElementById('toolsTrack'); if(!track) return;
 // Two sets create a seamless, accessible marquee; controls can pause it or scroll manually.
 [...tools,...tools].forEach((t,i)=>{const item=document.createElement('div');item.className='tool-item';item.setAttribute('aria-label',t.name);
 const img=document.createElement('img');img.className='tool-icon';img.src=t.icon;img.alt='';img.width=42;img.height=42;img.loading='lazy';img.addEventListener('error',()=>{img.hidden=true;});
 const label=document.createElement('span');label.textContent=t.name;item.append(img,label);track.append(item);});
 const wrap=track.parentElement, pause=document.getElementById('toolsPause'); let paused=false;
 const setPaused=(value)=>{paused=value;wrap.classList.toggle('is-paused',paused);if(pause){pause.textContent=paused?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused));}};
 pause?.addEventListener('click',()=>setPaused(!paused));
 document.getElementById('toolsPrev')?.addEventListener('click',()=>{setPaused(true);wrap.scrollBy({left:-260,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
 document.getElementById('toolsNext')?.addEventListener('click',()=>{setPaused(true);wrap.scrollBy({left:260,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
 wrap.addEventListener('mouseenter',()=>wrap.classList.add('user-paused'));wrap.addEventListener('mouseleave',()=>wrap.classList.remove('user-paused'));
}
function setupNav(){const toggle=document.getElementById('navToggle'),nav=document.getElementById('nav');if(!toggle||!nav)return;toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
function setYear(){document.querySelectorAll('#year').forEach(y=>y.textContent=new Date().getFullYear());}
document.addEventListener('DOMContentLoaded',()=>{renderTools();setupNav();setYear();});
