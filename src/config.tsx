import axios from 'axios';

const databaseConfig : string = "http://127.0.0.1:3000";
const instance = axios.create({
    baseURL: databaseConfig,
    timeout: 1000,
});

interface resourceParams {
    [key: string|number]: string
}

const getResource = async (type: string, callback?: any) => {
    const response = await instance.get(type);
    if (typeof callback === undefined) {
        return response;
    }
    callback(response);
}

export {getResource};