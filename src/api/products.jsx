import { instance } from "./instance"

export const productAPI  = {
    getAll(){
        return instance.get("/products")
    },
    getBySlug(){
        return null
    },
    create(data){
        return  instance.post("/product",data)
    },
    update(data){
        return instance.patch("/product",data)
    }
}