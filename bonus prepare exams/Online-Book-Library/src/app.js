
import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { loginPage } from './views/login.js';
import {logout as logoutApi} from '../src/api/data.js';
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { myBooksPage } from './views/myBooks.js';
import { addBookPage } from './views/addBook.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';


let main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click',logout);
setUserNav();
page('/login',decoratorContext,loginPage);
page('/register',decoratorContext,registerPage);
page('/',decoratorContext,dashboardPage);
page('/myBooks',decoratorContext,myBooksPage);
page('/create',decoratorContext,addBookPage);
page('/details/:id',decoratorContext,detailsPage);
page('/edit/:id',decoratorContext,editPage)
page.start();


function decoratorContext(ctx,next){
    ctx.render = (content) => render(content,main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav(){
    const email = sessionStorage.getItem("email");
    if(email != null){
        document.querySelector('#user > span').textContent = `Welcome, ${email}`;
        document.getElementById('user').style.display = ''
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = '';
    }
}


async function logout(){
   await logoutApi();
    setUserNav();
    page.redirect('/');
}