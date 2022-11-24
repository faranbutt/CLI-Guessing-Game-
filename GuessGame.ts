import chalk from "chalk";
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let PlayerName:string;
const wait  = (ms = 500)=>new Promise((r)=>setTimeout(r,ms));
function welcome(){
    console.clear();
    figlet(`Guessing Game`,(err,data)=>{
        console.log(gradient.pastel.multiline(data));
    })
}
function congrats(){
    figlet(`You Won! ${PlayerName}`,(err,data)=>{
        console.log(chalk.green(data));
    })
}
function lose(){
    figlet(`You Lost!`,(err,data)=>{
        console.log(chalk.red(data));
    })
}
function RandomNumber(){
    return Math.floor(Math.random()*10)
}
async function guessMessage() {
    const rainMessage = chalkAnimation.rainbow(
        "Please enter a number between 1 and 10"
    )
    await wait();
    rainMessage.stop();
}
async function guessNumber(){
    let randNum  = await inquirer.prompt({
        name: "Number1",
        type: 'number',
        message: `${await guessMessage()}`
    })
    return randNum.Number1;
}
async function playerName(){
    let Player = await inquirer.prompt({
        name : "player",
        type : "input",
        message : `${chalk.yellow("Please enter your name\t")}`,
        default() {
            return 'Player 001'
        }
    })
    PlayerName = Player.player;
}

console.clear();
welcome();
await wait();
let randomNum = RandomNumber();
await playerName();
let count = 5;
let guessNum = await guessNumber();

if (guessNum !== randomNum){
    while(guessNum !== randomNum){
        if (count > 0){
        console.log(chalk.red(`Wrong Guess!`+chalk.bgRed(`${count = count-1} lives left`)));
        guessNum = await guessNumber();
       }
       else{
        lose();
        process.exit(0); 
       }
    }
       
}
congrats();

