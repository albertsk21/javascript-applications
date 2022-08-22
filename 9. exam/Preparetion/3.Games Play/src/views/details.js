import { html } from "../../node_modules/lit-html/lit-html.js";
import { addMessage, deleteGameById, getCommentsByGameId, getGameById } from "../api/data.js";


const detailsTemplate = (game, commentsGame, deleteBtn, sendComment) => html`
    
            <!--Details Page-->
            <section id="game-details">
                <h1>Game Details</h1>
                <div class="info-section">
    
                    <div class="game-header">
                        <img class="game-img" src="${game.imageUrl}" />
                        <h1>${game.title}</h1>
                        <span class="levels">MaxLevel: ${game.maxLevel}</span>
                        <p class="type">Action, Crime, Fantasy</p>
                    </div>
    
                    <p class="text">
                       ${game.summary}
                    </p>
    
                    <!-- Bonus ( for Guests and Users ) -->
                    <div class="details-comments">
                        <h2>Comments:</h2>
                        ${commentsGame.length > 0 ? commentsContainer(commentsGame) : html`<p class="no-comment">No comments.</p>`}
                        <!-- Display paragraph: If there are no games in the database -->
                        
                    </div>
    
                    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                        ${sessionStorage.getItem('userId') == game._ownerId ? html`
                        <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a @click = ${deleteBtn} href="javascript:void(0)" class="button">Delete</a>
                    </div>` : ''}
                </div>
    
                <!-- Bonus -->
                <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->



                ${sessionStorage.getItem('userId')  != null && sessionStorage.getItem('userId') != game._ownerId ? html`
                <article class="create-comment">
                    <label>Add new comment:</label>
                    <form @submit = ${sendComment} class="form">
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>`: ''}
    
            </section>`;


const commentsContainer = (comments) => html`
                        <ul>
                            <!-- list all comments for current game (If any) -->
                            ${comments.map(comment => commentTemplate(comment))}
                        </ul>
`

const commentTemplate = (comment) => html`
                            <li class="comment">
                                <p>Content: ${comment.comment} </p>
                            </li>
`


export async function detailsPage(ctx){
    const id = ctx.params.id;
    const game = await getGameById(id);
    const commentsGame = await getCommentsByGameId(id);
    ctx.render(detailsTemplate(game, commentsGame, deleteGame, sendComment));

    
   async function deleteGame(){
        await deleteGameById(id);
        ctx.page.redirect('/');
    }

    async function sendComment(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const comment = formData.get('comment');
        await addMessage(id, comment);
        ctx.page.redirect('/details/' + id);
    }
}
