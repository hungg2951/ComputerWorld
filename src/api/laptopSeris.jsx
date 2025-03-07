import { instance } from "./instance"

export const laptopSerisAPI = {
    getAll(){
        return instance.get("laptopSeris")
    },
    getById(id){
        return instance.get(`laptop-seri`, {
            params: {
                id
            }
        })
    },
    create(data){
        return instance.post("laptop-seri",data)
    },
    update(data){
        return instance.patch("laptop-seri",data)
    },
    remove(data){
        return instance.delete("laptop-seri",data)
    }
}