import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type LoginDaten = {
    username: string;
    password: string;
};

export type GraphQlLoginResponse = {
    data: {
        login: {
            access_token: string;
        };
    };
};

export const loginApi = async (
    loginDaten: LoginDaten,
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<GraphQlLoginResponse>> => {
    const body = JSON.stringify({
        query: `mutation {
                        login(username: "${loginDaten.username}", password: "${loginDaten.password}") {
                             access_token
                        }
                    }`,
    });
    const requestConfig = { ...baseRequestConfig, data: body };
    console.log(requestConfig);
    return await axios.request(requestConfig);
};
