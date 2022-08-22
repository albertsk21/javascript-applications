import { html } from "../../node_modules/lit-html/lit-html.js";
import { addLike, deleteTheatherById, getTheatherById, touchLikeBtn, getLikesByTheaterId } from "../api/data.js";


const detailsTemplate = (event, onDelete, addLikeBtn, likes) => html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${event.title}</h1>
                    <div>
                        <img src="${event.imageUrl}" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${event.description}</h4>
                    <h4>Author: Baz Luhrmann, Craig Pearce</h4>
                    <div class="buttons">
                        ${ sessionStorage.getItem('userId') == event._ownerId ? html`
                        <a class="btn-delete" @click = ${onDelete} href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${event._id}">Edit</a>` : html`    
                         <a class="btn-like" @click = ${addLikeBtn} href="javascript:void(0)"> Like</a>`}

                    
                    </div>
                    <p class="likes">Likes: ${likes}</p>
                </div>
            </div>
        </section>`;




export async function detailsPage(ctx){

    const id = ctx.params.id;
    const event = await getTheatherById(id);
    const likes = await getLikesByTheaterId(id);
    ctx.render(detailsTemplate(event, onDelete, addLikeBtn, likes));
    const isTouchedBtn = await touchLikeBtn(id,sessionStorage.getItem('userId'));
    const likeBtn = document.getElementsByClassName('btn-like')[0];

    if(isTouchedBtn){
        likeBtn.style.display = 'none';
    }else{  
        likeBtn.style.display = '';

    }
 
   async function onDelete(){
        await deleteTheatherById(id);
        ctx.page.redirect('/catalog')
   }


   async function addLikeBtn(){
            await addLike(id);        
            ctx.page.redirect('/details/' + id); 
   }
 
}