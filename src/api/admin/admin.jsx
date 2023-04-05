import axios from "axios"
import { adminUrl } from "../../../apiLinks/apiLinks"

export const getAllOwners = async () => {
    try {
        const response = await axios.get(`${adminUrl}adminowner`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const ownerApprove = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}ownerApprove`,(payload))
        return response.data;
    } catch (error) {
        return error.response;
    }
}