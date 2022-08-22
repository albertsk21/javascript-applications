function attachEvents() {

    let personInput = document.getElementById("person");
    let phoneInput = document.getElementById("phone");
    let createBtn = document.getElementById("btnCreate");
    let loadBtn = document.getElementById("btnLoad");
    let phonebook = document.getElementById("phonebook");

    createBtn.addEventListener("click", () =>{
        let data = {
            person : personInput.value,
            phone : phoneInput.value 
        }

        let options = {
            method: 'post',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        }


        fetch("http://localhost:3030/jsonstore/phonebook",options);
        let li = document.createElement("li");

       
            phoneInput.value = "";
            personInput.value = "";
    });


    loadBtn.addEventListener("click", () =>{

        fetch("http://localhost:3030/jsonstore/phonebook")
        .then(converted => converted.json())
        .then(tokens => {

            phonebook.innerHTML = "";

            for (const key in tokens) {
                const element = tokens[key];
                
                let li = document.createElement("li");

                let deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete";
                
                    li.id = element.phone;
                    li.innerHTML = `${element.person}: ${element.phone}`
                    li.appendChild(deleteButton);
                phonebook.appendChild(li);
                    deleteButton.addEventListener("click", () =>{
                        deletePhoneNumber(element._id);
                        li.remove();
                    })
                
            }

        });
        


    });


 
    function deletePhoneNumber(id){

        let options = {
            method: 'delete'
        }
        fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, options);
    }
}

attachEvents();