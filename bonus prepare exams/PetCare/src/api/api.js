

export const settings = {
    host : ''
}

async function request(url,options){
    try{
        const response = await fetch(url, options);
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
        alert(err.message)
        throw err;
    }
}



function getOptions(method = 'get', body){
    const options = {
        method,
        headers : {}
    }
    const token = sessionStorage.getItem("token");

    if(token != null){
        options.headers['X-Authorization'] = token;
    }

    if(body != null){
       options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}


export async function get(url){
    return await request(url, getOptions());
}
export async function post(url, data){
    return await request(url, getOptions('post',data));
}
export async function put(url, data){
    return await request(url, getOptions('put',data));
}
export async function del(url){
    return await request(url, getOptions('del'));
}

export async function login(email, password){

    const result = await post(settings.host + "/users/login" , {email, password});

    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('token', result.accessToken);
    return result;
}

export async function register(email, password){

    const result = await post(settings.host + "/users/register" , {email, password});
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('token', result.accessToken);
    return result;
}


export async function logout(){
    const result = await get(settings.host + "/users/logout");
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    return result;
}






