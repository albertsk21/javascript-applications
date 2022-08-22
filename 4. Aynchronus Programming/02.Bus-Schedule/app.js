function solve() {
    let info = document.getElementsByClassName("info")[0];
    let baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";
    let currentIdSation = "depot";
    let busNameStation = "";
    function depart() {

      
            
        fetch(`${baseUrl}${currentIdSation}`)
        .then(converted => converted.json())
        .then((data) => {
            busNameStation = data.name;
            let nextStation = data.next;
            info.innerHTML = `Next stop ${busNameStation}`
            currentIdSation = nextStation;


        });
        
        return function(){
            currentIdSation;
        }
        
    }

    function arrive() {
        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();