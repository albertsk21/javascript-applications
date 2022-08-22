import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const loginTemplate = (onSubmit) =>html`
           <!--Login Page-->
           <section id="loginPage">
            <form @submit = "${onSubmit}" class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
  
            </form>
        </section>
`;



export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));
    async function onSubmit(event){
        event.preventDefault();
        
        

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

    
        if(!password || !email){
            return alert('Fields cannot be empty!');
        }


        await login(email, password);
        ctx.page.redirect('/');
    }
}