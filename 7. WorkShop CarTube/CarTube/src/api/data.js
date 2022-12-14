import * as api from '../api/api.js';

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllCars(){
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
} 
export async function getMyListings(){
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${sessionStorage.getItem("userId")}%22&sortBy=_createdOn%20desc`);
}
export async function createCar(data){
    return await api.post(host + '/data/cars/',data);
}
export async function getCarById(id){
    return await api.get(host + '/data/cars/' + id);
}
export async function deleteCarById(id){
    return await api.del(host + '/data/cars/' + id);
}
export async function editCarById(id,car){
    return await api.put(host + '/data/cars/' + id,car);
}
export async  function getCarsByYear(query){
    return await api.get(host + `/data/cars?where=year%3D${query}`);
}