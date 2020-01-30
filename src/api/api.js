import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '59ead4fb-0c13-4727-ad30-0a30cf50ed9b'
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
    login: (email, password, rememberMe, captcha=null) => {
      return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout: () => {
      return instance.delete(`auth/login`)
    },
};

export const securityAPI = {
    getCaptcha: () => {
        return instance.get(`security/get-captcha-url`)
    }
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
    },
    saveProfile: (profile) => {
        return instance.put(`profile`, profile)
    }
};
