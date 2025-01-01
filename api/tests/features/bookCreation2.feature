Feature: Book Creation2

  Background:
    Given When valid baseUrl is provided
    

# Scenario: Create a book without a title 
#   Given I am logged in as an admin user
#   And I provide a book with an author but no title
#   When I attempt to create the book
#   Then the system should respond with an error message "Missing title"

Scenario: Create a book without an author
  Given I am logged in as an admin user
  And I provide a book with a title but no author
  When I attempt to create the book
  Then the system should respond with an error message "Missing author"

# Scenario: Create a book with an integer type ID
#   Given I am logged in as an admin user
#   And I provide a valid title and author
#   And I set the book ID as an integer value
#   When I attempt to create the book
#   Then the system should respond with an error message


