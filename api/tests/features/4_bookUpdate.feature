Feature: Book Update

  Background:
    Given When valid baseUrl is provided

  @TC-011
  Scenario: Update a book with User Role
    Given New book data is provided for update book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to update the same book
    Then The book could not be Updated with User Role

  @TC-012
  Scenario: Update a book with Invalid values (Non-Integer ID)
    Given Set User Role to Admin
    When I attempt to update the book with the non-integer ID
    Then The update should fail with a 400 status code

  @TC-013
  Scenario: Update a book with Empty values for Mandatory (Author and Title)
    Given New book data is provided for update book
    And Set User Role to Admin
    When I create a book
    Then the book should be created successfully
    When I attempt to update the book with empty values
    Then The update should fail with a 400 status code and mandatory field error
