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
        const bookCreate:Book = {
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATE`,
            author: `${data.SharedData.randomStr}_Author_ToBeUPDATE`
        }

        const responseCreate:ServerResponse = await this.requestHandler.postRequest(
            UserRole.Admin,
            "/api/books",
            bookCreate
        );

        expect(responseCreate.status).toBe(201);
        expect(responseCreate.statusText).toBe('');
        expect(responseCreate.json.title).toBe(`${data.SharedData.randomStr}_Title_ToBeUPDATE`);
        expect(responseCreate.json.author).toBe(`${data.SharedData.randomStr}_Author_ToBeUPDATE`);
        console.log(`Book Update: ${data.SharedData.randomStr}_TITLE book Successfully Saved to be updated.`);

        const book:Book = {
            id: responseCreate.json.id,
            title: `${data.SharedData.randomStr}_Title_UPDATED`,
            author: `${data.SharedData.randomStr}_Author_UPDATED`
        }

        const response : ServerResponse = await this.requestHandler.putRequest(
            UserRole.User,
            `/api/books/${book.id}`,
            book
        );

        expect(response.status).toBe(403);
        expect(response.json).toContain("User is not permitted.");
        console.log(`Book Update: ${book.title} book could not be Updated with User Role.`);
    }

    public async updateBookWithNonIntegerID(){
        const data = DataStore.getInstance().getData();
        const book: Book = {
            id: "Non-Integer_ID" as any, // Non-integer ID
            title: `${data.SharedData.randomStr}_Title_UPDATED`,
            author: `${data.SharedData.randomStr}_Author_UPDATED`
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            UserRole.Admin,
            `/api/books/${book.id}`,
            book
        );

        expect(response.status).toBe(400);
        console.log(`Book Update: ${book.title} book could not be Updated with non-integer ID.`);
    }

    public async updateBookWithEmptyValues(){
        const data = DataStore.getInstance().getData();
        const bookCreate:Book = {
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
            author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
        }

        const responseCreate:ServerResponse = await this.requestHandler.postRequest(
            UserRole.Admin,
            "/api/books",
            bookCreate
        );

        expect(responseCreate.status).toBe(201);
        expect(responseCreate.statusText).toBe('');
        expect(responseCreate.json.title).toBe(`${data.SharedData.randomStr}_Title_ToBeUPDATED`);
        expect(responseCreate.json.author).toBe(`${data.SharedData.randomStr}_Author_ToBeUPDATED`);
        console.log(`Book Update: ${data.SharedData.randomStr}_TITLE book Successfully Saved to be updated.`);

        const book:Book = {
            id: responseCreate.json.id,
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
        console.log(`Book Update: ${book.title} book could not be Updated with empty values for mandatory parameters.`);
    }
}