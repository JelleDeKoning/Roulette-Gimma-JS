// Haal de DOM-elementen op voor de knoppen en andere relevante elementen
const btn1speler1 = document.getElementById("btn1");
const btn2speler1 = document.getElementById("btn2");
const btn1speler2 = document.getElementById("btn3");
const btn2speler2 = document.getElementById("btn4");
const wapen = document.getElementById("wapen");
let schiet = new Audio("schiet.mp3");
// Pixabay. (2023, March 15). 9mm pistol shot | Rechtenvrije muziek. Pixabay. https://pixabay.com/nl/sound-effects/9mm-pistol-shot-6349/
let leeg = new Audio("leeg.mp3");
// Pixabay. (2023, February 28). Empty Gun Shot | Rechtenvrije muziek. Pixabay. https://pixabay.com/nl/sound-effects/empty-gun-shot-6209/
let win = new Audio("winnen.mp3");
// mkWIIfreak27. (2009, May 2). Mario Kart WII - Winner Sound [Video]. YouTube. https://www.youtube.com/watch?v=lfqkJxzgGyw
const levensSpeler1Element = document.getElementById("levensSpeler1");
const levensSpeler2Element = document.getElementById("levensSpeler2");

// Initialisatie van variabelen voor levenspunten van spelers
let levensspeler1 = 2;
let levensspeler2 = 2;

// Array met 'echt' en 'nep' kogels, en functie om deze array te schudden
let magazijn = ["echt", "nep", "echt", "nep", "echt"];
function shuffle(magazijn) {
  magazijn.sort(() => Math.random() - 0.5);
}
shuffle(magazijn);

// Haal een willekeurig element uit het magazijn
let randomMagazijn = magazijn.pop();

// Functie om alle knoppen te verbergen
function niemand() {
  btn1speler1.style.display = "none";
  btn2speler1.style.display = "none";
  btn1speler2.style.display = "none";
  btn2speler2.style.display = "none";
}

// Functie om de knoppen voor speler 2 zichtbaar te maken
function BeurtSpeler2() {
  btn1speler1.style.display = "none";
  btn2speler1.style.display = "none";
  btn1speler2.style.display = "inline-block";
  btn2speler2.style.display = "inline-block";
}

// Functie om de knoppen voor speler 1 zichtbaar te maken
function BeurtSpeler1() {
  btn1speler1.style.display = "inline-block";
  btn2speler1.style.display = "inline-block";
  btn1speler2.style.display = "none";
  btn2speler2.style.display = "none";
}

// Functie om alle kogelafbeeldingen te verbergen
function MagazijnVerbergen() {
  const kogels = document.querySelectorAll(".kogel");
  kogels.forEach((kogel) => {
    kogel.style.display = "none";
  });
}

// Functie om de tooltip te verbergen
function TooltipVerbergen() {
  const tooltip = document.querySelector(".tooltip");
  tooltip.style.display = "none";
}

// Voeg schietfuncties toe aan de knoppen van beide spelers
btn1speler1.addEventListener("click", SchietTegenstander1);
btn2speler1.addEventListener("click", SchietJezelf1);
btn1speler2.addEventListener("click", SchietTegenstander2);
btn2speler2.addEventListener("click", SchietJezelf2);

// Functie die wordt opgeroepen wanneer speler 1 op de tegenstander schiet
function SchietTegenstander1() {
  // Controleer of de kogel echt is
  if (randomMagazijn == "echt") {
    wapen.style.transform = "scaleX(-1)";
    schiet.play();
    levensspeler2--;
    updateLevens();
    BeurtSpeler2();
    randomMagazijn = magazijn.pop();
    CheckWin();
  } else if (randomMagazijn == "nep") {
    wapen.style.transform = "scaleX(-1)";
    leeg.play();
    updateLevens();
    BeurtSpeler2();
    randomMagazijn = magazijn.pop();
    CheckWin();
  }
}

