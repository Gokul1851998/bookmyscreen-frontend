import axios from "axios";
import { ownerUrl, userUrl } from "../../../apiLinks/apiLinks";


export const getCurrentOwner = async() => {
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.get(`${ownerUrl}getCurrentOwner`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const addScreen = async(payload) => {
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.post(`${ownerUrl}add-screen`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getScreen = async(payload) => {
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.get(`${ownerUrl}get-screen/${payload}`,{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const deleteScreen = async(payload) => {
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.post(`${ownerUrl}delete-screen`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const addShow = async(payload) => {
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.post(`${ownerUrl}add-show`,(payload),{headers})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getMovieName = async()=>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
        const response = await axios.get(`${ownerUrl}get-movieName`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getSelectScreen = async(payload)=>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
        const response = await axios.get(`${ownerUrl}select-screen/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getShows = async(payload)=>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
        const response = await axios.get(`${ownerUrl}get-shows/${payload}`,{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const deleteShow = async(payload) =>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
     const response = await axios.post(`${ownerUrl}delete-show`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const editScreen = async(payload) =>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
     const response = await axios.post(`${ownerUrl}edit-screen`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const editShow = async(payload) =>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
     const response = await axios.post(`${ownerUrl}edit-show`,(payload),{headers})
        return response.data
    }catch (error) {
        return error.response
    }
}

export const getBookings = async(payload)=>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
      const response = await axios.get(`${ownerUrl}get-bookings/${payload}`,{headers})
      return response.data
    }catch (error) {
        return error.response
    }
}

export const getAppoval = async(payload)=>{
const token = localStorage.getItem('ownerToken')
const headers = { Authorization: `Bearer ${token}` }
    try{
      const response = await axios.get(`${ownerUrl}get-approval/${payload}`,{headers})
      return response.data
    }catch (error) {
        return error.response
    }
}

export const getStatus = async(payload)=>{
    const token = localStorage.getItem('ownerToken')
    const headers = { Authorization: `Bearer ${token}` }
        try{
          const response = await axios.post(`${ownerUrl}get-status`,(payload),{headers})
          return response.data
        }catch (error) {
            return error.response
        }
    }

    export const getMonthlySails = async(payload)=>{
        const token = localStorage.getItem('ownerToken')
        const headers = { Authorization: `Bearer ${token}` }
            try{
              const response = await axios.post(`${ownerUrl}get-monthySails`,(payload),{headers})
              return response.data
            }catch (error) {
                return error.response
            }
        }

        export const getDailySails = async(payload)=>{
            const token = localStorage.getItem('ownerToken')
            const headers = { Authorization: `Bearer ${token}` }
                try{
                  const response = await axios.post(`${ownerUrl}get-dailySails`,(payload),{headers})
                  return response.data
                }catch (error) {
                    return error.response
                }
            }

            export const getOwnerUser = async(payload)=>{
                const token = localStorage.getItem('ownerToken')
                const headers = { Authorization: `Bearer ${token}` }
                    try{
                      const response = await axios.post(`${ownerUrl}get-OwnerUser`,(payload),{headers})
                      return response.data
                    }catch (error) {
                        return error.response
                    }
                }

            export const getMessagesForOwner = async(payload)=>{
                    try{
                      const response = await axios.post(`${userUrl}message/get-Ownermessage`,(payload))
                      return response.data
                    }catch (error) {
                        return error.response
                    }  
            }
            export const sentMessagesToUser = async(payload)=>{
                try{
                  const response = await axios.post(`${userUrl}message/sent-messageToUser`,(payload))
                  return response.data
                }catch (error) {
                    return error.response
                }  
        }