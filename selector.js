import PromptSync from "prompt-sync";
import * as slotmachine from "./slotmachine.js";
const prompt = PromptSync();

// Display main menu
export async function displayMenu() {
    while (true) {
        console.log(`
        ░██████╗██╗░░░░░░█████╗░████████╗███╗░░░███╗░█████╗░░█████╗░██╗░░██╗██╗███╗░░██╗███████╗
        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝████╗░████║██╔══██╗██╔══██╗██║░░██║██║████╗░██║██╔════╝
        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██╔████╔██║███████║██║░░╚═╝███████║██║██╔██╗██║█████╗░░
        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██║╚██╔╝██║██╔══██║██║░░██╗██╔══██║██║██║╚████║██╔══╝░░
        ██████╔╝███████╗╚█████╔╝░░░██║░░░██║░╚═╝░██║██║░░██║╚█████╔╝██║░░██║██║██║░╚███║███████╗
        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝

        1. Login
        2. Register an Account
        3. Quit 
    `);
        const optionPrompt = prompt("Enter your option: ");
        const option = parseInt(optionPrompt);

        if (isNaN(option) || option > 3 || option < 1) {
            console.log("Invalid option please try again")
    } else {
            switch(option) {
                case 1:
                    const loginName = slotmachine.login();
                    const findUser = await slotmachine.readFile();
                    const userFound = slotmachine.validateUser(loginName, findUser);
                    if(userFound != undefined) {
                        await displayOptions(userFound);
                    }
                    break;
                case 2:
                    const newAccount = slotmachine.register();
                    const regUser = await slotmachine.readFile();
                    const createAcc = await slotmachine.createUser(newAccount, regUser)
                    break;
                case 3:
                    process.exit(0);
                    break;
                default:
            };
        }
    }
}


// Display Options Menu
async function displayOptions (userFound) {
    while (true) {
        console.log(`
        ░██████╗██╗░░░░░░█████╗░████████╗███╗░░░███╗░█████╗░░█████╗░██╗░░██╗██╗███╗░░██╗███████╗
        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝████╗░████║██╔══██╗██╔══██╗██║░░██║██║████╗░██║██╔════╝
        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██╔████╔██║███████║██║░░╚═╝███████║██║██╔██╗██║█████╗░░
        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██║╚██╔╝██║██╔══██║██║░░██╗██╔══██║██║██║╚████║██╔══╝░░
        ██████╔╝███████╗╚█████╔╝░░░██║░░░██║░╚═╝░██║██║░░██║╚█████╔╝██║░░██║██║██║░╚███║███████╗
        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝

        1. Play Game
        2. Topup Balance
        3. Go back
        4. Quit
    `);
        const optionPrompt = prompt("Enter your option: ");
        const option = parseInt(optionPrompt);

        if (isNaN(option) || option > 4 || option < 1) {
            console.log("Invalid option please try again")
        } else {
            switch(option) {
                case 1:
                    await slotmachine.playGame(userFound);
                    break;
                case 2:
                    await slotmachine.topup(userFound);
                    break;
                case 3:
                    await displayMenu();
                    break;
                case 4:
                    process.exit(0);
                    break;
            };
        }
    }
}