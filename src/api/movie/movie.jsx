import axios from "axios"
import { API_KEY } from "../../constants/constants"
import { movieUrl } from "../../../apiLinks/apiLinks"

export const getMoviename = async (payload,language)=>{
   try{
    const response = await axios.get(`${movieUrl}/search/movie?api_key=${API_KEY}&query=${payload}`)
    return response.data
   }catch (error) {
        return error.response
    }
}

export const getMovieDetailsByName = async (payload) => {
    try{
        const response = await axios.get(`${movieUrl}/search/movie?api_key=${API_KEY}&query=${payload}`)
        return response.data
    }catch(error){
        return error.response
    }
}

export const getHomeMovies = async(payload) => {
    try {
        const response = await axios.get(`${movieUrl}/movie/${payload}?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getMovieDetails = async(payload) =>{
    try{
        const response = await axios.get(`${movieUrl}/movie/${payload}?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getCastDetails = async(payload) => {
    try {
        const response = await axios.get(`${movieUrl}/movie/${payload}/credits?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getPicture = async(payload) => {
    try {
        const response = await axios.get(`${movieUrl}/movie/${payload}?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getBanner = async() => {
    try {
        const response = await axios.get(`${movieUrl}/movie/upcoming?api_key=${API_KEY}&with_genres=28`)
        return response.data
    } catch (error) {
        return error.response
    }
}

