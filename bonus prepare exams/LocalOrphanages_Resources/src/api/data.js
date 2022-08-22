import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export  const login =  api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllPosts(){
    return await api.get(host + "/data/posts?sortBy=_createdOn%20desc");
}

export async function createPost(data){
    return await api.post(host + "/data/posts",data);
}
export async function editPost(data, id){
    return await api.put(host + "/data/posts/" + id, data);
}
export async function findPostById(id){
    return await api.get(host + "/data/posts/" + id)
}
export async function deletePostById(id){
    return await api.del(host + "/data/posts/" + id);
}
export async function addDonation(data){
    return await api.post(host + "/data/donations", data);
}

export async function getTotalDonationByPostId(postId){
    return await api.get(host + `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getDonationByPostIdAndUserId(postId, userId){
    return await api.get(host + `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}