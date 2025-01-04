import { Given, When, Then } from '@cucumber/cucumber';
import { ApiContextCreator } from "../../utils/apiContextCreator";
import { BookCreation } from "../../src/BookCreation";
import { DataStore } from "../../utils/DataStore";
import { UserRole } from "../../enum/UserRole";

const contextCreator: ApiContextCreator = new ApiContextCreator();

/**
 * Common Steps
 */

Given("I am logged in as an admin user2", function () {
  this.userRole = UserRole.Admin;
  console.log("User Role set to Admin");
});

Given("When valid baseUrl is provided2", async function () {
  this.request = await contextCreator.createApiContext();
});

/**
 * Scenario: Create a book without a title
 */

Given("I provide a book with an author but no title", function () {
  const data = DataStore.getInstance().getData();
  this.book = {
    author: `${data.SharedData.randomStr}_AUTHOR`,
    title: "" 
  };
});

When("I attempt to create the book2", async function () {
  const bookCreation: BookCreation = new BookCreation(this.request);
  this.response = await bookCreation.createBook(this.userRole, this.book);

  if (!this.response.status || this.response.status !== 201) {
    throw new Error(`Expected status 201 but received "${this.response.status}"`);
  }
});

Then("the system should respond with an error message for missing {string}", async function () {
    const data = DataStore.getInstance().getData();
    const expectedErrorMessage=data.BookData.missingValues.title;
  if (this.response.status !== 400) {
    throw new Error(`Expected status 400 but received ${this.response.status}`);
  }
  if (!this.response.body.error || this.response.body.error !== expectedErrorMessage) {
    throw new Error(`Expected error message "${expectedErrorMessage}" but received "${this.response.body.error}"`);
  }
});

/**
 * Scenario: Create a book without an author
 */

Given("I provide a book with a title but no author", function () {
  const data = DataStore.getInstance().getData();
  this.book = {
    title: `${data.SharedData.randomStr}_TITLE`,
    author: "" 
  };
});

  
  Then("the system should respond with an error message {string}", async function () {
      const data = DataStore.getInstance().getData();
      const expectedErrorMessage=data.BookData.missingValues.author;
    if (this.response.status !== 400) {
      throw new Error(`Expected status 400 but received ${this.response.status}`);
    }
    if (!this.response.body.error || this.response.body.error !== expectedErrorMessage) {
      throw new Error(`Expected error message "${expectedErrorMessage}" but received "${this.response.body.error}"`);
    }
  });


/**
 * Scenario: Create a book with an integer type ID
 */

Given("I set the book ID as an integer value", function () {
    const data = DataStore.getInstance().getData();
    this.book = {
      id: data.SharedData.randomInt, 
      title: `${data.SharedData.randomStr}_TITLE`,
      author: `${data.SharedData.randomStr}_AUTHOR`,
    };
  });
  
  Given("I provide a valid title and author", function () {
    const data = DataStore.getInstance().getData();
    this.book = {
      title: `${data.SharedData.randomStr}_TITLE`,
      author: `${data.SharedData.randomStr}_AUTHOR`,
    };
  });
  
  Then("the system should respond with an error message", async function () {
    const data = DataStore.getInstance().getData();
    const expectedErrorMessage=data.BookData.missingValues.id;
    if (this.response.status !== 400) {
      throw new Error(`Expected status 400 but received ${this.response.status}`);
    }
  
    const error = this.response.json.text;
    if (!error || error !== expectedErrorMessage) {
      throw new Error(`Expected error message "${expectedErrorMessage}" but received "${error}"`);
    }
  });
  
  // Then("the book should be created successfully", async function () {
  //   if (this.response.status !== 201) {
  //     throw new Error(`Expected status 201 but received ${this.response.status}`);
  //   }
  //
  //   const createdBook = this.response.body;
  //   if (!createdBook || createdBook.title !== this.book.title || createdBook.author !== this.book.author) {
  //     throw new Error("Book creation response does not match the provided book details.");
  //   }
  //
  //   console.log("Book created successfully:", createdBook);
  // });