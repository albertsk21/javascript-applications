function attachEvents() {
        let loadBtn = document.getElementsByClassName("load")[0];
        let addForm = document.getElementById("addForm");
        let addBtn = document.getElementsByClassName("add")[0];
        let containerCaches = document.getElementById("catches");
        let baseUrl = "https://spotonlunch.backendless.app/api/data/fishergame";
        let divGuest =  document.getElementById("guest");
        let loginBtn = divGuest.getElementsByTagName("a")[0];
        let main = document.getElementsByTagName("main")[0];
 



     

        loginUser("albertsk@gmail.com","password")

      
        

        loadBtn.addEventListener("click",() =>{


            containerCaches.innerHTML = "";

            let options = {
                method : "GET",
                headers : {
                    'Content-Type' : 'application/json',
                    'user-token' : main.id
                }
            }
                fetch(baseUrl,options)
                .then(converted => converted.json())
                .then(tokens =>{

                    for(let  i = 0; i < tokens.length; i++){
                        let currentObject = tokens[i];

                        addCatch(currentObject.angler, currentObject.weight, currentObject.species, currentObject.location, currentObject.bait, currentObject.captureTime, currentObject.objectId);
                    }

                })

         

        });



        addBtn.addEventListener("click", () =>{
            let inputs = addForm.getElementsByTagName("input");

            let angler = inputs[0];
            let weight = inputs[1];
            let species = inputs[2];
            let location = inputs[3];
            let bait = inputs[4];
            let captureTime = inputs[5];



            let data = {
                angler : angler.value,
                weight : Number(weight.value),
                species : species.value,
                location : location.value,
                bait : bait.value,
                captureTime : Number(captureTime.value)
            }
            let options = {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'user-token' : main.id
                },
                body : JSON.stringify(data)
            }
            fetch(baseUrl,options)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(obj => {
                addCatch(obj.body.angler,obj.body.weight,obj.body.species,obj.body.location,obj.body.bait,obj.body.captureTime,obj.body.objectId);
            });

               angler.value = "";
               weight.value = "";
               species.value = "";
               location.value = "";
               bait.value = "";
               captureTime.value = "";


            
            });



    function addCatch(angler, weight, species, location, bait, captureTime, id){

        let containerCatche = document.createElement("div");
        containerCatche.classList.add("catch");
        containerCatche.id = id;


        // -------------------Angler--------------------------------
  
        let labelAngler = document.createElement("label");
        labelAngler.innerHTML = "Angler";
        containerCatche.appendChild(labelAngler);

        let inputAngler = document.createElement("input");
        inputAngler.type = "text";
        inputAngler.classList.add("angler");
        inputAngler.value = angler;
        containerCatche.appendChild(inputAngler);

 
        // -------------------Weight--------------------------------

        let firstHr = document.createElement("hr");
        containerCatche.appendChild(firstHr);


        let labelWeight = document.createElement("label");
        labelWeight.innerHTML = "Weight";
        containerCatche.appendChild(labelWeight);

        let inputWeight = document.createElement("input");
        inputWeight.type = "number";
        inputWeight.classList.add("weight");
        inputWeight.value = weight;
        containerCatche.appendChild(inputWeight);

        // -------------------Species--------------------------------

        let thirdHr = document.createElement("hr");
        containerCatche.appendChild(thirdHr);

        let labelSpecies = document.createElement("label");
        labelSpecies.innerHTML = "Species";
        containerCatche.appendChild(labelSpecies);

        let inputSpecies = document.createElement("input");
        inputSpecies.type = "text";
        inputSpecies.classList.add("species");
        inputSpecies.value = species;
        containerCatche.appendChild(inputSpecies);

        // -------------------Location--------------------------------
       
        let fourHr = document.createElement("hr");
        containerCatche.appendChild(fourHr);

        let labelLocation = document.createElement("label");
        labelLocation.innerHTML = "Location";
        containerCatche.appendChild(labelLocation);

        let inputLocation = document.createElement("input");
        inputLocation.type = "text";
        inputLocation.classList.add("location");
        inputLocation.value = location;
        containerCatche.appendChild(inputLocation);
        
        // -------------------Bait--------------------------------
        let fiveHr = document.createElement("hr");
        containerCatche.appendChild(fiveHr);

        let labelBait = document.createElement("label");
        labelBait.innerHTML = "Bait";
        containerCatche.appendChild(labelBait);

        let inputBait = document.createElement("input");
        inputBait.type = "text";
        inputBait.classList.add("bait");
        inputBait.value = bait;
        containerCatche.appendChild(inputBait);
        
        // -------------------Capture-Time--------------------------------

        let sixHr = document.createElement("hr");
        containerCatche.appendChild(sixHr);

        let labelCapture = document.createElement("label");
        labelCapture.innerHTML = "Capture Time";
        containerCatche.appendChild(labelCapture);

        let inputCaptureTime = document.createElement("input");
        inputCaptureTime.type = "number";
        inputCaptureTime.classList.add("captureTime");
        inputCaptureTime.value = captureTime;
        containerCatche.appendChild(inputCaptureTime);

        // --------------------Buttons--------------------------------
   
        let sevenHr = document.createElement("hr");
        containerCatche.appendChild(sevenHr);
        
        let updateButton = document.createElement("button");
        updateButton.classList.add("update");
        updateButton.innerHTML = "Update"
        containerCatche.appendChild(updateButton);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = "Delete";
        containerCatche.appendChild(deleteBtn);


        containerCaches.appendChild(containerCatche);
 
        deleteBtn.addEventListener("click", () => {
            let currentId = containerCatche.id;
            containerCatche.remove();
            let options = {
                method : "DELETE"
            }

            fetch(`${baseUrl}/${currentId}`,options);
        })


        updateButton.addEventListener("click",() =>{


            let data = {
                angler : inputAngler.value,
                weight : Number(inputWeight.value),
                species : inputSpecies.value,
                location : inputLocation.value,
                bait : inputBait.value,
                captureTime : Number(inputCaptureTime.value)
            }

            let options = {
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json',
                    'user-token' : main.id
                },
                body : JSON.stringify(data)
            }
            fetch(`${baseUrl}/${containerCatche.id}`,options);

        })
        }    
    function loginUser(email, pw){
     
        let url = "https://spotonlunch.backendless.app/api/users/login";
  

        let data = {
            login : email,
            password : pw
        }
        let options = {
            method : "POST",
            header : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }

        let currentBody = "";

        fetch(url,options)
      .then(r =>  r.json()
      .then(data => ({status: r.status, body: data})))
      .then(obj =>  {      
       
       

        if(obj["status"] == "401"){
            loadBtn.disabled = true;
            addForm.disabled = true; 
        }else{
            loadBtn.disabled = false;
            addForm.disabled = false; 
            main.id = obj.body["user-token"];
        }





      
          
    });



}
}
attachEvents();


