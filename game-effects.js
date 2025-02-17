import anime from './src/index.js';

// Combat Effects
export function createSpellEffect(x, y, radius, color = '#6366f1') {
  // Create spell circle container
  const spellElement = document.createElement('div');
  spellElement.className = 'spell-effect';
  spellElement.style.left = `${x}px`;
  spellElement.style.top = `${y}px`;
  document.body.appendChild(spellElement);

  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'spell-particle';
    particle.style.backgroundColor = color;
    spellElement.appendChild(particle);
  }

  // Animate the spell effect
  anime({
    targets: '.spell-particle',
    translateX: () => anime.random(-radius, radius),
    translateY: () => anime.random(-radius, radius),
    scale: [
      {value: 0, duration: 0},
      {value: 1, duration: 400},
      {value: 0, duration: 400}
    ],
    rotateZ: () => anime.random(0, 360),
    easing: 'easeOutExpo',
    duration: 1000,
    delay: anime.stagger(10),
    complete: () => {
      document.body.removeChild(spellElement);
    }
  });
}

// Damage Number Effect
export function showDamageNumber(value, x, y, isCritical = false, color = '#fff') {
  const damageEl = document.createElement('div');
  damageEl.className = `damage-number ${isCritical ? 'critical' : ''}`;
  damageEl.textContent = value;
  damageEl.style.left = `${x}px`;
  damageEl.style.top = `${y}px`;
  damageEl.style.color = color;
  document.body.appendChild(damageEl);

  anime({
    targets: damageEl,
    translateY: -50,
    opacity: [1, 0],
    scale: isCritical ? [1.5, 1] : [1, 1],
    duration: 800,
    easing: 'easeOutExpo',
    complete: () => {
      document.body.removeChild(damageEl);
    }
  });
}

// Level Up Effect
export function playLevelUpEffect(characterElement, color = '#6366f1') {
  // Create level up container
  const effectContainer = document.createElement('div');
  effectContainer.className = 'level-up-effect';
  characterElement.appendChild(effectContainer);

  // Create particles and rings
  const ring = document.createElement('div');
  ring.className = 'level-up-ring';
  ring.style.borderColor = color;
  effectContainer.appendChild(ring);

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'level-up-particle';
    particle.style.backgroundColor = color;
    effectContainer.appendChild(particle);
  }

  // Animate the level up effect
  const timeline = anime.timeline({
    complete: () => {
      characterElement.remove();
    }
  });

  timeline
    .add({
      targets: '.level-up-ring',
      scale: [0, 1],
      opacity: [1, 0],
      easing: 'easeOutExpo',
      duration: 1000
    })
    .add({
      targets: '.level-up-particle',
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      scale: [1, 0],
      opacity: [1, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(50)
    }, '-=800');
}

// Portal Effect
export function createPortalEffect(x, y, color = '#6366f1') {
  const portalElement = document.createElement('div');
  portalElement.className = 'portal-effect';
  portalElement.style.left = `${x}px`;
  portalElement.style.top = `${y}px`;
  document.body.appendChild(portalElement);

  // Create SVG for portal
  portalElement.innerHTML = `
    <svg viewBox="0 0 100 100">
      <circle class="portal-ring" cx="50" cy="50" r="45" />
      <circle class="portal-ring" cx="50" cy="50" r="35" />
      <circle class="portal-ring" cx="50" cy="50" r="25" />
    </svg>
  `;

  // Set portal color
  const rings = portalElement.querySelectorAll('.portal-ring');
  rings.forEach(ring => {
    ring.style.stroke = color;
  });

  return anime.timeline({
    loop: true
  })
  .add({
    targets: '.portal-ring',
    rotate: '1turn',
    easing: 'linear',
    duration: 3000,
    delay: anime.stagger(200)
  })
  .add({
    targets: '.portal-effect',
    scale: [1, 1.1, 1],
    duration: 2000,
    easing: 'easeInOutSine'
  }, '-=3000');
}

// Add the necessary styles
const styles = document.createElement('style');
styles.textContent = `
  .spell-effect {
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  .spell-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .damage-number {
    position: absolute;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    pointer-events: none;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }

  .damage-number.critical {
    font-size: 2rem;
    font-weight: 800;
  }

  .level-up-effect {
    position: absolute;
    width: 100px;
    height: 100px;
    pointer-events: none;
  }

  .level-up-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid;
    border-radius: 50%;
  }

  .level-up-particle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: 45px;
    top: 45px;
  }

  .portal-effect {
    position: absolute;
    width: 100px;
    height: 100px;
    pointer-events: none;
  }

  .portal-ring {
    fill: none;
    stroke-width: 2;
  }
`;
document.head.appendChild(styles); 