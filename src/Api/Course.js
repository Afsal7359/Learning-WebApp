import instance, { setAuthToken } from "./instance"

export const AddCourses = async(payload,token)=>{
    try {
        console.log(payload,"payload");
        setAuthToken(token)
        
        const response = await instance.post("courses/create-course/" , payload)
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
        console.log(payload);
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
export const AddFiles = async(payload,type,token)=>{
    try {
        setAuthToken(token)
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
export const SearchCourse = async (payload) => {
    try {
      console.log(payload, "pppp");
      const response = await instance.get( `courses/search/?search=${payload}`)
      return response.data;
    } catch (error) {
      console.error(error.response.data); 
      return error.response.data;
    }
  }
  export const CreateMeeting = async()=>{
    try {
        const response = await instance.get('meetings/generate-meeting-link/')
        return response.data
    } catch (error) {
        return error.response.message
    }
  }