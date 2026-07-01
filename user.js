// User class

export class User {
    #name;
    #balance = 0;
    constructor(name, balance) {
        this.#name = name;
        this.#balance = balance;
    }

    get name() {
        return this.#name;
    }

    get balance() {
        return this.#balance;
    }

    set balance(newBalance) {
        if (typeof newBalance !== "number" || isNaN(newBalance)) {
            console.log("Balance must be valid number.");
        }
        this.#balance = newBalance;
    }

    addBalance(amount) {
        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            console.log("Amount must be valid number.");
        }
        this.#balance += amount;
    }

    subtractBalance(amount) {
        if(typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            console.log("Invalid amount to deduct!");
        }
        this.#balance -= amount;
    }

    toJSON() {
        const data = {
            name: this.#name,
            balance: this.#balance
        }
        return data;
    }

}