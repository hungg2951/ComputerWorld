import { instance } from "./instance"

export const sendmailAPI = {
    sendmailOrder(data){
        return instance.post("sendmail",data)
    }
}