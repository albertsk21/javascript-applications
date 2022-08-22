import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { registerApi } from "../api/api.js";

let registerTemplate = () =>  html`

    <section id="register-page" class="register">
                <form id="register-form" action="" method="">
                    <fieldset>
                        <legend>Register Form</legend>
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
                        <p class="field">
                            <label for="repeat-pass">Repeat Password</label>
                            <span class="input">
                                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                            </span>
                        </p>
                        <input class="button submit" type="submit" value="Register">
                    </fieldset>
                </form>
    </section>
`


function runRegisterPage(){
    let siteContent = document.getElementById("site-content");
    render(registerTemplate(),siteContent);
    bussinesLogic();
}


function bussinesLogic(){

    let submitButton = document.getElementsByClassName("submit")[0];

    let email =  document.getElementById("email");
    let password =  document.getElementById("password");
    let rePass =  document.getElementById("repeat-pass");

 

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();


            if(email.value == "" || password.value == "" || rePass.value == ""){
                alert("fields cannot be empty");
                return;
         
            }else if(rePass.value !== password.value){
                alert("the passwords is not the same");
                return;
            }
    
    
      
        

            registerApi(email.value, password.value);
            window.location.href = "/";    
    });

}



export default runRegisterPage;
