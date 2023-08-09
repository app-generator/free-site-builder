#!/usr/bin/env bash
# exit on error
set -o errexit

yarn  
yarn build 

# Copy HOMEpage 
cp homepage-min.html dist/index.html 

# Copy bs5 
mkdir dist/bootstrap
cp index-cdn.html dist/bootstrap/index.html 

# Copy volt 
mkdir dist/volt
cp index-volt.html dist/volt/index.html 

# Copy pixel 
mkdir dist/pixel
cp index-pixel.html dist/pixel/index.html 
