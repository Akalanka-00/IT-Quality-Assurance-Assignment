import {DataStore} from "./DataStore";
import {APIRequestContext, APIResponse} from "@playwright/test";
import {UserRole} from "../enum/UserRole";
import {ServerResponse} from "../model/ServerResponse";

export class RequestHandler {

    private request: APIRequestContext;
    private dataStore : DataStore;

    constructor(request : APIRequestContext) {
        this.request = request;
        this.dataStore= DataStore.getInstance();
    }

    public async getRequest( userRole:UserRole, url:string, param="") {
        const headers = this.getHeader(userRole);
        const response = await this.request.get(`${url}/${param}`, {headers: headers});
        return this.getResponse(response);
    }

    public async postRequest( userRole:UserRole, url:string, body:any, param="") {
        const headers = this.getHeader(userRole);
        const response = await this.request.post(`${url}/${param}`,  {headers: headers, data: body});
        return this.getResponse(response);
    }

    public async putRequest( userRole:UserRole, url:string, body:any, param="") {
        const headers = this.getHeader(userRole);
        const response = await this.request.put(`${url}/${param}`,  {headers: headers, data: body});
        return this.getResponse(response);
    }

    public async deleteRequest( userRole:UserRole, url:string, param="") {
        const headers = this.getHeader(userRole);
        const response = await this.request.delete(`${url}/${param}`,  {headers: headers});
        return this.getResponse(response);
    }


    private getHeader( userRole:UserRole ){
        const data = this.dataStore.getData();
        const headers: Record<string, string> = {};
        let json;
        const username: string = userRole === UserRole.Admin ? data.Authentication.admin : data.Authentication.user;
        const password:string = data.Authentication.password;

        const credentials= Buffer.from(`${username}:${password}`).toString('base64');
        if(userRole !== UserRole.Unauthorized) {
            headers["Authorization"] = `Basic ${credentials}`
        }
        return headers;

    }

    private async getResponse(response:APIResponse){
        const contentType = response.headers()['content-type'] || '';
        let json;
        if (contentType.includes('application/json')) {
            json = await response.json();
        } else {
            const text = await response.text();
            json = JSON.stringify(text);
        }
        const serverResponse:ServerResponse = {
            json,
            status: response.status(),
            statusText: response.statusText()
        }
        return serverResponse;
    }
}