# Trengo Assignment
This repository contains a simple automation test framework written with TypeScript and Playwright and implements Page Object Model Pattern. 

## Scenarios covered:
- Create custom channel (https://app.trengo.com/admin/channels2/custom). With a message come into this channel using the channel identifier
- Create a team (https://app.trengo.com/admin/teams)

## System requirements:
Node.js 16+

Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).

MacOS 12 Monterey or MacOS 13 Ventura.

Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

## Steps to execute:
If you want to run test locally, please follow these steps:
1. Code from gitlab needs to be download OR cloned using git command 
2. Make sure you have ``` node.js ``` installed. If you don't, please visit [official website](https://nodejs.org/en/download/) for instructions
3. On the command terminal, navigate to the project folder ``` cd <path to project folder> ```
   Example in Mac OS: ``` cd /Volumes/Repositories/Trengo/playwright-tests ```
4. Run ``` npm install ``` to install node modules. This will create node modules, playwright-report, test-results folder under the project folder
5. Update Playwright version ``` npm install -D @playwright/test@latest ```
6. That's it, now you can run tests with ``` npx playwright test ```, it will run the test in chromium browser 
7. If you want to run it in ui mode use command ``` npx playwright test --ui ```
   
## Folder Structure:
1. ``` playwright.config.js ``` contains options to configure the default browser, context and page fixtures
2. The E2E test file is present under ``` /tests ``` folder with extension ``` .spec.ts. ``` Example: ``` trengo.spec.ts ```
3. ``` /page ``` contains Page Object classes representing our pages, and user interactions as their methods
4. Playwright HTML report will be present inside ``` playwright-report/index.html ```
5. In case of failures, screenshots will be available under ``` /test-results ``` folder
   
Note : Sometime, you might get an error related to api call getting 429 status code (too many requests). In that case, please re-run the test and it should work fine. 
