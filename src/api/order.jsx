import { instance } from "./instance"

export const OrderAPI ={
    getAll(){
        return  instance.get('orders')
    },
    getOne(id){
        return  instance.get(`order/${id}`)
    },
    getOrderId(id){
        return  instance.get(`orderId/${id}`)
    },
    create(data){
        return instance.post('order',data)
    },
    createMomo(data){
        return instance.post('payment',data)
    },
    update(data){
        return instance.patch('order',data)
    },
}

export const OrderDetailAPI ={
    getAll(){
        return  instance.get('order-details')
    },
    getOne(id){
        return  instance.get(`order-detail/${id}`)
    },
    create(data){
        return instance.post('order-detail',data)
    },
    update(data){
        return instance.patch('order-detail',data)
    },
}