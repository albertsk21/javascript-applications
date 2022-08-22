import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../api/data.js";


const catalofTemplate = (albums) => html`
            <section id="catalogPage">
                <h1>All Albums</h1>
    

                ${albums.length > 0 ? albums.map(album => albumTemplate(album)) : html` <p>No Albums in Catalog!</p>`}

    

    
               
    
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

                /*artist: "Pink Floyd"
description: "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records."
genre: "Rock Music"
imgUrl: "/images/pinkFloyd.jpg"
name: "The Dark Side of the Moon"
price: "28.75"
releaseDate: "March 1, 1973"*/
export async function catalogPage(ctx){



    const albums = await getAllAlbums();
    ctx.render(catalofTemplate(albums));

}