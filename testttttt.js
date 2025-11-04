//////////////////////////// Globale Variablen //////////////////////////////////
const PICFOLDER = "./pub/";
const PICTYPE = ".jpg";
const MAXPICS = 41;
const COLS = 4; // Spielfeld-Spalten
const ROWS = 4; // Spielfeld-Zeilen

const spielfeld = document.querySelector(".spielfeld");

//////////////////////////// Datenstruktur //////////////////////////////////
class CardSet {
  constructor() {
    this.picFolder = PICFOLDER;
    this.picType = PICTYPE;
    this.maxPics = MAXPICS;
    this.cols = COLS;
    this.rows = ROWS;
  }

  randomArray() {
    const arrLength = this.cols * this.rows;
    const arr = [];
    while (arr.length < arrLength) {
      const r = Math.floor(Math.random() * this.maxPics);
      if (!arr.includes(r)) {
        arr.push(r);
        arr.push(r); // Doppeltes Paar
      }
    }
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  generateCards() {
    const randArr = this.randomArray();
    return randArr.map((num) => ({
      name: `pic${num}`,
      img: `${this.picFolder}${num}${this.picType}`,
    }));
  }
}

///////////////////////// Spiel-Logik //////////////////////////////////
const cardSet = new CardSet();
const karten = cardSet.generateCards();

let erstesBild = null;
let zweitesBild = null;
let ersteKarte = null;
let zweiteKarte = null;
let delay = false;

// Karten ins Spielfeld einfügen
for (const karte of karten) {
  const bild = document.createElement("img");
  bild.src = karte.img;
  bild.alt = karte.name;
  bild.classList.add("verdeckt");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("karte");
  cardDiv.appendChild(bild);
  spielfeld.appendChild(cardDiv);

  // Mausover-Effekt
  cardDiv.addEventListener("mouseenter", () => {
    cardDiv.style.transform = "scale(1.1)";
  });
  cardDiv.addEventListener("mouseleave", () => {
    cardDiv.style.transform = "scale(1)";
  });

  // Klick-Handler
  cardDiv.addEventListener("click", () => {
    if (delay || cardDiv.classList.contains("paar")) return;

    bild.classList.remove("verdeckt");

    if (!erstesBild) {
      erstesBild = bild;
      ersteKarte = cardDiv;
    } else {
      if (cardDiv === ersteKarte) return;
      zweitesBild = bild;
      zweiteKarte = cardDiv;
      delay = true;

      setTimeout(() => {
        if (erstesBild.src === zweitesBild.src) {
          ersteKarte.classList.add("paar");
          zweiteKarte.classList.add("paar");
        } else {
          erstesBild.classList.add("verdeckt");
          zweitesBild.classList.add("verdeckt");
        }
        erstesBild = null;
        zweitesBild = null;
        ersteKarte = null;
        zweiteKarte = null;
        delay = false;

        // Gewinn prüfen
        const allePaare = document.querySelectorAll(".karte.paar").length;
        if (allePaare === karten.length) {
          console.log("WINNER! 🎉");
        }
      }, 1000);
    }
  });
}
