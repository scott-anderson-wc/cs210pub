/* This code is used in the reading on `bind`.  There's another
 * presentation of `bind` in the reading for forms-and-js.md
 */

function Account(owner,init) {
    this.owner = owner;
    this.balance = init;
}

Account.prototype.deposit = function (amount) {
    this.balance += amount;
};

Account.prototype.withdrawal = function (amount) {
    if( this.balance >= amount ) {
        this.balance -= amount;
    } else {
        throw new Error("Sorry, you are overdrawn");
    }
};

Account.prototype.toString = function() {
    return "#<Account for "+this.owner+" balance of "+this.balance+">";
};

var harry = new Account("harry",1000);
var ron = new Account("ron",2);
var hermione = new Account("hermione",200);
