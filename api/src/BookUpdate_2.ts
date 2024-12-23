import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";

export class BookUpdate_2{
    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async updateBookWithUser(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TiTle`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        }
        const response : ServerResponse = await this.requestHandler.putRequest(  UserRole.User,`/api/books/${book.id}`,book);
        expect(response.status).toBe(403);
        console.log(`Book : ${data.SharedData.randomStr}_TITLE Successfully Updated.`);
        console.log(response);
        expect(response.json).toBe("\"User is not permitted.\"");
    }

    public async updateBookWithNonIntegerID(){

    }

    public async updateBookWithEmptyValues(){

    }
}