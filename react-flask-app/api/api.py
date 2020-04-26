from flask import Flask
from flask import render_template


app = Flask(__name__ , template_folder = "templates")

@app.route('/')

def home():
    return render_template('placeholder.js')

if __name__ == '__main__':
    app.run(debug=True)
