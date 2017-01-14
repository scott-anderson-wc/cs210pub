var taxRate = 0.0625;   // Mass Sales tax rate as a decimal.

/* This function takes the pre-tax total of a bill and returns the tax,
based on the current tax rate.  The input need not be a number (it will be
converted if it is a string); the return value is a number. */

function calculateTax (subtotal) {
   return taxRate * parseFloat(subtotal);
}
