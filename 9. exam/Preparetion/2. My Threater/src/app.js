import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { indexPage } from './views/index.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import * as api from '../src/api/data.js'
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';



window.api = api;
let main = document.getElementById('content');
let logoutBtn= document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', ()=>{
    api.logout();
    page.redirect('/');
    updateNav();
})
updateNav();

page('/',decorateContext, loginPage);
page('/login', decorateContext, loginPage);
page('/register',decorateContext,registerPage);
page('/catalog',decorateContext,indexPage);
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile',decorateContext,profilePage);
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content,main);
    ctx.updateNav = updateNav;
    next();
}


function updateNav(){
    const user = document.getElementsByClassName('user')[0];
    const guest = document.getElementsByClassName('guest')[0];

    let token = sessionStorage.getItem('accessToken');
    if(!token){
        user.style.display = "none";
        guest.style.display = "";
    }else{
        user.style.display = "";
        guest.style.display = "none";
    }
}




