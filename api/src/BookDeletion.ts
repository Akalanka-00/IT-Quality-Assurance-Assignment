import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";

export class BookDeletion{

    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async deleteBookWithInvalidParam(){
        
       
        const param="INVALID";
        const response:ServerResponse = await this.requestHandler.deleteRequest(UserRole.Admin, "/api/books",param);
       
        expect(response.status).toBe(400);
        expect(response.json).toBe('""')
        console.log("invalid param test passed");
    }

    public async deleteBookWithNullParam(){
        
       
        const param="";
        const response:ServerResponse = await this.requestHandler.deleteRequest(UserRole.Admin, "/api/books",param);
       
        expect(response.status).toBe(405);
        expect(response.json).toBe('""')
        console.log("Null param test passed");
    } 
    
    public async deleteBookWithValidParamAsAdmin(){
        
       
        // const param="";
        // const response:ServerResponse = await this.requestHandler.deleteRequest(UserRole.Admin, "/api/books",param);
       
        // expect(response.status).toBe(405);
        // expect(response.json).toBe('""')
        // console.log("Null param test passed");
    }2

}