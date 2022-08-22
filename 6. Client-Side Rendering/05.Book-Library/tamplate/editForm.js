import {html} from "../node_modules/lit-html/lit-html.js"
let baseUrl = "http://localhost:3030/jsonstore/collections/books";

let editForm = () =>html `
<form id = "edit-form" >
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input readonly type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input readonly type="text" name="author" placeholder="Author...">
    <input  @click = ${(e) =>{
            
            let edit =  document.getElementById("edit-form");
            let h3 = edit.getElementsByTagName("h3")[0];
            let writeTitle = edit.getElementsByTagName("input")[0];
            let writeAuthor = edit.getElementsByTagName("input")[1];
            let button = edit.getElementsByTagName("input")[2];




            if(h3.id != ""){
                let data = {
                        author : writeAuthor.value,
                        title : writeTitle.value,
                    }


                    let options = {
                        method : "PUT",
                        headers  : {
                           'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(data)
                    }

                    fetch(`${baseUrl}/${h3.id}`,options);
                    h3.id = "";
            }
                  
                    writeAuthor.value = "";
                    writeTitle.value = "";

    }} type="Submit" value=Save>
</form>
`

export default editForm;