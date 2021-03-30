from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.models.sprint_review_table import Sprintreview
import json
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date


@app.route("/sprintreview/<project_id>", methods=["POST"])
@jwt_required
def review_add(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    stories_rejected = data.get('StoriesRejected')
    stories_accepted = data.get('StoriesAccepted')
    updated_backlog = data.get('UpdatedBacklog')
    number_stories_accepted = data.get("Number_StoriesAccepted")
    number_stories_rejected = data.get("Number_StoriesRejected")
    review_date = data.get('date')



    if len(data) != 6:
        errors = {
            'Intergrity-error':{
                'message': "there is a missing feild check email ,name and provider_id again"
            }
        }
        return jsonify(errors), 500
    else:

        today_date = str(date.today())
        check_date = review_date[0:10]
        date_today_compare = datetime(int(today_date[0:4]), int(today_date[5:7]), int(today_date[8:]))
        check_date_compare = datetime(int(check_date[0:4]), int(check_date[5:7]), int(check_date[8:]))
        flag = check_date_compare < date_today_compare
        if flag:
            return jsonify({"message": "TIME CONTRAINT REACHED YOU ARE NOT ALLOWED TO CREATE STANDUP"}), 500
        try:
            add_review = Sprintreview(stories_rejected=stories_rejected, stories_accepted=stories_accepted,
                                      updated_backlog=updated_backlog, numbers_stories_accepted=number_stories_accepted,
                                      numbers_stories_rejected=number_stories_rejected, date=review_date, user_id=user.id,
                                      project_id=project_id, is_data=True)

            db.session.add(add_review)
            db.session.commit()
            data = {
                'message': "Successful"
            }
            js = json.dumps(data)
            resp = Response(js, status=200, mimetype='application/json')
            return resp

        except IntegrityError:
            errors = {
                'Intergrity-error': {
                    'message': "there is some missing feild"
                }
            }
            db.session.rollback()
            return jsonify(errors), 500


@app.route("/sprintreview/<project_id>", methods=["GET"])
@jwt_required
def review_get(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    project = Project.query.filter_by(id=project_id).first()
    details_array = []
    review_data = Sprintreview.query.filter_by(project_id=project_id).all()
    for data in review_data:
        if user.id == data.user_id:
            details = {
                "StoriesRejected": data.stories_rejected,
                "StoriesAccepted": data.stories_accepted,
                "UpdatedBacklog": data.updated_backlog,
                "Number_StoriesAccepted": data.numbers_stories_accepted,
                "Number_StoriesRejected": data.numbers_stories_rejected,
                "date": data.date,
                "user_id": data.user_id,
                "user_email": user.email,
                "project_id": project_id,
                "project_name": project.project_name
            }
            details_array.append(details)
    return jsonify(details_array), 200


@app.route("/project/<project_id>", methods=["PUT"])
@jwt_required
def review_put(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    stories_rejected = data.get('stories_rejected')
    stories_accepted = data.get('stories_accepted')
    updated_backlog = data.get('UpdatedBacklog')
    count = 0
    sprint_data = Sprintreview.query.filter_by(project_id=project_id).all()
    for data in sprint_data:
        count = count+1
        if user.id == data.user_id:
            try:
                data.StoriesAccepted = stories_accepted
                data.StoriesRejected = stories_rejected
                data.UpdatedBacklog = updated_backlog
                db.session.commit()
                return jsonify({"message": "update success"})
            except IntegrityError:
                errors = {
                        'Intergrity-error': {
                            'message': "there is some missing feild"
                        }
                    }
                db.session.rollback()
                return jsonify(errors)
        elif count == len(sprint_data):
            data = {
                    'message': "now you are not allowed to edit"
                }
            js = json.dumps(data)
            resp = Response(js, status=200, mimetype='application/json')
            return resp


@app.route("/visual_review/<project_id>", methods=["GET"])
@jwt_required
def visual_review(project_id):
    team_member_attended = []
    countuser = 0
    countinvite = 0
    project = Project.query.filter_by(id=project_id).first()
    detail = Sprintreview.query.filter_by(project_id=project_id).all()
    for user in project.relation:
        countuser = countuser + 1
    for user in project.map_invite:
       countinvite = countinvite + 1
    total = countuser+countinvite
    for data in detail:
        data = Sprintreview.query.filter_by(date=data.date).all()
        standup_length = len(data)
        percentage = float(standup_length/total)*100
        data = {
            "attendence": percentage
        }
        team_member_attended.append(data)
    return jsonify({'team': team_member_attended})
