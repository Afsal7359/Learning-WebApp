import instance, { setAuthToken } from "./instance"

export const AddMeeting = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response =await instance.post('meetings/create-meeting/', payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetMeeting = async(payload)=>{
    try {
        const response = await instance.get(`meetings/list-meeting/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}