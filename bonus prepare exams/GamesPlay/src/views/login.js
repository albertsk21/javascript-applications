import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const  templateLogin = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form @submit = ${onSubmit} id="login">

            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`


export async function loginPage(ctx){
    ctx.render(templateLogin(onSumbit));
    async function onSumbit(event){
       event.preventDefault();

       const data =  new FormData(event.target);
       const email = data.get('email');
       const password = data.get('password');

       if(!email || !password){
        return alert("fileds cannot be empty");
       }
       await login(email,password);
       ctx.navUpdate();
       ctx.page.redirect('/');   
       
    }

}
