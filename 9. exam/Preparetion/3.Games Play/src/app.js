import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { cataloguePage } from './views/all-games.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { logout } from './api/data.js';


const main = document.getElementById('main-content');
const logoutBtn = document.getElementById('logoutBtn');

updateNav();

page('/' ,decorateContext, homePage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext, registerPage);
page('/catalogue',decorateContext, cataloguePage);
page('/create',decorateContext, createPage);
page('/details/:id',decorateContext, detailsPage);
page('/edit/:id',decorateContext, editPage);
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    next();
}


logoutBtn.addEventListener('click',async function(){
    await logout();
    page.redirect('/');
});

function updateNav(){
    const guest = document.getElementById('guest');
    const users = document.getElementById('user');

    const token = sessionStorage.getItem('accessToken');
    if(!token){
        guest.style.display = '';
        users.style.display = 'none'; 
    }else{
        guest.style.display = 'none';
        users.style.display = '';     
    }

}

