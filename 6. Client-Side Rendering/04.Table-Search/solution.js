import {html, render} from './node_modules/lit-html/lit-html.js';

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   let baseUrl = "http://localhost:3030/jsonstore/advanced/table";

   let layoutPerson = (element) => html` 
   <tr>
      <td>${element.firstName} ${element.lastName}</td>
      <td>${element.email}</td>
      <td>${element.course}</td>
   </tr>`; 


   let informationsTable  = document.getElementsByClassName("container")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
 
   fetch(baseUrl)
   .then(convert => convert.json())
   .then(tokens => {
      let array = [];
      for (const key in tokens) {
            const element = tokens[key];
            array.push(element);
      }
      let container = (items) => html`
           ${items.map(item => {
              return layoutPerson(item);
           })} 
 
      `;
      render(container(array),document.getElementsByClassName("container")[0].getElementsByTagName("tbody")[0]);
   });
   function onClick() {
      let searchText = document.getElementById("searchField");
      for(let i = 0; i < informationsTable.length; i++){

         
            informationsTable[i].removeAttribute("class");
         
      }
      for(let i = 0; informationsTable.length; i++){
         let currentName = informationsTable[i].getElementsByTagName("td")[0];
         if(contain(searchText.value, currentName.innerHTML)){
            informationsTable[i].classList.add("select");
         }
      }
   }
}

function contain(search, mainText){
  
   if(mainText.toLowerCase().includes(search.toLowerCase())){
      return true;
   }
   return false;
}
solve();