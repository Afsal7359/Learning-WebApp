import axios from 'axios';

const instance = axios.create({
    baseURL: "http://103.184.192.66/",
   
});

// Function to set the token
export const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default instance;
