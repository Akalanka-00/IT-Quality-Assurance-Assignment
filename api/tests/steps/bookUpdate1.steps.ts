import {Given, Then, When} from '@cucumber/cucumber';
import {BookUpdate1} from "../../src/BookUpdate1";
import {DataStore} from "../../utils/DataStore";

/**
 Scenario 1: Update a book with User Role
 **/

Given(/^New book data is provided for update book$/, function () {
    const data = DataStore.getInstance().getData();
    this.book = {
        title: `${data.SharedData.randomStr}_Title_ToBeUPDATE_${Date.now()}`,
        author: `${data.SharedData.randomStr}_Author_ToBeUPDATE_${Date.now()}`
    };
});

Then(/^I attempt to update the same book$/, async function () {
    const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
    await bookUpdate1.updateBookWithUser(this.response, this.userRole, this.book);
});

Then(/^The book could not be Updated with User Role$/, async function () {
    const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
    await bookUpdate1.verifyBookUpdateFailed(this.response, this.book);
});

/**
 Scenario 2: Update a book with Invalid values (Non-Integer ID)
 **/

When(/^I attempt to update the book with the non-integer ID$/, async function () {
    const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
    this.response = await bookUpdate1.updateBookWithInvalidID(this.book, this.userRole);
});

Then(/^The update should fail with a 400 status code$/, async function () {
    const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
    await bookUpdate1.verifyInvalidBookUpdate(this.response);
});

/**
 Scenario 3: Update a book with Empty values for Mandatory (Author and Title)
 **/

When(/^I attempt to update the book with empty values$/, async function () {
    const bookUpdate1:BookUpdate1 = new BookUpdate1(this.request);
    await bookUpdate1.updateBookWithEmptyValues(this.response, this.userRole, this.book);
});

Then(/^The update should fail with a 400 status code and mandatory field error$/, async function () {
    const bookUpdate1: BookUpdate1 = new BookUpdate1(this.request);
    await bookUpdate1.verifyBookUpdateFailed(this.response, this.book);
});


