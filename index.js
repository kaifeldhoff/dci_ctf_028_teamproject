////////////////////////////// Globale Variablen  für einfacheres Editing ///////////////////////////////////
const PICFOLDER = "./pub/";
const PICTYPE = ".jpg";
const MAXPICS = 41; // max. Die Anzahl aller Bilder im Bilderordner mit {zahl}{picType} - Schema
const COLS = 5; // Feldgeometrie
const ROWS = 4; // dito
const PIC_HEIGH = "200px"; /* noch nicht implementiert, 
sollte dynamisch aus der Geometrie ermittelt werden, auch Abstände, etc */
const PIC_WITH = PIC_HEIGH; // ebenso

///////////////////////////////// Datenstruktur für Container /////////////////////////////

class CardSet {
  picFolder;
  picType;
  maxPics;
  backSidePic;
  cols;
  rows;

  constructor() {
    this.picFolder = PICFOLDER;
    this.picType = PICTYPE;
    this.maxPics = MAXPICS;
    this.cols = COLS;
    this.rows = ROWS;
    this.backSidePic = this.picFolder + "backside" + this.picType;
  }

  // Wählt aus dem Pool zufällig Bilder aus
  randomArray() {
    const arrlang = this.cols * this.rows;
    const arr = [];
    while (arr.length < arrlang) {
      const r = Math.floor(Math.random() * this.maxPics);
      if (!arr.includes(r)) {
        arr.push(r);
        arr.push(r);
      }
    }
    // ...und mischt die Fundstücke
    const max = arrlang * 100;
    for (let i = 0; i <= max; i++) {
      const r = Math.floor(Math.random() * arrlang);
      const idx = i % arrlang;
      const tmp = arr[idx];
      arr[idx] = arr[r];
      arr[r] = tmp;
    }
    return arr;
  }

  // Konvertiert eindimensionales Randomarray in ein Array entsprechend der Deckgeometrie
  frontSides() {
    const randomPicList = this.randomArray();
    const picArrayFront = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(null));
    let idx = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        picArrayFront[row][col] =
          this.picFolder + randomPicList[idx] + this.picType;
        idx++;
      }
    }
    return picArrayFront;
  }

  // Rückseitenmotiv
  backSides() {
    const picArray = Array(this.rows)
      .fill(null)
      .map(() =>
        Array(this.cols).fill(this.picFolder + "backside" + this.picType)
      );
    return picArray;
  }
}

//////////////////////////////////////////////  Bildcontainer /////////////////////////////////////////////////

// Tabelle bauen und auf Seite poppen
function table() {
  const Galerie = new CardSet();
  const frontSides = Galerie.frontSides();
  const backSides = Galerie.backSides();
  const tableBody = document.querySelector("#imageTable tbody");
  let html = "";
  let idx = 0;
  for (let row = 0; row < ROWS; row++) {
    html += "<tr>";
    for (let col = 0; col < COLS; col++) {
      const frontSide = frontSides[row][col];
      const backSide = backSides[row][col];
      html += `
      <td>
        <div class="card" data-front="${frontSide}" data-state="back">
          <div class="card-inner">
            <div class="card-front">
              <img src="${backSide}" alt="backside">
            </div>
            <div class="card-back">
              <img src="${frontSide}" alt="pic${idx}">
            </div>
          </div>
        </div>
      </td>`;
      idx++;
    }
    html += "</tr>";
  }
  tableBody.innerHTML = html;
}

table();

///////////////////////////////////////////////////////  Gameplay   /////////////////////////////////////

// Spiellogik
let openCards = []; // Anzahl bislang aufgedeckter Karten
let matchedCount = 0; // Anzahl gefundener Paare

function wonORlost() {
  // Prüfung ob alle Karten gefunden
  if (matchedCount === ROWS * COLS) {
    console.log("WINNER! 🎉"); // Yes baby!!!
  } else {
    console.log("Nächster Player");
  }
}

///////////////////////////// Eventhandler für die Maus //////////////////////////////////////////
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener(
    "mouseenter",
    () => (card.style.transform = "scale(1.1)")
  );
  card.addEventListener(
    "mouseleave",
    () => (card.style.transform = "scale(1)")
  );

  card.addEventListener("click", () => {
    const inner = card.querySelector(".card-inner");
    const state = card.dataset.state;

    // Falls Karte schon offen oder gerade zwei offen sind → nichts tun
    if (state === "front" || openCards.length === 2) return;

    // Karte umdrehen
    inner.classList.add("flipped");
    card.dataset.state = "front";
    openCards.push(card);

    // Sobald zwei Karten offen sind → prüfen
    if (openCards.length === 2) {
      const [card1, card2] = openCards;
      const front1 = card1.dataset.front;
      const front2 = card2.dataset.front;

      // Gleiche Bilder?
      if (front1 === front2) {
        console.log("Treffer!");
        matchedCount += 2;
        openCards = [];
        wonORlost(); // prüfen, ob gewonnen
      } else {
        console.log("Falsch!");
        // Nach 1 Sekunde wieder umdrehen
        setTimeout(() => {
          openCards.forEach((c) => {
            c.querySelector(".card-inner").classList.remove("flipped");
            c.dataset.state = "back";
          });
          openCards = [];
          console.log("Nächster Versuch...");
        }, 1000); // Timeout 1000ms. Keine Ahnung, warum der Schönschreiber das immer so doof platziert
      }
    }
  });
});

//////////////////////////////////////////////
