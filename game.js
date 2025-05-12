// Estrae il parametro 'squadra'
const urlParams = new URLSearchParams(window.location.search);
const squadra = urlParams.get('squadra')?.toUpperCase();

// Sequenze per squadra
const squadre = {
  F: [1, 2, 3, 4, 5, 6],
  G: [2, 3, 4, 5, 1, 6],
  H: [3, 4, 5, 1, 2, 6],
  I: [4, 5, 1, 2, 3, 6],
  J: [5, 1, 2, 3, 4, 6],
};

// Mappa media indizi luogo
const images = {
  1: "img/parco_blu.jpg",
  2: "img/stefania.jpg",
  3: "img/ciclabile.jpg",
  4: "img/madonna_cavallero.jpg",
  5: "img/bocciofila.jpg", 
  6: "img/oscar.jpg"
};

// Mappa indovinello
const hints = {
  1: "Quali forme geometriche ci sono?",
  2: "VERIFICA STEFANIA",
  3: "VERIFICA CICLABILE",
  4: "VERIFICA MADONNA CAVALLERO",
  5: "Facendo il giro in senso antiorario, qual è il numero di serie del secondo lampione?",
  6: "Corri e trova la statuetta per primo!"
};

//Mappa risposte corrette personalizzabili
const answers = {
  1: "quadrato triangolo cerchio", //formine scivoli
  2: "???", //stefania
  3: "???", //ciclabile
  4: "???", //madonna cavallero
  5: "75287", //numero lampione bocciofila
};

// Caricamento o reset
let progress = JSON.parse(localStorage.getItem(`progress_${squadra}`)) || {
  currentIndex: 0,
  visited: []
};

// Squadra non valida
if (!squadra || !squadre[squadra]) {
  document.body.innerHTML = "<p>Squadra non valida. Aggiungi '?squadra=F' all'URL.</p>";
} else {
  document.getElementById('game').classList.remove('hidden');
  showPage();
}

// Mostra pagina
function showPage() {
  const page = squadre[squadra][progress.currentIndex];

  const placeImage = document.getElementById('placeImage');

  if (page === 6) {
    // Mostra il messaggio finale
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('hint').innerText = `Forza! ${hints[page]}`;
    placeImage.classList.remove('hidden');
    placeImage.src = images[page];

    // Nascondi la sezione di input
    document.getElementById('inputSection').style.display = 'none';

    // Rimuovi il feedback
    document.getElementById('feedback').innerText = '';

    // Mostra il pulsante di reset
    document.getElementById("resetButton").style.display = "block";
  } else {
    // Mostra la pagina normale
    document.getElementById('finalMessage').classList.add('hidden');
    document.getElementById('hint').innerText = `${hints[page]}`;
    document.getElementById('answer').value = "";
    document.getElementById('feedback').innerText = "";
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById("resetButton").style.display = "none";

    placeImage.classList.remove('hidden');
    placeImage.src = images[page];
  }
}

// Verifica risposta
function checkAnswer() {
  const answer = document.getElementById('answer').value.trim();
  const page = squadre[squadra][progress.currentIndex];

  if (answer.toLowerCase() === answers[page]?.toLowerCase()) {
    if (!progress.visited.includes(page)) {
      progress.visited.push(page);
    }

    if (progress.visited.length >= 5) {
      progress.currentIndex = squadre[squadra].length - 1;
    } else {
      progress.currentIndex = (progress.currentIndex + 1) % (squadre[squadra].length - 1);
    }

    localStorage.setItem(`progress_${squadra}`, JSON.stringify(progress));
    showPage();
  } else {
    document.getElementById('feedback').innerText = "Risposta errata, riprova!";
  }
}

// Reset gioco
function resetGame() {
  if (confirm("Sei sicuro di voler resettare il gioco? Tutti i progressi saranno persi.")) {
    localStorage.removeItem(`progress_${squadra}`);
    location.href = `?squadra=${squadra}`;
  }
}
