function attachEvents() {
    let submitBtn = document.getElementById("submit");
    let inputLocation = document.getElementById("location");
    let forecast = document.getElementById("forecast");
    let upcoming = document.getElementById("upcoming");
    let baseUrl = "http://localhost:3030/jsonstore/forecaster/locations";
    let keepCode = "";
    let currentCondition = document.getElementsByClassName("label")[0];
    let threeDays = document.getElementsByClassName("label")[1];
    let idCurrent = document.getElementById("current");
    
submitBtn.addEventListener("click",() =>{
    removeAllInformation();

    fetch(`${baseUrl}`)
    .then(data => data.json())
    .then(tokens =>{


        let foundLocation = false;
        for(let i = 0; i < tokens.length; i++){
            let currentObject = tokens[i];
            if(inputLocation.value === currentObject.name){
                keepCode = currentObject.code;
                foundLocation = true;
                break;
            }
        }


        if(!foundLocation){
            currentCondition.innerHTML = "Location Not found";
            threeDays.innerHTML = "Not Found"
         

            let currentDisplay = forecast.style.display;
            if(currentDisplay !== "block"){
                forecast.style.display = "block";
            }
            
            return;
        }else{
            currentCondition.innerHTML = "Current conditions";
            threeDays.innerHTML = "Three-day forecast";

          


        }

        fetch(`http://localhost:3030/jsonstore/forecaster/today/${keepCode}`)
        .then(secondData => secondData.json())
        .then(secondTokens =>{
            let forecastsDiv = document.createElement("div");
            forecastsDiv.classList.add("forecasts");
            let symbol = detectSymbolByCondition(secondTokens.forecast.condition);
            
            let spanConditionSymbol = document.createElement("span");
            spanConditionSymbol.classList.add("condition");
            spanConditionSymbol.classList.add("symbol");
            spanConditionSymbol.innerHTML = symbol;
            
            let spanCondition = document.createElement("span");
            spanCondition.classList.add("condition");

            let spanForecastData = document.createElement("span");
            spanForecastData.classList.add("forecast-data");
            spanForecastData.innerHTML = secondTokens.name;

            let spanForecastDataGrades = document.createElement("span");
            spanForecastDataGrades.classList.add("forecast-data");
            spanForecastDataGrades.innerHTML = `${secondTokens.forecast.low}&#176;/${secondTokens.forecast.high}&#176;`;

            let spanForecastDataCondition= document.createElement("span");
            spanForecastDataCondition.classList.add("forecast-data");
            spanForecastDataCondition.innerHTML = secondTokens.forecast.condition;


            forecastsDiv.appendChild(spanConditionSymbol);
            forecastsDiv.appendChild(spanCondition);
            forecastsDiv.appendChild(spanForecastData);
            forecastsDiv.appendChild(spanForecastDataGrades);
            forecastsDiv.appendChild(spanForecastDataCondition);

            idCurrent.appendChild(forecastsDiv);

        });



        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${keepCode}`)
        .then(upcomingData => upcomingData.json())
        .then(upcomingTokens => {
            
            let allObjects = upcomingTokens.forecast
 
            for(let i = 0; i < allObjects.length; i++){
                let forecastObject = allObjects[i];
                let forecastInfoDiv = document.createElement("div");
                forecastInfoDiv.classList.add("forecast-info")

                let spanUpcoming = document.createElement("span");
                spanUpcoming.classList.add("upcoming");

                let spanSymbol = document.createElement("span");
                spanSymbol.classList.add("symbol");
                spanSymbol.innerHTML = detectSymbolByCondition(forecastObject.condition);

                let spanForecastGrade = document.createElement("span");
                spanForecastGrade.classList.add("forecast-info");
                spanForecastGrade.innerHTML = `${forecastObject.low}&#176;/${forecastObject.high}&#176;`

                let spanForecastCondition = document.createElement("span");
                spanForecastCondition.classList.add("forecast-data");
                spanForecastCondition.innerHTML = forecastObject.condition;


                spanUpcoming.appendChild(spanSymbol);
                spanUpcoming.appendChild(spanForecastGrade);
                spanUpcoming.appendChild(spanForecastCondition);

                forecastInfoDiv.appendChild(spanUpcoming);
                upcoming.appendChild(spanUpcoming);
            };
        });

        forecast.style.display = "block";
    });
});
 


function detectSymbolByCondition(condition){

    switch(condition){
        case "Sunny":
            return "&#x2600;";
        case "Partly sunny":
            return  "&#x26C5;";
        case "Overcast":
            return "&#x2601;"  
        case "Rain":
            return "&#x2614;"
        case "Degrees":
            return "&#176;"        
    }
    return null;

}


function removeAllInformation(){

    if(idCurrent.getElementsByTagName("div").length > 1 ){
        idCurrent.removeChild(idCurrent.lastChild);
    }


    if(upcoming.getElementsByTagName("span").length > 0){
        let currentIndex = 0;
        while(true){
            if(currentIndex === 3){
                break;
            }
            upcoming.removeChild(upcoming.lastChild);
            currentIndex++;
    
        }
    }
}
}

attachEvents();