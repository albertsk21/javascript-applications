

export function registerApi(email, password){

    let baseUrl = `http://localhost:3030/users/register`;
    let data = {
        email : email,
        password : password 
    }
    let options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    fetch(baseUrl,options)
    .then(convert => convert.json())
    .then(token => {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("user-token",token.accessToken);
        sessionStorage.setItem("user-id",token._id);
        console.log(token);
    }).catch(e =>{
        alert(e)
        throw e;
    });
}

export async function getAllBooks(){
   return fetch("http://localhost:3030/data/books")
    .then(convert => convert.json())
}


export  function loginApi(email, password){
    let baseUrl = `http://localhost:3030/users/login`;
    let data = {
        email : email,
        password : password 
    }
    let options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }



    fetch(baseUrl,options)
    .then(convert => convert.json())
    .then(token => {

        if(token.code == 403){
            alert("email or password is incorect, please try again");
        }else{
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("user-token",token.accessToken);
            sessionStorage.setItem("user-id",token._id);
            window.location.href = "/";
        }

  
 
    }).catch(e =>{
        alert(e)
        throw e;
    });


}

export async  function logoutApi(){
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("user-token",);
    sessionStorage.removeItem("user-id");
}

export async function getBookByUserId(){

    let baseurl = `http://localhost:3030/data/books?where=_ownerId%3D%22${sessionStorage.getItem("user-id")}%22&sortBy=_createdOn%20desc`

   return fetch(baseurl)
    .then(convert => convert.json());
}


export async function createBookApi(title,description,image, type){

    let baseUrl = "http://localhost:3030/data/books";

    let data = {
        title : title,
        description: description,
        imageUrl : image,
        type : type
    }

    let options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "X-Authorization" : sessionStorage.getItem("user-token")
        },
        body : JSON.stringify(data)
    }

    fetch(baseUrl, options);

}

export function checkTitleForABook(name){
    let baseUrl = `http://localhost:3030/data/books?where=title%3D%${name}%22&sortBy=_createdOn%20desc`;


    let exist = false;
    fetch(baseUrl)
    .then(convert => convert.json())
    .then(data =>{
        if(data.length >= 1){
            exist = true;
        }
    });

    return exist;
}
export async function getBookByName(name){
    let baseUrl = `http://localhost:3030/data/books?where=title%3D%22${name}%22&sortBy=_createdOn%20desc`;

   return fetch(baseUrl)
    .then(convert => convert.json())
    
}

export function deleteItem(name){



    let options = {
        method : "DELETE",
        headers : {
            "X-Authorization" : sessionStorage.getItem("user-token")
        }
    }

    getBookByName(name)
    .then(tokens =>{
        let bookId = tokens[0]._id;
        let baseUrl = `http://localhost:3030/data/books/${bookId}`;
        fetch(baseUrl,options)
        .then(convert => convert.json())
        .then(tokens =>{
            console.log(tokens)
        });
    })


    
   




}


export function editBook(book){
    let options = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "X-Authorization" : sessionStorage.getItem("user-token")
        },
        body : JSON.stringify(book)
    }

    let currtenBookName = sessionStorage.getItem("book-name");
    getBookByName(currtenBookName)
    .then(tokens =>{
        let currentBook = tokens[0];
        let id = currentBook._id;
        let baseUrl = `http://localhost:3030/data/books/${id}`;
        fetch(baseUrl,options);
    });
}