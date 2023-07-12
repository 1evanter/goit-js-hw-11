// import axios from 'axios';
// axios.defaults.headers.common["x-api-key"] = "38212223-f32e704a5bd5b7c02deacefa3";
import ImagesApiService from "./js/pixabay-api";

const API_KEY = '38212223-f32e704a5bd5b7c02deacefa3';

const formEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const imagesApiService = new ImagesApiService();


formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(evt) {
    evt.preventDefault();

    imagesApiService.query = evt.target.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages();
}

function onLoadMore() {
     imagesApiService.fetchImages();
}





