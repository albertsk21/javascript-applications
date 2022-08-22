import {html, render} from './node_modules/lit-html/lit-html.js'
import table from './tamplate/table.js';

import addColumn from './tamplate/pieceOfTable.js';
import addForm from './tamplate/addForm.js';
import editForm from './tamplate/editForm.js';

let baseUrl = "http://localhost:3030/jsonstore/collections/books";


function processingPage(){

    let body = document.body;


 
    fetch(baseUrl)
    .then(convertAllItems => convertAllItems.json())
    .then(tokens =>{
        let loadButton = () => html`
        <button @click= ${e => load(e)} id="loadBooks">LOAD ALL BOOKS</button>
    `;
       
        let booksFromServer = [];
        for (const key in tokens) {
            const currentElement = tokens[key];
    
            let newObject = {
                author : currentElement.author,
                title : currentElement.title,
                id : key
            }
    
            booksFromServer.push(newObject);
        }
    
        let bodyTesting = (table) => html`
        ${loadButton()}
        ${table}
        ${addForm()}
        ${editForm()}
    `;
        render(bodyTesting(table(booksFromServer)),body);  
      
          
    })
    function load(){
      
        let tBody = document.getElementsByTagName("tbody")[0];
   
        fetch(baseUrl)
        .then(convertAllItems => convertAllItems.json())
        .then(tokens =>{

        let booksFromServer = [];
        for (const key in tokens) {
            const currentElement = tokens[key];
    
            let newObject = {
                author : currentElement.author,
                title : currentElement.title,
                id : key
            }
    
            booksFromServer.push(newObject);
        }
        
            console.log("clicked");
            let pieces = () => html`
                ${booksFromServer.map(book => {
                    return addColumn(book)
                })}
            `;
            

            tBody.innerHTML = "";
            render(pieces(),tBody)
           
        
                
        })
        
    }
};

processingPage();








