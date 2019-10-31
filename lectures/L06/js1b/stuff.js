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
