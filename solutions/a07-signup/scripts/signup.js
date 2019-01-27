// JavaScript File

/* global $ Luhn */


(function () {
    var reservedAccounts = ["admin", "root", "super"];
    var minPasswordLength = 4;  // should be 8 or more

    var fh = new App.FormHandler("#signup");
    fh.addSubmitHandler(function (data,event) {
        console.log("in submit handler");
        $(".error").text(""); // clear any existing error messages
        if (reservedAccounts.indexOf(data.user.toLowerCase()) != -1) {
            $("#usererror").text("Invalid username: "+data.user);
            event.preventDefault();
        }
        if( data.passwd.length < minPasswordLength ) {
            $("#passwderror").text("Password is too short.");
            event.preventDefault();
        }
        if( data.passwd != data.passwd2 ) {
            $("#passwd2error").text("Passwords don't match.");
            event.preventDefault();
        }
        if( !Luhn.is_valid(data.cc_num) ) {
            $("#ccerror").text("Credit card number is mis-typed");
            event.preventDefault();
        }
    });
})();
