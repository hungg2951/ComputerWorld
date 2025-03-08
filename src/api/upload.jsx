import { instance } from "./instance"

export const uploadAPI = {
    uploadImage (data){
        return instance.post("/upload",data)
    }
}