import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://yourapi.com',
});

export default instance;
