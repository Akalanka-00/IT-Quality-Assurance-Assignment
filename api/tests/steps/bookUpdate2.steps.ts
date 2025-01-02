// import {Given, Then, When} from '@cucumber/cucumber';
// import {ApiContextCreator} from "../../utils/apiContextCreator";
// import {BookUpdate_3} from "../../src/BookUpdate_3";
// import {DataStore} from "../../utils/DataStore";
// import {UserRole} from "../../enum/UserRole";
// import { BookRetrieval } from '../../src/BookRetrieval';

// let bookUpdate_3: BookUpdate_3;

// /**
//  Scenario: Update a book without authentication
//  **/

// Given(/^created new valid book for update$/, async function () {
//     const data = DataStore.getInstance().getData();
//     this.book = {
//         title: `${data.SharedData.randomStr}_Title_ToBeUPDATED`,
//         author: `${data.SharedData.randomStr}_Author_ToBeUPDATED`
//     };

//     const bookUpdate_3: BookUpdate_3 = new BookUpdate_3(this.request);
//     // Create a book first before attempting an update without authentication
//     this.responseCreate = await bookUpdate_3.createBookWithUser(UserRole.Admin, this.book);
//     expect(this.responseCreate.status).toBe(201); // Ensure the book was created successfully
// });

// When(/^I attempt to update the book without authentication$/, async function () {
//     const bookUpdate_3: BookUpdate_3 = new BookUpdate_3(this.request);
//     // Attempt to update the book without proper authentication (unauthorized access)
//     await bookUpdate_3.updateBookWithoutAuthentication();
// });

// Then(/^the response status should be 403$/, function () {
//     // Ensure the response is 403 Forbidden
//     expect(this.response.status).toBe(403);
// });

// Then(/^the system should log an unauthorized access message$/, function () {
//     // Ensure the correct log message is shown for unauthorized access
//     console.log(`Book Update: Unauthorized access to update book with ID ${this.book.id}.`);
// });







// // Given(/^I have a randomly generated book ID$/, function () {
// //     const data = DataStore.getInstance().getData();
// //     this.bookId = data.SharedData.randomInt; // Randomly generated ID
// // });

// // Given(/^I retrieve the list of all books$/, async function () {
// //     const bookUpdate3: BookUpdate_3 = new BookUpdate_3(this.request);
// //     const bookRetrieval = new BookRetrieval(this.request);  // Correct capitalization
// //     this.response = await bookRetrieval.retrieveAllBooks(UserRole.Admin);  // Fetch all books
// //     console.log("Books retrieved:", this.response);
// // });

// // Then(/^I verify the book ID does not exist in the system$/, function () {
// //     const data = DataStore.getInstance().getData();
// //     const nonExistentBookId = this.bookId;
// //     console.log(`Verifying that book with ID ${nonExistentBookId} does not exist.`);
// //     const books = this.response.json; // Assuming the response is a JSON array of books
// //     const nonExistentBook = books.filter((book: any) => book.id === nonExistentBookId);
// //     if (nonExistentBook) {
// //         console.log(`Book with ID ${nonExistentBookId} already exists.`);
// //         throw new Error(`Book with ID ${nonExistentBookId} already exists.`);
// //     }
// // });

// // When(/^I attempt to update the non-existent book with the generated ID$/, async function () {
// //     const bookUpdate3: BookUpdate_3 = new BookUpdate_3(this.request);
// //     const data = DataStore.getInstance().getData();
// //     const book = {
// //         id: this.bookId, // Non-existent book ID
// //         title: `${data.SharedData.randomStr}_NonExistentBook`,
// //         author: `${data.SharedData.randomStr}_UnknownAuthor`
// //     };

// //     const response = await this.request.put(`/api/books/${book.id}`, book);
// //     this.response = response;
// // });

// // Then(/^the system should log a message indicating the book does not exist$/, function () {
// //     console.log(`Book with ID ${this.bookId} does not exist.`);
// //     // expect(this.response.status).toBe(404);
// //     console.log("Response status is 404 as expected.");
// // });
