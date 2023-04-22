import React from "react"; 
import { CityRequestBody, CityReturnBody, countryRequestBody, countryReturnBody, stateRequestBody, stateReturnBody } from "../../../Models/Masters.Body";
import MasterService from "../../../Services/MasterService";



export default class FeatureApi {

    public static async GetCity(Body:CityRequestBody){
        const response: CityReturnBody = await MasterService.getCity(Body);
        return response.data;
    }

    public static async getcountry(Body:countryRequestBody){
        const response: countryReturnBody = await MasterService.getCountry(Body);
        return response.data;
    }

    public static async getState(Body:stateRequestBody){
        const response: stateReturnBody = await MasterService.getState(Body);
        return response.data;
    }
}
// export type GetCity  = {
//         setdataget(true);   
//         const requestBody: CityRequestBody = {
//             citycode: submittext.citycode,
//             cityname: submittext.cityname,
//             statename: submittext.statename,
//             countrycode: submittext.countrycode,
//             status: submittext.status,
//             id: 0,
//         };   
//         const response: CityReturnBody = await MasterService.getCity(requestBody);
//         setResult(response.data);
//         const timer = setTimeout(() => {  setdataget(false) }, 100); 
// }