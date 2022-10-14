import inquirer from "inquirer";
import { actionQuestions } from "./lib/questions.js";

const inqure = inquirer.prompt;

async function init() {
    let action = await inqure(actionQuestions);

    console.log(action);
}

init();
