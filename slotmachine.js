import promptSync from 'prompt-sync';
const prompt = promptSync();

import fs from 'fs/promises';

import { User } from './user.js';
import { displayMenu } from './selector.js';




// Login
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
        const player = new User(name, balance);
        return player;
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
            const player = new User(nameUpper, 0);
            return player;
        }
    }
}


// User account creation
export async function createUser (newAccount, JSONData) {
    // Access to User Object
    const newAccountJSON = newAccount.toJSON();
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
const placeBet = (player) => {
    while (true) {
        const bet = prompt("Enter your bet amount (RM): ");
        const betAmount = parseFloat(bet);
        if (isNaN(betAmount) || betAmount <= 0) {
            console.log("Invalid bet amount, try again!");
        } else {
            if (player.balance < betAmount) {
                console.log("You have insufficient money. Go work!");
            } else {
                player.subtractBalance(betAmount);
                console.log(`You spent RM${betAmount}. Your new balance: RM${player.balance}`);
                return { player, betAmount };
            }
            
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
const rollslot = () => {
    // random integer 0-9 then + 1 for 1-10
    const slotNum = Math.floor(Math.random() * 10) + 1;
    return slotNum;
}


// Calc player's game
async function calcGame (playerUpdate, betAmount, betNum, slotNum) {
    if (betNum == slotNum) {
        const winAmount = betAmount * 2;
        playerUpdate.addBalance(winAmount);

        console.log(`Rolled number is... ${slotNum}!`);
        console.log(`Congratulations! ${playerUpdate.name} won a total of RM${winAmount} from the Slot Machine :)`);
        console.log(`Your bet amount: RM${betAmount}`);
        console.log(`Your new balance is RM${playerUpdate.balance}`);

        await saveData(playerUpdate);
        return playerUpdate;
    } else {
        console.log(`Rolled number is... ${slotNum}!`);
        console.log(`Awww ${playerUpdate.name}, you lost RM${betAmount}!`);
        console.log(`Your current balance is RM${playerUpdate.balance}`);

        await saveData(playerUpdate);
        return playerUpdate;
    }
}

// Play Game
export async function playGame (player) {
    let { player: playerUpdate, betAmount } = placeBet(player);
    let betNum = enterBetNum();
    let slotNum = rollslot();
    await calcGame(playerUpdate, betAmount, betNum, slotNum);
}



// Topup balance
export async function topup (player) {
    while(true) {
        const topup = prompt("Enter the amount you want to topup (RM): ");
        const topupAmount = parseFloat(topup);

        if(isNaN(topupAmount) || topupAmount <= 0 ) {
            console.log("Invalid topup amount!");
        } else {
            player.addBalance(topupAmount);
            console.log(`Successfully topup RM${topupAmount} to your balance!\nNew balance: RM${player.balance}`);
            await saveData(player);
            return topupAmount;
        }
    }
}

// Save Data
async function saveData(player) {
    try {
        const username = player.name;

        const JSONData = await readFile();

        const targetUser = JSONData.users.find(user => user.name == `${username}`);
        if (!targetUser) {
            console.log("User not found in saved data!");
            return;
        }
        targetUser.balance = player.balance;
        
        // Stringify the data
        const newJSONString = JSON.stringify(JSONData, null, 2);

        await fs.writeFile('user.json', newJSONString);
        console.log("Saved data successfully!");
    } catch(err) {
        console.log("Error when saving data: ", err);
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

// Start
await displayMenu();