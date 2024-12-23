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
        expect(response.json).toContain("User is not permitted.");
        console.log(`Book Update: ${book.title} Successfully Updated.`);
    }

    public async updateBookWithNonIntegerID(){
        const data = DataStore.getInstance().getData();
        const book: Book = {
            id: "Non-Integer_ID" as any, // Non-integer ID
            title: `${data.SharedData.randomStr}_Title`,
            author: `${data.SharedData.randomStr}_Author`
        };
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.Admin, `/api/books/${book.id}`, book);

        expect(response.status).toBe(400);
        //expect(response.json).toContain("Invalid ID format.");
        console.log(`Book Update: ${book.title} could not be Updated with non-integer ID.`);
    }

    public async updateBookWithEmptyValues(){
        const data = DataStore.getInstance().getData();
        const book: Book = {
            id: data.SharedData.randomInt,
            title: "", // Empty title
            author: "" // Empty author
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            UserRole.Admin,
            `/api/books/${book.id}`,
            book
        );

        expect(response.status).toBe(400);
        expect(response.json.text).toContain("Mandatory parameters should not be null");
    }
}