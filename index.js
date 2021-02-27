#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./lib/github");
const file = require("./lib/files");
const git_repo = require("./lib/git-repo");

console.log(
  chalk.blueBright(
    figlet.textSync("Git", { horizontalLayout: "full", font: "Ogre" })
  )
);

if (!file.isDirectoryExists(".git")) {
  console.log(chalk.red("Already a Git repository!"));
  process.exit(1);
}

getUserGithubToken = async function() {
  //we are going to fetch the token from the
  //configstore file
  let userToken = github.getGithubStoredToken();

  //if the user token exist then w'll return
  //the token
  if (userToken) {
    return userToken;
  }

  //we are going to ask them to enter their credentials
  userToken = await github.getPersonalAccessToken();
  return userToken;
};

const execute = async function() {
  try {
    /* 
    Here first we are going to retrieve the token if it exits
    if not we are going to set the Authentication Token
    */

    const token = await getUserGithubToken();
    github.getGithubAuth(token);

    /*
   Now that the user is authenticated we should let them 
   create a new remote repository if they wanted to
   */
    const repo_url = await git_repo.createRemoteRepository();

    /* 
    Now allow them to create .gitignore file if it 
    doesn't exist
   */
    await git_repo.createGitignoreFile();

    /*
    Now we are going to set up the local repository and 
    push it to remote repository
    */
    await git_repo.setUpRepositoryAsync(repo_url);

    //if everythink went good
    console.log(chalk.green("All done successfully!"));
  } catch (error) {
    //check if their is an error
    if (error) {
      switch (error.status) {
        case 401:
          return console.log(
            chalk.red("Please provide correct login credentials")
          );
        case 422:
          return console.log(
            chalk.red(
              "There is already a remote respository with the same name"
            )
          );
        default:
          return console.log(chalk.red(error));
      }
    }
  }
};

execute();
