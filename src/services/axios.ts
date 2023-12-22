import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.multiwoven.com'
});

export default axiosInstance;
