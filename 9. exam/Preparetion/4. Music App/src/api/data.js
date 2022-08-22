import * as api from './api.js';





let host  = 'http://localhost:3030';
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums(){
    return await api.get(host + '/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(data){
    return await api.post(host + '/data/albums', data);
}

export async function editAlbumById(data,id){
    return await api.put(host + '/data/albums/' + id, data);
}
export async function getAlbumById(id){
    return await api.get(host + '/data/albums/' + id);
}

export async function deleteAlbumById(id){
    return await api.del(host + '/data/albums/' + id);
}
export async function findAlnumByName(query){
    return await api.get(host +`/data/albums?where=name%20LIKE%20%22${query}%22`);
}