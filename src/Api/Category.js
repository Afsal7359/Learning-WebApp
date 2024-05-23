import instance, { setAuthToken } from "./instance"

export const GetCategory = async()=>{
    try {
        const response = await instance.get("adminapp/list-categories/")
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const AddCategory = async(payload,token)=>{
    try {
        setAuthToken(token)
        console.log(token,"token");
        const response = await instance.post('adminapp/create-category/' , payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const DeleteCategory = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.delete(`adminapp/delete-category/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const TrendingUpdate = async(payload,id,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.post(`adminapp/update-trending/${id}/`,payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
} 