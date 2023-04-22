//Request Body: city
export type CityRequestBody = {
    citycode:string;
    cityname:string;
    statename:number; 
    countrycode:number;
    status:string;
    id:number;
};
// citypropsList
export type citypropsList = {
    row:number,
}
//Return Body: Authentication
export type CityReturnBody = City;

//Portal User Class
export type City = {
    msg: string;
    error: boolean;
    status: string,
    data: [{
        s_id: number,
        s_citycode:string,
        s_cityname:string,
        s_statename:number,
        s_countrycode:number,
        s_status:string,
        s_active:number,
        country:string}]
};

//Request Body: country
export type countryRequestBody = {
    ccode:string;
    cname:string;
    status:string;
    id:number;
};

//Return Body: Authentication
export type countryReturnBody = City;

//Portal User Class
export type country = {
    status: string,
    data: [{
        s_id: number,
        s_citycode:string,
        s_cityname:string,
        s_statename:number,
        s_countrycode:number,
        s_status:string,
        s_active:number,
        country:string}]
};

//Request Body: state
export type stateRequestBody = {
    country:number;
    stateName:string;
    stateCode:string;
    status:string;
    id:number;
};

//Return Body: Authentication
export type stateReturnBody = City;

//Portal User Class
export type state = {
    status: string,
    data: [{
        s_id: number,
        s_citycode:string,
        s_cityname:string,
        s_statename:number,
        s_countrycode:number,
        s_status:string,
        s_active:number,
        country:string}]
};





