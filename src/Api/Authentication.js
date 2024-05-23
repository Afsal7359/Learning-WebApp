import instance, { setAuthToken } from "./instance";

export const Loginuser = async(payload)=>{
    try {
        const response = await instance.post('user/login/',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const RegisterUser = async(payload)=>{
    try {
        const response = await instance.post('user/register/',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const refreshToken = async(payload)=>{
    try {
        const response = await instance.post("user/token/refresh/",payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const AdminLogin = async(payload)=>{
    try {
        const response = await instance.post("adminapp/admin-login/" , payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const ForgotPassword = async(payload)=>{
    try {
        const response = await instance.post("user/forgot-password/",payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const ProfileImageChange = async(payload,token)=>{
    try {
        setAuthToken(token)
        console.log(token,"tttttttttttooooooooo");
        const response = await instance.post("user/add-profile-image/",payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const ChangePassword = async(payload,token)=>{
    try {
        setAuthToken(token)
        console.log(token,"token");
        const response = await instance.post("user/change-password/" , payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const BlockUser = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.post(`adminapp/block-user/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const UnBlockUser = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.post(`adminapp/unblock-user/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}