#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 csv-file file.json"
    echo "writes a JSON file of two columns: name and accounts"
    exit
fi

src=$1
if [ ! -r $src ]; then
    echo "Couldn't read $src"
    exit
fi

dst=$2
if [ -e $dst ]; then
    rm $dst
fi

echo "[" > $dst
while read line; do
    # echo "line is $line"
    name=`echo "$line" | cut -d, -f1`
    if [ "$name" = "Student Name" ]; then
        continue
    fi
    acct=`echo "$line" | cut -d, -f2 | cut -d@ -f1`
    echo "Getting $acct & $name"
    echo "{\"acct\": \"$acct\", \"name\": \"$name\"}," >> $dst
done <  "$src"
echo "\"pop-me\"]" >> $dst
