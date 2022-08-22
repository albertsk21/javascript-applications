import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { checkTitleForABook, createBookApi} from "../api/api.js";



let newBookTemplate =  () =>  html`
<section id="create-page" class="create">
            <form id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
`;


export function runNewBook(){
    let siteContent = document.getElementById("site-content");
    render(newBookTemplate(),siteContent);
    bussinesLogic();
}


function bussinesLogic(){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let image = document.getElementById("image");
    let types = document.getElementById("type").getElementsByTagName("option");
    let keepType = "";
   
   
    let inputs = document.getElementsByTagName("input");
    let submitButton = inputs[inputs.length - 1 ]; 
   


    submitButton.addEventListener("click",(e) =>{
        e.preventDefault();
        for(let i = 0; types.length; i++){
            if(types[i].selected == true){
                keepType = types[i].value;
                break;
            }
        }
        if(title.value == "" ||  description.value == "" || image == ""){
            alert("The field cannot be empty, please try again");
            return;
        }else if(checkTitleForABook(title.value)){
            alert("this card with this name already exist, pleace try another name");
            return;
        }
        createBookApi(title.value,description.value,image.value,keepType);
        window.location.href = "/";
    });




}