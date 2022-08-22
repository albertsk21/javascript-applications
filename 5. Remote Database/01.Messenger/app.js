function attachEvents() {
    let outputMessages  = document.getElementById("messages");
    let controls = document.getElementById("controls");
    let name = controls.getElementsByTagName("input")[0];
    let textareaMessage = controls.getElementsByTagName("input")[1];

    let submitButton = document.getElementById("submit");
    let refreshButton = document.getElementById("refresh");


    submitButton.addEventListener("click", () =>{

        let data = {
            author : name.value,
            content : textareaMessage.value,
        }
        let options = {
            method: 'post',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        }
        fetch("http://localhost:3030/jsonstore/messenger", options);


        name.value = "";
        textareaMessage.value = "";
    })


    refreshButton.addEventListener("click", () => {
        fetch("http://localhost:3030/jsonstore/messenger")
        .then(converted => converted.json())
        .then(tokens => {


            outputMessages.innerHTML = "";

            for (const key in tokens) {
                let currentObject = tokens[key];
                let exportMessage = `${currentObject.author}: ${currentObject.content}`;
     
                outputMessages.innerHTML += `${exportMessage}\n`;
          
            }
        })



    });
}

attachEvents();