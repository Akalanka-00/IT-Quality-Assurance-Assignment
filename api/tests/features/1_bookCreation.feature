Feature: Book Creation

  Background:
    Given When valid baseUrl is provided

@TC-001
  Scenario: Create a book with a user role as User
    Given New book data is provided
    And Set User Role to User
    When I create a book
    Then the book should be created successfully

  @TC-002
  Scenario: Create a book with integer values
    Given I provide integer values for book fields
    And Set User Role to Admin
    When I attempt to create a book
    Then the book should be created successfully

  @TC-003
  Scenario: Create a book with duplicate data
    Given New book data is provided for duplicate book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to create the same book
    Then the system should not contain duplicate books

