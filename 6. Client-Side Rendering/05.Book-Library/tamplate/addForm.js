import {html} from "../node_modules/lit-html/lit-html.js"
let baseUrl = "http://localhost:3030/jsonstore/collections/books";

let addForm = () =>html `
<form id = "add-form" >
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click =${e=>{

        let target = e.currentTarget.parentNode;
        let title = target.getElementsByTagName("input")[0];
        let author = target.getElementsByTagName("input")[1];


        let data = {
            author : author.value,
            title : title.value
        }

        let options = {
            method : "POST",
            headers  : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }
        fetch(baseUrl,options);


    }} type="Submit" value=Submit>
</form>
`

export default addForm;