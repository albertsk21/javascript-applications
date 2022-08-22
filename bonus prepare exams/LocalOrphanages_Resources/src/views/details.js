import { html } from "../../node_modules/lit-html/lit-html.js";
import { addDonation, deletePostById, findPostById, getDonationByPostIdAndUserId, getTotalDonationByPostId } from "../api/data.js";



const detailsTemplate = (deleteBtn, post, totalDontations , donationByUser, donateLogicBtn) =>html`
     <!-- Details Page -->
     <section id="details-page">
                <h1 class="title">Post Details</h1>
    
                <div id="container">
                    <div id="details">
                        <div class="image-wrapper">
                            <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                        </div>
                        <div class="info">
                            <h2 class="title post-title">${post.title}</h2>
                            <p class="post-description">Description:${post.description}</p>
                            <p class="post-address">Address: ${post.address}</p>
                            <p class="post-number">Phone number: ${post.phone}</p>
                            <p class="donate-Item">Donate Materials: ${totalDontations}</p>
    
                            <!--Edit and Delete are only for creator-->
                            <div class="btns">
                            ${sessionStorage.getItem("userId") == post._ownerId ? 
                            html`
                                <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                                <a @click = "${deleteBtn}" href="/delete" class="delete-btn btn">Delete</a>` 
                            : '' }
                                <!--Bonus - Only for logged-in users ( not authors )-->
                            ${sessionStorage.getItem("userId") != post._ownerId && donationByUser == 0 ? html`
                            <a @click = "${donateLogicBtn}"  href="#" class="donate-btn btn">Donate</a>
                            ` : ''}
                            </div>
    
                        </div>
                    </div>
                </div>
            </section>`
    
   


export async function detailsPage(ctx){
    const currentId = ctx.params.id;
    const userId = sessionStorage.getItem("userId");
    const post = await findPostById(currentId);
    const totalDontations = await getTotalDonationByPostId(currentId);
    const donationByUser = await getDonationByPostIdAndUserId(currentId,userId);
    ctx.render(detailsTemplate(deleteBtn,post, totalDontations, donationByUser, donateLogicBtn));

    async function deleteBtn(event){
        event.preventDefault();
        await deletePostById(currentId);
        ctx.page.redirect('/');

    }
    async function donateLogicBtn(event){
        event.preventDefault();

       const result = await addDonation({currentId});
        ctx.page.redirect("/details/" + currentId);
    }
}