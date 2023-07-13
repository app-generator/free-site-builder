# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps import app

DEBUG = app.config['DEBUG'] 

app.logger.info('DEBUG = ' + str( DEBUG ) )
app.debug = True

if __name__ == "__main__": 
    app.run(debug=True)   
 