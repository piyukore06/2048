const confettiColors = [
  '#E68F17',
  '#FAB005',
  '#FA5252',
  '#E64980',
  '#BE4BDB',
  '#0B7285',
  '#15AABF',
  '#EE1233',
  '#40C057'
];
const confettisConf = [
  // 1
  {
    angle: 270,
    spread: 45,
    startVelocity: 20,
    elementCount: 10,
    decay: 0.7,
    colors: confettiColors
  },
  // 2
  {
    angle: 270,
    spread: 90,
    startVelocity: 30,
    elementCount: 30,
    decay: 0.73,
    colors: confettiColors
  },
  // 3
  {
    angle: 90,
    spread: 180,
    startVelocity: 40,
    elementCount: 50,
    decay: 0.75,
    colors: confettiColors
  },
  // 4
  {
    angle: 90,
    spread: 270,
    startVelocity: 50,
    elementCount: 80,
    decay: 0.77,
    colors: confettiColors
  },
  // 5
  {
    angle: 90,
    spread: 360,
    startVelocity: 60,
    elementCount: 150,
    decay: 0.82,
    colors: confettiColors
  }
];
const Confetti = () => {
  const button = document.getElementsByClassName('modal-main');
  confetti(button[0], confettisConf[4]);
};

export default Confetti;
const defaultColors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

const shape = (element) => {
    const list = [
      (e) => { // Square
          const size = Math.round((Math.random() + 0.5) * 10) + 'px';
          e.style.width = size;
          e.style.height = size;
          return e;
      },
      (e) => { // Round
          const size = Math.round((Math.random() + 0.5) * 10) + 'px';
          e.style.width = size;
          e.style.height = size;
          e.style['border-radius'] = '50%';
          return e;
      },
      (e) => { // Triangle
          const size = '' + Math.round((Math.random() + 0.5) * 10);
          const color = e.style['background-color'];
          e.style['background-color'] = 'transparent';

          e.style['border-bottom'] = size + 'px solid ' + color;
          e.style['border-left'] = size / 2 + 'px solid transparent';
          e.style['border-right'] = size / 2 + 'px solid transparent';
          e.style.height = 0;
          e.style.width = size;

          return e;
      }
    ];

    return list[Math.floor(Math.random() * list.length)](element);
};

function createElements(root, elementCount, colors) {
    return Array.from({
        length: elementCount
    }).map(function(_, index) {
        const element = document.createElement('div');
        const color = colors[index % colors.length];
        element.style['background-color'] = color;
        element.style.position = 'absolute';
        root.appendChild(shape(element));
        return element;
    });
}

function randomPhysics(angle, spread, startVelocity, random) {
  const radAngle = angle * (Math.PI / 180);
  const radSpread = spread * (Math.PI / 180);
  return {
      x: 0,
      y: 0,
      wobble: random() * 10,
      velocity: startVelocity * 0.5 + random() * startVelocity,
      angle2D: -radAngle + (0.5 * radSpread - random() * radSpread),
      angle3D: -(Math.PI / 4) + random() * (Math.PI / 2),
      tiltAngle: random() * Math.PI
    };
}

function updateFetti(fetti, progress, decay) {
  fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
  fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
  fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
  fetti.physics.wobble += 0.1;
  fetti.physics.velocity *= decay;
  fetti.physics.y += 3;
  fetti.physics.tiltAngle += 0.1;
  const fettiPhysics = fetti.physics;
  const tiltAngle = fettiPhysics.tiltAngle;
  const wobble = fettiPhysics.wobble;
  const wobbleX = fettiPhysics.x + 10 * Math.cos(wobble);
  const wobbleY = fettiPhysics.y + 10 * Math.sin(wobble);
  const transform = 'translate3d(' + wobbleX + 'px, ' + wobbleY + 'px, 0) rotate3d(1, 1, 1, ' + tiltAngle + 'rad)';

  fetti.element.style.transform = transform;
  fetti.element.style.opacity = 1 - progress;
}

const animate = (root, fettis, decay) => {
    const totalTicks = 200;
    let tick = 0;

    function update() {
        fettis.forEach(function(fetti) {
            return updateFetti(fetti, tick / totalTicks, decay);
        });

        tick += 1;
        if (tick < totalTicks) {
            requestAnimationFrame(update);
        } else {
            fettis.forEach(function(fetti) {
                if (fetti.element.parentNode === root) {
                    return root.removeChild(fetti.element);
                }
            });
        }
    }
    requestAnimationFrame(update);
}
const confetti = (root, configuration  = {}) => {
    const {angle = 90, decay = 0.9, spread = 45, startVelocity = 45, elementCount = 50, colors = defaultColors, random = Math.random} = configuration; 
    const elements = createElements(root, elementCount, colors);
    const fettis = elements.map((element) => {
        return {
            element,
            physics: randomPhysics(angle, spread, startVelocity, random)
        };
    });

    animate(root, fettis, decay);
};
