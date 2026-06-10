import './style.css';

// Particle Background Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 10000), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyDOJq7SNRIMDHY8p1R8wbmjjj89-FpP4GE',
    databaseURL: 'https://accension-leaderboard-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const TIER_ORDER = ['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5'];

async function fetchAndRenderRoster() {
  const container = document.getElementById('roster-tiers-container');
  const spinner = document.getElementById('loading-spinner');
  
  try {
    await signInAnonymously(auth);
    const rosterRef = ref(db, 'roster');
    const snapshot = await get(rosterRef);
    const data = snapshot.val();
    
    spinner.style.display = 'none';
    
    if (!data) {
      container.innerHTML = `
        <div class="empty-roster-hud reveal-up visible">
          <div class="hud-scanline"></div>
          <div class="hud-content">
            <h2 class="hud-title">SYSTEM STATUS: EMPTY</h2>
            <p class="hud-desc">The Ascension roster database contains no active members at this time.</p>
            <div class="hud-decor">
              <span>// WAITING FOR DEPLOYMENT</span>
              <span>[ 00 : 00 : 00 ]</span>
            </div>
          </div>
        </div>
      `;
      return;
    }
    
    let htmlContent = '';
    
    TIER_ORDER.forEach(tier => {
      if (data[tier] && Object.keys(data[tier]).length > 0) {
        const members = Object.keys(data[tier]);
        
        let membersHtml = members.map(member => `
          <div class="roster-member-card">
            <span style="text-transform: capitalize;">${member}</span>
          </div>
        `).join('');
        
        htmlContent += `
          <div class="tier-block reveal-up visible">
            <h3 class="tier-title">${tier}'s</h3>
            <div class="tier-grid">
              ${membersHtml}
            </div>
          </div>
        `;
      }
    });
    
    if (htmlContent === '') {
      container.innerHTML = `
        <div class="empty-roster-hud reveal-up visible">
          <div class="hud-scanline"></div>
          <div class="hud-content">
            <h2 class="hud-title">SYSTEM STATUS: EMPTY</h2>
            <p class="hud-desc">The Ascension roster database contains no active members at this time.</p>
            <div class="hud-decor">
              <span>// WAITING FOR DEPLOYMENT</span>
              <span>[ 00 : 00 : 00 ]</span>
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = htmlContent;
    }
    
  } catch (err) {
    console.error(err);
    spinner.innerText = 'Failed to load roster data.';
  }
}

fetchAndRenderRoster();

// Smooth Page Transitions
document.body.insertAdjacentHTML('afterbegin', '<div class="transition-overlay"></div>');

document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Ignore empty, anchor links, and external blank targets
    if (!href || href.startsWith('#') || link.target === '_blank') return;
    
    // Ignore links that aren't on our domain/local files (like absolute URLs to other sites)
    if (href.startsWith('http') && !href.includes(window.location.host)) return;
    
    e.preventDefault();
    document.body.classList.add('fade-out');
    
    setTimeout(() => {
      window.location.href = href;
    }, 380); // Matches the 0.4s wipeIn animation closely
  });
});
