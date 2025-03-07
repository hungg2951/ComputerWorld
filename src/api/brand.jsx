import { instance } from "./instance"

export const brandAPI = {
    getAll(){
        return instance.get("brands")
    },
    getById(id){
        return instance.get(`brand`, {
            params: {
                id
            }
        })
    },
    create(data){
        return instance.post("brand",data)
    },
    update(data){
        return instance.patch("brand",data)
    },
    remove(data){
        return instance.delete("brand",data)
    }
}