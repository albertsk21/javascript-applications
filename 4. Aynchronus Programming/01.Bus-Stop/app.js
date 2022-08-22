function getInfo() {
    
    let submitButton = document.getElementById("submit");
    let baseUrl = "http://localhost:3030/jsonstore/bus/businfo/";
    let stopId = document.getElementById("stopId"); 
    let stopName = document.getElementById("stopName");
    let listOfBuses = document.getElementById("buses");


    submitButton.addEventListener("click",() =>{

        let currentId = Number(stopId.value);
        let finalUrl = `${baseUrl}${stopId.value}`

        
        if(currentId != 1308 &&  currentId != 1287 &&  currentId != 1327 &&  currentId != 2334){
            stopName.innerHTML = "Error";
            deleteItemsFromList();
        }else{


            fetch(finalUrl)
            .then(convert => convert.json())
            .then(data =>{
                let buses = data.buses;
                let currentName = data.name;
                stopName.innerHTML = currentName;
    
                deleteItemsFromList();

                for (const key in buses) {
                    let value = buses[key];
                    let li = document.createElement("li");
                    let output = `Bus ${key} arrives in ${value} minutes`;
                    li.innerHTML = output;
                    listOfBuses.appendChild(li);
                }
    
            })

        }
    });

    function deleteItemsFromList(){
        
        if(listOfBuses.getElementsByTagName("li").length > 0){
            while(listOfBuses.firstChild){
                listOfBuses.removeChild(listOfBuses.lastChild)
            }
        }
    }
}