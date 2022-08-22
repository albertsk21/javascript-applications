import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = "http://localhost:3030";

export async function getEvents(){
    return await api.get( host + "/data/theaters?sortBy=_createdOn%20desc&distinct=title");
}
export async function createTherater(data){
    return await api.post(host + '/data/theaters', data);
}

export async function editTherater(data, id){
    return await api.put(host + '/data/theaters/' + id, data);
}
export async function getTheatherById(id){
    return api.get(host + "/data/theaters/" + id);
}
export async function deleteTheatherById(id){
    return await api.del(host + '/data/theaters/' + id)
}
export async function getTheatherByUserId(userId){
    return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function addLike(theaterId){
    return await api.post(host + '/data/likes',{theaterId});
}
export async function touchLikeBtn(theaterId,userId){
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function getLikesByTheaterId(theaterId){
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`)
}