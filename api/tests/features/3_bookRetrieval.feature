Feature: Book Retrieval
  Background:
    Given When valid baseUrl is provided

  @TC-007
  Scenario: Retrieve all books for a user role as admin
    Given Set User Role to Admin
    When the user retrieves all books
    Then the system should return a list of all books

  @TC-008
  Scenario: Retrieve a book by ID for a user role as user
    Given Set User Role to User
    When the user retrieves a book by its ID
    Then the system should return the book details

  @TC-009
  Scenario: Retrieve a book by a non-existing ID for a user role as user
    Given Set User Role to User
    When the user attempts to retrieve a book by a non-existing ID
    Then the system should return an error message for non-existent book

  @TC-010
  Scenario: Attempt to retrieve a book by an invalid ID for a user role as admin
    Given Set User Role to Admin
    When the user attempts to retrieve a book by an invalid
    Then the system should return an error message for invalid ID

