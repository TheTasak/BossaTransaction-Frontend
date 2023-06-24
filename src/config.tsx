import axios from 'axios';
import Transaction from "./components/helpers/models";

const databaseConfig : string = "http://127.0.0.1:3000";

const instance = axios.create({
    baseURL: databaseConfig,
    timeout: 1000,
});

interface resourceParams {
    [key: string|number]: string
}

const getResource = async (type: string, callback?: any, params?: resourceParams) => {
    const response = await instance.get(type, { params: params });
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const deleteResource = async (type: string, params?: resourceParams) => {
    const response = await instance.delete(type, { params: params });
    return response;
}

const updateResource = async (type: string, data: resourceParams, callback?: any) => {
    const response = await instance.put(type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const createResource = async (type: string, data: resourceParams, callback?: any) => {
    const response = await instance.post(type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const createResources = async (type: string, data: resourceParams[], callback?: any) => {
    const response = await instance.post(type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

export {getResource, deleteResource, updateResource, createResource, createResources};