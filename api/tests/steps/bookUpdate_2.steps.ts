import {Given, Then, When} from '@cucumber/cucumber';
import {BookUpdate2} from "../../src/BookUpdate2";
import { BookUpdate1 } from '../../src/BookUpdate1';


let bookUpdate2: BookUpdate2;

/**
 Scenario 1: Update - Attempt to update a non-existent book
 **/

Given(/^A non-existent book ID is generated$/, async function () {
    bookUpdate2 = new BookUpdate2(this.request);
    await bookUpdate2.generateNonExistingBookId();
});

When(/^I attempt to update a non-existent book$/, async function () {
    bookUpdate2 = new BookUpdate2(this.request);
    this.response = await bookUpdate2.updateNonExistentBook(this.response, this.book, this.userRole);
});

Then(/^The update should fail with a 404 status code and a not found message$/, async function () {
        const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
        await bookUpdate1.verifyBookUpdateFailed(this.response, this.book);
});

/**
 Scenario 2: Attempt to update a book without authentication
 **/

Given('a book is created with valid details by an authorized user', async function () {
    bookUpdate2 = new BookUpdate2(this.request);
    await bookUpdate2.createBookByAuthorizedUser();
});

When('an unauthorized user attempts to update the created book', async function () {
    await bookUpdate2.attemptUpdateBookWithoutAuth();
});

Then('the system should return a 403 status code', function () {
    bookUpdate2.verifyUnauthorizedResponse();
});

Then('the book should not be updated', function () {
    bookUpdate2.verifyBookNotUpdated();
});

/**
 Scenario 3: Update a book with the same title but a different author
 **/

When('the created book is updated with the same title and different author', async function () {
    await bookUpdate2.updateBookWithSameTitleDifferentAuthor();
});

Then('the system should update the book with the new author', function () {
    bookUpdate2.verifyBookUpdate();
});