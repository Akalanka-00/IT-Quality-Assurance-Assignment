Feature: Account Login

  Background:
    Given Navigate to Login Page

  Scenario: Login with valid credentials
    When Submit the login form with valid credentials
    Then User should be logged in successfully

