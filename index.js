const API_KEY = "29b21876-09d9-4fdc-9346-a074e0a3096e";
const API_URL_TOP250 =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS";

const URL_FOR_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

function createUrlForPagination(pageId) {
  return `${API_URL_TOP250}&page=${pageId}`;
}

getMovies(API_URL_TOP250);

async function getMovies(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "29b21876-09d9-4fdc-9346-a074e0a3096e",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  // .then((res) => res.json())
  // .then((json) => console.log(json));
  showMovies(data);
}

function setClassByRate(number) {
  if (number >= 7) {
    return "green";
  } else if (number < 7 || number >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.classList.add("movies");

  // очистка предыдущих фильмов при поиске через input
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    console.log(movie.filmId);
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
          <div class="movie__img">
            <img
            class='poster'
              src="${movie.posterUrlPreview}"
              alt=${movie.nameRu}/>
          </div>
          <div class="movie__description">
            <h3 class="movie__title">${movie.nameRu}</h3>
            <p class="movie__ganre">${movie.genres.map(
              (genre) => " " + genre.genre
            )}</p>
            <div class="movie__avarege movie__avarege--${setClassByRate(
              movie.rating
            )}">${movie.rating}</div>
          </div>`;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const input = document.querySelector(".search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = input.value;
  console.log(inputValue);
  const resaltUrlForSearch = `${URL_FOR_SEARCH}${inputValue}`;
  getMovies(resaltUrlForSearch);
  input.value = "";
});

//POGINATION
const pagination = document.querySelector(".pagination");
let pageOne = document.querySelector("#one");

pageOne.addEventListener("click", () => {
  getMovies(createUrlForPagination("1"));
  console.log(createUrlForPagination("1"));
});

let pageTwo = document.querySelector("#two");
pageTwo.addEventListener("click", () => {
  getMovies(createUrlForPagination("2"));
});

let pageThree = document.querySelector("#three");
pageThree.addEventListener("click", () => {
  getMovies(createUrlForPagination("3"));
});
