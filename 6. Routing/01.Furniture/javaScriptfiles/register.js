
let baseUrl = "http://localhost:3030/users/register";

let getEmail = document.getElementById("email");
let password = document.getElementById("password");
let repeat = document.getElementById("rePass");
let registerBtn = document.getElementsByClassName("btn-primary")[0];

function procesing(){
    registerBtn.addEventListener("click",() => {


    //   if(repeat.value === password.value){
    //         let data = {
    //             email : getEmail.value,
    //             password : password.value 
    //         }
    
    //         let options = {
    //             method : "POST",
    //             headers : {
    //                 "Content-type" : "application/json"
    //             },
    //             body : JSON.stringify(data)
    //         }
    //         fetch(baseUrl,options);
    //         page()
    //     }

    
    page.redirect('http://127.0.0.1:5500/dashboard.html')
    });

}

function changePath(){

   
}
procesing();