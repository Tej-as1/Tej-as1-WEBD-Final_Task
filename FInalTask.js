const url = "https://api.tvmaze.com/shows"
const moviesSection = document.querySelector('.movies');

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const popularShows = data.slice(0, 57);
    popularShows.forEach(show => {
      const movieCard = createMovieCard(show);
      moviesSection.appendChild(movieCard);
    });
  })

//Function for searching
document.querySelector("#sub").onlick = function searchmovie(){
    let query=document.querySelector("#input").value;
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`).then(response=>{
        return response.json();
    }).then((object) => {
        console.log(object);
        let main= document.querySelector('#movies');
        main.innerHTML='';
        object.forEach(function (object) {
           const movieCard = createMovieCard(object.show);
            moviesSection.appendChild(movieCard);        
        });
    })  
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie');

  const movieImg = document.createElement('img');
  movieImg.src = movie.image.medium;
  movieImg.alt = `${movie.name} poster`;

  const movieDetails = document.createElement('div');
  movieDetails.classList.add('movie-details');

  const movieTitle = document.createElement('h3');
  movieTitle.textContent = movie.name;

  const movieSummary = document.createElement('p');
  movieSummary.classList.add('summary');
  movieSummary.innerHTML = movie.summary;
  const watchBtn = document.createElement('button');
  watchBtn.textContent = 'Watch Now';
  watchBtn.addEventListener('click', () => {
    window.open(movie.url);
  });
  movieDetails.appendChild(movieSummary);
  movieDetails.appendChild(watchBtn);

  movieCard.appendChild(movieImg);
  movieCard.appendChild(movieDetails);

  return movieCard;
}


