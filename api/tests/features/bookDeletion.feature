Feature: Book Deletion

  Background:
    Given When valid baseUrl is provided


  Scenario:Delete a book with User Role
    Given New book data is provided for delete book
    And Set User Role to User
    When I create a book
    Then the book should be created successfully
    And I attempt to delete the same book
    Then The book could not be deleted with User Role

    Scenario: Update a book with valid param
    Given Set User Role to Admin
    When I attempt to delete the book with the valid param
    Then The delete should User is not permitted.
    
    Scenario: Update a book with no existent param
    Given Set User Role to Admin
    When I attempt to delete the book with no existent param
    Then The delete should User is not permitted.

    Scenario: Update a book with valid param
    Given Set User Role to Admin
    When I attempt to delete the book with the valid param
    Then The delete should User is not permitted.
    