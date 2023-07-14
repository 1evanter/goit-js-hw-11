import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesApiService from "./js/pixabay-api";

const refs = {
    formEl: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryEl: document.querySelector('.gallery')
};

const imagesApiService = new ImagesApiService();

refs.loadMoreBtn.style.display = 'none';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(evt) {
    evt.preventDefault();

    imagesApiService.query = evt.target.elements.searchQuery.value;

       if (imagesApiService.query === "") {
          return Notify.failure('Please fill in the field.');
    };

    imagesApiService.resetPage();

try {
    const hits = await imagesApiService.fetchImages();
    if (hits.length === 0) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    
    clearImageList();
   
        addImageCard(hits);
    refs.loadMoreBtn.style.display = 'block';
    
       if (hits.length < 40) {
        refs.loadMoreBtn.style.display = 'none';
      return  Notify.info("We're sorry, but you've reached the end of search results.");
    }
} catch (error) {
    throw new Error(error);
}
}

async function onLoadMore() {
    const hits = await imagesApiService.fetchImages();
    try {
        addImageCard(hits);
           if (hits.length < 40) {
        refs.loadMoreBtn.style.display = 'none';
      return  Notify.info("We're sorry, but you've reached the end of search results.");
    }
    } catch (error) {
        throw new Error(error)
    }
}


function addImageCard(hits) {
 const galleryElements = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
     return   `
     <div class="photo-card">
       <a href="${largeImageURL}"> <img
          class="image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        /> </a>
        <div class="info">
        <p class="info-item"> <b> Likes: ${likes}</b></p>
        <p class="info-item"><b>Views: ${views}</b></p>
        <p class="info-item"><b>Comments: ${comments}</b></p>
        <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
        </div>
     `
 }).join('');
    
    refs.galleryEl.insertAdjacentHTML('beforeend', galleryElements);
    createLightBox();
}

function clearImageList() {
    refs.galleryEl.innerHTML = '';
}

function createLightBox() {
   const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: "alt",
  });
    lightbox.refresh();
    return;
}