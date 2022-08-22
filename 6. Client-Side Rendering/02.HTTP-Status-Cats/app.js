import { cats} from './catSeeder.js';
import {html, render } from './node_modules/lit-html/lit-html.js';




let layoutCat = (cat) => html 
`<li>
    <img src="./images/cat${cat.id}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${e => showMore(e)} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="100">
                <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
            </div>
    </div>
</li>
`;



let allCats = (items) => html `
<ul> 
${items.map((cat) =>{
    return layoutCat(cat);
})}
</ul>`;


render(allCats(cats),document.getElementById("allCats"))

function showMore(e){
    let currentLink = e.currentTarget.parentNode;
    let detailsCatElement = currentLink.getElementsByClassName("status")[0];

    let button = currentLink.getElementsByClassName("showBtn")[0];
    let text =  button.innerHTML;
   


    if(button.innerHTML === "Show status code"){
        button.innerHTML = "Hide status code";
        detailsCatElement.style.display = 'block'
    }else if(button.innerHTML === "Hide status code"){

        button.innerHTML = "Show status code";
        detailsCatElement.style.display = 'none'

    }


   

   console.log(text);
}