import axios from 'axios';
import Transaction from "./components/helpers/models";

interface resourceParams {
    [key: string|number]: string
}

const getResource = async (type: string, callback?: any, params?: resourceParams) => {
    const response =
        await axios.get("/api" + type, { params: params })
            .catch(error => {
                return error.response;
            });
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const deleteResource = async (type: string, params?: resourceParams) => {
    const response = await axios.delete("/api" + type, { params: params });
    return response;
}

const updateResource = async (type: string, data: any, callback?: any) => {
    const response = await axios.put("/api" + type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const createResource = async (type: string, data: any, callback?: any) => {
    console.log(data)
    const response = await axios.post("/api" + type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

const createResources = async (type: string, data: resourceParams[], callback?: any) => {
    const response = await axios.post(type, data);
    if (typeof callback === undefined) {
        return response.data;
    }
    callback(response.data);
}

export {getResource, deleteResource, updateResource, createResource, createResources};