import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteCarById, getCarById } from "../api/data.js";

const detailsTemplate = (car, onDelete, isOwner) => html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${car.imageUrl}">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Price:</span>${car.price}$</li>
                </ul>

                <p class="description-para">${car.description}</p>

                ${isOwner ? html`<div class="listings-buttons">
                    <a href="/edit/${car._id}" class="button-list">Edit</a>
                    <a @click = ${onDelete} href="javascript: void(0)" class="button-list">Delete</a>
                </div>` : ''}
            </div>
        </section>
`



export async function detailsPage(ctx){
    const carId = ctx.params.id;
    const car = await getCarById(carId);
    const isOwner = sessionStorage.getItem('userId') == car._ownerId;
    ctx.render(detailsTemplate(car,onDelete,isOwner));
    async function onDelete(){
        if(confirm('Are you sure?')){
            await deleteCarById(carId);
            ctx.page.redirect('/listings');
        }
    }
}