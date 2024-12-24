import { test } from "playwright/test";
import { BookRetrieval } from "../src/BookRetrieval";
import { RequestHandler } from "../utils/RequestHandler";
import { UserRole } from "../enum/UserRole";

test.describe("Book Retrieval", () => {
  
  test("Retrieve all books as Admin", async ({ request }) => {
    const bookRetrieval = new BookRetrieval(request);
    await bookRetrieval.retrieveAllBooks(UserRole.Admin);
  });

  test("Retrieve book by ID as User", async ({ request }) => {
    const bookRetrieval = new BookRetrieval(request);
    const bookId = 1; 
    await bookRetrieval.retrieveBookById(UserRole.User, bookId);
  });

  test("Retrieve book by non-Exist ID as User", async ({ request }) => {
    const bookRetrieval = new BookRetrieval(request);
    const bookId = 500;
    await bookRetrieval.retrieveBookByNonExistID(UserRole.User, bookId);
  });

  test("Retrieve book by Invalid ID as Admin", async ({ request }) => {
    const bookRetrieval = new BookRetrieval(request);
    const bookId = '"2"';
    await bookRetrieval.retrieveBookByInvalidIDorNull(UserRole.Admin, bookId);
  });
});

