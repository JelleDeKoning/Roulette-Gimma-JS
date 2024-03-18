const btn1speler1 = document.getElementById("btn1");
const btn2speler1 = document.getElementById("btn2");
const btn1speler2 = document.getElementById("btn3");
const btn2speler2 = document.getElementById("btn4");
let schiet = new Audio("schiet.mp3");
let leeg = new Audio("leeg.mp3");
let win = new Audio("winnen.mp3");
const wapen = document.getElementById("wapen");
const levensSpeler1Element = document.getElementById("levensSpeler1");
const levensSpeler2Element = document.getElementById("levensSpeler2");

let levensspeler1 = 2;
let levensspeler2 = 2;

let magazijn = ["echt", "nep", "echt", "nep", "echt"];

function shuffle(magazijn) {
  magazijn.sort(() => Math.random() - 0.5);
}

shuffle(magazijn);

let randomMagazijn = magazijn.pop();

function niemand() {
  btn1speler1.style.display = "none";
  btn2speler1.style.display = "none";
  btn1speler2.style.display = "none";
  btn2speler2.style.display = "none";
}

function BeurtSpeler2() {
  btn1speler1.style.display = "none";
  btn2speler1.style.display = "none";
  btn1speler2.style.display = "inline-block";
  btn2speler2.style.display = "inline-block";
}

function BeurtSpeler1() {
  btn1speler1.style.display = "inline-block";
  btn2speler1.style.display = "inline-block";
  btn1speler2.style.display = "none";
  btn2speler2.style.display = "none";
}

function MagazijnVerbergen() {
  const kogels = document.querySelectorAll(".kogel");
  kogels.forEach((kogel) => {
    kogel.style.display = "none";
  });
}

function TooltipVerbergen() {
  const tooltip = document.querySelector(".tooltip");
  tooltip.style.display = "none";
}

btn1speler1.addEventListener("click", SchietTegenstander1);
btn2speler1.addEventListener("click", SchietJezelf1);
btn1speler2.addEventListener("click", SchietTegenstander2);
btn2speler2.addEventListener("click", SchietJezelf2);

function SchietTegenstander1() {
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

function SchietJezelf1() {
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
  }
}

function SchietTegenstander2() {
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

function SchietJezelf2() {
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
  }
}

BeurtSpeler1();
setTimeout(MagazijnVerbergen, 3000);
setTimeout(TooltipVerbergen, 5000);

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

function updateLevens() {
  levensSpeler1Element.innerText = "❤️".repeat(levensspeler1);
  levensSpeler2Element.innerText = "❤️".repeat(levensspeler2);
}

updateLevens();

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
      alert("Speler 2 wint!");
    }, 1000);
  }
}
