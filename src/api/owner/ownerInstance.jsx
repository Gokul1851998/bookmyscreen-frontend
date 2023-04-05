import axios from "axios";
import { ownerUrl } from "../../../apiLinks/apiLinks";

export const getCurrentOwner = async(payload) => {
    try {
        const response = await axios.post(`${ownerUrl}getCurrentOwner`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}