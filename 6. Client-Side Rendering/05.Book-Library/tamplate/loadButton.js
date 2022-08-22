import {html} from "../node_modules/lit-html/lit-html.js";
 let loadButton = (load) => html`
    <button @click= ${load} id="loadBooks">LOAD ALL BOOKS</button>
`;

export default loadButton;
