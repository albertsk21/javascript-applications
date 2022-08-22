import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import * as api from '../src/api/data.js';
import { logout as logoutApi } from '../src/api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myListingPage } from './views/myListings.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

window.api = api;
let main =  document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click',logout)
setUserNav();

page('/',decoratorContext,homePage);
page('/login', decoratorContext, loginPage);
page('/register',decoratorContext,registerPage);
page('/listings',decoratorContext,catalogPage);
page('/my-listings',decoratorContext,myListingPage);
page('/create',decoratorContext,createPage);
page('/details/:id',decoratorContext,detailsPage);
page('/edit/:id',decoratorContext,editPage);
page('/search',decoratorContext,searchPage);
page.start();

async function decoratorContext(ctx, next){
    ctx.render = (content) =>  render(content,main);
    ctx.setUserNav = setUserNav;
    next();
}
function setUserNav(){
    let guest = document.getElementById('guest');
    let user = document.getElementById('profile');
    const username = sessionStorage.getItem('username');

    if(username != null){
        guest.style.display = 'none';
        user.style.display = '';
        document.getElementById('user-greeting').innerHTML = `Welcome ${username}`;
    }else{
        guest.style.display = '';
        user.style.display = 'none';
    }
}

async function logout(){
   await logoutApi()
   page.redirect('/');
}