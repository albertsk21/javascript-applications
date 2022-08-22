import {html, render} from '../node_modules/lit-html/lit-html.js';
let layoutForm = (item) =>html `
<form id = ${item.id}>
    <h3>${item.title}</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value=${item.buttonValue}>
</form>
`

export default layoutForm;