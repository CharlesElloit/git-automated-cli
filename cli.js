const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const path = require("path");

console.log(
  chalk.redBright(
    figlet.textSync("Git-init", {
      horizontalLayout: "full",
      font: "Ogre"
    })
  )
);

//Ogre, Elite
//#1f272a scrimba

const fileList = [];

function getUserGitCredentials() {
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
}

async function getPersonalAccessToken() {
  const credentials = await inquirer.getUserGitCredentials();
  const status = new Spinner("Authenticating your credentails, please wait...");
  status.start();

  const auth = createBasicAuth({
    username: credentials.username,
    password: credentials.password,
    async on2Fa() {
      status.stop();
      // prompt user for the one-time password retrieved via SMS or authenticator app
      const response = await inquirer.getTwoFactorAuthenticationCode();
      status.start();
      return response.twoFactorAuthenticationCode;
    },
    token: {
      scopes: ["user", "public_repo", "repo", "repo:status"],
      note: "Automated git cli, the command-line tool for initalizing Git repos"
    }
  });

  try {
    const response = await auth();
    if (response.token) {
      config.set("github.token", response.token);
      return response.token;
    } else {
      throw new Error("Github token is not found");
    }
  } finally {
    status.stop();
  }
}

function getIgnoreFiles() {
  const questions = [
    {
      name: "ignore",
      type: "checkbox",
      message: "Select the files or/and folders you wanna to ignore",
      choices: fileList,
      default: ["node_modules", "bower_components"]
    }
  ];

  return inquirer.prompt(questions);
}

function getRepoDetails() {
  const argv = require("minimist")(process.argv.slice(2));

  const questions = [
    {
      name: "Repository Name",
      type: "input",
      message: "Enter a name for the repository~#",
      default: argv._[0] || files.filesHandler.getCurrentRootDirectory(),

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

function getCurrentRootDirectory() {
  return path.basename(process.cwd());
}

getUserGitCredentials();
getPersonalAccessToken();
getCurrentRootDirectory();
getRepoDetails();
