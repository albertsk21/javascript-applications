import {html} from '../../node_modules/lit-html/lit-html.js';
import { addLike, deleteBookById, getBookById, getLikesFromABookByUserId, getTotalLikesFromABookById } from '../api/data.js';

const detailsTemplate = (book, onDelete, likeButton,totalLikes,likeByUser) => html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->

                    ${book._ownerId == sessionStorage.getItem('userId') ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a  @click = ${onDelete} class="button" href="javascript: void(0)">Delete</a>
                    ` : ''}

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    ${!(book._ownerId == sessionStorage.getItem('userId')) && sessionStorage.getItem('userId') != null && likeByUser == 0 ? html`<a @click = ${likeButton} id = "likeButton" class="button" href="javascript: void(0)">Like</a>` : ''}

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${totalLikes}</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`

export async function detailsPage(ctx){
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    let totalLikes = Number( await getTotalLikesFromABookById(bookId));
    let likesByMe = await getLikesFromABookByUserId(bookId,sessionStorage.getItem('userId'))
    ctx.render(detailsTemplate(book,onDelete,likeButton,totalLikes,likesByMe));

    async function onDelete(){
        if(confirm('Are you sure?')){
            deleteBookById(bookId);
            ctx.page.redirect('/');
        }
    }

    async function likeButton(){

        const likesByMe = await getLikesFromABookByUserId(bookId,sessionStorage.getItem('userId'));

        if(likesByMe != 0){
            document.getElementById('likeButton').style.display = 'none';
        }else{
         
        
            document.getElementById('total-likes').innerHTML =`Likes: ${totalLikes}`;
            document.getElementById('likeButton').style.display = 'none';


         
            addLike(bookId);
            document.getElementById('total-likes').innerHTML =`Likes: ${ Number( await getTotalLikesFromABookById(bookId))}`;
        }

        
    }

}