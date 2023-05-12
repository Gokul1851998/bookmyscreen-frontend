import { userUrl } from "../../../apiLinks/apiLinks";
import axios from "axios";

export const getCurrentUser = async()=>{
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}getcurrentuser`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const viewMovie = async() => {
    try {
        const response = await axios.get(`${userUrl}view-movies`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getDates = async(payload) => {
    try {
        const response = await axios.post(`${userUrl}get-dates`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getSeats = async(payload) => {
    try {
        const response = await axios.post(`${userUrl}get-seats`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getBill = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-bill`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getPayment = async(payload) => {
    try {
//         const token =  localStorage.getItem("userToken")
// const headers = { Authorization: `Bearer ${token}` }
console.log('here');
        const response = await axios.post(`${userUrl}get-payment`,(payload))
        console.log(response,'here1');
        return response.data
    } catch (error) {
        return error.response
    }
}

export const userOrder = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
         const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}user-order`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getOrder = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-order`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getSingleorder = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}single-order/${payload}`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const orderCancel = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}cancel-order/${payload}`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getVerify = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}get-verify/${payload}`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getBalance = async(payload) => {
    try {
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-balance`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getWallet = async(payload)=>{
    try{
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-wallet`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getSearch = async(payload)=>{
    try{
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}get-search/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}


export const getEditProfile = async(payload)=>{
    try{
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}edit-profile`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getUserOwner = async(payload)=>{
    try{
const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-userOwner`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getMessagesForUsers = async(payload)=>{
    try{
        const response = await axios.post(`${userUrl}message/get-message`,(payload))
        return response.data
    }catch (error) {
        return error.response
    }
}

export const sentMessagesToOwner = async(payload)=>{
    try{
        const response = await axios.post(`${userUrl}message/sent-messageToOwner`,(payload))
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getLocation = async(payload)=>{
    try{
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.post(`${userUrl}get-location`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getTheatreShows = async(payload)=>{
    try{
        const token =  localStorage.getItem("userToken")
const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${userUrl}get-theatreShows/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}