// Functie die wordt opgeroepen wanneer speler 1 op zichzelf schiet
function SchietJezelf1() {
  // Controleer of de kogel echt is
  if (randomMagazijn == "echt") {
    wapen.style.transform = "scaleX(1)";
    schiet.play();
    levensspeler1--;
    updateLevens();
    BeurtSpeler2();
    randomMagazijn = magazijn.pop();
    CheckWin();
  } else if (randomMagazijn == "nep") {
    wapen.style.transform = "scaleX(1)";
    leeg.play();
    updateLevens();
    randomMagazijn = magazijn.pop();
    CheckWin();
    neppeKogel();
  }
}

// Functie die wordt opgeroepen wanneer speler 2 op de tegenstander schiet
function SchietTegenstander2() {
  // Controleer of de kogel echt is
  if (randomMagazijn == "echt") {
    wapen.style.transform = "scaleX(1)";
    schiet.play();
    levensspeler1--;
    updateLevens();
    BeurtSpeler1();
    randomMagazijn = magazijn.pop();
    CheckWin();
  } else if (randomMagazijn == "nep") {
    wapen.style.transform = "scaleX(1)";
    leeg.play();
    updateLevens();
    BeurtSpeler1();
    randomMagazijn = magazijn.pop();
    CheckWin();
  }
}

// Functie die wordt opgeroepen wanneer speler 2 op zichzelf schiet
function SchietJezelf2() {
  // Controleer of de kogel echt is
  if (randomMagazijn == "echt") {
    wapen.style.transform = "scaleX(-1)";
    schiet.play();
    levensspeler2--;
    updateLevens();
    BeurtSpeler1();
    CheckWin();
    randomMagazijn = magazijn.pop();
  } else if (randomMagazijn == "nep") {
    wapen.style.transform = "scaleX(-1)";
    leeg.play();
    randomMagazijn = magazijn.pop();
    CheckWin();
    neppeKogel();
  }
}

// Start de beurt van speler 1 en verberg het magazijn na 3 seconden
BeurtSpeler1();
setTimeout(MagazijnVerbergen, 3000);

// Maak kogelafbeeldingen voor elk element in het magazijn
magazijn.forEach(function (magazijn) {
  if (magazijn == "echt") {
    const kogel = document.createElement("img");
    kogel.src = "img/kogel_echt.png";
    kogel.classList.add("kogel");
    document.body.appendChild(kogel);
  } else if (magazijn == "nep") {
    const kogel = document.createElement("img");
    kogel.src = "img/kogel_nep.png";
    kogel.classList.add("kogel");
    document.body.appendChild(kogel);
  }
});
// Pngtree. (n.d.). Bullet icon in cartoon style vector and PNG. https://pngtree.com/freepng/bullet-icon-in-cartoon-style_5097087.html

// Functie om de levens van beide spelers bij te werken in de HTML
function updateLevens() {
  levensSpeler1Element.innerText = "❤️".repeat(levensspeler1);
  levensSpeler2Element.innerText = "❤️".repeat(levensspeler2);
}

// Roep de functie updateLevens aan om de levenspunten van beide spelers te initialiseren
updateLevens();

// Controleer of een van de spelers heeft gewonnen na elke schietactie
function CheckWin() {
  if (levensspeler1 == 0) {
    niemand();
    win.play();
    setTimeout(() => {
      alert("Speler 2 wint!");
    }, 1000);
  } else if (levensspeler2 == 0) {
    niemand();
    win.play();
    setTimeout(() => {
      alert("Speler 1 wint!");
    }, 1000);
  }
}

// Toon de nepkogel tooltip
function neppeKogel() {
  const nep = document.querySelector("#Nep");
  nep.style.display = "block";
  setTimeout(TooltipVerbergen, 2000);
}

function TooltipVerbergen() {
  const nep = document.querySelector("#Nep");
  nep.style.display = "none";
}



