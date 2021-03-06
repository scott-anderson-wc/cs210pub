/* jQuery plugin to do bounds checking, as a debugging aid for programming
using jQuery. It's easy to make a mistake in a selector, so that it
doesn't match anything in the document, or matches too many things or some
such.

This plugin allows you insert a method into the chain to check how many
items are in the collection at that point. For example, to ensure that
you're removing exactly one element from the document, you can do:

   $(sel).bounds(1,1).remove();

   The general syntax is .bound(min,max).  The method will complain if the
   length of the collection is less than min or greater than max.
   Equality yields no complaint.

   If max is omitted, there's no maximum, so if you want to ensure that you
   are removing at least one element from the document, you do:

   $(sel).bounds(1).remove();

   Because this is intended to be a debugging aid, the plugin throws a
   RangeError if the bounds-check doesn't match.

   Written by Scott D. Anderson
   scott.anderson@wellesley.edu
   Nov 22, 2013

Creative Commons license

Revision history:
7/14/2016: omit selector if it's undefined.

TODO:

Allow it to use console.log instead?

*/


(function ( $ ) {
    $.fn.bounds = function(min,max) {
        var len = this.length;
        // someday, figure out how to find out the most recent selector.
        var desc = this.selector ? "with selector "+this.selector : "" ;
        if(len < min) {
            throw new RangeError("jQuery collection "+desc+" has only "+len+" elements, but specified minimum is "+min);
        } else if( max && len > max ) {
            throw new RangeError("jQuery collection "+desc+" has "+len+" elements, but specified maximum is "+max);
        }
        return this;
    };

    $.fn.one = function () { 
        var len = this.length;
        if( len != 1 ) {
            throw new RangeError("jQuery collection has "+len+
                                 " elements, but you specified it should have exactly 1");
        }
        return this;
    };
            
}( jQuery ));
