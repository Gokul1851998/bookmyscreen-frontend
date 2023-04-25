import axios from "axios";
import { ownerUrl } from "../../../apiLinks/apiLinks";
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }

export const getCurrentOwner = async() => {
    try {
        const response = await axios.get(`${ownerUrl}getCurrentOwner`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const addScreen = async(payload) => {
    try {
        const response = await axios.post(`${ownerUrl}add-screen`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getScreen = async(payload) => {
    try {
        const response = await axios.get(`${ownerUrl}get-screen/${payload}`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const deleteScreen = async(payload) => {
    try {
        const response = await axios.post(`${ownerUrl}delete-screen`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const addShow = async(payload) => {
    try {
        const response = await axios.post(`${ownerUrl}add-show`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getMovieName = async()=>{
    try{
        const response = await axios.get(`${ownerUrl}get-movieName`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getSelectScreen = async(payload)=>{
    try{
        const response = await axios.get(`${ownerUrl}select-screen/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getShows = async(payload)=>{
    try{
        const response = await axios.get(`${ownerUrl}get-shows/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const deleteShow = async(payload) =>{
    try{
     const response = await axios.post(`${ownerUrl}delete-show`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const editScreen = async(payload) =>{
    try{
     const response = await axios.post(`${ownerUrl}edit-screen`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const editShow = async(payload) =>{
    try{
     const response = await axios.post(`${ownerUrl}edit-show`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getBookings = async(payload)=>{
    try{
      const response = await axios.get(`${ownerUrl}get-bookings/${payload}`,{headers})
      return response.data
    }catch (error) {
        return error.response
    }
}

export const getAppoval = async(payload)=>{
    try{
      const response = await axios.get(`${ownerUrl}get-approval/${payload}`,{headers})
      return response.data
    }catch (error) {
        return error.response
    }
}

