import { refreshToken } from "./Authentication";

export const token =async(payload)=>{
    try {
        
        const tokenget = localStorage.getItem(`${payload}`)
        console.log(tokenget,"tokeeeeennnn");
        const response = await  refreshToken({refresh:tokenget})
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}