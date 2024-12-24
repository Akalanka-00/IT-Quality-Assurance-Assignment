import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";

export class BookUpdate_3{
    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async updateNonExistentBook(){
        const data = DataStore.getInstance().getData();
        const nonExistentBookId = 99999999; // Example ID that doesn't exist

        const book: Book = {
            id: nonExistentBookId, // Non-existent book ID
            title: `${data.SharedData.randomStr}_NonExistentBook`,  // title: "Non-existent book",
            author: `${data.SharedData.randomStr}_UnknownAuthor` // author: "Unknown author"         
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            UserRole.Admin,
            `/api/books/${book.id}`,
            book
        );

    expect(response.status).toBe(404);
    expect(response.statusText).toBe('');
    console.log(`Book Update with non existent successfull:${data.SharedData.randomStr}_Could not be update non-existent book`);
}


    public async updateBookWithSameTitleDifferentAuthor() {
        const data = DataStore.getInstance().getData();
        const bookCreate: Book = {
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
            author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
        };

        const responseCreate: ServerResponse = await this.requestHandler.postRequest(
            UserRole.Admin,
            "/api/books",
            bookCreate
        );

        expect(responseCreate.status).toBe(201);
        console.log(`Book Update: Book ${responseCreate.json.title} created successfully.`);

        const book: Book = {
            id: responseCreate.json.id,
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`, // Same title
            author: `${data.SharedData.randomStr}_NewAuthor` // Updated author
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            UserRole.Admin,
            `/api/books/${book.id}`,
            book
        );

        expect(response.status).toBe(200);
        expect(response.json.title).toBe(book.title); 
        expect(response.json.author).toBe(book.author);
        console.log(`Book Update: ${data.SharedData.randomStr}_book could not updated successfully with new author: ${book.author}.`);

    }

    
    

}