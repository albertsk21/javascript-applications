


let table = document.getElementById("results").getElementsByTagName("tbody")[0];
let form = document.getElementsByClassName("inputs")[0];
let firstName = form.getElementsByTagName("input")[0];
let lastName = form.getElementsByTagName("input")[1];
let facultyNumber  = form.getElementsByTagName("input")[2];
let grade  = form.getElementsByTagName("input")[3];
let submitButton = document.getElementById("submit");
let baseUrl = "http://localhost:3030/jsonstore/collections/students";

fetch(baseUrl)
.then(convert => convert.json())
.then(tokens => {

    for (const key in tokens) {
        let element = tokens[key];
    

        addInfo(element.firstName, element.lastName, element.facultyNumber, element.grade);
      
    }




    submitButton.addEventListener("click",() =>{

        let data = {
           firstName: firstName.value,
           lastName: lastName.value,
           facultyNumber: facultyNumber.value,
           grade: grade.value,
        }

        let options = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }

        fetch(baseUrl,options);


        addInfo(data.firstName, data.lastName, data.facultyNumber, data.grade);



        firstName.value = "";
        lastName.value = "";
        facultyNumber.value = "";
        grade.value = "";


    })

    function addInfo(firstName, lastName, facultyNumber, grade){
    
        let content = document.createElement("tr");

        let firstNameTd =  document.createElement("td");
        firstNameTd.innerHTML = firstName;

        let lastNameTd =  document.createElement("td");
        lastNameTd.innerHTML = lastName;
        
        let facultyNumberTd = document.createElement("td");
        facultyNumberTd.innerHTML = facultyNumber;
        
        let gradeTd = document.createElement("td");
        gradeTd.innerHTML = grade;

        content.appendChild(firstNameTd);
        content.appendChild(lastNameTd);
        content.appendChild(facultyNumberTd);
        content.appendChild(gradeTd);


        table.appendChild(content)
    }
});

