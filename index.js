////////////////////////////// (vorerst) Globale Variablen ///////////////////////////////////
const PICFOLDER = "./pub/";
const PICTYPE = ".jpg";

const MAXPICS = 16; // Max. Anzahl der Bilder im Bilderordner mit {zahl}{picType} - Schema
const COLS = 4;
const ROWS = 4;
const picHeight = "200px";
const picWith = picHeight;

/////////////////////////////////

const Galerie = {
  picFolder: PICFOLDER,
  picType: PICTYPE,
  maxPics: MAXPICS,
  backSidePic: this.picFolder + "backside" + this.picType,
  cols: COLS,
  rows: ROWS,

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
    // ...und mischt das Ergebnis
    const max = arrlang * 100;
    for (let i = 0; i <= max; i++) {
      const r = Math.floor(Math.random() * arrlang);
      const idx = i % arrlang;
      const tmp = arr[idx];
      arr[idx] = arr[r];
      arr[r] = tmp;
    }
    // console.log("Random: ", arr);
    return arr;
  },

  // Konvertiert Randomarray in ein Array entsprechend der Deckkonfiguration
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
    //  console.log("picArrayFront: ", picArrayFront);
    return picArrayFront;
  },

  backSides() {
    const picArray = Array(this.rows)
      .fill(null)
      .map(() =>
        Array(this.cols).fill(this.picFolder + "backside" + this.picType)
      );
    //  console.log("PPP", picArray);
    return picArray;
  },
};

///////////////////////////////////////////////////////////////////////////////////////////////

// Tabelle bauen und auf Seite poppen
function showTable() {
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
  // console.log(tableBody.innerHTML);
}
showTable();

////////////////////////////////////////////////////////////////////////////////////////////

function wonORlost() {
  let won;
  if (won === true) {
    console.log("WINNER!");
  } else {
    console.log("LOSER!");
  }
  console.log("Nächster Player");
}

// Eventhandler für die Maus
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

    if (state === "back") {
      inner.classList.add("flipped");
      card.dataset.state = "front";
    } else {
      inner.classList.remove("flipped");
      card.dataset.state = "back";
    }
  });
});

//////////////////////////////////////////////
