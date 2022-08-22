
function register(){

    let divRegister = document.getElementsByClassName("col-md-12")[0];
    let registerButton = document.getElementsByTagName("button")[0]
    let registerForm = divRegister.getElementsByTagName("form")[0];
    let inputEmail = registerForm.getElementsByTagName("input")[0];
    let inputPassword = registerForm.getElementsByTagName("input")[1];
    let inputRepeatPassword = registerForm.getElementsByTagName("input")[2];
    let baseUrlRegister = "https://spotonlunch.backendless.app/api/users/register";
    registerButton.addEventListener("click",function(){

        let password =  inputPassword.value;
        let confirmPassword = inputRepeatPassword.value;
        let email = inputEmail.value;
            if(password === confirmPassword){
                processingRegsiter(email,password);           
            }
    });
}
function processingRegsiter(email, password){
    let data = {
        email : email,
        password : password
    }
    let options = {
        method : "POST",
        header : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch(baseUrlRegister,options);
}
register();





