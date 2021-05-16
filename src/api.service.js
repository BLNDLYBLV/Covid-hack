let axios = require('axios');
let config = require('./config');

const axiosReq = (route, data) => {
    return axios({
        method: 'post',
        url: config.BASE_URL+route,
        headers: {"Content-Type" : "application/json"},
        data: data,
    })
    .then((result)=>{
        return result
    })
    .catch((err)=>{
        console.log(err);
    })
}

const APIService = {
    registerAsSeeker: (email, password, name, type, address, liscense) =>{
        return axiosReq('auth/register', {email: email, password: password, name: name});
    },
    login: async(email, password) =>{
        return await axiosReq('auth/login', {email: email, password: password});
    }
}

export default APIService;