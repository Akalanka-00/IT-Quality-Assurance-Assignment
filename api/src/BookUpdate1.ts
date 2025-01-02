import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";
import {BookRetrieval} from "./BookRetrieval";

export class BookUpdate1 {
    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async verifyBookUpdatePass(response: ServerResponse, bookData: Book) {
        const bookRetrieval: BookRetrieval = new BookRetrieval(this.request);
        const bookId: number = response.json.id;

        // Retrieve the book data
        const json = await bookRetrieval.retrieveBookById(UserRole.Admin, bookId);

        // Verify the title and author end with "_UPDATED"
        expect(json.title).toMatch(/_UPDATED$/);
        expect(json.author).toMatch(/_UPDATED$/);

        // Log the verification results
        console.log(`Verification Passed: Book Update Verified Successfully with ID: ${bookId}`);
    }

    public async verifyBookUpdateFailed(response: ServerResponse, bookData: Book) {
        const bookRetrieval: BookRetrieval = new BookRetrieval(this.request);
        const bookId: number = response.json.id;

        // Retrieve the book data
        const json = await bookRetrieval.retrieveBookById(UserRole.Admin, bookId);

        // Verify the title and author do not end with "_UPDATED"
        expect(json.title).not.toMatch(/_UPDATED$/);
        expect(json.author).not.toMatch(/_UPDATED$/);

        // Log the verification results
        console.log(`Verification Passed: Book update failed as expected with ID: ${bookId}`);
    }

    // public async verifyBookUpdate(response:ServerResponse,bookData:Book){
    //     const bookRetrieval:BookRetrieval = new BookRetrieval(this.request);
    //     const bookId:number = response.json.id;
    //     const json = await bookRetrieval.retrieveBookById(UserRole.Admin, bookId);
    //     expect(json.title).toBe(bookData.title);
    //     expect(json.author).toBe(bookData.author);
    //     console.log(json.title);
    //     console.log(bookData.title);
    //     console.log(`Book Updated Successfully with ID: ${bookId}`);
    // }

    public async updateBookWithUser(response: ServerResponse, userRole:UserRole, book:Book){
        const data = DataStore.getInstance().getData();
        const bookUpdate:Book = {
            id: response.json.id,
            title: `${data.SharedData.randomStr}_Title_UPDATED`,
            author: `${data.SharedData.randomStr}_Author_UPDATED`
        }

        const responseUpdate: ServerResponse = await this.requestHandler.putRequest(
            userRole,
            `/api/books/${bookUpdate.id}`,
            bookUpdate
        );

        expect(responseUpdate.status).toBe(403);
        expect(responseUpdate.json).toContain("User is not permitted.");
        console.log(`Book Update: ${book.title} book could not be Updated with User Role.`);
    }

    public async updateBookWithInvalidID(book: Book, userRole: UserRole) {
        const data = DataStore.getInstance().getData();
        const bookUpdate:Book = {
            id: "Non-Integer_ID", // Non-integer ID
            title: `${data.SharedData.randomStr}_Title_UPDATED`,
            author: `${data.SharedData.randomStr}_Author_UPDATED`
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            userRole,
            `/api/books/${bookUpdate.id}`,
            bookUpdate
        );
        expect(response.status).toBe(400);
        console.log(`Book Update Failed: "${bookUpdate.title}" could not be updated with a non-integer ID.`);
    }

    public async updateBookWithEmptyValues(response: ServerResponse, userRole:UserRole, book:Book){
        const data = DataStore.getInstance().getData();
        const bookUpdate:Book = {
            id: response.json.id,
            title: "", // Empty title
            author: "" // Empty author
        }

        const responseUpdate: ServerResponse = await this.requestHandler.putRequest(
            userRole,
            `/api/books/${bookUpdate.id}`,
            bookUpdate
        );

        expect(responseUpdate.status).toBe(400);
        expect(responseUpdate.json.text).toContain("Mandatory parameters should not be null");
        console.log(`Book Update: ${book.title} book could not be Updated with empty values for mandatory parameters.`);
    }

}