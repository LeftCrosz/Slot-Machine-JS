import promptSync from 'prompt-sync';
const prompt = promptSync();

import fs from 'fs/promises';

import { User } from './user.js';
import * as selector from './selector.js';


// User account creation
export const createUser = () => {
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

// Add New User to JSON file
export async function writeFile(newAccountJSON) {
    try {
        
        const addAccount = newAccountJSON;
        // Read JSON file
        const JSONString = await fs.readFile('./user.json', 'utf8');

        // Parse data into Javascript Object
        const JSONData = JSON.parse(JSONString);

        // Add new user into the array
        JSONData.users.push(addAccount);

        // Stringify the data
        const newJSONString = JSON.stringify(JSONData, null, 2);

        // Write the file
        await fs.writeFile('user.json', newJSONString);

        console.log(`User account created successfully!`);
    } catch (err) {
        console.error("Error writing files:", err);
    }
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
const calcGame = (betAmount, betNum, slotNum) => {
    if (betNum == slotNum) {
        const winAmount = betAmount * 2;
        user1.addBalance(winAmount);
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Congratulations! ${user1.name} won a total of RM${winAmount} from the Slot Machine :)`);
        console.log(`Your bet amount: RM${betAmount}`);
    } else {
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Awww ${user1.name}, you lost RM${betAmount}!`)
    }
}

// Play Game
export const playGame = () => {
    let betAmount = placeBet();
    let betNum = enterBetNum();
    let slotNum = rollslot();
    calcGame(betAmount, betNum, slotNum);
}


selector.displayMenu();