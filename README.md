# IT Quality Assurance Assignment - Group 34

This repository contains test cases for UI and API testing using **Cucumber** with **Playwright** in **TypeScript**. The project is divided into two parts:

- **UI Testing**
- **API Testing**

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/akalanka-00/IT-Quality-Assurance-Assignment.git
   cd IT-Quality-Assurance-Assignment
   ```

2. Navigate to the relevant folder (UI or API) and install dependencies:
   ```bash
   cd ui
   npm install
   ```

   ```bash
   cd api
   npm install
   ```

## Scripts

The following scripts are available for testing and reporting:

### General Test Execution

- Run tests:
  ```bash
  npm run test
  ```
- Run tests with Allure report generation:
  ```bash
  npm run test:allure
  ```
- Run tests with the default Cucumber formatter:
  ```bash
  npm run test:cucumber
  ```

### Allure Reports

- Generate an Allure report:
  ```bash
  npm run allure:generate
  ```
- Open the Allure report:
  ```bash
  npm run allure:open
  ```
- Generate and open the Allure report:
  ```bash
  npm run allure-report
  ```

## CI/CD Pipeline and Reports

The GitHub Actions pipeline automatically runs tests and generates reports for both UI and API projects. The results are published at the following locations:

- [UI Test Report](https://akalanka-00.github.io/IT-Quality-Assurance-Assignment/ui-report)
- [API Test Report](https://akalanka-00.github.io/IT-Quality-Assurance-Assignment/api-report)

## Folder Structure

```
IT-Quality-Assurance-Assignment/
├── .github/             # GitHub Actions workflows
├── api/                 # API testing project
│   ├── data/            # Test data for API tests
│   ├── enum/            # Enums for API tests
│   ├── model/           # Models for API tests
│   ├── node_modules/    # Node.js modules for API
│   ├── reports/         # Reports generated for API tests
│   ├── src/             # Source files for API tests
│   ├── tests/           # Test cases for API tests
│   ├── utils/           # Utility functions for API tests
│   ├── cucumber.json    # Cucumber configuration for API
│   ├── package.json     # Dependencies and scripts for API
│   ├── package-lock.json
│   └── tsconfig.json    # TypeScript configuration for API
├── ui/                  # UI testing project
│   ├── data/            # Test data for UI tests
│   ├── hooks/           # Hooks for UI tests
│   ├── locators/        # Locators for UI tests
│   ├── model/           # Models for UI tests
│   ├── node_modules/    # Node.js modules for UI
│   ├── reports/         # Reports generated for UI tests
│   ├── src/             # Source files for UI tests
│   ├── test-results/    # Test result files for UI tests
│   ├── tests/           # Test cases for UI tests
│   ├── utils/           # Utility functions for UI tests
│   ├── cucumber.json    # Cucumber configuration for UI
│   ├── package.json     # Dependencies and scripts for UI
│   ├── package-lock.json
│   └── tsconfig.json    # TypeScript configuration for UI
└── .idea/               # IDE configuration files (optional)
```
