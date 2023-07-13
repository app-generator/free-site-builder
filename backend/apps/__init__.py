# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os

# import Flask 
from flask import Flask
from flask_cors import CORS

from .config import Config

# Inject Flask magic
app = Flask(__name__)
CORS(app)

# load Configuration
app.config.from_object( Config ) 

# Import routing to render the pages
from apps import views
