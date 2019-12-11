import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'f886d0ad-c005-4c6a-95be-b337dfab64f4'
    }
})

export const usersAPI ={
    getUsers: (currentPage, sizePage) => {
        return instance.get(`users?page=${currentPage}&count=${sizePage}`,
        ).then(response=> {
            return  response.data
        })
    },
    unfollowUsers: (id)=>{
        return instance.delete(`follow/${id}`)
    },
    followUsers: (id)=>{
        return instance.post(`follow/${id}`, {})
    }
};

export const authAPI ={
    getAuthUserData: () => {
        return instance.get(`auth/me`)
    },
    login: (email, password, rememberMe) => {
      return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout: () => {
      return instance.delete(`auth/login`)
    },
};

export const profileAPI = {
    getUserProfile: (userId) => {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus: (userId) => {
        return instance.get(`profile/status/${userId}`)
    },
    updateUserStatus: (status) => {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto: (file) => {
        const formData = new FormData ();
        formData.append('image', file);
        return instance.put (`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};
