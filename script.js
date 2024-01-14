const accessKey = 'D0sqFZ_Vy59oR12HxEZ6x6BiwoWlqsWOEPtkggfzMjY';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreButton = document.querySelector('.loadMoreButton');

//Function to fetch images using Unsplash API

const fetchImages = async (query, pageNo) => {
    if (page===1){
        imagesContainer.innerHTML = '';
    }
    
    const url = `https://api.unsplash.com/search/photos/?query=${encodeURIComponent(query)}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    data.results.forEach(photo => {
        const imageElement = document.createElement('div');
        imageElement.innerHTML = `<img src= "${photo.urls.regular}"/>`;
        imagesContainer.appendChild(imageElement);
    });

    if (data.total_pages === pageNo) {
        loadMoreButton.computedStyleMap.display = "none";
    } else {
        loadMoreButton.style.display = "block";
    }
}
let page = 1;

// Adding event listener to search form

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText, page);
    } 
    else{
        imagesContainer.innerHTML = `<h3>Please enter a search query</h3>`
    }
});

// Adding event listener to load more button
loadMoreButton.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});