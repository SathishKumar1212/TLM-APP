import { MasterPoints } from '../Api/MastersApi';
import { CityRequestBody, countryRequestBody, stateRequestBody } from '../Models/Masters.Body';
import { AxiosPost } from './AxiosBase';

export default class MasterService {

    public static async getCity(body: CityRequestBody) {
        const url: string = MasterPoints.GET_CITY;
        return await AxiosPost(url, body);
    }

    public static async createCity(body: CityRequestBody) {
        const url: string = MasterPoints.CREATE_CITY;
        return await AxiosPost(url, body);
    }

    public static async getCountry(body: countryRequestBody) {
        const url: string = MasterPoints.GET_COUNTRY;
        return await AxiosPost(url, body);
    }
    public static async createCountry(body: countryRequestBody) {
        const url: string = MasterPoints.CREATE_COUTRY;
        return await AxiosPost(url, body);
    }
    public static async getState(body: stateRequestBody) {
        
        const url: string = MasterPoints.GET_STATE;
        return await AxiosPost(url, body);
    }

    public static async createState(body: stateRequestBody) {
        const url: string = MasterPoints.CREATE_State;
        return await AxiosPost(url, body);
    }
}