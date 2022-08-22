import * as api from './api.js';

const host = 'http://localhost:3030'

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getRecentGames(){
    return await api.get(host + '/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function getAllGames(){
    return api.get(host + '/data/games?sortBy=_createdOn%20desc');
}
export async function createGame(data){
    return api.post(host + '/data/games', data);
}
export async function getGameById(id){
    return api.get(host + '/data/games/' + id);
}
export async function editGameById(id, data){
    return api.put(host + '/data/games/' + id,data);
}
export async function deleteGameById(id){
    return api.del(host + '/data/games/' + id);
}
export async function getCommentsByGameId(gameId){
    return api.get(host + `/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function addMessage(gameId, comment){
    return api.post(host + '/data/comments',{gameId, comment});
}