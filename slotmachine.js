import promptSync from 'prompt-sync';
const prompt = promptSync();

import { User } from './user.js';

// User account creation
const createUser = () => {
    while (true) {
        let name = prompt("Enter your name: ");
        if (name == "" || name.match(/[0-9]/)) {
            console.log("Invalid name, try again!");
        } else {
            const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
            const user1 = new User(nameUpper, 0);
            console.log(`Created ${nameUpper} account successfully`)
            return user1;
        }
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
const rollslot = () => {
    // random integer 0-9 then + 1 for 1-10
    const slotNum = Math.floor(Math.random() * 10) + 1;
    return slotNum;
}


// Validate player's game
const calcGame = () => {
    if (betNum == slotNum) {
        const winAmount = betAmount * 2;
        user1.balance *= 2;
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Congratulations! ${user1.name} won a total of RM${winAmount} from the Slot Machine :)`);
        console.log(`Your bet amount: RM${betAmount}`);
    } else {
        console.log(`Rolled number is... ${slotNum}!`)
        console.log(`Awww ${user1.name}, you lost RM${betAmount}!`)
    }
}


// Slot Machine's Header
const printHeader = () => { 
    console.log(`
    ░██████╗██╗░░░░░░█████╗░████████╗███╗░░░███╗░█████╗░░█████╗░██╗░░██╗██╗███╗░░██╗███████╗
    ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝████╗░████║██╔══██╗██╔══██╗██║░░██║██║████╗░██║██╔════╝
    ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██╔████╔██║███████║██║░░╚═╝███████║██║██╔██╗██║█████╗░░
    ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██║╚██╔╝██║██╔══██║██║░░██╗██╔══██║██║██║╚████║██╔══╝░░
    ██████╔╝███████╗╚█████╔╝░░░██║░░░██║░╚═╝░██║██║░░██║╚█████╔╝██║░░██║██║██║░╚███║███████╗
    ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝
`);
}

printHeader();
let user1 = createUser();
let betAmount = placeBet();
let betNum = enterBetNum();
let slotNum = rollslot();
calcGame();