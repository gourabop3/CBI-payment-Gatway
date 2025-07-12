import axios from 'axios'


export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URI || (typeof window !== 'undefined' ? '/api/v1' : 'http://localhost:8000/api/v1')
})