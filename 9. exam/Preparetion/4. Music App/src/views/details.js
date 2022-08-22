import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbumById, getAlbumById } from "../api/data.js";



const detailsTemplate = (album, onDelete) => html`
      <section id="detailsPage">
                <div class="wrapper">
                    <div class="albumCover">
                        <img src="${album.imgUrl}">
                    </div>
                    <div class="albumInfo">
                        <div class="albumText">
    
                            <h1>Name: ${album.title}</h1>
                            <h3>Artist: ${album.artist}</h3>
                            <h4>Genre: ${album.genre}</h4>
                            <h4>Price: $${album.price}</h4>
                            <h4>Date: ${album.releaseDate}</h4>
                            <p>Description: ${album.description}</p>
                        </div>
    
                        <!-- Only for registered user and creator of the album-->
                        ${sessionStorage.getItem('userId') == album._ownerId ? html`
                        <div class="actionBtn">
                            <a href="/edit/${album._id}" class="edit">Edit</a>
                            <a @click = ${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                        </div>` : ''}
                    </div>
                </div>
            </section>`

export async function detailsPage(ctx){


    const id = ctx.params.id;
    const album = await getAlbumById(id);
    ctx.render(detailsTemplate(album, onDelete));


    async function onDelete(){

        await deleteAlbumById(id);
        ctx.page.redirect('/catalog');
    }

}