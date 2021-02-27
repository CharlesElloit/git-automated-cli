const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

console.log(
  chalk.red(figlet.textSync("gedit", { horizontalLayout: "fitted" }))
);

/*--------------------------------------
# Prompts for configuration preferences
# --------------------------------------
*/

function packageManagerConfig() {
  inquirer
    .prompt([
      {
        name: "packageManager",
        type: "list",
        message: chalk.white("Which package manager would you like to use?"),
        choices: ["Yarn", "npm", "Cancel"]
      },
      {
        name: "fileFormat",
        type: "list",
        message: chalk.white(
          "Which ESLint and Prettier configuration format do you prefer to use?"
        ),
        choices: [".json", ".js", "Cancel"]
      }
    ])
    .then(answer => {
      switch (answer.packageManager) {
        case "Yarn":
          var pkg_cmd = "yarn add";
          pkg_cmd + "-D eslint prettier eslint-plugin-react-hooks";
          console.log("Selector pkg_cmd = " + pkg_cmd);
          break;
        case "npm":
          var pkg_cmd = "npm install ";
          console.log("Selector pkg_cmd = " + pkg_cmd);
          break;
        case "Cancel":
          console.log("Cancel is Selector");
          break;
      }

      switch (answer.fileFormat) {
        case ".json":
          var configFileFormat = ".josn";
          console.log("Selector configFileFormat = " + configFileFormat);
          break;

        case ".js":
          var configFileFormat = ".js";
          console.log("Selector configFileFormat = " + configFileFormat);
          break;

        case "Cancel":
          var configFileFormat = "Cancel";
          console.log("Selector configFileFormat = " + configFileFormat);
          break;
      }
    });
}

packageManagerConfig();
// configurationFileFormat();
