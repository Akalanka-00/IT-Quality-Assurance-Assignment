import {APIRequestContext, expect} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {ServerResponse} from "../model/ServerResponse";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";
import {BookRetrieval} from "./BookRetrieval";

export class BookCreation{

    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }

    public async createBook(userRole:UserRole, bookData?:Book){
        const data = DataStore.getInstance().getData();
        const book:Book = bookData || {
            title: `${data.SharedData.randomStr}_TITLE`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        }
        const response:ServerResponse = await this.requestHandler.postRequest(userRole, "/api/books",book);
        expect(response.status).toBe(201);
        expect(response.json.title).toBe(book.title);
        expect(response.json.author).toBe(book.author);
        return response;
    }

    public async verifyBookCreation(response:ServerResponse,bookData:Book){
        const bookRetrieval:BookRetrieval = new BookRetrieval(this.request);
        const bookId:number = response.json.id;
        const json = await bookRetrieval.retrieveBookById(UserRole.Admin, bookId);
        expect(json.title).toBe(bookData.title);
        expect(json.author).toBe(bookData.author);
        console.log(`Book Created Successfully with ID: ${bookId}`);
    }

    public async createBookWithIntegerValues(book:Book, userRole:UserRole){
        const response:ServerResponse = await this.requestHandler.postRequest(userRole, "/api/books",book);
        expect(response.status).toBe(400);
        expect(response.statusText).toBe('');
        expect(response.json.text).toBe("Invalid data type");
        return book;

    }

    public async createSameBook(userRole:UserRole,book:Book){

        const duplicateResponse:ServerResponse = await this.requestHandler.postRequest(userRole, "/api/books",book);
        expect(duplicateResponse.status).toBe(208);
        expect(duplicateResponse.statusText).toBe('');
        expect(duplicateResponse.json).toBe('"Book Already Exists"');
        console.log(`BooK save with duplicate data, successfully!`);
    }

    public async verifyBookDuplication(bookData:Book){
        const bookRetrieval:BookRetrieval = new BookRetrieval(this.request);
        const json = await bookRetrieval.retrieveAllBooks(UserRole.Admin);
        const books: Book[] = json.map((book: any) => ({
            id: String(book.id), // Ensure id is a string
            title: String(book.title),
            author: String(book.author),
        }));
        const duplicateBook = books.filter((book: Book) => book.title === bookData.title && book.author === bookData.author);
        expect(duplicateBook.length).toBe(1);
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
            id: 12345, 
            title: `${data.SharedData.randomStr}_TITLE`,
            author: `${data.SharedData.randomStr}_AUTHOR`
        };
    
        const response:ServerResponse = await this.requestHandler.postRequest(UserRole.Admin, "/api/books", book);
        expect(response.status).toBe(400);
        expect(response.json.text).toBe('"ID must be a string"');
        console.log(`Error for book with integer ID: ${response.json.text}`);
    }

}