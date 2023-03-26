const container = document.querySelector(".container");
let avatar;
let caption;
const cardContainer = document.querySelector(".card__container");
let pageNumber = 1;
let data;

async function getData(pageNumber) {
  const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
  const response = await fetch(url);
  data = await response.json();
}

getData().then((r) => {
  drawCard(data);
  actionModal(data);
});

function drawCard(data) {
  for (let i = 0; i < data.results.length; i++) {
    const card = document.createElement("div");
    const cardImage = document.createElement("img");
    const cardCaption = document.createElement("h3");
    card.setAttribute("class", "card");
    card.setAttribute("id", data.results[i].id);
    cardImage.setAttribute("class", "card__image");
    cardImage.setAttribute("loading", "lazy");
    cardImage.setAttribute("alt", data.results[i].name);
    cardCaption.setAttribute("class", "card__caption");
    avatar = data.results[i].image;
    caption = data.results[i].name;
    card.append(cardImage);
    card.append(cardCaption);
    cardContainer.append(card);
    cardImage.src = avatar;
    cardCaption.innerHTML = caption;
  }
}

window.addEventListener("scroll", () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < 700 && pageNumber <= 42) {
    getData(++pageNumber).then((r) => {
      drawCard(data);
      actionModal(data);
    });
  }
});

function actionModal() {
  let characterCards = document.getElementsByClassName("card");
  const characterModal = document.querySelector(".pop-up-container");
  const characterPhoto = document.querySelector("#character__photo");
  const characterName = document.querySelector("#name");
  const characterStatus = document.querySelector("#status");
  const characterSpecies = document.querySelector("#species");
  const characterOrigin = document.querySelector("#origin");
  const characterLocation = document.querySelector("#location");
  const characterGender = document.querySelector("#gender");
  const btnClose = document.querySelector(".x-button");
  let k = 20;
  data.results.forEach((item) => {
    for (let j = 0; j < characterCards.length; j++) {
      characterCards[j].addEventListener("click", (e) => {
        e.preventDefault();
        if (j == 20) {
          j = j + k;
        }
        data.results.forEach((item) => {
          characterModal.classList.remove("no-display");
          characterModal.classList.add("display");
          characterPhoto.src = data.results[j].image;
          characterName.innerText = data.results[j].name;
          characterStatus.innerText = data.results[j].status;
          characterSpecies.innerText = data.results[j].species;
          characterOrigin.innerText = data.results[j].origin.name;
          characterLocation.innerText = data.results[j].location.name;
          characterGender.innerText = data.results[j].gender;
        });

        btnClose.addEventListener("click", () => {
          characterModal.classList.add("no-display");
          characterModal.classList.remove("display");
        });
      });
    }
  });
}
