const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");


const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'What is the Managers Name?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is the Managers Id?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the Managers Email?'
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is the Managers Office number?'
      }
      
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'EngineerName',
        message: 'What is the Engineers Name?'
      },
      {
        type: 'input',
        name: 'EngineerId',
        message: 'What is the Engineers Id?'
      },
      {
        type: 'input',
        name: 'EngineerEmail',
        message: 'What is the Engineers Email?'
      },
      {
        type: 'input',
        name: 'EngineerGithub',
        message: 'What is the Engineers Office number?'
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.EngineerName, answers.EngineerId, answers.EngineerEmail, answers.EngineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.EngineerId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'internName',
        message: 'What is the interns Name?'
      },
      {
        type: 'input',
        name: 'internId',
        message: 'What is the interns Id?'
      },
      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the interns Email?'
      },
      {
        type: 'input',
        name: 'internSchool',
        message: 'What is the interns Office number?'
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
