import {test} from "playwright/test";
import {BookCreation} from "../src/BookCreation";

test.describe.only('Book Creation', () => {

    test('Create a book with user', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBookWithUser();
    });

    test('Create a book with valid data', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBook();
    });

    test('Create a book with duplicate data', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createSameBook();
    });
});
