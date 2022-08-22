import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";


const loginTemplate = (onSubmit) => html`
   <!-- Login Page (Only for Guest users) -->
<section id="login-page" class="auth">
                <form @submit = "${onSubmit}" id="login">
                    <h1 class="title">Login</h1>
    
                    <article class="input-group">
                        <label for="login-email">Email: </label>
                        <input type="email" id="login-email" name="email">
                    </article>
    
                    <article class="input-group">
                        <label for="password">Password: </label>
                        <input type="password" id="password" name="password">
                    </article>
    
                    <input type="submit" class="btn submit-btn" value="Log In">
                </form>
</section>
`

export async function loginPage(ctx){

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

       const data =  new FormData(event.target);
       const email = data.get('email');
       const password = data.get('password');

       if(!email || !password){
        return alert("fileds cannot be empty");
       }
       await login(email,password);
       ctx.updateNav();
       ctx.page.redirect('/');   
    }


}