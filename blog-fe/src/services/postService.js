import { axiosInstance, createAuthHeaders } from "./axiosConfig";

class PostService {
    apiBaseUrl = process.env.NODE_ENV === 'development'
                 ? process.env.REACT_APP_API_BASE_URL_DEV
                 : process.env.REACT_APP_API_BASE_URL_PRODUCTION;
    instance = null;
    
    static getInstance = () => {
        if(!this.instance) {
            this.instance = new PostService();
        }
        return this.instance;
    }

    getPosts = async (page, size=10) => {
        let response = await axiosInstance.get(`/post/?page=${page}&size=${size}`, {headers: createAuthHeaders()});
        return response
    }

}

export default PostService.getInstance();