import {html} from "../../node_modules/lit-html/lit-html.js";
import { createGame } from "../api/data.js";


const templateCreate = (onSubmit) => html`

<section id="create-page" class="auth">
        <form @submit = ${onSubmit} id="create">
            <div class="container">

                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
`


export async function createPage(ctx){
    ctx.render(templateCreate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);
        const title = data.get('title');
        const category = data.get('category');
        const maxLevel = data.get('maxLevel');
        const imageUrl = data.get('imageUrl');
        const summary = data.get('summary');

        if(!title || !category || !maxLevel || !imageUrl || !summary){
            return alert("fileds cannot be empty");
        }

        await createGame({title,category,maxLevel,imageUrl,summary});
        ctx.page.redirect('/');
    }


}
