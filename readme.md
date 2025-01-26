# develop usage
At first correct project-name in .env file.
To check the development status using BrowserSync, please ensure that your device is connected to the same network and then navigate to `/project-name` next to IP address, adjusting the project name as necessary. Additionally, when verifying with BrowserSync, please set the development mode to false in the `functions.php` settings. Keep it in true state during development to utilize HMR (Hot Module Replacement).

# Project Readme

Welcome to our project! This document provides an overview of the project, including setup instructions, development guidelines, and deployment procedures.

## Setup Instructions

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`
3. To start the development server, run `npm run dev`

## Development Guidelines

When contributing to the project, please adhere to the following guidelines:

- Write clean, maintainable, and efficient code.
- Follow the coding standards and best practices defined in the project documentation.
- Ensure that your code passes all tests before submitting a pull request.

## Deployment Procedures

This project is deployed using GitHub Actions. The deployment process is triggered automatically when changes are pushed to the `main` branch. The `.github/workflows/ftp-deploy.yml` file contains the configuration for the deployment process.

Please ensure that you have the necessary permissions and that the FTP credentials are correctly set up in the repository secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).

Thank you for contributing to our project!
