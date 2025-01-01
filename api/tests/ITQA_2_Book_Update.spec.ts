import {test} from "playwright/test";
import {BookUpdate1} from "../src/BookUpdate1";

test.describe('Book Update', () => {

    test('Update a book with User Role', async ({request}) => {
        const bookUpdate2: BookUpdate1 = new BookUpdate1(request);
        await bookUpdate2.updateBookWithUser(this.userRole, this.book);
    });

    test('Update a book with Invalid values (Non-Integer ID)', async ({ request }) => {
        const bookUpdate2: BookUpdate1 = new BookUpdate1(request);
        await bookUpdate2.updateBookWithNonIntegerID();
    });

    test('Update a book with Empty values for Mandatory (Author and Title)', async ({ request }) => {
        const bookUpdate2: BookUpdate1 = new BookUpdate1(request);
        await bookUpdate2.updateBookWithEmptyValues();
    });
});