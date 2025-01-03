Feature: Book Deletion

  Background:
    Given When valid baseUrl is provided

  @TC-017
  Scenario:Delete a book as User
    Given New book data is provided for delete book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to delete the book
    Then The book could not be deleted with User Role

  @TC-018
  Scenario: Delete a book with non existing id as User
    Given Set User Role to User
    When I attempt to delete the book with non existing id
    Then The delete should User is not permitted.

  @TC-019
  Scenario: Delete a book with no existing param as Admin
    Given Set User Role to Admin
    When I attempt to delete the book with non existing id
    Then The delete should be book not found.

  @TC-020
  Scenario: Delete a book with valid param as Admin
    Given New book data is provided for delete book
    And Set User Role to Admin
    When I create a book
    Then the book should be created successfully
    When I delete the book
    Then The book should be deleted.

  @TC-021
  Scenario: Delete a book with invalid param as Admin
    Given Set User Role to Admin
    When I attempt to delete the book with invalid id
    Then The delete should be invalid.