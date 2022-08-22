import page from "../node_modules/page/page.mjs"
import navUpdate  from "../src/template/navigationBar.js";
import { redirectDashboard } from "./functions/functions.js";
import { runDashboardPage } from "./template/dashboard.js";
import { runDetailsPage } from "./template/details.js";
import { runEditPage } from "./template/edit.js";
import runLoginPage from "./template/login.js";
import { runMyBooksPage } from "./template/myBooks.js";
import { runNewBook } from "./template/newBook.js";
import runRegisterPage from "./template/register.js";




function run(){
    navUpdate();
    page("/login", runLoginPage);
    page("/register",runRegisterPage);
    page("/",runDashboardPage);
    page("/index.html",redirectDashboard);
    page("/addBook",runNewBook);
    page("/myBooks",runMyBooksPage);
    page("/details",runDetailsPage);
    page("/edit",runEditPage)
    page();
}
run();