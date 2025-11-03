// bilder verdecken css
// bilder auswählen css
// bilder ausgewählte sichtbar css
// bilder vergleichen js
// bilder wieder verdecken css
// bilder vom pool entfernen  css
// startknopof js/html
// neustart knopf js/html
const spielfeld = document.querySelector(".spielfeld");
const karten = [
  { name: "Mango", img: "pub/pic0.jpg" },
  { name: "Mandarine", img: "pub/pic1.jpg" },
  { name: "Erdbeere", img: "pub/pic2.jpg" },
  { name: "Apfel", img: "pub/pic3.jpg" },
  { name: "Banane", img: "pub/pic4.jpg" },
  { name: "Birne", img: "pub/pic5.jpg" },
  { name: "Orange", img: "pub/pic6.jpg" },
  { name: "Pfirsich", img: "pub/pic7.jpg" },
  { name: "Mango", img: "pub/pic0.jpg" },
  { name: "Mandarine", img: "pub/pic1.jpg" },
  { name: "Erdbeere", img: "pub/pic2.jpg" },
  { name: "Apfel", img: "pub/pic3.jpg" },
  { name: "Banane", img: "pub/pic4.jpg" },
  { name: "Birne", img: "pub/pic5.jpg" },
  { name: "Orange", img: "pub/pic6.jpg" },
  { name: "Pfirsich", img: "pub/pic7.jpg" },

  //   { name: "Mango", img: "pub/pic8.jpg" },
  //   { name: "Mandarine", img: "pub/pic9.jpg" },
  //   { name: "Erdbeere", img: "pub/pic10.jpg" },
  //   { name: "Erdbeere", img: "pub/pic11.jpg" },
  //   { name: "Erdbeere", img: "pub/pic12.jpg" },
  //   { name: "Erdbeere", img: "pub/pic13.jpg" },
  //   { name: "Erdbeere", img: "pub/pic14.jpg" },
  //   { name: "Erdbeere", img: "pub/pic15.jpg" },
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

let erstesBild = null;
let zweitesBild = null;
let ersteKarte = null;
let zweiteKarte = null;
let delay = false;

for (const karte of gemischteKarten) {
  const bild = document.createElement("img");
  bild.src = karte.img;
  bild.alt = "Example image";
  bild.classList.add("verdeckt");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("karte");
  // cardDiv.style.backgroundImage = "url('images/himmel_90x90.jpg')";
  cardDiv.appendChild(bild);
  spielfeld.appendChild(cardDiv);

  cardDiv.addEventListener("click", (e) => {
    if (delay) return;
    if (cardDiv.classList.contains("paar")) return;
    // if (bild.classList.contains("paar")) {
    //   return;
    // }
    if (!erstesBild) {
      bild.classList.remove("verdeckt");
      erstesBild = bild;
      ersteKarte = cardDiv;
    } else {
      if (cardDiv === ersteKarte) return;

      zweitesBild = bild;
      zweiteKarte = cardDiv;
      bild.classList.remove("verdeckt");
      delay = true;
      setTimeout(() => {
        if (erstesBild.src === zweitesBild.src && erstesBild !== zweitesBild) {
          erstesBild = null;
          zweitesBild = null;
          delay = false;
          ersteKarte.classList.add("paar");
          zweiteKarte.classList.add("paar");
          ersteKarte = null;
          zweiteKarte = null;
        } else {
          bild.classList.add("verdeckt");
          erstesBild.classList.add("verdeckt");
          erstesBild = null;
          zweitesBild = null;
          ersteKarte = null;
          zweiteKarte = null;
          delay = false;
        }
      }, 1500);
    }
    console.log(erstesBild);
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
