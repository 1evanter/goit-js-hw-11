// import axios from 'axios';

const API_KEY = '38212223-f32e704a5bd5b7c02deacefa3';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

   async fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    //     const res = await axios.get(`${BASE_URL}`, {
    //         params: {
    //       key: API_KEY,
    //       q: this.searchQuery,
    //       image_type: "photo",
    //       orientation: "horizontal",
    //       safesearch: true,
    //       page: this.page,
    //       per_page: 40,
    //     }
    //    });
       
       const res = await fetch(url);
       const images = await res.json();
       this.incrementPage();
       return images.hits;  
    };

    incrementPage() {
        this.page += 1;
}

    resetPage() {
        this.page = 1;
}

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
      this.searchQuery = newQuery;
    };
}