import { instance } from "./instance"

export const productAPI  = {
    getAll(){
        return instance.get("/products")
    },
    getBySlug(slug){
        return instance.get(`/product/${slug}`)
    },
    create(data){
        return  instance.post("/product",data)
    },
    update(data){
        return instance.patch("/product",data)
    }
}