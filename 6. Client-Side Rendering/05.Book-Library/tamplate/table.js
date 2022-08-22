import {html, render} from '../node_modules/lit-html/lit-html.js';
import addColumn from './pieceOfTable.js';


let table = (items) => html`

<table>
    
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${items.map(item => {
            return addColumn(item)
        })}
    </tbody>

</table>
`
export default table;