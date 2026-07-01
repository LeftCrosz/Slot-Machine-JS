import promptSync from 'prompt-sync';
const prompt = promptSync();

import fs from 'fs/promises';

import { User } from './user.js';
import * as selector from './selector.js';

export const login = () => {
    while(true) {
        const name = prompt("Enter your game name: ");
        if (name == "") {
            console.log("Invalid name, try again!");
        } else {
            const loginName = name.charAt(0).toUpperCase() + name.slice(1);
            return loginName;
        }
    }
}

// Validate User
export const validateUser = (loginName, JSONData) => {
    const username = loginName
    // Find user
    const targetUser = JSONData.users.find(user => user.name == `${username}`);
    
    if(targetUser == undefined) {
        console.log("Username not found, try again!");
        return null;
    } else {
        // Object Destructing
        const { name, balance } = targetUser;
        console.log(`User: ${name} is found with Balance of RM${balance}`);
        return { name, balance };
    }
}

// Read JSON File
export async function readFile() {
    try {
        // Read JSON File
        const JSONString = await fs.readFile("./user.json", "utf8");

        // Parse data into JavaScript Object
        const JSONData = JSON.parse(JSONString);

        return JSONData;
    } catch(err) {
        console.log("Error reading files: ", err);
    }
}


// User account creation
export const register = () => {
    while (true) {
        const name = prompt("Enter your name: ");
        if (name == "" || name.match(/[0-9]/)) {
            console.log("Invalid name, try again!");
        } else {
            const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
            const newAccount = new User(nameUpper, 0);

            // Access to User Object
            const newAccountJSON = newAccount.toJSON();
            return newAccountJSON;
        }
    }
}


// User account creation
export async function createUser (newAccountJSON, JSONData) {
    const addAccount = newAccountJSON;

    // Add new user into the array
    JSONData.users.push(addAccount);

    // Stringify the data
    const newJSONString = JSON.stringify(JSONData, null, 2);

    // Write the file
    await fs.writeFile('user.json', newJSONString);

    console.log(`User account created successfully!`);

}




// Place bet
const placeBet = () => {
    while (true) {
        const bet = prompt("Enter your bet amount (RM): ");
        const betAmount = parseFloat(bet);
        if (isNaN(betAmount) || betAmount < 0) {
            console.log("Invalid bet amount, try again!");
        } else {
            return betAmount;
        }
    }
}

// Get user's bet number
const enterBetNum = () => {
    while (true) {
        const num = prompt("Enter your bet number between 1-10: ")
        const betNum = parseInt(num);
        if (isNaN(betNum) || betNum > 10 || betNum < 1) {
            console.log("Invalid number, please enter between 1-10");
        } else {
            return betNum;
        }
    }
}

// Roll number between 1-10
export const rollslot = () => {
    // random integer 0-9 then + 1 for 1-10
    const slotNum = Math.floor(Math.random() * 10) + 1;
    return slotNum;
}


// Validate player's game
const calcGame = (player, betAmount, betNum, slotNum) => {
    if (betNum == slotNum) {
        const winAmount = betAmount * 2;
        user1.addBalance(winAmount);
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Congratulations! ${player.name} won a total of RM${winAmount} from the Slot Machine :)`);
        console.log(`Your bet amount: RM${betAmount}`);
    } else {
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Awww ${player.name}, you lost RM${betAmount}!`)
    }
}

// Play Game
export const playGame = (player) => {
    let betAmount = placeBet();
    let betNum = enterBetNum();
    let slotNum = rollslot();
    calcGame(player, betAmount, betNum, slotNum);
}


selector.displayMenu();