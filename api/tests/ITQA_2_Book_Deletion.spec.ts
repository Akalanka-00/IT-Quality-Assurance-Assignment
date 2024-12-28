import {test} from "playwright/test";

import { BookDeletion } from "../src/BookDeletion";

test.describe('Book Deletion', () => {

    test('delete a book with Invalid param', async ({ request }) => {
        const bookDeletion:BookDeletion = new BookDeletion(request);
        await bookDeletion.deleteBookWithInvalidParam();
    });

    test.only('delete a book with Null param', async ({ request }) => {
        const bookDeletion:BookDeletion = new BookDeletion(request);
        await bookDeletion.deleteBookWithNullParam();
    });
    test('delete a book with param', async ({ request }) => {
        const bookDeletion:BookDeletion = new BookDeletion(request);
        await bookDeletion.deleteBookWithInvalidParam();
    });

});
