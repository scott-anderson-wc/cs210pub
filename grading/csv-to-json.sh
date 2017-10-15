#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 CSV_file"
    echo "Produces a json file of the student names and emails"
    exit
fi

csv=$1
printobj=<<EOF
   BEGIN {FS = "\"*,\"*"}
   {print "\t\{\"name\":\"",$4,"\",\"email\":\"",$6,"\"\}" }
EOF

awk -F "\"*,\"*" 'BEGIN { OFS=""; print "[";} { if($6 != "Email") print "\t{\"name\":\"",$4,"\",\"email\":\"",$6,"\"}," } ; END {print "]" }' $csv

