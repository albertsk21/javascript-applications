import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../api/data.js";


const catalogueTemplate = (games) =>  html`
            <section id="catalog-page">
                <h1>All Games</h1>
                <!-- Display div: with information about every game (if any) -->


                ${games.length > 0 ? games.map(game =>  gameTemplate(game)) 
                    : html` <h3 class="no-articles">No articles yet</h3>`}
 
    
                <!-- Display paragraph: If there is no games  -->
               
            </section>`



const gameTemplate = (game) => html`
                <div class="allGames">
                    <div class="allGames-info">
                        <img src="${game.imageUrl}">
                        <h6>Action</h6>
                        <h2>${game.title}</h2>
                        <a href="/details/${game._id}" class="details-button">Details</a>
                    </div>
                </div>`;



export async function cataloguePage(ctx){

    const games = await getAllGames();
    ctx.render(catalogueTemplate(games));
}


