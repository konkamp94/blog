import { axiosInstance, createAuthHeaders } from "./axiosConfig";

class UserService {
    instance = null;
    
    static getInstance = () => {
        if(!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    getFavouritePosts = async (userId, page, size=12) => {
        let response = await axiosInstance.get(`/user/${userId}/get-favourite-posts/?page=${page}&size=${size}`, {headers: createAuthHeaders()});
        return response
    }

}

export default UserService.getInstance();