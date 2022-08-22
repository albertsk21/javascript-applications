import { html } from "../../node_modules/lit-html/lit-html.js";
import { createPost } from "../api/data.js";


const createFormTemplate = (onSubmit) =>html`
        <!-- Create Page (Only for logged-in users) -->
        <section id="create-page" class="auth">
                <form @submit = "${onSubmit}"id="create">
                    <h1 class="title">Create Post</h1>
    
                    <article class="input-group">
                        <label for="title">Post Title</label>
                        <input type="title" name="title" id="title">
                    </article>
    
                    <article class="input-group">
                        <label for="description">Description of the needs </label>
                        <input type="text" name="description" id="description">
                    </article>
    
                    <article class="input-group">
                        <label for="imageUrl"> Needed materials image </label>
                        <input type="text" name="imageUrl" id="imageUrl">
                    </article>
    
                    <article class="input-group">
                        <label for="address">Address of the orphanage</label>
                        <input type="text" name="address" id="address">
                    </article>
    
                    <article class="input-group">
                        <label for="phone">Phone number of orphanage employee</label>
                        <input type="text" name="phone" id="phone">
                    </article>
    
                    <input type="submit" class="btn submit" value="Create Post">
                </form>
            </section>`;


export async function createPage(ctx){

    ctx.render(createFormTemplate(onSubmit));
    
    async function onSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get("title");
        const description = formData.get("description");
        const imageUrl = formData.get("imageUrl");
        const address = formData.get("address");
        const phone = formData.get("phone");
        


        if(!title || !description || !imageUrl || !address || !phone){
            return alert("Fields cannot be empty!");
        }


        const data = {
            title,
            description,
            imageUrl,
            address,
            phone
          };

          

          await createPost(data);

          ctx.page.redirect("/");

    }


}