import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCarById, getCarById } from "../api/data.js";


const editTemplate = (car, onSubmit) => html`
        <section id="edit-listing">
            <div class="container">

                <form @submit = ${onSubmit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;


export async function editPage(ctx){
    const carId = ctx.params.id;
    const car = await getCarById(carId);
    
    ctx.render(editTemplate(car,onSubmit));
    async function onSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);
        const brand = data.get('brand');
        const model = data.get("model");
        const description = data.get('description');
        const year = data.get('year');
        const imageUrl = data.get('imageUrl');
        const price = data.get('price');
        
        if(!brand || !model || !description || !year || !imageUrl || !price){
             return alert("All fields cannot be empty");
        }
        if(Number(price) < 0 || Number(year) < 0){
            return alert('price and year must be a positive number!')
        }
       const editCar =  {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          }
        
          await editCarById(carId,editCar);
          ctx.page.redirect('/details/' + carId);
    }
}

