document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startGameBtn");
  const gameBoard = document.getElementById("game");

  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const modalOk = document.getElementById("modal-ok");

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;

  // Sonido beep sin archivos
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function beep(f = 600, t = 0.12) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = f;
    osc.type = "sine";
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(audioCtx.currentTime + t);
  }

  const imgs = [
    "imagenes/carta1.png",
    "imagenes/carta2.png",
    "imagenes/carta3.png",
    "imagenes/carta4.png",
    "imagenes/carta5.png",
    "imagenes/carta6.png"
  ];

  function startGame() {
    gameBoard.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matches = 0;

    const pairs = [...imgs, ...imgs];

    // Mezclar
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    pairs.forEach(src => createCard(src));
  }

  function createCard(src) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-face"><img src="${src}" alt=""></div>
      </div>
    `;

    const inner = card.querySelector(".card-inner");
    inner.addEventListener("click", () => flipCard(inner));

    gameBoard.appendChild(card);
  }

  function flipCard(card) {
    if (lockBoard || card.classList.contains("flipped")) return;
    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;
    checkMatch();
  }

  function checkMatch() {
    const img1 = firstCard.querySelector("img").src;
    const img2 = secondCard.querySelector("img").src;

    if (img1 === img2) {
      beep(700);
      firstCard = null;
      secondCard = null;
      lockBoard = false;
      matches++;

      if (matches === imgs.length) {
        setTimeout(() => showModal("¡Ganaste! 🎉"), 400);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 600);
    }
  }

  function showModal(text) {
    modalText.textContent = text;
    modal.classList.remove("hidden");
  }

  modalOk.addEventListener("click", () => {
    modal.classList.add("hidden");
    startGame();
  });

  startBtn.addEventListener("click", startGame);
});
