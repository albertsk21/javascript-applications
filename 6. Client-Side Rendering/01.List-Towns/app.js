import {html,render} from './node_modules/lit-html/lit-html.js';

function  attachEvents(){


let loadBtn =  document.getElementById("btnLoadTowns");
let allCities = document.getElementById("root").getElementsByTagName("ul")[0].getElementsByTagName("li");
loadBtn.addEventListener("click",() =>{


    let textCities = "";
    
    


    for(let  i = 0 ; allCities.length; i++){
        
        let currentCity = allCities[i];
        let getText = currentCity.innerText;
        if(i === allCities.length - 1){
            textCities += getText
            break;
        }else{
            textCities += `${getText}, `;
        }
    }

    let input =  html`<input id =  "towns-template" value = ${textCities} />`
    render(input, document.getElementsByClassName("content")[0]);
});
}


attachEvents();