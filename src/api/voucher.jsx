import { instance } from "./instance"

export const voucherAPI = {
    getAll(){
        return instance.get("vouchers")
    },
    create(data){
        return instance.post("voucher",data)
    },
    update(data){
        return instance.patch("voucher",data)
    },
    apply(data){
        return instance.post("voucher/apply",data)
    },
    use(data){
        return instance.post("voucher/use",data)
    }
}