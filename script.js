const apiKey = "cad50933";
const galleryContainer = document.querySelector('.galleryContainer');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const resetButton = document.querySelector('.reset-button');


let ans = 0;

let request = 'avengers';



let url = `http://www.omdbapi.com/?s=${request}&tag_mode=all=json&page=1&apikey=${apiKey}`; /* S */
let altUrl = `http://www.omdbapi.com/?t=${request}&tag_mode=all=json&page=1&apikey=${apiKey}`; /* T */


function showData() {

    galleryContainer.innerHTML = "";

    if(ans.Search == undefined){
        const div = document.createElement('div')
        div.classList.add('movieCard');

        const img = document.createElement("img");
        img.classList.add("gallery-img");
        img.src = (ans.Poster !== 'N/A') ? `${ans.Poster}` : './img/placeholder.png';
        img.alt = `image`;

        const text = document.createElement('p');
        text.textContent = ans.Title;

        const linkImdb = document.createElement('a');
        linkImdb.href = `https://www.imdb.com/title/${ans.imdbID}/`;
        linkImdb.textContent = 'imdb';

        div.appendChild(img);
        div.appendChild(text);
        div.appendChild(linkImdb);
        galleryContainer.appendChild(div);

        return
    }
    ans.Search.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('movieCard');

        const img = document.createElement("img");
        img.classList.add("gallery-img");
        img.src = (element.Poster !== 'N/A') ? `${element.Poster}` : './img/placeholder.png';
        img.alt = `image`;

        const text = document.createElement('p');
        text.textContent = element.Title;

        const linkImdb = document.createElement('a');
        linkImdb.href = `https://www.imdb.com/title/${ans.imdbID}/`;
        linkImdb.textContent = 'imdb';

        div.appendChild(img);
        div.appendChild(text);
        div.appendChild(linkImdb);
        galleryContainer.appendChild(div);
    });
}

async function getData() {
    url = `http://www.omdbapi.com/?s=${request}&tag_mode=all=json&page=1&apikey=${apiKey}`;
    altUrl = `http://www.omdbapi.com/?t=${request}&tag_mode=all=json&page=1&apikey=${apiKey}`; 
    
    const res = await fetch(url);
    const data = await res.json();
    ans = data;
    if (ans.Response == 'False' && ans.Error == 'Too many results.') {
        const res = await fetch(altUrl);
        const data = await res.json();
        ans = data;
        showData();
        return;
    } else if (ans.Response == 'False') {
        const div = document.createElement('div');
        div.classList.add('error-massage');
        div.textContent = ans.Error;
        galleryContainer.appendChild(div);
    } else {
        showData();
    };
}
getData();

searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    
    if(searchInput.value !== ''){request = searchInput.value;}
    getData();
});

searchInput.addEventListener('input', function () {
    if (searchInput.value == '') {
        resetButton.style.cssText = 'display: none'
        return
    }
    resetButton.style.cssText = 'display: block';
})

resetButton.addEventListener('click', function () {
    resetButton.style.cssText = 'display: none'
})