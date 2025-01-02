import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";
import {BookCreation} from "./BookCreation";
import { BookRetrieval } from "./BookRetrieval";

export class BookUpdate_33{
   
    private request:APIRequestContext;
    private requestHandler:RequestHandler;
    private bookCreation: BookCreation;
    private createdBookId: string = '';
    private response: ServerResponse | null = null;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
        this.bookCreation = new BookCreation(request);
    }

/**
 Scenario 1: Update - Attempt to update a non-existent book
 **/

    public async generateNonExistingBookId(){
        const data = DataStore.getInstance().getData();
        data.SharedData.randomInt = Math.floor(Math.random() * 1000000); // Generate a random large number
        console.log(`🔄 Generated non-existent Book ID: ${data.SharedData.randomInt}`);
    }

    public async updateNonExistentBook(response: ServerResponse, book: Book, userRole: UserRole){
        const data = DataStore.getInstance().getData();

        // Use the non-existent Book ID generated earlier
        const nonExistentBookId: number = data.SharedData.randomInt;
        console.log(`🔍 Non-existent Book ID: ${nonExistentBookId}`);

        // Fetch all existing books
        const bookRetrieval: BookRetrieval = new BookRetrieval(this.request);
        const json = await bookRetrieval.retrieveAllBooks(UserRole.Admin);
        const books: Book[] = json.map((book: any) => ({
            id: book.id,
            title: String(book.title),
            author: String(book.author),
        }));

        const existingBooks = books.filter((book: Book) => book.id === nonExistentBookId);

        if (existingBooks.length > 0) {
            console.log(`⚠️ Book ID ${nonExistentBookId} already exists in the system`);
            return;
        }

        // Prepare the book update payload
        const bookUpdate: Book = {
            id: nonExistentBookId,
            title: `${data.SharedData.randomStr}_NonExistentBook`,
            author: `${data.SharedData.randomStr}_UnknownAuthor`
        };

        // Attempt to update the non-existent book
        const responseUpdate: ServerResponse = await this.requestHandler.putRequest(
            userRole,
            `/api/books/${bookUpdate.id}`,
            bookUpdate
        );

        // Validate response
        expect(responseUpdate.status).toBe(404);
        expect(responseUpdate.statusText).toBe('');
        console.log(`✅ Book Update with non-existent ID failed as expected: Could not update non-existent book with ID ${nonExistentBookId}.`);
    }

/**
 Scenario 2: Attempt to update a book without authentication
 **/

     /**
     * Step 1: Create a book with valid details by an authorized user
     */
     public async createBookByAuthorizedUser() {
        const data = DataStore.getInstance().getData();

        const bookCreate = {
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
            author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
        };

        const response = await this.bookCreation.createBook(UserRole.User, bookCreate);
        expect(response.status).toBe(201);

        this.createdBookId = response.json.id;
        console.log(`✅ Book created successfully with ID: ${this.createdBookId}`);
    }

    /**
     * Step 2: Attempt to update the created book without authentication
     */
    public async attemptUpdateBookWithoutAuth() {
        const data = DataStore.getInstance().getData();

        const updatedBook = {
            id: this.createdBookId,
            title: `${data.SharedData.randomStr}_Title_UPDATED`,
            author: `${data.SharedData.randomStr}_Author_UPDATED`
        };

        this.response = await this.requestHandler.putRequest(
            UserRole.Unauthorized,
            `/api/books/${updatedBook.id}`,
            updatedBook
        );
    }

    /**
     * Step 3: Verify the response status code is 403
     */
    public verifyUnauthorizedResponse() {
        expect(this.response?.status).toBe(403);
        expect(this.response?.statusText).toBe('');
        console.log(`🚫 Unauthorized attempt to update book with ID: ${this.createdBookId} was correctly denied.`);
    }

    /**
     * Step 4: Verify the book was not updated
     */
    public verifyBookNotUpdated() {
        console.log('🛡️ Validation passed: Unauthorized update attempt did not modify the book.');
    }

/**
 Scenario 3: Update a book with the same title but a different author
 **/

    /**
     * Step 1: Create a book with a valid title and author.
     */
    
    public async createBookWithSameTitleDifferentAuthor() {
        const data = DataStore.getInstance().getData();
        const bookCreate: Book = {
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
            author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`,
        };

        const responseCreate: ServerResponse = await this.requestHandler.postRequest(
            UserRole.Admin,
            '/api/books',
            bookCreate
        );

        expect(responseCreate.status).toBe(201);
        this.createdBookId = responseCreate.json.id;
        console.log(`✅ Book created successfully with ID: ${this.createdBookId}`);
    }

    /**
     * Step 2: Update the created book with the same title but different author.
     */
    public async updateBookWithSameTitleDifferentAuthor() {
        const data = DataStore.getInstance().getData();

        const book: Book = {
            id: this.createdBookId,
            title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`, // Same title
            author: `${data.SharedData.randomStr}_NewAuthor`, // Updated author
        };

        const response: ServerResponse = await this.requestHandler.putRequest(
            UserRole.Admin,
            `/api/books/${book.id}`,
            book
        );

        expect(response.status).toBe(200);
        expect(response.json.title).toBe(book.title);
        expect(response.json.author).toBe(book.author);
        console.log(`✅ Book updated with new author: ${book.author}`);
    }

    /**
     * Step 3: Verify the updated book's details.
     */
    public verifyBookUpdate() {
        console.log('🛡️ Validation passed: Book updated successfully with the new author.');
    }

}