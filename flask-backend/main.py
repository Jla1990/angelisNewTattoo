from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import json
import logging
import os

app = Flask(__name__)
CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG

@app.route('/')
@app.route('/submit')
def home():
    return render_template('../public/index.html')

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Submission(db.Model):
    submission_id = db.Column(db.Integer, primary_key=True)
    submittor = db.Column(db.String(80))
    idea_name = db.Column(db.String(50))
    idea_desc = db.Column(db.String(500))
    idea_image_url = db.Column(db.String(500))
    upvotes = db.Column(db.Integer)

    def __init__(self, submittor, idea_name, idea_desc, idea_image_url, upvotes):
        self.submittor = submittor
        self.idea_name = idea_name
        self.idea_desc = idea_desc
        self.idea_image_url = idea_image_url
        self.upvotes = upvotes

class SubmissionSchema(ma.Schema):
    class Meta:
        model = Submission

    submission_id = ma.auto_field()
    submittor = ma.auto_field()
    idea_name = ma.auto_field()
    idea_desc = ma.auto_field()
    idea_image_url = ma.auto_field()
    upvotes = ma.auto_field()

#define variables for instances of a single submission or a list of many submissions
submission_schema = SubmissionSchema()
submissions_schema = SubmissionSchema(many=True)

# endpoint to create new submission
@app.route("/submission", methods=["POST"])
def add_submission():
    # print(request.json)
    submittor = str(request.json['submission']['name'])
    idea_name = str(request.json['submission']['tattooName'])
    idea_desc = str(request.json['submission']['tattooDescription'])
    idea_image_url = str(request.json['submission']['imageUrl'])
    upvotes = 0

    new_submission = Submission(
    submittor = submittor,
    idea_name = idea_name,
    idea_desc = idea_desc,
    idea_image_url = idea_image_url,
    upvotes = upvotes)

    db.session.add(new_submission)
    db.session.commit()

    return str(new_submission), 200

# endpoint to show all submissions
@app.route("/submission", methods=["GET"])
def get_submission():
    all_submissions = Submission.query.all()
    result = submissions_schema.dump(all_submissions)
    return jsonify(result)

# endpoint to get a submission by id
@app.route("/submission/<id>", methods=["GET"])
def submission_detail(id):
    submission = Submission.query.get(id)
    return submission_schema.jsonify(submission)

# endpoint to delete submission
@app.route("/submission/<id>", methods=["DELETE"])
def submission_delete(id):
    submission = Submission.query.get(id)
    db.session.delete(submission)
    db.session.commit()

# endpoint to add an upvote to a specific submission
@app.route("/submission/<id>", methods=["PUT"])
def submission_upvote(id):
    submission = Submission.query.get(id)
    upvote_count = submission.upvotes
    upvote_count += 1

    submission.upvotes = upvote_count
    db.session.commit()
    return submission_schema.jsonify(submission)

def getApp():
    return app

if __name__ == '__main__':
    # app.run(debug=True)
    #switch this run code in for when we deploy to production on ec2
    app.run(debug=True, host = "0.0.0.0", port =80)
