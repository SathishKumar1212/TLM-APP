//Request Body: Authentication
export type AuthRequestBody = {
    email: string;
    password: string;
};

//Return Body: Authentication
export type AuthReturnBody = PortalUser;

//Portal User Class
export type PortalUser = {
    id: number;
    email: string;
    password: string;
    team: string;
    roles: string[];
};


