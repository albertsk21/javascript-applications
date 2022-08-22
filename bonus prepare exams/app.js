
import {render} from '../node_modules/lit-html/lit-html.js';
import * as api from '../src/api/data.js';
import { logout as logoutApi } from '../src/api/data.js';
import page from '../node_modules/page/page.mjs';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

window.api = api;
const main = document.getElementById('main-content');
document.getElementById("logoutBtn").addEventListener("click",logout)
setUserNav();

page('/login',decoratorContext,loginPage);
page('/register',decoratorContext,registerPage);
page('/',decoratorContext,homePage);
page('/catalogue',decoratorContext,catalogPage);
page('/create',decoratorContext,createPage);
page('/details/:id',decoratorContext,detailsPage)
page('/edit/:id',decoratorContext,editPage);
page.start();



function decoratorContext(ctx,next){
    ctx.render = (content) => render(content,main);
    ctx.setUserNav = setUserNav;
    next();
}
function setUserNav(){
    const email = sessionStorage.getItem('email');
    if(email){
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';     
    }
}

async function logout(){
    await logoutApi();
    page.redirect('/');
}