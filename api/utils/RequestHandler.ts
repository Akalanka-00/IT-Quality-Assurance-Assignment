import {DataStore} from "./DataStore";
import {APIRequestContext} from "@playwright/test";
import {UserRole} from "../enum/UserRole";

export class RequestHandler {

    private request: APIRequestContext;
    private dataStore : DataStore;

    constructor(request : APIRequestContext) {
        this.request = request;
    }

    public async getRequest( userRole:UserRole, url:string, param="") {
        const headers = this.getHeader(userRole);

        const response = await this.request.get(`${url}/${param}`, {headers: headers});
        const contentType = response.headers()['content-type'] || '';

        if (contentType.includes('application/json')) {
            return await response.json();
        } else {
            return {text: await response.text()};
        }
    }

    public async postRequest( userRole:UserRole, url:string, body:any, param="") {
        const headers = this.getHeader(userRole);

        const response = await this.request.post(`${url}/${param}`,  {headers: headers, data: body});
        const contentType = response.headers()['content-type'] || '';

        if (contentType.includes('application/json')) {
            return await response.json();
         } else {
            const text = await response.text();
            return JSON.stringify({text});
         }
    }


    private getHeader( userRole:UserRole ){
        const data = DataStore.getInstance().getData();
        const headers = {};

        const username: string = userRole === UserRole.Admin ? data.Authentication.admin : data.Authentication.user;
        const password:string = data.Authentication.password;

        const credentials= Buffer.from(`${username}:${password}`).toString('base64');
        headers["Authorization"]= `Basic ${credentials}`
        return headers;

    }
}