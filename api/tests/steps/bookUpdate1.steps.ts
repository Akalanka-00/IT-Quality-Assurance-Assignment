import {Given, Then, When} from '@cucumber/cucumber';
import {ApiContextCreator} from "../../utils/apiContextCreator";
import {BookUpdate1} from "../../src/BookUpdate1";
import {DataStore} from "../../utils/DataStore";
import {UserRole} from "../../enum/UserRole";
import {BookCreation} from "../../src/BookCreation";

/**
 Scenario: Update a book with User Role
 **/

Given(/^New book data is provided for update book$/, function () {
    const data = DataStore.getInstance().getData();
    this.book = {
        title: `${data.SharedData.randomStr}_Title_ToBeUPDATE`,
        author: `${data.SharedData.randomStr}_Author_ToBeUPDATE`
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