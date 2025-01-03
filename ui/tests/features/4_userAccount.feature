Feature: User Account

Background:
  Given Login with valid user credentials

  @TC-028
  Scenario: Successfully update account details
    Given I navigate to the "My Account Information" page
    When I update the firstname,lastname and email
    And I click the "Continue" button
    Then I should see a success message confirming the details were updated

    @TC-029
  Scenario: Validation errors when fields are left empty or invalid
    Given I navigate to the "My Account Information" page
    When I leave the firstname, lastname, and email fields empty
    And I click the "Continue" button
    Then I should see the validation errors

