const surpriseBtn = document.getElementById('surprise');
const balloons = document.getElementById('balloons');
const EMOJIS = ['🎈','🎉','🎂','🍰','🥳','💖'];

function spawnBalloon(xPercent){
  const el = document.createElement('div');
  el.className = 'balloon';
  el.style.left = xPercent + '%';
  el.style.animationDuration = (4 + Math.random()*3) + 's';
  el.style.fontSize = (18 + Math.random()*36) + 'px';
  el.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
  balloons.appendChild(el);
  // remove after animation
  setTimeout(()=> el.remove(), 7000);
}

function playChime(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 880;
    g.gain.value = 0.0001;
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    o.start(now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    o.stop(now + 0.85);
  }catch(e){/* audio may be blocked */}
}

function runSurprise(){
  // spawn a burst of balloons
  for(let i=0;i<18;i++){
    setTimeout(()=>spawnBalloon(10 + Math.random()*80), i*80);
  }
  playChime();
  if(surpriseBtn){
    surpriseBtn.disabled = true;
    surpriseBtn.textContent = 'Enjoy!';
  }
}

surpriseBtn.addEventListener('click', runSurprise);

// Auto-run when opened with ?run=1
document.addEventListener('DOMContentLoaded', ()=>{
  try{
    const params = new URLSearchParams(window.location.search);
    if(params.get('run') === '1'){
      // slight delay so CSS/layout settle
      setTimeout(runSurprise, 300);
    }
  }catch(e){/* ignore */}
});
