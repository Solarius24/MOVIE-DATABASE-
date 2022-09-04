const moviesDatabase = JSON.parse(localStorage.getItem("movieLibrary"));

if (moviesDatabase) {
  moviesDatabase.forEach((movie) =>
    addNewMovie(movie.id, movie.title, movie.image, movie.rating)
  );
}

const addModal = document.getElementById("add-modal");

const addMovie = document.getElementById("add-movie");
addMovie.addEventListener("click", () => {
  addModal.classList.toggle("visible");
});

//MODAL CANCEL BUTTON

const modalCancelBtn = document.getElementById("btn btn--passive");
modalCancelBtn.addEventListener("click", () => {
  addModal.classList.toggle("visible");
  clearInput();
});
//CLEAR input FUNCTION

function clearInput() {
  userInputTitle.value = "";
  userInputImage.value = "";
  userInputRating.value = "";
}

//ADD USER INPUT AND STORE USER INPUT AS OBJECTS IN ARRAY
//MODAL ADD BUTTON

let movies = moviesDatabase;

const userInputTitle = document.getElementById("title");
const userInputImage = document.getElementById("image");
const userInputRating = document.getElementById("rating");

const modaleAddBtn = document.getElementById("btn btn--success");

modaleAddBtn.addEventListener("click", () => {
  const userNewMovie = {
    id: Math.random().toString(),
    title: userInputTitle.value,
    image: userInputImage.value,
    rating: userInputRating.value,
  };

  movies.push(userNewMovie);
  clearInput();
  addNewMovie(
    userNewMovie.id,
    userNewMovie.title,
    userNewMovie.image,
    userNewMovie.rating
  );
  updateUI();
  saveMovieLibrary();
});

const mainText = document.getElementById("entry-text");

function updateUI() {
  if (movies.length === 0) {
    mainText.style.display = "block";
  } else {
    mainText.style.display = "none";
  }
}

//ADD NEW CARD WITH MOVIE INFORMATION

function addNewMovie(id, title, image, rating) {
  const newMovie = document.createElement("li");
  newMovie.classList.add("movie-element");

  newMovie.innerHTML = `
    <div class="movie-element__image">
        <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    <button class="del" id="${id}">DELETE</button>
    `;

  newMovie.lastElementChild.addEventListener(
    "click",
    deleteMovie.bind(null, id)
  );

  const movieList = document.getElementById("movie-list");
  movieList.appendChild(newMovie);
}

//STORE FAVORITE MOVIE LIRARY IN THE LOCAL STORAGE
function saveMovieLibrary() {
  localStorage.setItem("movieLibrary", JSON.stringify(movies));
}

function deleteMovie(movieId) {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  saveMovieLibrary();
  const movieList = document.getElementById("movie-list");
  movieList.children[movieIndex].remove();
}
