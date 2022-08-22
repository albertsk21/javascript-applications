import {html, render} from "../node_modules/lit-html/lit-html.js";

import productLayout from "../layoutProducts/productLayout.js";


function processing(){
    let baseUrl = "http://localhost:3030/data/catalog";
    let storageProduct = document.getElementsByClassName("container")[0].getElementsByTagName("div")[2]; 

   fetch(baseUrl)
   .then(convert => convert.json())
   .then(token =>{
       let generate = (items) => html`
            ${items.map(item => {return productLayout(item)})}
       `;

       render(generate(token),storageProduct);
   })



   
} 
processing();