Feature: User Registration

  Background:
    Given Navigate to User Registration Page

    Scenario: User registration with valid data
        When Submit the registration form with valid data
        Then User should be registered successfully