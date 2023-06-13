import axios from 'axios'

const apiBaseUrl = process.env.NODE_ENV === 'development'
? process.env.REACT_APP_API_BASE_URL_DEV
: process.env.REACT_APP_API_BASE_URL_PRODUCTION;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

const createAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if(token) {
        return {'Authorization': `Bearer ${token}`}
    }
    return {}
}

export {axiosInstance, createAuthHeaders};