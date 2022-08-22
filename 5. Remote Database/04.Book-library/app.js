let tableBooks = document.getElementsByTagName("table")[0];
let titleFrom = document.getElementsByTagName("form")[0].getElementsByTagName("h3")[0];
let bodyBooks = tableBooks.getElementsByTagName("tbody")[0];


let form =  document.getElementsByTagName("form")[0];
let titleInput = document.getElementsByTagName("input")[0];
let authorInput = document.getElementsByTagName("input")[1];
let submitBtn = form.getElementsByTagName("button")[0];
let loadBtn = document.getElementById("loadBooks");

let baseUrl = "http://localhost:3030/jsonstore/collections/books/";
let isEdited = false;





loadBtn.addEventListener("click", () =>{

    bodyBooks.innerHTML = "";
    fetch(baseUrl)
    .then(convert => convert.json())
    .then(tokens => {
        for (const key in tokens) {
            const element = tokens[key];
            addBook(element.title, element.author, key);

        }
    });

});



submitBtn.addEventListener("click", () =>{

        let data = {
            author: authorInput.value,
            title:  titleInput.value
        }
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    

        fetch(baseUrl,options);
        addBook(titleInput.value, authorInput.value);
    

});

function addBook(title, author, id){


    let container = document.createElement("tr");

    let titleTd = document.createElement("td");
    titleTd.innerHTML = title;
    titleTd.id = id;
    let authorTd = document.createElement("td");
    authorTd.innerHTML = author;

    let actionTd = document.createElement("td");

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";


    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    container.appendChild(titleTd);
    container.appendChild(authorTd);
    container.appendChild(actionTd);

    bodyBooks.appendChild(container);


    deleteBtn.addEventListener("click",() =>{
        let keepId = getIdByBook(authorTd.innerHTML,titleTd.innerHTML);
        container.remove();
        let options = {
            method : "DELETE"
        }
        fetch(`${baseUrl}${keepId}`, options);

        



    })


    editBtn.addEventListener("click",() =>{

        titleFrom.innerHTML = "Edit FORM";
        let keepId = "";
        let oldTitle = titleTd.innerHTML;
        let oldAuthor = authorTd.innerHTML;

        // fetch(baseUrl)
        // .then(convert => convert.json())
        // .then(tokens => {
        //     for (const key in tokens) {
        //         const element = tokens[key];
        //         if(element.author === author && element.title === title){
        //             titleInput.value = element.title;
        //             authorInput.value = element.author;
        //             oldTitle = element.title;
        //             oldAuthor = element.author;
        //             keepId = key;
        //             break;
        //         }

        //     }
        // });

      

        form.getElementsByTagName("label")[0].id = oldTitle;
        form.getElementsByTagName("label")[1].id = oldAuthor;

        titleInput.value = oldTitle;
        authorInput.value = oldAuthor;

    
        while(true){
            if(form.lastChild.type === "text"){
                break
            }

            form.removeChild(form.lastChild);

        }

        submitBtn.remove();

        let submitEdit = document.createElement("button");

        form.appendChild(submitEdit);
        submitEdit.innerHTML = "Save";

        submitEdit.addEventListener("click", () =>{

            let data = {
                author: authorInput.value,
                title:  titleInput.value
            }
         
            let options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
    
            let keepId = getIdByBook(oldAuthor,oldTitle);
    
            fetch(`${baseUrl}${keepId}`,options);
        
       
          
            titleFrom.innerHTML = "FORM"
            submitEdit.remove();
            form.appendChild(submitBtn);

            titleTd.innerHTML = data.title;
            authorTd.innerHTML = data.author;
            authorInput.value = "";
            titleInput.value = "";
        });


      

    });
}
function replaceInformation(oldAuthor, oldTitle, newAuthor, newTitle){

        let allBooks = bodyBooks.getElementsByTagName("tr");
        for(let  i = 0; i < allBooks.length; i++){

            let currentBook = allBooks[i];
            let information = currentBook.getElementsByTagName("td");
            let currentAuthor = information[0];
            let currentTitle = information[1];
          
            if(currentAuthor === oldAuthor  && currentTitle === oldTitle){
                information[0].innerHTML = newAuthor;
                information[1].innerHTML = newTitle;
            }
        }
        
        
    }

function getIdByBook(author, title){
 
    let allBooks = bodyBooks.getElementsByTagName("tr");

    for(let  i = 0; i < allBooks.length; i++){

        let currentBook = allBooks[i];
        let currentTitle = currentBook.getElementsByTagName("td")[0];
        let currentAuthor = currentBook.getElementsByTagName("td")[1];

        if(currentTitle.innerHTML === title && currentAuthor.innerHTML === author){
            return currentTitle.id;
        }

    }
}    
    
 
