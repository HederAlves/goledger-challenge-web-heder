import axios from 'axios';

const auth = {
    username: 'psAdmin',
    password: 'goledger',
};

const api = axios.create({
    baseURL: 'http://ec2-54-91-215-149.compute-1.amazonaws.com/api',
    auth: auth,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
});

export default api;
