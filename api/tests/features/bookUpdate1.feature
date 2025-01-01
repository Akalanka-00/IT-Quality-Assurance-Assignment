Feature: Book Update

  Background:
    Given When valid baseUrl is provided

  Scenario: Update a book with User Role
    Given New book data is provided for update book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to update the same book
    Then The book could not be Updated with User Role