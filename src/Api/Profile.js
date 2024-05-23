import instance, { setAuthToken } from "./instance"

export const GetUserProfile =async(payload)=>{
    try {
        console.log(payload,"pay");
        const response = await instance.get(`user/student-profile/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetTutorProfile = async(payload)=>{
    try {
        console.log(payload,"userid");
        const response = await instance.get(`user/tutor-profile/${payload}/`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const AddCertificate = async(payload,token)=>{
    try {
        setAuthToken(token)
        console.log(token,"token");
        const response = await instance.post("user/add-certificate/",payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetAllUsers = async()=>{
    try {
        const response = await instance.get("user/users-profile-list/")
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const VerifyTutor = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.patch(`adminapp/verify-tutor/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}