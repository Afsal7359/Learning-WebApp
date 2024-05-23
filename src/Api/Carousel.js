import instance, { setAuthToken } from "./instance"

export const GetAllCarousel = async()=>{
    try {
        const response = await instance.get("adminapp/list-carousel/")
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const AddCarousel = async(payload,token)=>{
    try {
        console.log(token,"token",payload,"payload");
        setAuthToken(token)

        const response = await instance.post("adminapp/carousel-upload/",payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const DeleteCarosuel = async(payload,token)=>{
    try {
        setAuthToken(token)
        const response = await instance.delete(`adminapp/delete-carousel/${payload}/`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}