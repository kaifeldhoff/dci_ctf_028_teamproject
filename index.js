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

Spielfeld = new CardSet();

const hinten = Spielfeld.backSides();
const vorne = Spielfeld.frontSides();
console.log("Vorne: ", vorne);
console.log("Hinten: ", hinten);
