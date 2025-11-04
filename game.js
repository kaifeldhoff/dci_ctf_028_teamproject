import { CardSet } from "./init.js";

/////////////////////////////// 1. Einstellungen ///////////////////////////////
const PICFOLDER = "./pub/"; // Ordner mit Bildern
const PICTYPE = ".jpg"; // Bildformat
const ROWS = 4; // Zeilen im Spielfeld
const COLS = 4; // Spalten im Spielfeld

const spielfeld = document.querySelector(".bilder"); // Container im HTML

/////////////////////////////// 2. Kartengenerator ////////////////////////////
function erstelleKarten() {
  const anzahlKarten = (ROWS * COLS) / 2; // Anzahl verschiedener Bilder
  const karten = [];

  for (let i = 0; i < anzahlKarten; i++) {
    const bildPfad = `${PICFOLDER}${i}${PICTYPE}`;
    // jedes Bild kommt zweimal ins Array für Paare
    karten.push({ name: `pic${i}`, img: bildPfad });
    karten.push({ name: `pic${i}`, img: bildPfad });
  }

  // Karten mischen
  return karten.sort(() => Math.random() - 0.5);
}

/////////////////////////////// 3. Spielfeld erstellen ////////////////////////
function erstelleSpielfeld(karten) {
  karten.forEach((karte) => {
    // Bild-Element erstellen
    const bild = document.createElement("img");
    bild.src = karte.img;
    bild.alt = karte.name;
    bild.classList.add("verdeckt"); // Start: verdeckt

    // Karten-Container
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("karte");
    cardDiv.appendChild(bild);

    spielfeld.appendChild(cardDiv);
  });
}

/////////////////////////////// 4. Spiel-Logik /////////////////////////////////
function spieleMemory() {
  let ersteKarte = null;
  let zweiteKarte = null;
  let block = false; // blockiert Klicks während Timeout

  const alleKarten = document.querySelectorAll(".karte");

  alleKarten.forEach((cardDiv) => {
    cardDiv.addEventListener("click", () => {
      if (block || cardDiv.classList.contains("paar")) return;

      const bild = cardDiv.querySelector("img");
      bild.classList.remove("verdeckt");

      if (!ersteKarte) {
        ersteKarte = cardDiv;
      } else {
        if (cardDiv === ersteKarte) return; // gleiche Karte, nichts tun
        zweiteKarte = cardDiv;
        block = true;

        setTimeout(() => {
          const bild1 = ersteKarte.querySelector("img");
          const bild2 = zweiteKarte.querySelector("img");

          // Prüfen, ob Bilder gleich sind
          if (bild1.src === bild2.src) {
            ersteKarte.classList.add("paar");
            zweiteKarte.classList.add("paar");
          } else {
            bild1.classList.add("verdeckt");
            bild2.classList.add("verdeckt");
          }

          // Reset
          ersteKarte = null;
          zweiteKarte = null;
          block = false;

          // Gewinn prüfen
          const paareGefunden = document.querySelectorAll(".karte.paar").length;
          if (paareGefunden === alleKarten.length) {
            console.log("WINNER! 🎉");
          }
        }, 1000); // 1 Sekunde warten, damit der Spieler die zweite Karte sehen kann
      }
    });
  });
}

/////////////////////////////// 5. Spiel starten //////////////////////////////
// const karten = erstelleKarten();
const newcardSet = new CardSet();
const cardIds = newcardSet.randomArray();

let karten = [];
for (const cardId of cardIds) {
  const img = newcardSet.picFolder + cardId + newcardSet.picType;
  karten.push({
    name: cardId,
    img: img,
  });
}
erstelleSpielfeld(karten);
spieleMemory();
