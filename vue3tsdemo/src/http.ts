import { App } from 'vue';
import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    timeout: 10000,
});

http.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default {
    install(app: App<Element>) {
        app.config.globalProperties.$http = http;
    }
}