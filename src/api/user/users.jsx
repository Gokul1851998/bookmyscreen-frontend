import { userUrl } from "../../../apiLinks/apiLinks";
import axios from "axios";

export const getCurrentUser = async(payload)=>{
    try {
        const response = await axios.post(`${userUrl}getcurrentuser`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getAllMovies = async() => {
    try {
        console.log('here');
        const response = await axios.get(`${userUrl}get-all-movies`)
        return response.data
    } catch (error) {
        return error.response
    }
}