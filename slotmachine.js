const prompt = require("prompt-sync")();

// Get bet amount
// Get bet number betw 1-10 number
// Roll between 1-10 number
// Win if rollnum = betnum

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
        balance *= 2;
        console.log(`Congratulations! You won a total of RM${winAmount} from the Slot Machine :)`);

        console.log(`Your bet amount: RM${betAmount}`);

    } else {
        console.log(`Awww, you lost RM${betAmount}!`)
    }
}

// Intialize game

let betAmount = placeBet();
let betNum = enterBetNum();
let slotNum = rollslot();
calcGame();