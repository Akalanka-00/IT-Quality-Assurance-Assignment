import {test} from "playwright/test";
import {BookCreation} from "../src/BookCreation";

test.describe('Book Creation', () => {

    test('Create a book with user', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBookWithUser();
    });

    test('Create a book with integer values', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBookWithIntegerValues();
    });

    test('Create a book with duplicate data', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createSameBook();
    });
});
