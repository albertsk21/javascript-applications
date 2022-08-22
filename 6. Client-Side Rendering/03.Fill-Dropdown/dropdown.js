import {html, render} from './node_modules/lit-html/lit-html.js';

function addItem() {
    

    let optionLayout = (element) => html` <option id= "${element._id}">${element.text}</option>`;
    let baseUrl = "http://localhost:3030/jsonstore/advanced/dropdown";
    let mainContainer = document.getElementsByTagName("article")[0].getElementsByTagName("div")[0];
    let addBtn = document.getElementsByTagName("input")[1];
    let inputText = document.getElementById("itemText");

    fetch(baseUrl)
    .then(convert => convert.json())
    .then(tokens =>{
        let options = [];
        for (const key in tokens) {
            const element = tokens[key];
            options.push(element);
        }
        let container = (items) => html` 
        <select id="menu">
                ${items.map(element => { 
                    return optionLayout(element);
                })}
        </select>`;
    render(container(options),mainContainer);
    });

    addBtn.addEventListener("click", () =>{

        let data = {
            text : inputText.value
        }

        let options = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'                
            },
            body : JSON.stringify(data)
        }


        fetch(baseUrl,options);
    });
}
addItem();


