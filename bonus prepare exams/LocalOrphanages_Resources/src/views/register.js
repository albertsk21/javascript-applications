import { html } from "../../node_modules/lit-html/lit-html.js";
import { register} from "../api/data.js";


const registerTemplate = (onSubmit) => html`
            <!-- Register Page (Only for Guest users) -->
            <section id="register-page" class="auth">
                <form @submit = "${onSubmit}" id="register">
                    <h1 class="title">Register</h1>
    
                    <article class="input-group">
                        <label for="register-email">Email: </label>
                        <input type="email" id="register-email" name="email">
                    </article>
    
                    <article class="input-group">
                        <label for="register-password">Password: </label>
                        <input type="password" id="register-password" name="password">
                    </article>
    
                    <article class="input-group">
                        <label for="repeat-password">Repeat Password: </label>
                        <input type="password" id="repeat-password" name="repeatPassword">
                    </article>
    
                    <input type="submit" class="btn submit-btn" value="Register">
                </form>
            </section>
        
`

export async function registerPage(ctx){

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

       const data =  new FormData(event.target);
       const email = data.get('email');
       const password = data.get('password');
       const confirmPassword = data.get("repeatPassword");

       if(!email || !password || !confirmPassword ){
        return alert("Fields cannot be empty");
       }else if(password != confirmPassword){
        return alert("Passwords dosen't match")
       }

       await register(email,password);
       ctx.updateNav();
       ctx.page.redirect('/');   
    }

}