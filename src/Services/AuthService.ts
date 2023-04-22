// import { AuthRequestBody, PortalUser } from './../Models/PortalUser';
import { Endpoint } from '../Api/globals';
import { AuthRequestBody } from '../Models/login';
import { AxiosPost } from './AxiosBase';

const baseUrl = 'http://localhost:3001/';

export default class AuthService {
    public static async authenticate(body: AuthRequestBody) {
        const url: string = baseUrl + Endpoint.AUTH_AUTHENTICATE;
        return await AxiosPost(url, body);
    }

    public static async createUser(body: AuthRequestBody) {
        return await AxiosPost(Endpoint.AUTH_CREATE, body);
    }
}