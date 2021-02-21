// create dependencies/requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFiles = util.promisify(fs.writeFile);

// inquirer prompts for each section in the README
const promptsText = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Project Name: ',
            name: 'projectTitle',
        },
        {
            type: 'input',
            message: 'Project Description: ',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Intallation Instructions: ',
            name: 'installationInstruc',
        },
        {
            type: 'input',
            message: 'Repo Instructions for Users: ',
            name: 'userInstructions',
        },
        {
            type: 'list',
            choices: ["a", "b", "c"],
            message: 'Project License ',
            name: 'license',
        },
        {
            type: 'input',
            message: 'Repo Contribution Instructions for Users: ',
            name: 'userContributions',
        },
        {
            type: 'input',
            message: 'Tests Command Prompt: ',
            name: 'testCommand',
        },
        {
            type: 'input',
            message: "Project Developer Name: ",
            name: 'authorName',
        },
        {
            type: 'input',
            message: "GitHub Username: ",
            name: 'gitUser',
        },
        {
            type: 'input',
            message: 'Email Address: ',
            name: 'email',
        },
    ]);   
}

// variable for creation of readme string and template literal for creation of README structure and content
const readmeGen = ({
    projectTitle,
    description,
    installationInstruc,
    userInstructions,
    license,
    userContributions,
    testCommand,
    authorName,
    gitUser,
    email
}) => {
    return `
# Project Name: ${projectTitle}
# Table of Contents
* [Description ](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
# Description 
### ${description}
# Installation
### ${installationInstruc}
# Usage
### ${userInstructions}
# License
### ${license}
# Contributing
### ${userContributions}
# Tests
### ${testCommand}
# Questions
### Project Created By: ${authorName}
### GitHub User Name: ${gitUser}
### EmaiL: ${email}`
}


const init = () => {
    promptsText().then(response => {
        const readmeFile = readmeGen(response);
        writeFiles("README.md", readmeFile)
            .then(() => console.log("Success"))
            .catch(err => console.log(err));
    });
}

init()