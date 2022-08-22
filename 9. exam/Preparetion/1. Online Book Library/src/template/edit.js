import {html, render} from "../../node_modules/lit-html/lit-html.js"
import { editBook, getBookByName } from "../api/api.js";



let editTemplate = (item) => html`

        <section id="edit-page" class="edit">
            <form id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value="${item.title}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${item.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value="${item.imageUrl}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="Fiction">
                                <option value="Fiction" ${e => { return renderOption(e)}} >Fiction</option>
                                <option value="Romance" >Romance</option>
                                <option value="Mistery"  >Mistery</option>
                                <option value="Classic" >Clasic</option>
                                <option value="Other" >Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>

`;


export function runEditPage(){
    renderPage();

}
function renderPage(){
    let container = document.getElementById("site-content");
    let currentBookName = sessionStorage.getItem("book-name");
    getBookByName(currentBookName)
    .then(tokens =>{
        let currentObject = tokens[0];
        render(editTemplate(currentObject),container);
    })
}



function renderOption(e){
    
    console.log(e.target)


}
function logic(){
    let submitButton = document.getElementsByClassName("buttom")[0];
    let description = document.getElementById("description");
    let image = document.getElementById("image");
    let title = document.getElementById("title");
    let options = document.getElementById("type").getElementsByTagName("option");

    
    // RENDER OPTIONS 
    getBookByName(sessionStorage.getItem("book-name"))
    .then(tokens => {
        let currentBook = tokens[0];
        let currentType = currentBook.type;
        for(let i = 0 ; i < options.length; i++ ){
            if(options[0].value == currentType ){
                options[0].selected = true;
                break;
            }
        }


    });

    submitButton.addEventListener("click", (e) =>{
        e.preventDefault();
        let editType  = "";
        for(let i = 0 ; i < options.length; i++ ){
            if(options[0].selected ){
                editType = options[0].value;
                break;
            }
        }



        let book =  {
            type : editType,
            imageUrl : image.value,
            title : title.value,
            description : description.value,
        }

        editBook(book);
    })

}