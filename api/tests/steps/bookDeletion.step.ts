import {Given, Then, When} from "@cucumber/cucumber";
import {DataStore} from "../../utils/DataStore";
import {BookDeletion} from "../../src/BookDeletion";

Given(/^New book data is provided for delete book$/, function () {
    const data = DataStore.getInstance().getData();
    this.book = {
        title: `${data.SharedData.randomStr}_Title_ToBeDelete${Date.now()}`,
        author: `${data.SharedData.randomStr}_Author_ToBeDelete${Date.now()}`
    };
});
Then(/^I attempt to delete the book$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    this.response = await bookDeletion.deleteBook(this.response.json.id, this.userRole);
});

Then(/^The book could not be deleted with User Role$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    await bookDeletion.checkBookDeletedByUser(this.response, this.book.id);
});

When(/^I attempt to delete the book with non existing id$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    this.response = await bookDeletion.deleteBookWithNonExistingId(this.userRole);
});
Then(/^The delete should User is not permitted\.$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    await bookDeletion.bookDeletionNotPermitted(this.response);
});
Then(/^The delete should be book not found\.$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    await bookDeletion.bookNotFound(this.response);
});
Then(/^The book should be deleted\.$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    await bookDeletion.checkBookDeleteByAdmin(this.response, this.response.json.id);
});
When(/^I delete the book$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    this.response = await bookDeletion.deleteBook(this.response.json.id, this.userRole);

});
When(/^I attempt to delete the book with invalid id$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    this.response = await bookDeletion.deleteBookWithInvalidId(this.userRole);
});
Then(/^The delete should be invalid\.$/, async function () {
    const bookDeletion:BookDeletion = new BookDeletion(this.request);
    await bookDeletion.checkBookDeletionWithInvalidId(this.response);

});