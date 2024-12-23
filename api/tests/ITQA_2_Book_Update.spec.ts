import {test} from "playwright/test";
import {BookUpdate_2} from "../src/BookUpdate_2";

test.describe('Book Update', () => {

    test('Update a book with User Role', async ({request}) => {
        const bookUpdate2: BookUpdate_2 = new BookUpdate_2(request);
        await bookUpdate2.updateBookWithUser();
    });

    test('Update a book with Invalid values (Non-Integer ID)', async ({ request }) => {
        const bookUpdate2: BookUpdate_2 = new BookUpdate_2(request);
        await bookUpdate2.updateBookWithNonIntegerID();
    });

    test('Update a book with Empty values for Mandatory (Author and Title)', async ({ request }) => {
        const bookUpdate2: BookUpdate_2 = new BookUpdate_2(request);
        await bookUpdate2.updateBookWithEmptyValues();
    });
});