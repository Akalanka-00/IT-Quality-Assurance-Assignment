import {request, test} from "playwright/test";
import {BookCreation} from "../src/BookCreation";

test.describe('Book Creation', () => {

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

    test('Create a book without title', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.creatBookWithoutTitle();
    });

    test('Create a book without author', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBookWithoutAuthor();
    });
    
    test('Create a book with integer type ID', async ({ request }) => {
        const bookCreation:BookCreation = new BookCreation(request);
        await bookCreation.createBookWithIntegerId();
    });
});


