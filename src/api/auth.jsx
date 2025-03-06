import { instance } from "./instance"

export const authAPI = {
    login(data){
        return instance.post("login",data)
    },
    register(data){
        return instance.post("register",data)
    },
    changePassword(password){
        return instance.post("change-password",password)
    }
}