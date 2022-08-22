import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';
import { logout } from './api/data.js';

const main = document.getElementById('main-content');
const logoutBtn = document.getElementById('logoutBtn');


logoutBtn.addEventListener('click', async ()=>{
    await logout();

    page.redirect('/');
});


updateNav();


page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/search', decorateContext, searchPage);
page.start();





function decorateContext(ctx, next){

    ctx.render = (content) =>  render(content,main);
    ctx.updateNav = updateNav
    next();
}


function updateNav(){


    const user = document.getElementById('user');
    const guest = document.getElementById('guest');

    const token = sessionStorage.getItem('accessToken');
    if(!token){
        guest.style.display = '';
        user.style.display = 'none';
    }else{    
        guest.style.display = 'none';
        user.style.display = '';
    }
}

