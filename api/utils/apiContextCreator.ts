import {APIRequestContext, request} from "@playwright/test";

export class ApiContextCreator{

    private baseUrl:string = "http://127.0.0.1:7081";

    async createApiContext(): Promise<APIRequestContext> {
        return await request.newContext({
            baseURL: this.baseUrl,
            timeout: 10000,
        });
    }
}