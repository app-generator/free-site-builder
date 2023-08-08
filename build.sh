#!/usr/bin/env bash
# exit on error
set -o errexit

yarn  
yarn build 

# copy Index
cp index-cdn.html dist/index.html 

# copy volt 
mkdir dist/volt
cp index-volt.html dist/volt/index.html 

# copy pixel 
mkdir dist/pixel
cp index-pixel.html dist/pixel/index.html 
