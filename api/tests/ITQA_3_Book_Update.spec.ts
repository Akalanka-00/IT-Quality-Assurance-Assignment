// import {test} from "playwright/test";
// import {BookUpdate_3} from "../src/BookUpdate_3";


// test.describe('Book Update', () => {

//     test("Update - Attempt to update a non-existent book", async ({ request }) => {
//         const bookUpdate3: BookUpdate_3 = new BookUpdate_3(request);
//         await bookUpdate3.updateNonExistentBook();

//     });

//     test("Attempt to update a book without authentication", async ({ request }) => {
//         const bookUpdate3: BookUpdate_3 = new BookUpdate_3(request);
//         await bookUpdate3.updateBookWithoutAuthentication();
//     });


//     test("Updating a Book with Same Title and Different Author", async ({ request }) => {
//         const bookUpdate3: BookUpdate_3 = new BookUpdate_3(request);
//         await bookUpdate3.updateBookWithSameTitleDifferentAuthor();
//     });

// })