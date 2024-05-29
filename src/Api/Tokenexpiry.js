export const TokenExpiry =async(payload,user)=>{
    const token = localStorage.getItem(payload);
    const expiryTime = localStorage.getItem(`tokenExpiry-${user}`);
  
    if (token && expiryTime) {
      const currentTime = new Date().getTime();
  
      if (currentTime > expiryTime) {
        localStorage.removeItem(payload);
        localStorage.removeItem(`tokenExpiry-${user}`);
        localStorage.removeItem(`${user}-data-vini`)
        console.log('Token expired and removed from local storage');
        return false
      } else {
        console.log('Token is still valid');
        return true
      }
    } else {
      console.log('No token found in local storage');
        
    }
  }