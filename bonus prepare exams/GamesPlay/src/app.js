import * as api from "./api/data.js" ;
import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/login.js";
import {logout as logoutApi} from './api/data.js';
import { registerPage } from "./views/register.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { deatilsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

window.api = api;

let main = document.getElementById("main-content");
document.getElementById("logoutBtn").addEventListener('click',logout);
navUpdate();

page('/',decoratorContext,homePage);
page('/login',decoratorContext,loginPage);
page('/register',decoratorContext,registerPage);
page('/catalog',decoratorContext,catalogPage);
page('/create',decoratorContext,createPage);
page('/details/:id',decoratorContext,deatilsPage);
page('/edit/:id',decoratorContext,editPage);
page.start();


async function decoratorContext(ctx,next){
    ctx.render = (content) => render(content,main);
    ctx.navUpdate = navUpdate;
    next()
}

export function navUpdate(){
    let user = document.getElementById("user");
    let guest = document.getElementById("guest");
    const email = sessionStorage.getItem("email");

    if(email){
        user.style.display = '';
        guest.style.display = 'none';
    }else{
        user.style.display = 'none';
        guest.style.display = '';
        
    }

}

async function logout(){
    await logoutApi();
    page.redirect('/');
}