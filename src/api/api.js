import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '9acf6311-6475-4225-b542-39795cfac323'
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
        return instance.get(`auth/me`).then(response =>{
            return response.data
        })
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
        return instance.put(`profile/status`, {status})
    }
}
