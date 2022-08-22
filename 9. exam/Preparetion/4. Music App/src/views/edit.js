import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbumById, getAlbumById } from "../api/data.js";


const editTemplate = ( album, onSubmit ) => html`
            <section class="editPage">
                <form @submit = ${onSubmit} >
                    <fieldset>
                        <legend>Edit Album</legend>
    
                        <div class="container">
                            <label for="name" class="vhide">Album name</label>
                            <input id="name" name="name" class="name" type="text" value="${album.name}">
    
                            <label for="imgUrl" class="vhide">Image Url</label>
                            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">
    
                            <label for="price" class="vhide">Price</label>
                            <input id="price" name="price" class="price" type="text" value="${album.price}">
    
                            <label for="releaseDate" class="vhide">Release date</label>
                            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">
    
                            <label for="artist" class="vhide">Artist</label>
                            <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">
    
                            <label for="genre" class="vhide">Genre</label>
                            <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">
    
                            <label for="description" class="vhide">Description</label>
                            <textarea name="description" class="description" rows="10"
                                cols="10">${album.description}</textarea>
    
                            <button class="edit-album" type="submit">Edit Album</button>
                        </div>
                    </fieldset>
                </form>
            </section>`;


export async function editPage(ctx){
 
    const id = ctx.params.id;
    const album = await getAlbumById(id);
    ctx.render(editTemplate(album,onSubmit))
    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const artist = formData.get('artist');
        const imgUrl = formData.get('imgUrl');
        const price = formData.get('price');
        const genre = formData.get('genre');
        const releaseDate= formData.get('releaseDate');
        const description = formData.get('description');

        if(!name || !imgUrl || !price || !genre || !description || !releaseDate || !artist){
            return alert('Fields cannot be empty!');
        }


        const data = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
          }
          
          await editAlbumById(data,id);
          ctx.page.redirect('/catalog');
    }
}