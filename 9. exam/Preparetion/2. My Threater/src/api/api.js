export let settings = {
    host : "http://localhost:3030"
}

async function request(url, options){

    try{

        const respone  = await fetch(url, options);
        if(respone.ok == false){
            const error = await respone.json();
            throw new Error(error.message);
        }

        try{
            const data = await respone.json();
            return data;
        }catch(err){
            return respone;
        }
    }catch(err){
        alert(err.message);
        throw err;
    }


}



function getOptions(method = "get", body){


    let options ={
        method,
        headers :{},
    }

    let token = sessionStorage.getItem("accessToken");
    if(token != null){
        options.headers['X-Authorization'] = token;
    }


    if(body != null ){
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}



export async function get(url){
    return await request(url,getOptions());
}

export async function post(url,body){
    return await request(url,getOptions('post',body));
}
export async function put(url, body){
    return await request(url,getOptions('put',body));
}
export async function del(url){
    return await request(url, getOptions('delete'));
}


export async function login(email,password){
    let result = await post(settings.host + "/users/login",{email, password})

    sessionStorage.setItem("accessToken",result.accessToken)
    sessionStorage.setItem("userId",result._id)
    sessionStorage.setItem("email",result.email)

    return result;
}

export async function register(email, password){

    let result = await post(settings.host + "/users/register",{email, password})

    sessionStorage.setItem("accessToken",result.accessToken)
    sessionStorage.setItem("userId",result._id)
    sessionStorage.setItem("email",result.email)

    return result;
}
export async function logout(){
  
    let result = await get(settings.host + "/users/logout");
  
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("userId",result._id)
    sessionStorage.removeItem("email",result.email)
    return result;
}