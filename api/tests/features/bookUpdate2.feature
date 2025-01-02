Feature: Book Update_2

  Background:
    Given When valid baseUrl is provided

  Scenario: Update - Attempt to update a non-existent book
    Given Set User Role to Admin
    And A non-existent book ID is generated
    When I attempt to update a non-existent book
    # Then The update should fail with a 404 status code and a not found message


  Scenario: Attempt to update a book without authentication
    Given a book is created with valid details by an authorized user
    When an unauthorized user attempts to update the created book
    Then the system should return a 403 status code
    And the book should not be updated

  Scenario: Update a book with the same title but a different author
    Given New book data is provided for update book
    And Set User Role to Admin
    When I create a book
    Then the book should be created successfully
    And the created book is updated with the same title and different author
    Then the system should update the book with the new author
