// import {APIRequestContext, expect} from "@playwright/test";
// import {RequestHandler} from "../utils/RequestHandler";
// import {ServerResponse} from "../model/ServerResponse";
// import {UserRole} from "../enum/UserRole";
// import {Book} from "../model/Book";
// import {DataStore} from "../utils/DataStore";
// import {BookCreation} from "./BookCreation";
// import { BookRetrieval } from "./BookRetrieval";

// export class BookUpdate_3{
   
//     private request:APIRequestContext;
//     private requestHandler:RequestHandler;
//     private bookCreation: BookCreation;

//     constructor(request:APIRequestContext){
//         this.request = request;
//         this.requestHandler = new RequestHandler(request);
//         this.bookCreation = new BookCreation(request);
//     }

//     public async updateNonExistentBook(){
//         const data = DataStore.getInstance().getData();
//         const nonExistentBookId = data.SharedData.randomInt; // Example ID that doesn't exist

//         const bookRetrieval:BookRetrieval = new BookRetrieval(this.request);
//                 const json = await bookRetrieval.retrieveAllBooks(UserRole.Admin);
//                 const books: Book[] = json.map((book: any) => ({
//                     id: String(book.id), // Ensure id is a string
//                     title: String(book.title),
//                     author: String(book.author),
//                 }));
//                 const exsistingBooks = books.filter((book: Book) => book.id === nonExistentBookId);

//                 if (exsistingBooks.length > 0){
//                     console.log(`Book ID ${nonExistentBookId} is alredy exsisting in system`)
//                     return;
//                 }

//         const book: Book = {
//             id: nonExistentBookId, 
//             title: `${data.SharedData.randomStr}_NonExistentBook`, 
//             author: `${data.SharedData.randomStr}_UnknownAuthor`       
//         };

//         const response: ServerResponse = await this.requestHandler.putRequest(
//             UserRole.Admin,
//             `/api/books/${book.id}`,
//             book
//         );

//     expect(response.status).toBe(404);
//     expect(response.statusText).toBe('');
//     console.log(`Book Update with non existent successfull:${data.SharedData.randomStr}_Could not be update non-existent book`);

//   }

//     public async updateBookWithoutAuthentication(){
//         const data = DataStore.getInstance().getData();
//         const bookCreate: Book = {
//             title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
//             author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
//         };

//         const responseCreate = await this.bookCreation.createBook(UserRole.User, bookCreate);

//         const book: Book = {
//             id: responseCreate.json.id,
//             title: `${data.SharedData.randomStr}_Title_UPDATED`,
//             author: `${data.SharedData.randomStr}_Title_UPDATE`
//         };

//         const response: ServerResponse = await this.requestHandler.putRequest(
//             UserRole.Unauthorized,
//             `/api/books`,
//             book,
//             book.id
//         );

//     expect(response.status).toBe(403);
//     expect(response.statusText).toBe('');
//     console.log(`Book Update: Unauthorized access to update book with ID ${book.id}.`);

//     }


//     public async updateBookWithSameTitleDifferentAuthor() {
//         const data = DataStore.getInstance().getData();
//         const bookCreate: Book = {
//             title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
//             author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
//         };

//         const responseCreate: ServerResponse = await this.requestHandler.postRequest(
//             UserRole.Admin,
//             "/api/books",
//             bookCreate
//         );

//         expect(responseCreate.status).toBe(201);
//         console.log(`Book Update: Book ${responseCreate.json.title} created successfully.`);

//         const book: Book = {
//             id: responseCreate.json.id,
//             title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`, // Same title
//             author: `${data.SharedData.randomStr}_NewAuthor` // Updated author
//         };

//         const response: ServerResponse = await this.requestHandler.putRequest(
//             UserRole.Admin,
//             `/api/books/${book.id}`,
//             book
//         );

//         expect(response.status).toBe(200);
//         expect(response.json.title).toBe(book.title); 
//         expect(response.json.author).toBe(book.author);
//         console.log(`Book Update: ${data.SharedData.randomStr}_book could not updated successfully with new author: ${book.author}.`);

//     }

// }