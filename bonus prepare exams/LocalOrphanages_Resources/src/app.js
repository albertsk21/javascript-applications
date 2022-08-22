import { render } from "../node_modules/lit-html/lit-html.js";
import * as api from "./api/data.js" ;
import page from "../node_modules/page/page.mjs";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
window.api = api;


const main = document.getElementById("main-content");
const logoutBtn = document.getElementById("logoutBtn");
updateNav();


page('/', decoratorContext,dashboardPage);
page("/login",decoratorContext, loginPage);
page("/register",decoratorContext, registerPage);
page("/create",decoratorContext, createPage);
page("/details/:id",decoratorContext,detailsPage);
page("/edit/:id",decoratorContext,editPage);
page.start();


async function decoratorContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    next();
}

function updateNav(){
  
    const user = document.getElementById("user");
    const guest = document.getElementById("guest");

    const token = sessionStorage.getItem("userToken");
    if(token){

        guest.style.display = "none";
        user.style.display = "";

    }else{        
        guest.style.display = "";
        user.style.display = "none";

    }

}





logoutBtn.addEventListener("click", async () =>{
    api.logout();
    page.redirect("/");

})