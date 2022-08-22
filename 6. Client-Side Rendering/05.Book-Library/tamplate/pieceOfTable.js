
import {html, render} from '../node_modules/lit-html/lit-html.js';
let baseUrl = "http://localhost:3030/jsonstore/collections/books";


    let addColumn = (item) => html `
    <tr id = ${item.id}>
        <td>${item.title}</td>
        <td>${item.author}</td>
        <td>
            <button @click = ${ () => {

                let editForm = document.getElementById("edit-form");
                let writeTitle = editForm.getElementsByTagName("input")[0];
                let writeAuthor = editForm.getElementsByTagName("input")[1];
                writeTitle.readOnly = false;
                writeAuthor.readOnly = false;
                writeTitle.value = item.title;
                writeAuthor.value = item.author;

                let button = editForm.getElementsByTagName("input")[2];
                editForm.getElementsByTagName("h3")[0].id = item.id;
                
                button.disabled = false;
            


              

            }}  >Edit</button>
            <button @click = ${() => {
             let options = {
                 method : "DELETE"
             }
             fetch(`${baseUrl}/${item.id}`,options)


             let element  = document.getElementById(item.id)
             element.remove();
            }}>Delete</button>
        </td>
    </tr>
    `;



export default addColumn;



