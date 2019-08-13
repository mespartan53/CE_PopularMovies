const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const jumbotron = document.createElement('div');
jumbotron.setAttribute('class', 'top jumbotron');

const jumboPara = document.createElement('h1');
jumboPara.setAttribute('class', 'jumboHeader');
jumboPara.textContent = 'List of popular movies';

container.appendChild(jumbotron);
jumbotron.appendChild(jumboPara);

var request = new XMLHttpRequest();
request.open('GET',
'https://api.themoviedb.org/3/movie/popular?api_key=e8f4be867bfbfd7b4918face4eefdf29&language=en-US&page=1&region=US',
true);

request.onload = function () {

	var data = JSON.parse(this.response);
	var movieData = data.results;

	if (request.status >= 200 && request.status < 400) {
		for(let movie in movieData)
		{
			const box = document.createElement('div');
			box.setAttribute('class', 'box col-lg-4 col-sm-6');

			//Container for each movie
			const card = document.createElement('div');
      		card.setAttribute('class', 'card');
      		//card.setAttribute('background', 'black url(\"https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + movieData[movie]['poster_path'] +'\") no-repeat fixed center');

      		//Movie Title
      		const h2 = document.createElement('h2');
      		h2.setAttribute('class', 'MovieTitle container col-sm-12');
      		h2.textContent = `${movieData[movie]['title']}`;

      		//poster image
      		const img = document.createElement('img');
      		img.setAttribute('class', 'MovieImg col-xs-6 img-rounded');
      		img.setAttribute('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + movieData[movie]['poster_path']);
      		img.setAttribute('alt', movieData[movie]['title']);

      		//Overview paragraphs
      		const p = document.createElement('p')
      		p.setAttribute('class', 'MovieOverview col-xs-6');
     		var str = movieData[movie]['overview'];
     		p.textContent = str.substring(0, 100) + " ...";


      		container.appendChild(box);
      		box.appendChild(card);
      		card.appendChild(h2);
      		card.appendChild(img);
      		card.appendChild(p);
		}
	} else {
  		const errorMessage = document.createElement('marquee');
    	errorMessage.textContent = `Gah, it's not working!`;
    	app.appendChild(errorMessage);
	}
}

request.send();

