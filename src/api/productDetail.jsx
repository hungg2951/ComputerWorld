import { instance } from "./instance"

export const productDetailAPI = {
    getAll(){
        return instance.get('products-detail')
    },
    create(data){
        return instance.post("product-detail",data)
    },
    update(data){
        return instance.patch("products-detail",data)
    },
    getByProduct(id_product){
        return instance.get(`product-detail/${id_product}`)
    }
}