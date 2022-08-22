function login(){





   let divRegister = document.getElementsByClassName("col-md-12")[0];
   let registerForm = divRegister.getElementsByTagName("form")[1];
   let loginButton = document.getElementsByTagName("button")[0]
   let inputEmail = registerForm.getElementsByTagName("input")[0];
   let inputPassword = registerForm.getElementsByTagName("input")[1];
   let baseUrlLogin = "https://spotonlunch.backendless.app/api/users/login";

   loginButton.addEventListener("click",() =>{
       console.log("yes");
       loginUser(inputEmail.value,inputPassword.value);
       
   });


}


login();