/*variveis "acelerar" e "desacelerar"*/
const buttonAcelerar = document.getElementById('acelerar');
const buttonDesacelerar = document.getElementById("retroceder");
let Acelerar = 1;

// OVNI
const ovni = document.getElementById('ovni');
ovni.addEventListener('click', () => {
  alert('OVNI detectado! 🛸');
});

// Asteroide
const asteroide = document.getElementById('asteroide');
const rastro = [];

/*Anos-Luz Timer*/
let TempoAnosL = 4.6;
const LightyearsTimer = document.createElement('div');
LightyearsTimer.id = 'anosluztimer';
document.body.appendChild(LightyearsTimer);

/*planetas */
const planets = document.querySelectorAll('.planet')
const p_radii = [8, 17, 32, 52, 95, 121, 148, 173];
let p_radians = new Array(8).fill(0)
const planetDistances = {
  'Mercúrio': 0.39,  // Distância em unidades astronômicas
  'Vênus': 0.72,
  'Terra': 1,
  'Marte': 1.52,
  'Júpiter': 5.2,    
  'Saturno': 9.58,
  'Urano': 19.18,
  'Netuno': 30.07
};

const p_velocities = [1.607, 1.174, 1, 0.802, 0.434, 0.2, 0.15, 0.1];
const orbitLines = document.querySelectorAll('.orbit-line');

/*Codigo da lua*/
const moon = document.querySelector('#moon')
const m_radius = 4
let m_radians = 0
const m_velocity = 2

const p_orbits = document.querySelectorAll('.p-orbit')
const m_orbit = document.querySelector('#m-orbit')

p_orbits.forEach((p_orbit, index)=>{
  p_orbit.style.height = `${p_radii[index]/2}vmin`
  p_orbit.style.width = `${p_radii[index]/2}vmin`
})

 
function Accelerar(acelerar){
  Acelerar += 1
  

  /*velocidade maxima atingida*/
  if (Acelerar > 10) {
    Acelerar = 10;
 }
}

  function Desacelerar(retroceder){
    Acelerar -= 1


    /*vecolidade minima atingida!*/
    if(Acelerar < -10){
      Acelerar = -10;
    }
  }
 
  /*clique nos botões*/
  buttonAcelerar.addEventListener("click", Accelerar);
  buttonDesacelerar.addEventListener("click", Desacelerar);

setInterval( ()=> {
  planets.forEach( (planet, index)=>{
    planet.style.left = `${Math.cos(p_radians[index]) * p_radii[index]/2}vmin`
    planet.style.top = `${Math.sin(p_radians[index]) * p_radii[index]/2}vmin`
    p_radians[index] += p_velocities[index] * 0.02 * Acelerar;
  })

  /*Código da lua*/
  moon.style.left = `${earthX() + (Math.cos(m_radians) * m_radius )}vmin`
  moon.style.top = `${earthY() + (Math.sin(m_radians) * m_radius )}vmin`
  m_radians += m_velocity * 0.02 * Acelerar;

  m_orbit.style.left = `${earthX()}vmin`
  m_orbit.style.top = `${earthY()}vmin`
}, 1000/60)

function earthX(){
  return Number( planets[2].style.left.split('vmin')[0] )
}

function earthY(){
  return Number( planets[2].style.top.split('vmin')[0] )
}

/*Atualiza o painel com as informações do planeta e a distância da onda magnética*/
function planetClicked(planetName, planetDescription) {
  const infoPanel = document.getElementById('info-panel');
  const planetInfo = document.getElementById('planet-info');

  // Normaliza o nome do planeta (remove acentos e converte para minúsculas)
  const normalizedPlanetName = planetName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Normaliza as chaves do objeto planetDistances para comparação
  const normalizedDistances = Object.keys(planetDistances).reduce((acc, key) => {
    const normalizedKey = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    acc[normalizedKey] = planetDistances[key];
    return acc;
  }, {});

  // Verifica se o planeta existe no objeto normalizado
  const distanciaUA = normalizedDistances[normalizedPlanetName];
  if (!distanciaUA) {
    planetInfo.innerHTML = `<strong>${planetName}</strong><br>Planeta não encontrado ou distância desconhecida.`;
    infoPanel.style.display = 'block';
    return;
  }

  // Calcula a distância até a onda magnética (em anos-luz)
  const distanciaOndaMagnetica = (distanciaUA * 0.0000158).toFixed(6);

  // Mostrar informações
  planetInfo.innerHTML = `
    <strong>${planetName}</strong><br>
    ${planetDescription}<br><br>
    Distância até a Onda Magnética: ${distanciaOndaMagnetica} anos-luz
  `;
  infoPanel.style.display = 'block';
}

