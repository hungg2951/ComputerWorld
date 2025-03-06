import { jwtDecode } from "jwt-decode";

export const isAuthenticated = ()=>{
    return localStorage.getItem("token");
}

export const checkToken = () => {
    const token = isAuthenticated()
    if (!token) return false; // Không có token → Không hợp lệ
  
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Đơn vị giây
      if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token đã hết hạn!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("Token không hợp lệ!", error);
      return false;
    }
  };
  