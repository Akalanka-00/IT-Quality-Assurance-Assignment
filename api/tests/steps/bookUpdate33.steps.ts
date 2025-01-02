import {Given, Then, When} from '@cucumber/cucumber';
import {ApiContextCreator} from "../../utils/apiContextCreator";
import {BookUpdate_33} from "../../src/BookUpdate_33";
import { BookUpdate1 } from '../../src/BookUpdate1';
import {DataStore} from "../../utils/DataStore";
import {UserRole} from "../../enum/UserRole";

let bookUpdate_33: BookUpdate_33;
let bookUpdate1: BookUpdate1;

/**
 Scenario 1: Update - Attempt to update a non-existent book
 **/

Given(/^A non-existent book ID is generated$/, async function () {
    bookUpdate_33 = new BookUpdate_33(this.request);
    await bookUpdate_33.generateNonExistingBookId();
});

When(/^I attempt to update a non-existent book$/, async function () {
    bookUpdate_33 = new BookUpdate_33(this.request);
    this.response = await bookUpdate_33.updateNonExistentBook(this.response, this.book, this.userRole);
});

Then(/^The update should fail with a 404 status code and a not found message$/, async function () {
        const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
        await bookUpdate1.verifyBookUpdateFailed(this.response, this.book);
});

/**
 Scenario 2: Attempt to update a book without authentication
 **/

Given('a book is created with valid details by an authorized user', async function () {
    bookUpdate_33 = new BookUpdate_33(this.request);
    await bookUpdate_33.createBookByAuthorizedUser();
});

When('an unauthorized user attempts to update the created book', async function () {
    await bookUpdate_33.attemptUpdateBookWithoutAuth();
});

Then('the system should return a 403 status code', function () {
    bookUpdate_33.verifyUnauthorizedResponse();
});

Then('the book should not be updated', function () {
    bookUpdate_33.verifyBookNotUpdated();
});

/**
 Scenario 3: Update a book with the same title but a different author
 **/

Given('a book is created with the same title and different author', async function () {
    bookUpdate_33 = new BookUpdate_33(this.request);
    await bookUpdate_33.createBookWithSameTitleDifferentAuthor();
});

When('the created book is updated with the same title and different author', async function () {
    await bookUpdate_33.updateBookWithSameTitleDifferentAuthor();
});

Then('the system should update the book with the new author', function () {
    bookUpdate_33.verifyBookUpdate();
});