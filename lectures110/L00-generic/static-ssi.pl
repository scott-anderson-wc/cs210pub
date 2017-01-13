#!/usr/bin/perl -w

use strict;

if( $#ARGV != 0 ) {
    print "Usage: $0 filename\nwhere filename is a *.tmpl file with #include directives\n";
    exit;
}

my $tmplfilename = $ARGV[0];
open(IN,$tmplfilename) or die "Couldn't open $tmplfilename: $!\n";

my $htmlfilename;
if( $tmplfilename =~ /(\w+)\.tmpl/ ) {
    $htmlfilename = "$1.html";
} else {
    print STDERR "filename $tmplfilename doesn't end with .tmpl\n";
    exit;
}

open(OUT,">$htmlfilename") or die "Couldn't open $htmlfilename: $!\n";
chmod 0664,$htmlfilename or die "Couldn't chmod $htmlfilename: $!\n"; 

my $line;
my $line_no = 0;
while( defined($line = <IN>) ) {
    chomp $line;
    $line_no++;
    if( $line =~ /^\#include (\S+)/ ) {     # directive to include another file
        my $incfile = $1;
        if( ! -e $incfile ) {
            print STDERR "Can't find include file $incfile (line $line_no)";
        }
        if( !open(OTHER, $incfile) ) {
            print STDERR "Couldn't open include file $incfile (line $line_no)";
        } else {
            # could do embedded inclusion if we wanted.
            while( my $otherline = <OTHER> ) {
                print OUT $otherline;
            }
        }
    } else {
        print OUT "$line\n";
    }
}

