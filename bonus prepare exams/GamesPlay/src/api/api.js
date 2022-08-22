
export const settings = {
    host  : ""
}


async function request(url,options){
    try{

        const response = await fetch(url,options);

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message);
        }

        try{
            const data = await response.json();
            return data;
        }catch(err){
            return response;
        }


    }catch(err){
        alert(err.message);
        throw err;
    }
}

export function getOptions(method = "get", data){
    const options = {
        method,
        headers : {}
    }
    const token = sessionStorage.getItem("userToken");
    if(token){
        options.headers["X-Authorization"] = token;
    }
    if(data){
        options.headers["Content-Type"] = "applications/json";
        options.body = JSON.stringify(data);
    }

    return options;

}

//  REST FCUNCTIONS 

export async function get(url){
    return await request(url,getOptions())
}
export async function post(url,data){
    return await request(url,getOptions("post",data))
}
export async function put(url,data){
    return await request(url,getOptions("put",data))
}
export async function del(url){
    return await request(url,getOptions("delete"));
}

// AUTH FUNCTIONS

export async function login(email,password){
    const result = await post(settings.host + "/users/login", {email,password});
    sessionStorage.setItem("userId",result._id)
    sessionStorage.setItem("email",result.email);
    sessionStorage.setItem("userToken",result.accessToken);
    return result;
}

export async function register(email,password){
    const result = await post(settings.host + "/users/register", {email,password});
    sessionStorage.setItem("userId",result._id);
    sessionStorage.setItem("email",result.email);
    sessionStorage.setItem("userToken",result.accessToken);
    return result;
}

export async function logout(){
    const result = await get(settings.host + '/users/logout');
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userToken");
    return result;
}


