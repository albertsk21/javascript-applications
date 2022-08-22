import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getBookByName } from "../api/api.js";




let detailsTemplate = (item) => html`

    <section id="details-page" class="details">
            <div class="book-information">
                <h3>${item.title}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=".${item.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a @click = ${() =>{
                        sessionStorage.setItem("book-name",item.title);
                    }} class="button" href="/edit">Edit</a>
                    <a @click = ${() =>{
                        deleteItem(item.title);
                        window.location.href = "/";
                    }}  class="button" href="/">Delete</a>

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <a class="button" href="#">Like</a>

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>

        </section>


`;
let detailsWithoutButtons =  (item) => html`

<section id="details-page" class="details">
        <div class="book-information">
            <h3>${item.title}</h3>
            <p class="type">Type: ${item.type}</p>
            <p class="img"><img src=".${item.imageUrl}"></p>
            <div class="actions">
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <a class="button" href="#">Like</a>

                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
        </div>

    </section>


`;

export function runDetailsPage(){
    detailsLogic();
}


function detailsLogic(){
    let bookTitle = sessionStorage.getItem("book-title");

    let container = document.getElementById("site-content");
    getBookByName(bookTitle)
    .then(tokens => {

        if(tokens[0]._ownerId == sessionStorage.getItem("user-id")){
            render(detailsTemplate(tokens[0]),container);
        }else{
            render(detailsWithoutButtons(tokens[0]), container);
        }
       
    })
    
    
}
