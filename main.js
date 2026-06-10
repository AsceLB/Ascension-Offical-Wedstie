import './style.css';
import { createIcons, Sword, Shield, Trophy, Play } from 'lucide';

// Initialize Lucide Icons
createIcons({
  icons: {
    Sword,
    Shield,
    Trophy,
    Play
  }
});



// Glowing Orb Tracking
const orb = document.getElementById('glow-orb');
window.addEventListener('mousemove', (e) => {
  orb.style.left = `${e.clientX}px`;
  orb.style.top = `${e.clientY}px`;
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Intersection Observer for Reveal Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-up, .section-header').forEach(element => {
  observer.observe(element);
});

// Particle Background Canvas (Subtle)
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
    this.size = Math.random() * 1.5;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.2 - 0.1;
    this.opacity = Math.random() * 0.3 + 0.1;
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
  const particleCount = Math.min(Math.floor((width * height) / 15000), 80);
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

const ROLE_RANKS = {
  'founder': 1,
  'leader': 2,
  'eu leader': 3,
  'war leader': 4,
  'overseer': 5,
  'officer': 6
};

async function fetchLeadership() {
  const container = document.getElementById('leadership-grid');
  if (!container) return; // Only run on index.html
  
  try {
    await signInAnonymously(auth);
    const leadershipRef = ref(db, 'leadership');
    const snapshot = await get(leadershipRef);
    const data = snapshot.val();
    
    if (!data) {
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%;">No leadership data found.</p>';
      return;
    }
    
    // Convert to array and sort
    const leaders = Object.keys(data).map(name => ({
      name,
      role: data[name].role
    }));
    
    leaders.sort((a, b) => {
      const rankA = ROLE_RANKS[(a.role || '').toLowerCase()] || 99; // Default low rank for unknown roles
      const rankB = ROLE_RANKS[(b.role || '').toLowerCase()] || 99;
      return rankA - rankB;
    });
    
    // Generate HTML
    let html = '';
    leaders.forEach((leader, index) => {
      const initials = leader.name.substring(0, 2).toUpperCase();
      const delay = (index % 3) * 0.1;
      
      html += `
        <div class="leader-card reveal-up visible" style="transition-delay: ${delay}s;">
          <div class="leader-avatar">${initials}</div>
          <div class="leader-info">
            <h4 style="text-transform: capitalize;">${leader.name}</h4>
            <p style="text-transform: capitalize;">${leader.role}</p>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
    
  } catch (err) {
    console.error('Error fetching leadership:', err);
    container.innerHTML = '<p style="color: red; text-align: center; width: 100%;">Failed to load leadership data.</p>';
  }
}

fetchLeadership();

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