/*Display anos-luz Update*/
function updateTempoAnosL() {
  TempoAnosL += 0.0001 * Acelerar;
  LightyearsTimer.innerHTML = `${TempoAnosL.toFixed(2)} Bilhoes de Anos`;
}
setInterval(updateTempoAnosL, 1000);

/* Função para desenhar a linha imaginária entre planetas */
function drawImaginaryLine(planet1, planet2) {
  // Obtém as coordenadas dos centros dos planetas
  const rect1 = planet1.getBoundingClientRect();
  const rect2 = planet2.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2; // Centro do planeta 1 (X)
  const y1 = rect1.top + rect1.height / 2; // Centro do planeta 1 (Y)
  const x2 = rect2.left + rect2.width / 2; // Centro do planeta 2 (X)
  const y2 = rect2.top + rect2.height / 2; // Centro do planeta 2 (Y)

  // Cria a linha
  const line = document.createElement('div');
  line.classList.add('line-between');
  line.style.position = 'fixed'; // 'fixed' para evitar problemas de posicionamento

  // Calcula a distância entre os planetas
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Calcula o ângulo de rotação da linha
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Define o estilo da linha
  line.style.width = `${distance}px`; // Comprimento da linha
  line.style.height = '2px'; // Espessura da linha
  line.style.backgroundColor = 'grey'; // Cor da linha
  line.style.transform = `rotate(${angle}deg)`; // Rotação da linha
  line.style.transformOrigin = '0 0'; // Origem da transformação
  line.style.top = `${y1}px`; // Posiciona a linha no centro do planeta 1 (Y)
  line.style.left = `${x1}px`; // Posiciona a linha no centro do planeta 1 (X)
  line.style.opacity = '40%';

  // Adiciona a linha ao corpo do documento
  document.body.appendChild(line);
}

// Atualizar as linhas magnéticas a cada frame
setInterval(() => {
  // Remove todas as linhas existentes
  document.querySelectorAll('.line-between').forEach(line => line.remove());

  // Desenha as novas linhas magnéticas
  drawImaginaryLine(document.getElementById('mercury'), document.getElementById('venus'));
  drawImaginaryLine(document.getElementById('venus'), document.getElementById('earth'));
  drawImaginaryLine(document.getElementById('earth'), document.getElementById('mars'));
  drawImaginaryLine(document.getElementById('mars'), document.getElementById('jupiter'));
  drawImaginaryLine(document.getElementById('jupiter'), document.getElementById('saturn'));
  drawImaginaryLine(document.getElementById('saturn'), document.getElementById('uranus'));
  drawImaginaryLine(document.getElementById('uranus'), document.getElementById('neptune'));
}, 1000 / 60);

