import {html} from "../../node_modules/lit-html/lit-html.js"



let bookTemplate = (item) => html`
                <li class="otherBooks">
                    <h3>${item.title}</h3>
                    <p>Type: ${item.type}</p>
                    <p class="img"><img src=".${item.imageUrl}"></p>
                    <a @click = ${() =>{
                       sessionStorage.setItem("book-title",item.title);
                    
                    }} class="button" href="./details">Details</a>
                </li>
`;





export default bookTemplate;