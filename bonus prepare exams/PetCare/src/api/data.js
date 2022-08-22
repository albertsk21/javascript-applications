import * as api from '../api/api.js';



const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllPets(){
    return await api.get(host + '/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function createPet(data){
    return await api.post(host + "/data/pets",data);
}
export async function getPetById(id){
    return await api.get(host + "/data/pets/" + id);
}

export async function editPetById(id, data){
    return await api.put(host + "/data/pets/" + id, data);
}

export async function deletePetById(id){
    return await api.del(host + "/data/pets/" + id);
}