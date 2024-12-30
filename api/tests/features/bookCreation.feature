Feature: Book Creation

  Background:
    Given When valid baseUrl is provided


  Scenario: Create a book with a user role
    Given New book data is provided
    And Set User Role to User
    When I create a book
    Then the book should be created successfully

  Scenario: Create a book with integer values
    Given I provide integer values for book fields
    And Set User Role to Admin
    When I attempt to create a book
    Then the book should be created successfully

  Scenario: Create a book with duplicate data
    Given New book data is provided for duplicate book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to create the same book
    Then the system should not contain duplicate books

  Scenario: Create a book without a title
    Given Book provided with missing title
    When I attempt to create the book
    Then the system should respond with an error for missing title

  Scenario: Create a book without an author
    Given I do not provide an author for the book
    When I attempt to create the book
    Then the system should respond with an error for missing author

  Scenario: Create a book with an integer type ID
    Given I provide an integer as the book ID
    When I attempt to create the book
    Then the book should be created successfully
