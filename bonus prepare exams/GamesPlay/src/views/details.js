import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteGameById, findGameById, getCommentsByGameId, postComment } from '../api/data.js';

const templateDetails = (game, onDelete, comments, onSubmit) =>  html `
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">
                ${game.summary}
            </p>

            ${sessionStorage.getItem('userId') == game._ownerId ? html `<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click = ${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>` : ''}

            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${comments.length == 0 ? html`<p class="no-comment">No comments.</p>` 
                    : comments.map(comment => {return templateComment(comment)})}
                </ul>
                <!-- Display paragraph: If there are no games in the database -->
              
            </div> 

        </div>

        ${sessionStorage.getItem('userId') !== game._ownerId && sessionStorage.getItem('userId') ?
         html`<article class="create-comment">
            <label>Add new comment:</label>
            <form @submit = ${onSubmit} class="form">
                <textarea id = 'comment' name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : ''}
        
    </section>
`;

const templateComment = (comment) => html`
        <li class="comment">
                <p>${comment.comment}</p>
        </li>
`


export async function deatilsPage(ctx){
    const gameId = ctx.params.id;
    const game = await findGameById(gameId);
    const comments = await getCommentsByGameId(gameId);
    ctx.render(templateDetails(game,onDelete,comments,onSubmit));

    async function onDelete(){
        if(confirm('Are you sure?')){
            await deleteGameById(gameId);
            ctx.page.redirect('/');
        }

    }
    async function onSubmit(event){
        event.preventDefault();   
        const data = new FormData(event.target);
        const comment = data.get('comment');
        await postComment({gameId,comment});
        ctx.page.redirect(`/details/${gameId}`)

    }
}



