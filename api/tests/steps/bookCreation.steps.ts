import {Given, Then, When} from '@cucumber/cucumber';
import {ApiContextCreator} from "../../utils/apiContextCreator";
import {BookCreation} from "../../src/BookCreation";
import {DataStore} from "../../utils/DataStore";
import {UserRole} from "../../enum/UserRole";

const contextCreator:ApiContextCreator = new ApiContextCreator();

Given("When valid baseUrl is provided", async function () {
    this.request = await contextCreator.createApiContext();
});

/**
 Common Steps
 **/

Given(/^Set User Role to Admin$/, function () {
    this.userRole = UserRole.Admin;
    console.log(`User Role set to Admin`);
});

Given(/^Set User Role to User$/, function () {
    this.userRole = UserRole.User;
    console.log(`User Role set to User`);

});

/**
  Scenario: Create a book with a user role
 **/
Given("New book data is provided", async function () {
    const data = DataStore.getInstance().getData();
    this.book = {author: `${data.SharedData.randomStr}_AUTHOR`, title: `${data.SharedData.randomStr}_TITLE`};
});
When("I create a book", async function () {
    const bookCreation:BookCreation = new BookCreation(this.request);
    this.response = await bookCreation.createBook(this.userRole, this.book);
});
Then("the book should be created successfully", async function () {
    const bookCreation:BookCreation = new BookCreation(this.request);
    await bookCreation.verifyBookCreation(this.response, this.book);
});


/**
 Scenario: Create a book with integer values
 **/

Given("I provide integer values for book fields", async function () {
    const data = DataStore.getInstance().getData();
    this.book = {
        title: data.SharedData.randomInt,
        author: data.SharedData.randomInt
    };
});
When(/^I attempt to create a book$/, async function () {
    const bookCreation:BookCreation = new BookCreation(this.request);
    const book = await bookCreation.createBookWithIntegerValues(this.book, this.userRole);
    console.log(`Book creation attempted with integer values: ${book.title}, ${book.author}`);
});


/**
 Scenario: Create a book with duplicate book data
 **/

Given(/^New book data is provided for duplicate book$/, function () {
    const data = DataStore.getInstance().getData();
    this.book = {
        title: `${data.SharedData.randomStr}_TITLE(Duplicated)`,
        author: `${data.SharedData.randomStr}_AUTHOR(Duplicated)`
    };
});

Then(/^I attempt to create the same book$/, async function () {
    const bookCreation:BookCreation = new BookCreation(this.request);
    await bookCreation.createSameBook(this.userRole, this.book);
});

Then(/^the system should not contain duplicate books$/, async function () {
    const bookCreation:BookCreation = new BookCreation(this.request);
    await bookCreation.verifyBookDuplication(this.book);
});