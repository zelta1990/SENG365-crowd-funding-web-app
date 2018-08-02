import axios from 'axios';

const BASE_URL = 'http://csse-s365.canterbury.ac.nz:4888';

export {getProjects, getProjectByID,getProjectImageByID,getRewardsByID,getUserByID};

function getProjects(){
    const url = '${BASE_URL}/api/v2/projects';
    return axios.get(url).then(response => response.data);
}

function getProjectByID(){
    const url = '${BASE_URL}/api/v2/projects/:id';
    return axios.get(url).then(response => response.data);
}

function getProjectImageByID(){
    const url = '${BASE_URL}/api/v2/projects/:id/image';
    return axios.get(url).then(response => response.data);
}

function getRewardsByID(){
    const url = '${BASE_URL}/api/v2/projects/:id/rewards';
    return axios.get(url).then(response => response.data);
}

function getUserByID(){
    const url = '${BASE_URL}/api/v2/users/:id';
    return axios.get(url).then(response => response.data);
}

