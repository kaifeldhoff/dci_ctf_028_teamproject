// bilder verdecken css
// bilder auswählen css
// bilder ausgewählte sichtbar css
// bilder vergleichen js
// bilder wieder verdecken css
// bilder vom pool entfernen  css
// startknopof js/html
// neustart knopf js/html
const spielfeld = document.querySelector(".spielfeld");
console.log(spielfeld);
const cardArr = [
  { name: "Apfel", img: "Apfel.png" },
  { name: "Banane", img: "Banane.png" },
];

// const rueckseite = "rueckseite.png"; // Rückseite der Karten
//  cardDiv.style.backgroundImage = `url('${rueckseite}')`;

for (const card of cardArr) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("karte");
  cardDiv.textContent = card.name;
  cardDiv.style.backgroundImage = `url('${images / himmel.jpg}')`;
  spielfeld.appendChild(cardDiv);
}
console.table(spielfeld);
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
