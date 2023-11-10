import axios from "axios";
import * as endPoints from './endpoints';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    config.headers.token = token ? token : '';
    return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => {
    if(!response.data.error) return response
}, (error) => Promise.reject(error))


export const axiosInstance = axios;

export const createUser = async (userData) => {
    const result = await axiosInstance.post(endPoints.signup, userData);
    return result;
}

export const userData = async () => {
    const result = await axiosInstance.get(endPoints.userMe);
    return result;
}

export const userLogin = async (userData) => {
    const result = await axiosInstance.post(endPoints.logIn, userData);
    console.log(result)
    if(result.status === 200) {
        localStorage.setItem('authToken', result.data.authToken)
    }
    return result;
}

export const logout = async () => {
    const result = await axiosInstance.post(endPoints.logOut);
    if(result.data.status === 200) {
        localStorage.removeItem('authToken')
    }
    return result;
}

export const fetchAllFeeds = async () => {
    const result = await axiosInstance.get(endPoints.allFeeds);
    return result;
}

export const fetchFeedById = async (feedId) => {
    const result = await axiosInstance.get(endPoints.feedById(feedId));
    return result;
}