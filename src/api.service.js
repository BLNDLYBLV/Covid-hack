let axios = require('axios');
let config = require('./config');

const axiosReq = (method, route, data) => {
    return axios({
        method: method,
        url: config.BASE_URL+route,
        headers: {"Content-Type" : "application/json"},
        data: data,
    })
    .then((result)=>{
        return result
    })
    .catch((err)=>{
        return err;
    })
}

const APIService = {
    registerAsSeeker: (email, password, name, type, address, license) =>{
        return axiosReq('post','auth/register', {email: email, password: password, name: name, userType: type, address: address, license: license});
    },
    login: async(email, password) =>{
        return await axiosReq('post','auth/login', {email: email, password: password});
    },
    getUser: async(id) =>{
        return await axiosReq('get',`user/${id}`);
    }
}

export default APIService;