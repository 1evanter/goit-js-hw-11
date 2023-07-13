const e={formEl:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more"),galleryEl:document.querySelector(".gallery")},t=new class{constructor(){this.searchQuery="",this.page=1}fetchImages(){let e=`https://pixabay.com/api/?key=38212223-f32e704a5bd5b7c02deacefa3&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;return fetch(e).then(e=>e.json()).then(e=>(this.incrementPage(),e.hits))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}};function a(t){let a=t.map(({webformatURL:e,largeImageURL:t,tags:a,likes:s,views:r,comments:l,downloads:n})=>`<li class="gallery-item">
     <div class="gallery-item-wrap">
        <img
          class="image"
          src="${e}"
          data-source="${t}"
          alt="${a}"
         
        />
        <div class="image-info">
        <p class="image-likes">Likes: ${s}</p>
        <p class="image-views">Views: ${r}</p>
        <p class="image-comments">Comments: ${l}</p>
        <p class="image-downloads">Downloads: ${n}</p>
        </div>
        </div>
      </li>`).join("");return e.galleryEl.insertAdjacentHTML("beforeend",a)}function s(){e.galleryEl.innerHTML=""}e.loadMoreBtn.style.display="none",e.formEl.addEventListener("submit",function(r){r.preventDefault(),e.loadMoreBtn.style.display="block",s(),t.query=r.target.elements.searchQuery.value,t.resetPage(),t.fetchImages().then(e=>{s(),a(e)})}),e.loadMoreBtn.addEventListener("click",function(){t.fetchImages().then(a)});
//# sourceMappingURL=index.0671aaad.js.map
