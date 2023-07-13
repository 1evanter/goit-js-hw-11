// import axios from 'axios';
// axios.defaults.headers.common["x-api-key"] = "38212223-f32e704a5bd5b7c02deacefa3";
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

    refs.loadMoreBtn.style.display = 'block';

    clearImageList();
    imagesApiService.query = evt.target.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(hits => {
        clearImageList();
        addImageCard(hits)
    });
}

function onLoadMore() {
     imagesApiService.fetchImages().then(addImageCard);
}


function addImageCard(hits) {
 const galleryElements = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
     return   `<li class="gallery-item">
     <div class="gallery-item-wrap">
        <img
          class="image"
          src="${webformatURL}"
          data-source="${largeImageURL}"
          alt="${tags}"
         
        />
        <div class="image-info">
        <p class="image-likes">Likes: ${likes}</p>
        <p class="image-views">Views: ${views}</p>
        <p class="image-comments">Comments: ${comments}</p>
        <p class="image-downloads">Downloads: ${downloads}</p>
        </div>
        </div>
      </li>`
 }).join('');
    
   return refs.galleryEl.insertAdjacentHTML('beforeend', galleryElements);
}

function clearImageList() {
    refs.galleryEl.innerHTML = '';
}



