// import config from 'config';
import { fetchWrapper } from '../_helpers';
// import { fetchWrappers } from '../_black_helpers';

const baseUrl = `/users`;
const blacklistUrl = `/blacklist`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

function getAll() {
    return fetchWrapper.get(baseUrl)
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    console.log(params);
    return fetchWrapper.put(`${baseUrl}/${id}`, params);

}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}


// export const userServices = {
//     getAllBlacklist,
//     getByIdBlacklist,
//     createBlacklist,
//     updateBlacklist,
//     deleteBlacklist: _deleteBlacklist
// };

// function getAllBlacklist() {
//     return fetchWrappers.get(blacklistUrl)
// }

// function getByIdBlacklist(id) {
//     return fetchWrappers.get(`${blacklistUrl}/${id}`);
// }

// function createBlacklist(params) {
//     return fetchWrappers.post(blacklistUrl, params);
// }

// function updateBlacklist(id, params) {
//     return fetchWrappers.put(`${blacklistUrl}/${id}`, params);
// }

// function _deleteBlacklist(id) {
//     return fetchWrappers.delete(`${blacklistUrl}/${id}`);
// }