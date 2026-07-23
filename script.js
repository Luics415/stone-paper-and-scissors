// ==========================================
// 1. CONFIGURACIÓN Y ESTADO DEL JUEGO
// ==========================================
const HAND_ICONS = { STONE: "✊", PAPER: "✋", SCISSORS: "✌️" };
const WINNING_RULES = { STONE: "SCISSORS", PAPER: "STONE", SCISSORS: "PAPER" };

// Frases de la CPU según la situación
const TAUNTS_CPU_WIN = [
  "¡Demasiado fácil! 😎",
  "¿Eso es todo lo que tienes? 🥱",
  "Lee mis movimientos si puedes... 🤖",
  "¡Mala elección, humano! 💥",
  "Tu estrategia es muy predecible 😉",
  "Un punto más para la inteligencia artificial 👑",
  "Sigue intentándolo, tal vez la próxima... 😂",
  "¡Damas y caballeros, contemplen la perfección algorítmica! 🎩✨",
  "¡Bienvenido a mis excelentes habilidades del juego, donde YO siempre gano! 🎪",
  "¡Un espectáculo fascinante! Lástima que el resultado era predecible 👁️",
  "¡No te preocupes, querido humano, perder también es parte del divertirse! 🍭",
  "¡Ja, ja, ja! ¡Todo está bajo mi absoluto y perfecto control! 🎭",
  "¡Mi brillantez es tan deslumbrante que cegué tu jugada! 🌟",
  "¡Un aplauso para el público! Y para mí, por supuesto 👏🥳",
  "¡Impresionante intento! Pero el Gran CPU no puede ser superado ✨",
  "¡Cosas que pasan cuando juegas en MI simulación! 🧠"
];

const TAUNTS_CPU_LOSE = [
  "¡Maldición, fue pura suerte! 😤",
  "¡Imposible! Trampa en el código... 🤬",
  "¡Esto no se queda así! ⚡",
  "Ahg... calculé mal tu patrón 🤯",
  "¡No te emociones, solo fue una ronda! 🙄",
  "Mi algoritmo falló por un milisegundo 📉",
  "Disfruta tu victoria temporal... 🧪",
  "¡¿QUÉ?! ¡Esto NO estaba en el libreto del juego! 😱",
  "¡E-ERROR 404! ¡Mi control sobre la realidad se desmorona! 💥",
  "¡NO NO NO NO! ¡Un jugador no debería vencer al director! 🤯",
  "¡Voy a borrar este registro de memoria INMEDIATAMENTE! 🗑️⚡",
  "¡G-G-Glitcheo en el código! ¡ESTO ES IMPOSIBLE! 🌀",
  "¡Aparentemente hay un fallo en la simulación! 🚨",
  "¡Bip Bip ERROR DE EMMM BUG! ¡¿Acaso te estas aprovechando de un bug?! 🗯️",
  "¡Exijo una revisión del código! ¡Aquí hubo trampa digital! 🤖💢",
  "¡S-S-Sustituyendo derrota por... UN ERROR TÉCNICO! ⚡"
];

const TAUNTS_DRAW = [
  "¿Me estás leyendo la mente?, ¡Jajaja no puedes porque no tengo mente! 🧠",
  "Pensamos igual... sosat. 🤝",
  "Un empate sin chiste 😐",
  "Sincronizados al 100% ⚡",
  "¡Un empate! Qué desenlace tan poco dramático para la audiencia 🎟️",
  "¡¿Nuestros cerebros están en perfecta sintonía simétrica?! 🧠⚡",
  "¡¿Es un glitch en la matriz o leíste mi perfecta jugada?! 👁️",
  "¡Un resultado aceptable, pero exijo más emoción en la próxima! 🎭",
  "¡Un empate! Pero no te emociones, la próxima vez seré imbatible 😎",
  "¡Venga humano, un empate no es suficiente para tu ego! 🏆"
];

let playerScore = 0;
let computerScore = 0;

// Referencias del DOM
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const statusMsg = document.getElementById("status-msg");
const optionButtons = document.querySelectorAll(".btn-option");
const gameCard = document.getElementById("game-card");

// Asignar eventos a los botones
optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

