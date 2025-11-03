// bilder verdecken css
// bilder auswählen css
// bilder ausgewählte sichtbar css
// bilder vergleichen js
// bilder wieder verdecken css
// bilder vom pool entfernen  css
// startknopof js/html
// neustart knopf js/html
const spielfeld = document.querySelector(".spielfeld");
spielfeld.classList.add("debug");
const karten = [
  { name: "Apfel", img: "" },
  { name: "Banane", img: "" },
  { name: "Birne", img: "" },
  { name: "Orange", img: "" },
  { name: "Pfirsich", img: "" },
  { name: "Mango", img: "" },
  { name: "Mandarine", img: "" },
  { name: "Erdbeere", img: "" },
  { name: "Apfel", img: "" },
  { name: "Banane", img: "" },
  { name: "Birne", img: "" },
  { name: "Orange", img: "" },
  { name: "Pfirsich", img: "" },
  { name: "Mango", img: "" },
  { name: "Mandarine", img: "" },
  { name: "Erdbeere", img: "" },
];

function mischen(array) {
  const karten = array;
  let gemischteKarten = [];
  while (gemischteKarten.length < karten.length) {
    const i = Math.floor(Math.random() * karten.length);
    if (!karten[i].genommen) {
      karten[i].genommen = true;
      gemischteKarten.push(karten[i]);
    }
  }

  return gemischteKarten;
}

const gemischteKarten = mischen(karten);

let ersteKarte = true;

for (const karte of gemischteKarten) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("karte");
  cardDiv.classList.add("debug");
  cardDiv.bild = karte.name;
  cardDiv.style.backgroundImage = "url('images/himmel_90x90.jpg')";
  spielfeld.appendChild(cardDiv);

  cardDiv.addEventListener("click", (e) => {
    if (ersteKarte) {
      // umdrehen
    } else {
      // umdrehen und auswerten
    }
  });
}

// const a = document.querySelector(#a);
// const b = document.querySelector(#b);
// const c = document.querySelector(#c);
// const d = document.querySelector(#d);

// if (a===b){
//   console.log("nice")
// } else {
//   console.log("falsch")
// }

// if (c===d){
//   console.log("nice")
// } else {
//   console.log("falsch")
// }
