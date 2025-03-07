import { instance } from "./instance"

export const userAPI = {
    getAll(){
        return instance.get("users")
    },
    getById(id){
        return instance.get("user",id)
    },
    remove(data){
        return instance.delete("user",data)
    },
    update(data){
        return instance.patch("user",data)
    }
}