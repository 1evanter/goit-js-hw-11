!function(){let e={formEl:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more"),imageListEl:document.querySelector(".image-list")},t=new class{constructor(){this.searchQuery="",this.page=1}fetchImages(){let e=`https://pixabay.com/api/?key=38212223-f32e704a5bd5b7c02deacefa3&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;return fetch(e).then(e=>e.json()).then(e=>(this.incrementPage(),e.hits))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}};function a(t){let a=t.map(({webformatURL:e,largeImageURL:t,tags:a,likes:s,views:i,comments:r,downloads:n})=>`<li class="image-item">
     <div class="image-item-wrap">
        <img
          class="image"
          src="${e}"
          data-source="${t}"
          alt="${a}"
         
        />
        <div class="image-info">
        <p class="image-likes">Likes: ${s}</p>
        <p class="image-views">Views: ${i}</p>
        <p class="image-comments">Comments: ${r}</p>
        <p class="image-downloads">Downloads: ${n}</p>
        </div>
        </div>
      </li>`).join("");return e.imageListEl.insertAdjacentHTML("beforeend",a)}function s(){e.imageListEl.innerHTML=""}e.formEl.addEventListener("submit",function(e){e.preventDefault(),s(),t.query=e.target.elements.searchQuery.value,t.resetPage(),t.fetchImages().then(e=>{s(),a(e)})}),e.loadMoreBtn.addEventListener("click",function(){t.fetchImages().then(a)})}();
//# sourceMappingURL=index.1e427231.js.map
