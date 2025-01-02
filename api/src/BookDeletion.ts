import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {BookRetrieval} from "./BookRetrieval";
import {DataStore} from "../utils/DataStore";

export class BookDeletion{

    private request:APIRequestContext;
    private requestHandler:RequestHandler;
    private bookRetrieval:BookRetrieval

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
        this.bookRetrieval = new BookRetrieval(request);
    }

    public async deleteBook(id:number, userRole:UserRole){
        const response:ServerResponse = await this.requestHandler.deleteRequest(userRole, `/api/books/${id}`);
        expect(response).toBeDefined();
        return response;
    }

    public async checkBookDeletedByUser(response:ServerResponse, id:number){
        expect(response.status).toBe(403);
        expect(response.json).toBe("\"User is not permitted.\"");
        console.log(`Book with ID ${id} could not be deleted by User.`);
        const book = await this.bookRetrieval.retrieveBookById(UserRole.Admin, id);
        expect(book).toBeDefined();
        expect(book.id).toBe(id);
    }

    public async deleteBookWithNonExistingId(userRole:UserRole){
        const data = DataStore.getInstance().getData();
        const id = data.SharedData.randomInt;
        const response:ServerResponse = await this.requestHandler.deleteRequest(userRole, `/api/books/${id}`);
        expect(response).toBeDefined();
        return response;
    }

    public async bookDeletionNotPermitted(response:ServerResponse){
        expect(response.status).toBe(403);
        expect(response.json).toBe("\"User is not permitted.\"");
        console.log("Book could not be deleted by User.");
    }

    public async bookNotFound(response:ServerResponse){
        expect(response.status).toBe(404);
        expect(response.json).toBe("\"Book not found\"");
    }

    public async checkBookDeleteByAdmin(response:ServerResponse, id:number){
        expect(response.status).toBe(200);
        expect(response.json).toBe("\"\"");

        console.log(`Book with ID ${id} deleted by Admin.`);
        const book = await this.bookRetrieval.retrieveBookByNonExistID(UserRole.Admin, id);
    }

    public async deleteBookWithInvalidId(userRole:UserRole){
        const id = "INVALID";
        const response:ServerResponse = await this.requestHandler.deleteRequest(userRole, `/api/books/${id}`);
        expect(response).toBeDefined();
        return response;
    }

    public async checkBookDeletionWithInvalidId(response:ServerResponse){
        expect(response.status).toBe(400);
        expect(response.json).toBe('""');
    }


}