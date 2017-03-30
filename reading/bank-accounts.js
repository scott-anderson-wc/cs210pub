var allAccounts = [];

function Account(type,init) {
    this.type = type;  // checking or savings
    this.balance = init;
    allAccounts.push(this);
}

Account.prototype.getBalance = function() {
    return this.balance;
}

Account.prototype.toString = function() {
    return "[ "+this.type+" Account with balance of "+this.balance+"]";
}

Account.prototype.print = function () {
    console.log(this.toString());
}

Account.prototype.print5seconds_bad = function () {
    // the following won't work, because 'this' gets rebound to 'window'
    setTimeout( this.print, 5000);
}

Account.prototype.print5seconds_this = function () {
    // the following won't work, because we can't close over 'this'
    // it tries to print the window!
    var closure = function () { this.print(); };
    setTimeout( closure, 5000);
}

Account.prototype.print5seconds_that = function () {
    // the following *does* work, because we can close over 'that'.
    var that = this;
    var closure = function () { that.print(); };
    setTimeout( closure, 5000);
}

Account.prototype.print5seconds_bind = function () {
    //  the following also works, using 'bind' to create a closure where
    //  'this' has the correct value.
    var closure = this.print.bind(this);
    setTimeout( closure, 5000);
}

function printAll() {
    allAccounts.forEach(function (acct) { acct.print(); });
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

Account.prototype.addInterest = function (rate) {
    if( this.type === "savings" ) {
        this.balance += this.balance * rate;
    }
};

function addInterest(rate) {
    allAccounts.forEach(function (acct) { acct.addInterest(rate); });
}

// ================================================================
// Some examples to play with

var harry = new Account("savings",1000);
var ron = new Account("checking",2);
var fred = new Account("checking", 490); // fred spent some on fizzing whizbees
var george = new Account("checking", 500);
