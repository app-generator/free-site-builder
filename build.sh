#!/usr/bin/env bash
# exit on error
set -o errexit

cd ./builder 

python -m pip install --upgrade pip

pip install -r requirements.txt
