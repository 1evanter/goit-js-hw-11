const API_KEY = '38212223-f32e704a5bd5b7c02deacefa3';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(url).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.status)
        }).then(({ hits }) => {
            this.incrementPage();
         
            return hits;
        });    
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