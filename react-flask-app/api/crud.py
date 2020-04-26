from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)
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
        # Fields to expose
        fields = ('submission_id,','submittor','idea_name','idea_desc','idea_image_url','upvotes')

#define variables for instances of a single submission or a list of many submissions
submission_schema = SubmissionSchema()
submissions_schema = SubmissionSchema(many=True)

# endpoint to create new submission
@app.route("/submission", methods=["POST"])
def add_submission():
    submittor = request.json['submittor']
    idea_name = request.json['idea_name']
    idea_desc = request.json['idea_desc']
    idea_image_url = request.json['idea_image_url']
    upvotes = 0

    new_submission = Submission(submittor, idea_name, idea_desc, idea_image_url,upvotes)

    db.session.add(new_submission)
    db.session.commit()

    return jsonify(new_submission)

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

if __name__ == '__main__':
    app.run(debug=True)
