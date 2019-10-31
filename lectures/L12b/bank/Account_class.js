class Account {
    constructor (init) {
        this.balance = init;
    }
    deposit (amount) {
        this.balance += amount;
    }
    withdrawal (amount) {
        if( this.balance >= amount ) {
            this.balance -= amount;
        } else {
            throw new Error("Insufficient funds");
        }
    }
}
var harry = new Account(1000);
var ron = new Account(2);
var hermione = new Account(200);
