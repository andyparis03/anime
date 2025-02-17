import anime from './index.js';

// Stagger Animation
export function createStaggerAnimation(grid = [32, 16]) {
  const numberOfElements = grid[0] * grid[1];
  const index = anime.random(0, numberOfElements-1);
  const nextIndex = anime.random(0, numberOfElements-1);
  
  const saturation = 75;
  const colorStart = anime.random(0, 256);
  const colorEnd = anime.random(0, 256);
  const colorRangeValue = [colorStart, colorEnd];
  const luminosityStart = anime.random(60, 80);
  const luminosityEnd = anime.random(20, 40);
  const luminosityRangeValue = [luminosityStart, luminosityEnd];

  function staggeredGridColors(el, i, total) {
    const hue = Math.round(anime.stagger(colorRangeValue, {grid: grid, from: index})(el, i, total));
    const luminosity = Math.round(anime.stagger(luminosityRangeValue, {grid: grid, from: index})(el, i, total));
    return 'hsl(' + hue + ', ' + saturation + '%, ' + luminosity + '%)';
  }

  return anime({
    targets: '.stagger-visualizer .dot',
    keyframes: [
      {
        zIndex: function(el, i, total) {
          return Math.round(anime.stagger([numberOfElements, 0], {grid: grid, from: index})(el, i, total));
        },
        translateX: anime.stagger('-.001rem', {grid: grid, from: index, axis: 'x'}),
        translateY: anime.stagger('-.001rem', {grid: grid, from: index, axis: 'y'}),
        duration: 200
      }, {
        translateX: anime.stagger('.075rem', {grid: grid, from: index, axis: 'x'}),
        translateY: anime.stagger('.075rem', {grid: grid, from: index, axis: 'y'}),
        scale: anime.stagger([2, .2], {grid: grid, from: index}),
        backgroundColor: staggeredGridColors,
        duration: 450
      }, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 500,
      }
    ],
    delay: anime.stagger(60, {grid: grid, from: index}),
    easing: 'easeInOutQuad',
    loop: true
  });
}

// Logo Animation
export function createLogoAnimation(text) {
  // Clear previous content
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `<div class="logo-text">${text}</div>`;
  
  return anime({
    targets: '.logo-text',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: anime.stagger(100, {from: 'center'}),
    loop: true
  });
}

// Text Animation
export function createTextAnimation(text) {
  // Split text into spans
  const previewArea = document.querySelector('.preview-area');
  const spans = text.split('').map(char => `<span class="char">${char}</span>`).join('');
  previewArea.innerHTML = `<div class="animated-text">${spans}</div>`;
  
  return anime({
    targets: '.char',
    translateY: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1500,
    delay: anime.stagger(100),
    loop: true
  });
}

