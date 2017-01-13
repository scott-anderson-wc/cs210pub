#!/bin/bash

if [ $# -eq 0 ]; then
    echo "$0 tmpl_file ..."
    echo 'converts each file (a .tmpl file) into a corresponding .html file'
    echo 'if the .tmpl file happens to contain a #include "other_file.part" '
    echo 'so much the better'
    exit
fi

for tmpl in $*; do
    base=`basename "$tmpl" .tmpl`
    html="$base.html"
    cpp -traditional-cpp -P "$tmpl" "$html"
    if [ "$tmpl" -nt "$html" ]; then
        cpp -traditional-cpp -P "$tmpl" "$html"
    fi
done

