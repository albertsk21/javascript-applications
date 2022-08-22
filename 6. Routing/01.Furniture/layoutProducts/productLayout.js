import {html} from "../node_modules/lit-html/lit-html.js"



let productLayout  = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price}$</span></p>
                </footer>
                <div>
                    <a id = "${item._id}"  href="./details.html" class="btn btn-info">Details</a>
                </div>
    </div>
</div>
`

export default productLayout;