// New example animations
export function createTimelineAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="timeline-demo">
      <div class="square"></div>
      <div class="circle"></div>
      <div class="triangle"></div>
    </div>
  `;
  
  return anime.timeline({
    loop: true
  })
  .add({
    targets: '.square',
    translateX: 250,
    duration: 1000,
    easing: 'easeInOutQuad'
  })
  .add({
    targets: '.circle',
    translateX: 250,
    duration: 1000,
    easing: 'easeInOutCirc'
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    duration: 1000,
    easing: 'easeInOutExpo'
  });
}

export function createSVGPathAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <svg class="svg-path-demo" width="300" height="300" viewBox="0 0 300 300">
      <path class="path" fill="none" stroke="currentColor" stroke-width="3"
        d="M66,1 C66,1 91,0 116,0 C141,0 166,0 191,0 C216,0 241,1 241,1 C241,1 240,26 240,51 C240,76 240,101 240,126 C240,151 241,176 241,176 C241,176 216,175 191,175 C166,175 141,175 116,175 C91,175 66,176 66,176 C66,176 67,151 67,126 C67,101 67,76 67,51 C67,26 66,1 66,1 Z"/>
    </svg>
  `;
  
  return anime({
    targets: '.path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
}

export function createStaggerGridDemo() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="stagger-grid">
      ${Array(25).fill().map(() => '<div class="grid-item"></div>').join('')}
    </div>
  `;
  
  return anime({
    targets: '.grid-item',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(200, {grid: [5, 5], from: 'center'}),
    loop: true
  });
}

export function createKeyframesAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `<div class="keyframes-ball"></div>`;
  
  return anime({
    targets: '.keyframes-ball',
    keyframes: [
      {translateY: -100},
      {translateX: 100},
      {translateY: 100},
      {translateX: 0},
      {translateY: 0}
    ],
    duration: 4000,
    easing: 'easeOutElastic(1, .8)',
    loop: true
  });
}

// Modify the initializeAnimation function to include new animations
export function initializeAnimation(type, text = '') {
  let currentAnimation;
  
  // First remove any existing animation-specific styles
  const existingStyles = document.getElementById('animation-styles');
  if (existingStyles) {
    existingStyles.remove();
  }
  
  switch(type) {
    case 'stagger':
      // Reset preview area for stagger animation
      const previewArea = document.querySelector('.preview-area');
      previewArea.innerHTML = `
        <div class="stagger-visualizer">
          <div class="dots-wrapper"></div>
        </div>
      `;
      
      // Create dots
      const dotsWrapperEl = document.querySelector('.dots-wrapper');
      const dotsFragment = document.createDocumentFragment();
      const grid = [32, 16];
      const numberOfElements = grid[0] * grid[1];
      
      for (let i = 0; i < numberOfElements; i++) {
        const dotEl = document.createElement('div');
        dotEl.classList.add('dot');
        dotsFragment.appendChild(dotEl);
      }
      
      dotsWrapperEl.appendChild(dotsFragment);
      currentAnimation = createStaggerAnimation();
      break;
      
    case 'logo':
      currentAnimation = createLogoAnimation(text);
      break;
      
    case 'text':
      currentAnimation = createTextAnimation(text);
      break;
      
    case 'timeline':
      // Add specific styles for timeline demo
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .timeline-demo { position: relative; height: 200px; }
          .square, .circle, .triangle {
            position: absolute;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
          }
          .square { top: 0; }
          .circle { top: 75px; border-radius: 50%; }
          .triangle {
            top: 150px;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }
        </style>
      `);
      currentAnimation = createTimelineAnimation();
      break;
      
    case 'svg-path':
      currentAnimation = createSVGPathAnimation();
      break;
      
    case 'stagger-grid':
      // Add specific styles for stagger grid
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .stagger-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            width: 250px;
            height: 250px;
          }
          .grid-item {
            background: var(--primary-color);
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        </style>
      `);
      currentAnimation = createStaggerGridDemo();
      break;
      
    case 'keyframes':
      // Add specific styles for keyframes
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .keyframes-ball {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            border-radius: 50%;
          }
        </style>
      `);
      currentAnimation = createKeyframesAnimation();
      break;
      
    case 'advanced-stagger':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .advanced-stagger {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 4px;
            width: 300px;
            height: 300px;
          }
          .stagger-dot {
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            border-radius: 50%;
          }
        </style>
      `);
      currentAnimation = createAdvancedStaggerAnimation();
      break;
      
    case 'layered':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .layered-animation {
            position: relative;
            height: 200px;
          }
          .layer-1, .layer-2, .layer-3 {
            position: absolute;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            opacity: 0.8;
          }
          .layer-1 { top: 0; }
          .layer-2 { top: 75px; border-radius: 25%; }
          .layer-3 { top: 150px; border-radius: 50%; }
        </style>
      `);
      currentAnimation = createLayeredAnimation();
      break;
      
    case 'transforms':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .transform-element {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
          }
        </style>
      `);
      currentAnimation = createTransformDemo();
      break;
      
    case 'easing':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .easing-visualizer {
            height: 200px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .ball {
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
          }
        </style>
      `);
      currentAnimation = createEasingVisualizer();
      break;
      
    case 'colors':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .color-element {
            width: 100px;
            height: 100px;
            border-radius: 8px;
          }
        </style>
      `);
      currentAnimation = createColorAnimation();
      break;
      
    case 'scroll':
      document.head.insertAdjacentHTML('beforeend', `
        <style id="animation-styles">
          .scroll-demo {
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .scroll-element {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            border-radius: 4px;
          }
        </style>
      `);
      currentAnimation = createScrollAnimation();
      break;
  }
  
  return currentAnimation;
}

export function createAdvancedStaggerAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="advanced-stagger">
      ${Array(100).fill().map(() => '<div class="stagger-dot"></div>').join('')}
    </div>
  `;
  
  return anime({
    targets: '.stagger-dot',
    translateX: anime.stagger(10, {grid: [10, 10], from: 'center', axis: 'x'}),
    translateY: anime.stagger(10, {grid: [10, 10], from: 'center', axis: 'y'}),
    rotateZ: anime.stagger([0, 90], {grid: [10, 10], from: 'center', axis: 'x'}),
    delay: anime.stagger(200, {grid: [10, 10], from: 'center'}),
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
}

export function createLayeredAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="layered-animation">
      <div class="layer-1"></div>
      <div class="layer-2"></div>
      <div class="layer-3"></div>
    </div>
  `;
  
  return anime.timeline({
    loop: true
  })
  .add({
    targets: '.layer-1',
    translateX: 250,
    rotate: 360,
    duration: 1200
  })
  .add({
    targets: '.layer-2',
    translateX: 250,
    rotate: 360,
    duration: 1200,
    scale: 2
  }, '-=1000')
  .add({
    targets: '.layer-3',
    translateX: 250,
    rotate: 360,
    duration: 1200,
    scale: 0.5
  }, '-=1000');
}

export function createTransformDemo() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `<div class="transform-element"></div>`;
  
  return anime({
    targets: '.transform-element',
    translateX: 250,
    rotate: {
      value: 360,
      duration: 1800,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 2,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    delay: 250,
    loop: true
  });
}

export function createEasingVisualizer() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="easing-visualizer">
      <div class="linear ball"></div>
      <div class="easeIn ball"></div>
      <div class="easeOut ball"></div>
      <div class="easeInOut ball"></div>
    </div>
  `;
  
  const timeline = anime.timeline({
    loop: true
  });
  
  ['linear', 'easeIn', 'easeOut', 'easeInOut'].forEach((easing, i) => {
    timeline.add({
      targets: `.${easing}`,
      translateX: 250,
      easing: easing === 'linear' ? 'linear' : `${easing}Quad`,
      duration: 2000
    }, i * 100);
  });
  
  return timeline;
}

export function createColorAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `<div class="color-element"></div>`;
  
  return anime({
    targets: '.color-element',
    backgroundColor: [
      { value: '#6366f1' },
      { value: '#8b5cf6' },
      { value: '#6366f1' }
    ],
    scale: [
      { value: 1.5, duration: 500 },
      { value: 1, duration: 500 }
    ],
    duration: 2000,
    easing: 'easeInOutQuad',
    loop: true
  });
}

export function createScrollAnimation() {
  const previewArea = document.querySelector('.preview-area');
  previewArea.innerHTML = `
    <div class="scroll-demo">
      <div class="scroll-element"></div>
    </div>
  `;
  
  return anime({
    targets: '.scroll-element',
    translateY: [
      { value: 100, duration: 1000, easing: 'easeOutExpo' },
      { value: 0, duration: 1000, easing: 'easeInExpo' }
    ],
    rotate: {
      value: '1turn',
      duration: 2000,
      easing: 'easeInOutSine'
    },
    scale: [
      { value: 2, duration: 500, easing: 'easeOutExpo' },
      { value: 1, duration: 500, easing: 'easeInExpo' }
    ],
    loop: true
  });
} 