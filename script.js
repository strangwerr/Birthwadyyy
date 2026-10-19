const screens = [...document.querySelectorAll('.screen')];
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const toast = document.getElementById('toast');
let cakeTaps = 0;
let toastTimer;

function showScreen(id) {
  const target = document.getElementById(id);
  if (!target) return;
  screens.forEach(screen => screen.classList.toggle('active', screen === target));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function say(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}
document.getElementById('beginBtn').addEventListener('click', () => showScreen('cakeScreen'));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.back)));
document.querySelectorAll('[data-gift]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.gift)));

// A tiny synthesized meow, so the cat works without an extra sound asset.
function meow() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) { say('meow ♡'); return; }
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(930, now + .12);
  osc.frequency.exponentialRampToValueAtTime(390, now + .38);
  osc.frequency.exponentialRampToValueAtTime(270, now + .55);
  gain.gain.setValueAtTime(.001, now);
  gain.gain.exponentialRampToValueAtTime(.18, now + .04);
  gain.gain.exponentialRampToValueAtTime(.001, now + .58);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(now); osc.stop(now + .6);
  osc.addEventListener('ended', () => ctx.close());
}
document.getElementById('catButton').addEventListener('click', () => {
  meow();
  const cat = document.querySelector('.cat-svg');
  cat.animate([{transform:'scale(1)'},{transform:'scale(1.08) rotate(-4deg)'},{transform:'scale(1)'}], {duration:320});
});

document.getElementById('cakeButton').addEventListener('click', () => {
  if (cakeTaps >= 3) return;
  cakeTaps++;
  document.getElementById('cakeHint').textContent = cakeTaps < 3 ? `tap the cake · ${cakeTaps} / 3` : 'wish made. cake cut. ♡';
  if (cakeTaps === 1) document.getElementById('flame').style.opacity = '.45';
  if (cakeTaps === 2) document.getElementById('flame').style.opacity = '.15';
  if (cakeTaps === 3) {
    document.getElementById('cakeButton').classList.add('cut');
    document.getElementById('flame').style.opacity = '0';
    document.getElementById('toGiftsBtn').classList.remove('hidden');
    say('make a wish, swara ✨');
  }
});
document.getElementById('toGiftsBtn').addEventListener('click', () => showScreen('giftScreen'));

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.innerHTML = '♫ <span>music on</span>';
    } catch (error) {
      say('Add assets/until-i-found-you.mp3 to enable the music.');
    }
  } else {
    music.pause();
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.innerHTML = '♫ <span>music off</span>';
  }
});

// The image is intentionally a placeholder until you add your own photo.
const memoryPhoto = document.getElementById('memoryPhoto');
memoryPhoto.addEventListener('load', () => {
  memoryPhoto.hidden = false;
  memoryPhoto.parentElement.classList.add('has-photo');
});
memoryPhoto.addEventListener('error', () => { memoryPhoto.hidden = true; });
