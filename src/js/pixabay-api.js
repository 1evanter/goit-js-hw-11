export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        // const options = {
        //     headers: {
        //         Authorization: '38212223-f32e704a5bd5b7c02deacefa3'
        //     }
        // };

        const url = `https://pixabay.com/api/?key=38212223-f32e704a5bd5b7c02deacefa3&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(url).then(res => res.json()).then(data => {
            this.incrementPage();
         
            return data.hits;
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