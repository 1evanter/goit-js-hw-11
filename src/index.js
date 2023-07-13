// import axios from 'axios';
// axios.defaults.headers.common["x-api-key"] = "38212223-f32e704a5bd5b7c02deacefa3";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from "./js/pixabay-api";

const API_KEY = '38212223-f32e704a5bd5b7c02deacefa3';

const refs = {
    formEl: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryEl: document.querySelector('.gallery')
};

const imagesApiService = new ImagesApiService();

refs.loadMoreBtn.style.display = 'none';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
    evt.preventDefault();
    
    imagesApiService.query = evt.target.elements.searchQuery.value;

       if (imagesApiService.query === "") {
          return Notify.failure('Please fill in the field.');
    };
    
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(hits => {
          if (hits.length === 0) {
    return  Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
        clearImageList();
        addImageCard(hits);
          refs.loadMoreBtn.style.display = 'block';
    });
}

function onLoadMore() {
     imagesApiService.fetchImages().then(addImageCard);
}


function addImageCard(hits) {
 const galleryElements = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
     return   `
     <div class="gallery-item-wrap">
        <img
          class="image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
        <div class="info">
        <p class="info-item"> <b> Likes: ${likes}</b></p>
        <p class="info-item"><b>Views: ${views}</b></p>
        <p class="info-item"><b>Comments: ${comments}</b></p>
        <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
        </div>
     `
 }).join('');
    
   return refs.galleryEl.insertAdjacentHTML('beforeend', galleryElements);
}

function clearImageList() {
    refs.galleryEl.innerHTML = '';
}




