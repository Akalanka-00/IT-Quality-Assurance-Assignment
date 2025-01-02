import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test'; 
import { BookRetrieval } from "../../src/BookRetrieval";

let bookRetrieval: BookRetrieval;

// Retrieve all books for a user role as admin

When('the user retrieves all books', async function () {
  bookRetrieval = new BookRetrieval(this.request);
  this.response = await bookRetrieval.retrieveAllBooks(this.userRole);
});

Then('the system should return a list of all books', function () {
  expect(this.response).toBeInstanceOf(Array);
})

// Retrieve a book by ID for a user role as user

When('the user retrieves a book by its ID', async function () {
  const bookId = 1; 
  this.response = await bookRetrieval.retrieveBookById(this.userRole, bookId);
});

Then('the system should return the book details', async function () {
  expect(this.response).toHaveProperty('id');
  expect(this.response.id).toBe(1);
  expect(this.response).toHaveProperty('title');

});

// Retrieve a book by a non-existing ID for a user role as user

When('the user attempts to retrieve a book by a non-existing ID', async function () {
  const bookId = 500;
  this.response = await bookRetrieval.retrieveBookByNonExistID(this.userRole, bookId);
});

Then('the system should return an error message for non-existent book', async function () {
  expect(this.response).toBe('"Book not found"');
});

// Attempt to retrieve a book by an invalid or for a user role as admin

When('the user attempts to retrieve a book by an invalid', async function () {
  const bookId = '"2"';
  this.response = await bookRetrieval.retrieveBookByInvalidIDorNull(this.userRole, bookId);
});

Then('the system should return an error message for invalid ID', async function () {
  expect(this.response.status).toBe(400);
});

