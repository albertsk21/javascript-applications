import { html } from "../../node_modules/lit-html/lit-html.js";
import { getTheatherByUserId } from "../api/data.js";



const profileTemplate  = (events) => html`
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${sessionStorage.getItem('email')}</h2>
            </div>
            <div class="board">
                <!--If there are event-->
               
                ${events.length > 0 ?  events.map(event => eventTemplate(event)) : html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>
                `}
            </div>
        </section>`


const eventTemplate = (event) => html `
                <div class="eventBoard">
                    <div class="event-info">
                        <img src="${event.imageUrl}">
                        <h2>${event.title}</h2>
                        <h6>${event.date}</h6>
                        <a href="/detais/${event._id}" class="details-button">Details</a>
                    </div>
                </div>
`;

export async function profilePage(ctx){

    const events = await getTheatherByUserId(sessionStorage.getItem('userId'));

    ctx.render(profileTemplate(events));
}