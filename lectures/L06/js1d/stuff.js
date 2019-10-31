// JavaScript File
console.log("loading stuff");

function line(m,x,b) {
    return m*x+b;
}

function parabola(a,b,c,x) {
    return a*x*x + b*x + c;
}

function choose_v1(n,k) {
    if( k==n || k==0 ) return 1;
    return choose_v1(n-1,k)+choose_v1(n-1,k-1);
}

function choose(n,k) {
    if( k > n || k < 0 || n < 0 ) return "bad usage";
    if( k==n || k==0 ) return 1;
    return choose(n-1,k)+choose(n-1,k-1);
    
}

// ==============================================
// Milestone 

function total_bad(subtotal, rate, service) {
    tax = subtotal*rate;
    if( service == "great") {
        tip = subtotal*0.20;
    } else {
        tip = subtotal*0.15;
    }
    return subtotal+tax+tip;
}

function total(subtotal, rate, service) {
    var tax = subtotal*rate;
    var tip;
    if( service == "great") {
        tip = subtotal*0.20;
    } else {
        tip = subtotal*0.15;
    }
    return subtotal+tax+tip;
}

function range(n) {
    var nums = [];
    for( var i=1; i<=n; i++ ) {
        nums[i-1] = i;
    }
    return nums;
}

// ==============================================
// Milestone 

function collatz(n) {
    if( n%2 == 0 ) {
        return n/2;
    } else {
        return 3*n+1;
    }
}

function ask_user(fun) {
    var input = prompt("what number do you want to use?");
    var x = parseInt(input);
    var y = fun(x);
    alert("The answer is "+y);
}

function computeCurve(domain,func) {
    var range = [];
    for(var i=0; i<domain.length; i++) {
        range[i] = func(domain[i]);
    }
    return range;
}
