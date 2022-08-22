import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs"
import { logout } from "./api/data.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashoard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";


let main = document.getElementById("content");

document.getElementById('logoutBtn').addEventListener('click', logoutRunner);
updateNav();



page('/',decorateContext, homePage);
page('/login', decorateContext, loginPage)
page('/register', decorateContext, registerPage)
page('/dashboard',decorateContext, dashboardPage);
page('/create',decorateContext, createPage)
page('/details/:id',decorateContext, detailsPage)
page('/edit/:id',decorateContext, editPage)
page.start();







 function decorateContext(ctx, next){
    ctx.render = (content) => render(content,main);
    ctx.updateNav = updateNav;
    next();
}





function updateNav(){

    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const token = sessionStorage.getItem("token");

    if(token == null){
        user.style.display = "none";
        guest.style.display = "";
    }else{
        user.style.display = "";
        guest.style.display = "none";
  
    }
}





async function logoutRunner(event){
    event.preventDefault();
    await logout();
    page.redirect('/');
}