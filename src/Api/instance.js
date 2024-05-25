import axios from 'axios';

const instance = axios.create({
    baseURL: "https://pentova.live/",
//    baseURL:"https://bc72-117-195-221-12.ngrok-free.app/"
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
