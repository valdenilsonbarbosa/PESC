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