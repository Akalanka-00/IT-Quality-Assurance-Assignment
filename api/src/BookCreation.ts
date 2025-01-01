import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";

export class BookCreation{

    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async createBookWithUser(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TITLE`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        }
        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.User, "/api/books",book);
        expect(response.status).toBe(403);
        expect(response.json.text).toBe("User is not permitted.")
    }

    public async createBook(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TITLE`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        }
        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books",book);
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('');
        expect(response.json.title).toBe(`${data.SharedData.randomStr}_TITLE`);
        expect(response.json.author).toBe(`${data.SharedData.randomStr}_AUTHOR`);
        console.log(`Book : ${data.SharedData.randomStr}_TITLE Successfully Saved.`);
        return book;

    }

    public async createSameBook(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TITLE(Duplicated)`,
            author: `${data.SharedData.randomStr}_AUTHOR(Duplicated)`
        }

        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books",book);
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('');
        expect(response.json.title).toBe(`${data.SharedData.randomStr}_TITLE(Duplicated)`);
        expect(response.json.author).toBe(`${data.SharedData.randomStr}_AUTHOR(Duplicated)`);
        console.log(`Book : ${data.SharedData.randomStr}_TITLE(Duplicated) Successfully Saved.`);

        const duplicateResponse:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books",book);
        expect(duplicateResponse.status).toBe(208);
        expect(duplicateResponse.statusText).toBe('');
        expect(duplicateResponse.json).toBe('"Book Already Exists"');
        console.log(`BooK save with duplicate data, successfully!`);
    }
    public async creatBookWithoutTitle(){
        const data = DataStore.getInstance().getData();
        const book:Book={
            id: data.SharedData.randomInt,
            title:null,
            author:`${data.SharedData.randomStr}_AUTHOR`
        };
        const response:ServerResponse =await this.requestHandler.postRequest(UserRole.Admin, "/api/book",book);
        expect(response.status).toBe(400);
        expect(response.json.text).toBe(`"Title is required"`);
        console.log(`Error for book without title:${response.json.text}`);
    }
    public async createBookWithoutAuthor(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TITLE`,
            author: null 
        };
    
        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books", book);
        expect(response.status).toBe(400);
        expect(response.json.text).toBe('"Author is required"');
        console.log(`Error for book without author: ${response.json.text}`);
    }
    
    public async createBookWithIntegerId(){
        const data = DataStore.getInstance().getData();
        const book:Book = {
            id: data.SharedData.randomInt,
            title: `${data.SharedData.randomStr}_TITLE`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        };
    
        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books", book);
        expect(response.status).toBe(400);
        expect(response.json.text).toBe('"ID must be a string"');
        console.log(`Error for book with integer ID: ${response.json.text}`);
    }
}