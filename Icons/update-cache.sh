#!/bin/bash

umask 002
GET http://creativecommons.org/images/public/somerights.gif > somerights.gif
GET http://anybrowser.org/campaign/bvgraphics/ab-ms-star-en.gif > anybrowser.gif
GET http://anybrowser.org/campaign/bvgraphics/enhanced.gif > enhanced.gif
GET http://www.w3.org/Icons/valid-html401 > valid-html401
cp valid-html401 valid-html401.png
GET http://jigsaw.w3.org/css-validator/images/vcss > vcss
cp vcss vcss.gif
chmod a+r *
