const tableBody = document.querySelector("#imageTable tbody");
let html = "";
for (let row = 0; row < 4; row++) {
  html += "<tr>";
  for (let col = 0; col < 4; col++) {
    const index = row * 4 + col;
    html += `<td><img src="./pub/pic${index}.jpg" alt="pic${index}" class="fixed-img" data-index="${index}"></td>`;
  }
  html += "</tr>";
}
tableBody.innerHTML = html;

// Einheitliche Bildgröße
document.querySelectorAll(".fixed-img").forEach((img) => {
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "cover";

  // Klick-Event hinzufügen
  img.addEventListener("click", (event) => {
    const choosen = event.currentTarget;
    const index = choosen.dataset.index; // z. B. "5"
    const name = choosen.alt; // z. B. "pic5"

    alert(`Bild ${name} (Index ${index}) wurde angeklickt!`);
    console.log(name, index);
  });
});
