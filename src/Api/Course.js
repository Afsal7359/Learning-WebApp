import instance, { setAuthToken } from "./instance"

export const AddCourses = async(payload,token)=>{
    try {
        setAuthToken(token)
        
        const response = await instance.post("courses/create-course/" , payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const GetAllCourse = async()=>{
    try {
        const response = await instance.get("courses/list-courses/")
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetModules = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.get(`courses/list-modules/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const DeleteCourse = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.delete(`courses/delete-course/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const AddModules = async(payload,token,id)=>{
    try {
        setAuthToken(token)
        const response = await instance.post(`courses/add-modules/${id}/` , payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const AddFiles = async(payload,type)=>{
    try {
        const response = await instance.post(`courses/add-files/?${type}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
