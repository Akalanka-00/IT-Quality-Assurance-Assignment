Feature: User Registration

  Background:
    Given Navigate to User Registration Page

    @TC-022
  Scenario: User registration with valid data
    Given Have valid data to register
    When Submit the registration form
    Then User should be registered successfully

    @TC-023
  Scenario: User registration with existing email address
    Given Have valid data to register with email address
    And Submit the registration form with the same email address
    And User should be registered successfully
    And User should be logged out successfully
    When Navigate to User Registration Page
    And Submit the registration form with the same email address
    Then Get the existing email address error message