// Fundo com estrelas
function createStarfield() {
  const starfield = document.getElementById('starfield');
  const numStars = 200;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = `star layer-${Math.floor(Math.random() * 3) + 1}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starfield.appendChild(star);
  }
}
createStarfield();

//Ovni
function flyOVNI() {
  ovni.style.display = 'block';
  let posX = -100;
  let posY = Math.random() * window.innerHeight;

  function animate() {
    posX += 2;
    ovni.style.left = `${posX}px`;
    ovni.style.top = `${posY}px`;

    if (posX > window.innerWidth - 100) {
      ovni.style.opacity = `${1 - (posX - (window.innerWidth - 100)) / 100}`;
    }

    if (posX > window.innerWidth) {
      posX = -100;
      posY = Math.random() * window.innerHeight;
      ovni.style.opacity = '1';
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Asteroide
function flyAsteroide() {
  asteroide.style.display = 'block';
  let posX = window.innerWidth + 100;
  let posY = Math.random() * window.innerHeight;

  function animate() {
    posX -= 2;
    posY += Math.sin(posX * 0.01) * 2;

    // Simula gravidade ao passar perto da Terra
    const earthx = earthX();
    const earthy = earthY();
    const distanceToEarth = Math.sqrt((posX - earthX) ** 2 + (posY - earthY) ** 2);

    if (distanceToEarth < 100) {
      posY += (earthY - posY) * 0.02;
    }

    asteroide.style.left = `${posX}px`;
    asteroide.style.top = `${posY}px`;

    // Cria um rastro de partículas
    const rastroPoint = document.createElement('div');
    rastroPoint.className = 'rastro-point';
    rastroPoint.style.left = `${posX}px`;
    rastroPoint.style.top = `${posY}px`;
    document.body.appendChild(rastroPoint);
    rastro.push(rastroPoint);

    // Efeito de desaparecimento gradual
    setTimeout(() => {
      rastroPoint.style.opacity = '0';
      setTimeout(() => rastroPoint.remove(), 1000);
    }, 500);

    // Explosão ao sair da tela
    if (posX < -100) {
      explodeAsteroide(posX, posY);
      posX = window.innerWidth + 100;
      posY = Math.random() * window.innerHeight;
    }

    requestAnimationFrame(animate);
  }

  animate();
}
       
const particlePool = [];

function getParticle() {
  if (particlePool.length > 0) {
    return particlePool.pop();
  } else {
    const particle = document.createElement('div');
    particle.className = 'particle';
    return particle;
  }
}

function returnParticle(particle) {
  particlePool.push(particle);
}

function explodeAsteroide(x, y) {
  for (let i = 0; i < 20; i++) {
    const particle = getParticle();
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    particle.style.transform = `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px)`;

    setTimeout(() => {
      particle.remove();
      returnParticle(particle);
    }, 1000);
  }
}

setTimeout(flyAsteroide, 10000);
setTimeout(flyOVNI, 5000);

// Função para permitir arrastar e soltar planetas
function enableDragAndDrop() {
  const planets = document.querySelectorAll('.planet');

  planets.forEach(planet => {
    planet.draggable = true;

    planet.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', planet.id);
    });

    planet.addEventListener('dragover', (event) => {
      event.preventDefault(); // Permite soltar o planeta
    });

    planet.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text/plain');
      const draggedPlanet = document.getElementById(id);

      // Verifica se houve colisão com outro planeta
      const collidedPlanet = document.elementFromPoint(event.clientX, event.clientY);
      if (collidedPlanet && collidedPlanet.classList.contains('planet') && collidedPlanet !== draggedPlanet) {
        simulateCollision(draggedPlanet, collidedPlanet);
      }
    });
  });
}

// Habilita o arrastar e soltar ao carregar a página
enableDragAndDrop();

function updateOrbits() {
  const planets = document.querySelectorAll('.planet');
  planets.forEach((planet, index) => {
    const radius = p_radii[index] / 2;
    planet.style.left = `${Math.cos(p_radians[index]) * radius}vmin`;
    planet.style.top = `${Math.sin(p_radians[index]) * radius}vmin`;
  });
}

function simulateCollision(planet1, planet2) {
  // Massas dos planetas (assumindo que a massa é proporcional ao tamanho)
  const massa1 = parseFloat(planet1.style.width);
  const massa2 = parseFloat(planet2.style.width);

  // Velocidades dos planetas (assumindo que a velocidade é proporcional à velocidade orbital)
  const velocidade1 = p_velocities[Array.from(planets).indexOf(planet1)];
  const velocidade2 = p_velocities[Array.from(planets).indexOf(planet2)];

  // Conservação de momento: m1 * v1 + m2 * v2 = (m1 + m2) * v_final
  const velocidadeFinal = (massa1 * velocidade1 + massa2 * velocidade2) / (massa1 + massa2);

  // Remove os planetas colididos
  planet1.remove();
  planet2.remove();

  // Cria uma explosão
  const explosionSize = (massa1 + massa2) * 2;
  const explosion = document.createElement('div');
  explosion.className = 'explosion';
  explosion.style.width = `${explosionSize}px`;
  explosion.style.height = `${explosionSize}px`;
  explosion.style.left = `${(parseFloat(planet1.style.left) + parseFloat(planet2.style.left)) / 2 - explosionSize / 2}px`;
  explosion.style.top = `${(parseFloat(planet1.style.top) + parseFloat(planet2.style.top)) / 2 - explosionSize / 2}px`;
  document.body.appendChild(explosion);

  // Remove a explosão após a animação
  setTimeout(() => explosion.remove(), 1000);

  // Cria um novo corpo celeste (planeta maior)
  const newPlanet = document.createElement('div');
  newPlanet.className = 'planet';
  newPlanet.style.width = `${(massa1 + massa2)}px`;
  newPlanet.style.height = `${(massa1 + massa2)}px`;
  newPlanet.style.left = `${(parseFloat(planet1.style.left) + parseFloat(planet2.style.left)) / 2}px`;
  newPlanet.style.top = `${(parseFloat(planet1.style.top) + parseFloat(planet2.style.top)) / 2}px`;
  newPlanet.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  document.body.appendChild(newPlanet);

  // Atualiza a velocidade do novo planeta
  p_velocities.push(velocidadeFinal);
  p_radii.push((massa1 + massa2) / 2);
  p_radians.push(0);

  // Atualiza as órbitas dos outros planetas
  updateOrbits();
}




