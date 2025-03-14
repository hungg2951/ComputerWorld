import { jwtDecode } from "jwt-decode";

export const isAuthenticated = ()=>{
    return localStorage.getItem("token");
}

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) return null; // Nếu không có token, trả về null

  try {
    const decoded = jwtDecode(token); // Giải mã token
    return decoded?._id || null; // Trả về userId nếu có
  } catch (error) {
    return null; // Nếu token không hợp lệ
  }
};

export const checkToken = () => {
    const token = isAuthenticated()
    if (!token) return false; // Không có token → Không hợp lệ
  
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Đơn vị giây
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
      console.log("Token không hợp lệ!", error);
      return false;
    }
  };
  