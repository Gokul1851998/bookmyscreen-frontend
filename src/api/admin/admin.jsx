import axios from "axios"
import { adminUrl } from "../../../apiLinks/apiLinks"
const token = localStorage.getItem('adminToken')
const headers = { Authorization: `Bearer ${token}` }


export const getAllOwners = async () => {
    try {
        const response = await axios.get(`${adminUrl}adminowner`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const ownerApprove = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}ownerApprove`,(payload),{headers})
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const ownerDenied = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}ownerDenied`,(payload),{headers})
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const blockOwner = async (payload) => {
    try {
        const response = await axios.post(`${adminUrl}blockOwner`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const unblockOwner = async (payload) => {
    try {
        const response = await axios.post(`${adminUrl}unblockOwner`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const addMovieDetails = async(payload) =>{
    try{
       const response = await axios.post(`${adminUrl}add-movies`,(payload),{headers})
       return response.data
    } catch (error) {
        return error.response
    }
}

export const getMovies = async() =>{
    try{
        const response = await axios.get(`${adminUrl}getMovies`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const deleteMovie = async(payload) =>{
    try{
        const response = await axios.post(`${adminUrl}deleteMovie`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getAllorders = async() =>{
    try{
        const response = await axios.get(`${adminUrl}get-allOrders`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const viewOrder = async(payload) =>{
    try{
        const response = await axios.get(`${adminUrl}view-order/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getStatus = async() =>{
    try{
        const response = await axios.get(`${adminUrl}get-status`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getSuccessOrder = async() =>{
    try{
        const response = await axios.get(`${adminUrl}get-successOrder`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getMonthlySails = async() =>{
    try{
        const response = await axios.get(`${adminUrl}get-monthlySails`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getDailySails = async() =>{
    try{
        const response = await axios.get(`${adminUrl}get-dailySails`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}



