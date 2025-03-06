import { instance } from "./instance"

export const laptopTypeAPI = {
    getAll(){
        return instance.get("laptops-type")
    },
    getById(id){
        return instance.get("laptop-type",id)
    },
    create(data){
        return instance.post("laptop-type",data)
    },
    update(data){
        return instance.patch("laptop-type",data)
    },
    remove(data){
        return instance.delete("laptop-type",data)
    }
}