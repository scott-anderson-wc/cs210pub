#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 file-of-account-names"
    echo "the account should be the first elt of the line, according to 'cut'"
    echo "puts the .jpg files in the current directory"
    exit
fi

file=$1
if [ ! -r $file ]; then
    echo "Couldn't read $file"
    exit
fi

for acct in `cut -f1 $file`; do
    echo "Getting $acct"
    curl --silent --show-error --location --output $acct.jpg "https://webapps.wellesley.edu/directory/get_image.php?id=$acct"
    if [ $? -ne 0 ]; then
        echo "FAILED for $acct"
    fi
    jpegtopnm $acct.jpg | pamfile 
done
