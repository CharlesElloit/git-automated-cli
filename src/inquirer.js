const inquirer = require("inquirer");
const chalk = require("chalk");

module.exports = {
  getUserGitCredentials: function() {
    const questions = [
      {
        name: "username",
        type: "input",
        message: chalk.blue("Enter your GitHub username or email"),

        validateUserCredentials: function(username) {
          if (username.length) return true;
          return chalk.green("Please enter your username or email address.");
        } //End of validateUserCredentials
      }, //End to username or email value

      {
        name: "password",
        type: "password",
        message: chalk.green("Enter your password"),
        validateUserPassword: function(password) {
          if (password.length) return true;
          return chalk.green("Please octokitprovide your password.");
        } //End of validateUserPassword
      } //End of validateUserPassword
    ];

    return inquirer.prompt(questions);
  },

  getRepoDetails: function() {
    const argv = require("minimist")(process.argv.slice(2));

    const questions = [
      {
        name: "Repository Name",
        type: "input",
        message: "Enter a name for the repository~#",
        default: argv._[0] || files.getCurrentRootDirectory(),

        validateRepoName: function(name) {
          if (name.length) return true;
          return "Please provide a name to the repository.";
        }
      }, //End of Repository Name

      {
        name: "Description",
        type: "input",
        message: "Optionally enter a descripttion.",
        default: argv._[1] || null
      }, //End of Description,

      {
        name: "visibility",
        type: "list",
        message: "Public or Private",
        choices: ["public", "private"],
        default: "public"
      }
    ]; //End of question.

    return inquirer.prompt(questions);
  }
};
