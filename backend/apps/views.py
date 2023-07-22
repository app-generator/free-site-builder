# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

# Flask modules

import os, random, string

from flask   import render_template, request, send_file, jsonify
from jinja2  import TemplateNotFound
import requests
import logging

# App modules
from apps import app

PATH_ROOT      = os.path.abspath(os.path.dirname(__file__))
PATH_TEMPLATES = os.path.join(PATH_ROOT, 'templates')
PATH_KITS      = os.path.join(PATH_TEMPLATES, 'kits.json')

logging.basicConfig(level=logging.INFO)

# App main route + generic routing
@app.route('/')
def index():
    return 'Hello'

# KITS
@app.route('/kits/')
def kits():
    return send_file(PATH_KITS)

# Per KIT Info
@app.route('/kits/<template>/')
def kit_template(template):
    INFO_JSON = os.path.join(PATH_ROOT, 'templates', template, 'info.json')
    return send_file(INFO_JSON)

# Per KIT File
@app.route('/kits/<template>/<file>')
def kit_file(template, file):
    FILE_NAME = None  
    
    if file == 'base.html':
        FILE_NAME = os.path.join(PATH_ROOT, 'templates', template, 'layouts', 'base.html')
    else:
        FILE_NAME = os.path.join(PATH_ROOT, 'templates', template, 'components', file)

    return send_file(FILE_NAME)

# Netlify Deploy
@app.route('/deploy', methods=['POST'])
def deploy_to_netlify():
    site_name = request.form.get('site_name')
    netlify_token = request.form.get('netlify_token')

    url = "https://api.netlify.com/api/v1/sites"
    headers = {
        'Authorization': f"Bearer {netlify_token}"
    }

    site_creation_response = requests.post(url, data={'name': site_name}, headers=headers)

    if site_creation_response.status_code == 201:
        file = request.files.get('file')
        headers['Content-Type'] = 'application/zip'
        deployment_response = requests.post(url, data=file.read(), headers=headers)

        if deployment_response.status_code == 201: # created
            return jsonify({'message': 'Deploy OK' , 'url': deployment_response.json()['url'],'response': deployment_response.json()}), 200
        else:
            return jsonify({'message': 'Failed to deploy: ' + str(deployment_response.status_code), 'response': deployment_response.json()}), 400
    else:
        return jsonify({'message': 'Failed to create site: ' + str(site_creation_response.status_code), 'response': site_creation_response.json()}), 422
