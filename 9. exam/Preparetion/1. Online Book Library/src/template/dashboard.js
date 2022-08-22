import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "../api/api.js";
import bookTemplate from "../template/book.js";




let dashboardTemplate = (items) => html`

<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
                    ${items.map(item => {
                        return bookTemplate(item);
                    })}
            </ul>
            <!-- Display paragraph: If there are no books in the database -->
            <!-- <p class="no-books">No books in database!</p> -->
</section>
`

let emptyDashboard = () =>  html`
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>      
            <!-- Display paragraph: If there are no books in the database -->
            <p class="no-books">No books in database!</p>
</section>
`

export function runDashboardPage(){
    sessionStorage.removeItem("book-name");
    let container = document.getElementById("site-content");
    getAllBooks()
    .then(tokens =>{
        if(tokens.length == 0){
            render(emptyDashboard(),container);
        }else{
            render(dashboardTemplate(tokens),container);
        }
    
    });
}