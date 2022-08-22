import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { loginApi } from "../api/api.js";



let loginTemplate = () => html`
        <section id="login-page" class="login">
            <form id="login-form" action="" method="">
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>
`


function runLoginPage(){
    let siteContent = document.getElementById("site-content");
    render(loginTemplate(),siteContent)
    bussinesLogic();
}


function bussinesLogic(){
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let inputs = document.getElementsByTagName("input");
    let submitBtn = inputs[inputs.length - 1];


    submitBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        if(email.value == "" || password.value == ""){
            alert("the fields cannot be empty!");
            return
        }
       loginApi(email.value, password.value)
     
     
           
        
    })
}
export default runLoginPage;


