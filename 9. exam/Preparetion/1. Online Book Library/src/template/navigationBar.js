import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logoutApi } from "../api/api.js";


let navigationGuest = () =>html`

            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    <!-- Guest users -->
                    <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>
                </section>
            </nav>
`


let naivigationUser = () => html`
            <nav class="navbar">
                <section class="navbar-dashboard">
                <a href="/">Dashboard</a>
                    <div id="user">
                        <span>Welcome, ${sessionStorage.getItem("email")}</span>
                        <a class="button" href="/myBooks">My Books</a>
                        <a class="button" href="/addBook">Add Book</a>
                        <a @click = ${logOut} class="button" href="/">Logout</a>
                    </div>
                </section>
            </nav>
`


export function isLogged(){
    let token = sessionStorage.getItem("user-token");
    if( token === null || token === "undefined"){
        return false;
    }
    return true;
}


 function navUpdate(){
    let headerContainer = document.getElementById("site-header");

    if(!isLogged()){
        render(navigationGuest(),headerContainer);

    }else{
        render(naivigationUser(),headerContainer)
    }

}


function logOut(){

    if(confirm("you are sure to leave")){
        logoutApi();
        window.location.href = "/";
    }
}

export default navUpdate;
