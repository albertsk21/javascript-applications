function lockedProfile() {


    let allPorfiles = document.getElementsByClassName("profile");
    let main = document.getElementById("main");

    fetch("http://localhost:3030/jsonstore/advanced/profiles")
    .then(jsonToObjects => jsonToObjects.json())
    .then(tokens => {



        let currentIndex = 1;
        for (const key in tokens) {

            const currentObject = tokens[key];

            let newProfil =  document.createElement("div");
            newProfil.classList.add("profile");

            let image = document.createElement("img");
            image.classList.add("userIcon");
            image.src = "./iconProfile2.png";
            let labelLock = document.createElement("label");
            labelLock.innerHTML = "Lock";

            let inputlocked = document.createElement("input");
            inputlocked.type = "radio";
            inputlocked.name = `user${currentIndex}Locked`;
            inputlocked.value = "lock"
            inputlocked.checked = true;

            let labelUnlock = document.createElement("label");
            labelUnlock.innerHTML = "Unlock";

            let inputUnlocked = document.createElement("input");
            inputUnlocked.type = "radio";
            inputUnlocked.name = `user${currentIndex}Locked`;
            inputUnlocked.value = "unlock"
            inputUnlocked.checked = false;

            let br = document.createElement("br");
            let hr1 = document.createElement("hr");

            let labelUsername = document.createElement("label");
            labelUsername.innerHTML = "Username";

            let inputUsername = document.createElement("input");
            inputUsername.type = "text";
            inputUsername.name = "user1Username";
            inputUsername.value = currentObject.username;
 
            inputUsername.disabled = true;
            inputUsername.readOnly = true;

            let hr2 = document.createElement("hr");
            let hiddenField = document.createElement("div");
            hiddenField.id = "user1HiddenFields";
            
            let labelEmail = document.createElement("label");
            labelEmail.innerHTML = "Email";

            let inputEmail = document.createElement("input");
            inputEmail.type = "email";
            inputEmail.name = "user1Email";
            inputEmail.disabled = true;
            inputEmail.readOnly = true;
            inputEmail.value = currentObject.email;

            let labelAge = document.createElement("label");
            labelAge.innerHTML = "Age:";
            
            let inputAge = document.createElement("input");
            inputAge.type = "email";
            inputAge.name = "user1Age";
            inputAge.disabled = true;
            inputAge.readOnly = true;

            inputAge.value = currentObject.age;



            let showBtn = document.createElement("button");
            showBtn.innerHTML = "Show more"
            newProfil.appendChild(image);
            newProfil.appendChild(labelLock);
            newProfil.appendChild(inputlocked);
            newProfil.appendChild(labelUnlock);
            newProfil.appendChild(inputUnlocked);
            newProfil.appendChild(br);
            newProfil.appendChild(hr1);
            newProfil.appendChild(labelUsername);
            newProfil.appendChild(inputUsername);



            hiddenField.appendChild(hr2);
            hiddenField.appendChild(labelEmail);
            hiddenField.appendChild(inputEmail);
            hiddenField.appendChild(labelAge);
            hiddenField.appendChild(inputAge);
            
            newProfil.appendChild(hiddenField);
            newProfil.appendChild(showBtn)
            main.appendChild(newProfil)
            currentIndex++;


            showBtn.addEventListener("click", function(){




                if(inputUnlocked.checked === true){
                    let contentButton = showBtn.innerHTML;

                    if(contentButton === "Show more"){
                        showBtn.innerHTML = "Hide it";
                        hiddenField.id = "";
                    }else if(contentButton === "Hide it"){
                        showBtn.innerHTML = "Show more";
                        hiddenField.id = "user1HiddenFields";
                    }
    
                }

            });


        }

      
    });


    

  


}