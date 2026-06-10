const fs = require('fs');

// 1. Edit index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add Leaderboard button
html = html.replace(
    /<div class="hero-actions">\s*<a href="#about" class="btn">\s*<span style="padding-left: 0.1em;">DISCOVER<\/span>\s*<\/a>\s*<\/div>/,
    `<div class="hero-actions">
          <a href="#about" class="btn">
            <span style="padding-left: 0.1em;">DISCOVER</span>
          </a>
          <a href="https://ascension-leaderboard.vercel.app/" target="_blank" class="btn btn-outline">
            <span>LEADERBOARD</span>
          </a>
        </div>`
);

// Add Leadership Section before Media Section
const leadershipSection = `
    <!-- Leadership Section -->
    <section id="roster" class="section container">
      <div class="section-header reveal-up">
        <h2 data-text="LEADERSHIP & HIGHER-UPS">LEADERSHIP & HIGHER-UPS</h2>
        <div class="header-line"></div>
      </div>
      <div class="leadership-grid">
        <div class="leader-card reveal-up">
          <div class="leader-avatar">LI</div>
          <div class="leader-info">
            <h4>Limdex</h4>
            <p>Founder / Owner</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.1s;">
          <div class="leader-avatar">IN</div>
          <div class="leader-info">
            <h4>InfamousMaster</h4>
            <p>Leader</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.2s;">
          <div class="leader-avatar">EK</div>
          <div class="leader-info">
            <h4>Ekam</h4>
            <p>Head</p>
          </div>
        </div>
        <div class="leader-card reveal-up">
          <div class="leader-avatar">LI</div>
          <div class="leader-info">
            <h4>limmeee</h4>
            <p>Ascended Officer</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.1s;">
          <div class="leader-avatar">JO</div>
          <div class="leader-info">
            <h4>Jon Snow</h4>
            <p>Ascended Officer</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.2s;">
          <div class="leader-avatar">AD</div>
          <div class="leader-info">
            <h4>ADi</h4>
            <p>Officer</p>
          </div>
        </div>
        <div class="leader-card reveal-up">
          <div class="leader-avatar">JE</div>
          <div class="leader-info">
            <h4>Jesh</h4>
            <p>Officer</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.1s;">
          <div class="leader-avatar">RR</div>
          <div class="leader-info">
            <h4>rrxy</h4>
            <p>Strategy</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.2s;">
          <div class="leader-avatar">BR</div>
          <div class="leader-info">
            <h4>Broken</h4>
            <p>War Manager</p>
          </div>
        </div>
        <div class="leader-card reveal-up">
          <div class="leader-avatar">AU</div>
          <div class="leader-info">
            <h4>AU_RA</h4>
            <p>War Manager</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.1s;">
          <div class="leader-avatar">GE</div>
          <div class="leader-info">
            <h4>Gendmaker</h4>
            <p>War Manager</p>
          </div>
        </div>
        <div class="leader-card reveal-up" style="transition-delay: 0.2s;">
          <div class="leader-avatar">TR</div>
          <div class="leader-info">
            <h4>Treasury</h4>
            <p>Finance</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Media / Showcase Section -->`;

html = html.replace('<!-- Media / Showcase Section -->', leadershipSection);
fs.writeFileSync('index.html', html);

// 2. Edit style.css
let css = fs.readFileSync('style.css', 'utf8');

const leadershipCSS = `
/* Leadership Grid */
.leadership-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.leader-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--bg-card);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.leader-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.leader-card:hover {
  transform: translateX(10px);
  border-color: var(--border-strong);
  background: rgba(255, 255, 255, 0.04);
}

.leader-card:hover::before {
  opacity: 1;
}

.leader-avatar {
  width: 64px;
  height: 64px;
  background: var(--text-main);
  color: var(--bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  box-shadow: var(--glow-core);
  transition: transform 0.3s ease;
}

.leader-card:hover .leader-avatar {
  transform: scale(1.05) rotate(5deg);
}

.leader-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.leader-info h4 {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-main);
  text-transform: none;
}

.leader-info p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Media Grid */`;

css = css.replace('/* Media Grid */', leadershipCSS);
fs.writeFileSync('style.css', css);

console.log('Added leadership section and leaderboard button');
