import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')

def get_current_time():
    return {'time': time.time()}

def get_tattoo_suggestions():
    print("some stuff here")
