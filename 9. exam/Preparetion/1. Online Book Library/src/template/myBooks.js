import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { getBookByUserId } from "../api/api.js";
import bookTemplate from "./book.js";


let myBookTemplate = (items) => html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
                ${items.map(item => {
                    return bookTemplate(item);
                })}
            </ul>
            <!-- Display paragraph: If the user doesn't have his own books  -->
            <!-- <p class="no-books">No books in database!</p> -->
        </section>
`
let myBookEmptyTemplate = () => html`
        <section id="my-books-page" class="my-books">
            <!-- Display paragraph: If the user doesn't have his own books  -->
            <p class="no-books">No books in database!</p>
        </section>
`

export function runMyBooksPage(){
    let container = document.getElementById("site-content");
    getBookByUserId()
    .then(tokens => {
        if(tokens.length == 0 ){
            render(myBookEmptyTemplate(),container);
        }else{
            render(myBookTemplate(tokens),container);
        }
    })
}