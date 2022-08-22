import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPosts } from "../api/data.js";


const dashboardTemplate = (posts) => html`
               <!-- Dashboard -->
               <section id="dashboard-page">
                <h1 class="title">All Posts</h1>
    

             
                <!-- Display a div with information about every post (if any)-->
                <div class="all-posts">
                ${posts.length > 0 ? posts.map(post => postTemplate(post)) : emptyContainer()}
            
                </div>
    
     
            </section>
            `


const postTemplate = (post)=> html`
                    <div class="post">
                        <h2 class="post-title">${post.title}</h2>
                        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
                        <div class="btn-wrapper">
                            <a href="/details/${post._id}" class="details-btn btn">Details</a>
                        </div>
                    </div>`
const emptyContainer = () => html`
   <!-- Display an h1 if there are no posts -->
   <h1 class="title no-posts-title">No posts yet!</h1>
`;                    


export async function  dashboardPage(ctx){

    const posts = await getAllPosts();


    ctx.render(dashboardTemplate(posts));
}