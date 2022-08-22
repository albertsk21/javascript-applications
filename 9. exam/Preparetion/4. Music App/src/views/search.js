import { html ,render} from "../../node_modules/lit-html/lit-html.js";
import { findAlnumByName } from "../api/data.js";

const searchTemplate = (onSearch) => html`
      <section id="searchPage">
                <h1>Search by Name</h1>
    
                <div class="search">
                    <input  id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                    <button @click = ${onSearch} class="button-list">Search</button>
                </div>
    
                <h2>Results:</h2>
    
                <!--Show after click Search button-->
                <div class="search-result">
                    <!--If have matches-->
                   
    
                    <!--If there are no matches-->
                   
                </div>
            </section>`;

            
const albumTemplate = (album) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
        ${sessionStorage.getItem('accessToken') != null ? html` <a href="/details/${album._id}" id="details">Details</a>` : ''};

        </div>
    </div>
</div>`


export async function searchPage(ctx){
     

    ctx.render(searchTemplate(onSearch))
    async function onSearch(){
        const searchContent = document.getElementById('search-input').value;
        const searchResult = document.getElementsByClassName('search-result')[0];

        const albums = await findAlnumByName(searchContent);


        const albumsTemplate = (albums) => html`
        
        ${albums.length > 0 ?  albums.map(album => albumTemplate(album)) : html` <p class="no-result">No result.</p>`}
        ` 
        render(albumsTemplate(albums),searchResult);


    }
}