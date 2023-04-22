import axios from 'axios';


const baseUrl ='http://localhost:3001';

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

const exportInstance = axios.create({
    baseURL: baseUrl,
    method: 'POST',
    responseType: 'blob',
});

export async function AxiosGet(endpoint: string) {
    try {
        const { data: response } = await instance.get(endpoint);
        return response;
    } catch (error) {
        return error;
    }
}
export async function AxiosPost<T>(endpoint: string, body: T) {
    try {
        const { data: response } = await instance.post(baseUrl+endpoint, body);
        return response;
    } catch (error) {
        return error;
    }
}

export async function AxiosPut<T>(endpoint: string, body: T) {
    try {
        const { data: response } = await instance.put(endpoint, body);
        return response;
    } catch (error) {
        return error;
    }
}

export async function AxiosPostExport<T>(endpoint: string, body: T) {
    try {
        exportInstance.post(endpoint, body).then((response:any) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        });
    } catch (error) {
        return error;
    }
}