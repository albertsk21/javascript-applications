import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePetById, getPetById } from "../api/data.js";


const detailsTemplate = (pet, deleteFnc) => html`

        <!--Details Page-->
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->
       
                        ${pet._ownerId == sessionStorage.getItem("userId") ? html`
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a @click = "${deleteFnc}" href="#" class="remove">Delete</a>` : ''}
                        <!--(Bonus Part) Only for no creator and user-->
                        <a href="#" class="donate">Donate</a>
                    </div>
                </div>
            </div>
        </section>

`;

export async function detailsPage(ctx){

    const petId =  ctx.params.id;
    const petObj = await getPetById(petId);
    ctx.render(detailsTemplate(petObj, deleteFnc));


    async function deleteFnc(event){
        event.preventDefault();

        await deletePetById(petId);
        ctx.page.redirect("/");

    }
;
}