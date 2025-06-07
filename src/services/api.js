import axios from 'axios'
import React from 'react'

const api = axios.create({
    baseURL: "http://localhost:8000"
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error.response?.status === "401") {
            console.log("Token Expired")
            localStorage.removeItem("token")
        }
        Promise.reject(error)
    }
)

export default api