const fs = require('fs');

// 1. Fix style.css
let css = fs.readFileSync('style.css', 'utf8');

// Remove cursor: none
css = css.replace(/cursor:\s*none;\s*\/\* Hide default cursor for custom one \*\//g, '');

// Remove Custom Cursor section
css = css.replace(/\/\* Custom Cursor \*\/(.|\n)*?\/\* Cinematic Noise Overlay \*\//g, '/* Cinematic Noise Overlay */');

// Fix hero-title
const oldHeroTitle = `.hero-title {
  font-family: var(--font-logo);
  font-size: 7vw;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-main);
  position: relative;
  margin: 0;
}

.hero-title::before {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 0%;
  height: 100%;
  color: var(--text-main);
  -webkit-text-stroke: 0px;
  overflow: hidden;
  white-space: nowrap;
  animation: revealText 3s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: 0.5s;
  text-shadow: var(--glow-intense);
}

@keyframes revealText {
  0% { width: 0%; }
  100% { width: 100%; }
}`;

const newHeroTitle = `.hero-title {
  font-family: var(--font-logo);
  font-size: 7vw;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.2;
  color: var(--text-main);
  position: relative;
  margin: 0;
  text-shadow: var(--glow-intense);
  opacity: 0;
  transform: scale(0.9);
  animation: heroTextReveal 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.5s;
}

@keyframes heroTextReveal {
  to { opacity: 1; transform: scale(1); }
}`;

css = css.replace(oldHeroTitle, newHeroTitle);
fs.writeFileSync('style.css', css);

// 2. Fix index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<!-- Custom Cursor -->\r?\n\s*<div class="cursor-dot"><\/div>\r?\n\s*<div class="cursor-outline"><\/div>/g, '');
fs.writeFileSync('index.html', html);

// 3. Fix main.js
let js = fs.readFileSync('main.js', 'utf8');
const cursorJs = `// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  cursorDot.style.left = \`\${posX}px\`;
  cursorDot.style.top = \`\${posY}px\`;
  
  // Subtle delay for outline
  cursorOutline.animate({
    left: \`\${posX}px\`,
    top: \`\${posY}px\`
  }, { duration: 500, fill: "forwards" });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .video-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.classList.remove('hover');
  });
});`;

js = js.replace(cursorJs, '');
fs.writeFileSync('main.js', js);

console.log('Fixed text and cursor');
