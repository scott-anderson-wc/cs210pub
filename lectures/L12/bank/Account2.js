// overwrites the prior definition. This is the solution to exercise 1
function Account(type,init) {
    this.type = type;
    this.balance = init;
}

// This is the solution to exercise 2
Account.prototype.addInterest =
    function (rate) {
        if( this.type == "savings" ) {
            this.balance += rate * this.balance;
        }
    };

var harry = new Account(1000);
var ron = new Account(2);
var hermione = new Account(200);
