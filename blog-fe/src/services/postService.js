import { axiosInstance, createAuthHeaders } from "./axiosConfig";

class PostService {
    instance = null;
    
    static getInstance = () => {
        if(!this.instance) {
            this.instance = new PostService();
        }
        return this.instance;
    }

    getPosts = async (page, size=12) => {
        let response = await axiosInstance.get(`/post/?page=${page}&size=${size}`, {headers: createAuthHeaders()});
        return response
    }

    getPost = async (id) => {
        let response = await axiosInstance.get(`/post/${id}`, {headers: createAuthHeaders()});
        return response
    }

    createFavouritePosts = async (userId, postIds) => {
        let response = await axiosInstance.post(`/post/user/${userId}/favourite`, {postIds}, {headers: createAuthHeaders()});
        return response
    }

}

export default PostService.getInstance();