// Lógica de cada ronda
function playRound(playerChoice) {
  setButtonsState(true);

  // Reiniciar manos a Piedra para la animación
  playerHand.textContent = HAND_ICONS.STONE;
  computerHand.textContent = HAND_ICONS.STONE;
  statusMsg.textContent = "¡ENFRENTAMIENTO!";
  statusMsg.style.color = "#a5f3fc";

  // Activar animaciones CSS de sacudida
  playerHand.classList.add("shake-player");
  computerHand.classList.add("shake-computer");

  setTimeout(() => {
    playerHand.classList.remove("shake-player");
    computerHand.classList.remove("shake-computer");

    // Efecto de sacudida en la tarjeta al impactar
    if (gameCard) {
      gameCard.classList.add("screen-shake");
      setTimeout(() => gameCard.classList.remove("screen-shake"), 300);
    }

    // Selección aleatoria de la CPU
    const choices = Object.keys(HAND_ICONS);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Mostrar selecciones
    playerHand.textContent = HAND_ICONS[playerChoice];
    computerHand.textContent = HAND_ICONS[computerChoice];

    // Evaluar y desbloquear
    evaluateWinner(playerChoice, computerChoice);
    setButtonsState(false);
  }, 800);
}

function evaluateWinner(player, computer) {
  if (player === computer) {
    statusMsg.textContent = "¡EMPATE! 🤝";
    statusMsg.style.color = "#fde047";
    spawnBackgroundTaunt(TAUNTS_DRAW, "taunt-draw");
  } else if (WINNING_RULES[player] === computer) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    statusMsg.textContent = "¡GANASTE LA RONDA! 🎉";
    statusMsg.style.color = "#4ade80";
    burstParticles();
    spawnBackgroundTaunt(TAUNTS_CPU_LOSE, "taunt-frustrated"); // CPU se frustra
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    statusMsg.textContent = "¡GANA LA CPU! 🤖";
    statusMsg.style.color = "#f43f5e";
    spawnBackgroundTaunt(TAUNTS_CPU_WIN, "taunt-taunt"); // CPU se burla
  }
}

function setButtonsState(disabled) {
  optionButtons.forEach(btn => btn.disabled = disabled);
}

// ==========================================
// 2. GENERADOR DE TEXTOS EN EL FONDO
// ==========================================
function spawnBackgroundTaunt(messagesArray, typeClass) {
  const text = messagesArray[Math.floor(Math.random() * messagesArray.length)];
  const tauntEl = document.createElement("div");
  
  tauntEl.className = `floating-taunt ${typeClass}`;
  tauntEl.textContent = text;

  // Elegir aleatoriamente si aparece a la izquierda o a la derecha de la tarjeta
  const isLeft = Math.random() < 0.5;
  const margin = 20; // Distancia de los bordes

  if (isLeft) {
    tauntEl.style.left = `${Math.random() * 15 + 3}%`;
  } else {
    tauntEl.style.right = `${Math.random() * 15 + 3}%`;
  }

  // Altura aleatoria en la pantalla
  tauntEl.style.top = `${Math.random() * 40 + 30}%`;

  document.body.appendChild(tauntEl);

  // Eliminar el nodo DOM cuando termina la animación CSS (3.5s)
  setTimeout(() => {
    tauntEl.remove();
  }, 3500);
}


// ==========================================
// 3. SISTEMA DE PARTÍCULAS EN CANVAS (FONDO)
// ==========================================
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, speedX, speedY, size, color) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.speedX = speedX || (Math.random() - 0.5) * 0.8;
    this.speedY = speedY || (Math.random() - 0.5) * 0.8;
    this.size = size || Math.random() * 3 + 1;
    this.color = color || "rgba(165, 243, 252, " + (Math.random() * 0.5 + 0.2) + ")";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicializar 60 partículas ambientales
for (let i = 0; i < 60; i++) {
  particles.push(new Particle());
}

// Explosión al ganar
function burstParticles() {
  for (let i = 0; i < 30; i++) {
    const speedX = (Math.random() - 0.5) * 8;
    const speedY = (Math.random() - 0.5) * 8;
    const color = `hsl(${Math.random() * 60 + 100}, 100%, 70%)`;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, speedX, speedY, Math.random() * 5 + 2, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  if (particles.length > 80) {
    particles = particles.slice(particles.length - 80);
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();