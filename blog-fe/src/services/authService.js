import { axiosInstance } from './axiosConfig';

class AuthService {
    instance = null;
    
    static getInstance = () => {
        if(!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    login = async ({email, password}) => {
        let response = await axiosInstance.post('/auth/login/', {email, password});
        return response
    }

    // register(registerData) {
    //     return axios.post('/auth/register', registerData);
    // }

}

export default AuthService.getInstance();