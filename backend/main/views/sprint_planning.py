from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.models.sprint_planning_table import Sprintplanning
import json
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from datetime import datetime, date


@app.route("/sprintplanning/<project_id>", methods=["POST"])
@jwt_required
def planning_add(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    project = Project.query.filter_by(id=project_id).first()
    data = request.get_json()
    print(data)
    updated_backlog = data.get("UpdatedBacklog")
    sprint_goal = data.get("SprintGoal")
    planning_date = data.get("date")
    if updated_backlog is None or sprint_goal is None:
        errors = {
                'Intergrity-error': {
                    'message': "there is a missing feild"
                }
        }
        return jsonify(errors), 500

    else:

        try:
            today_date = str(date.today())
            check_date = planning_date[0:10]
            print(check_date)
            date_today_compare = datetime(int(today_date[0:4]), int(today_date[5:7]), int(today_date[8:]))
            check_date_compare = datetime(int(check_date[0:4]), int(check_date[5:7]), int(check_date[8:]))
            flag = check_date_compare < date_today_compare
            if flag:
                return jsonify({"message": "TIME CONTRAINT REACHED YOU ARE NOT ALLOWED TO CREATE STANDUP"}), 500
            sprint_planning_details = Sprintplanning(updated_backlog=updated_backlog,
                                                     sprint_goal=sprint_goal, date=planning_date, user_id=user.id,

                                                     project_id=project_id, is_data=True)

            db.session.add(sprint_planning_details)
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


@app.route("/sprintplanning/<project_id>", methods=["GET"])
@jwt_required
def planning_get(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    project = Project.query.filter_by(id=project_id).first()

    planning = []
    planning_data = Sprintplanning.query.filter_by(project_id=project_id).all()
    for data in planning_data:
        if user.id == data.user_id:
            details = {
                "UpdatedBacklog": data.updated_backlog,
                "SprintGoal": data.sprint_goal,
                "date": data.date,
                "user_id": data.user_id,
                "user_email": user.email,
                "project_id": project_id,
                "project_name": project.project_name
            }
            planning.append(details)
    return jsonify(planning)


@app.route("/sprintplanning/<project_id>", methods=["PUT"])
@jwt_required
def planning_put(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    project = Project.query.filter_by(id=project_id).first()
    data = request.get_json()
    updated_product_backlog = data.get('what_went_well')
    sprint_goal = data.get('sprint_goal')
    date = data.get('date')
    planning_data = Sprintplanning.query.filter_by(project_id=project_id).all()
    for outcome in planning_data:
        if user.id == outcome.user_id:
            try:
                outcome.updated_product_backlog = updated_product_backlog
                outcome.sprint_goal = sprint_goal
                db.session.commit()
                return jsonify({"message": "update success"}), 200
            except IntegrityError:
                errors = {
                         'Intergrity-error': {
                          'message': "there is some missing field"
                         }
                    }
                db.session.rollback()
                return jsonify(errors), 422


@app.route("/visual_planning/<project_id>", methods=["GET"])
@jwt_required
def visual_planning(project_id):
    current_user = get_jwt_identity()
    team_members = []
    user = User.query.filter_by(email=current_user).first()
    attended_array = []
    countuser = 0
    countinvite = 0
    sprintplanning = []
    project = Project.query.filter_by(id=project_id).first()
    id = project.user_id
    user_get = User.query.filter_by(id = id ).first()
    detail = Sprintplanning.query.filter_by(project_id=project_id).all()
    created_by= user_get.email
    for user in project.relation:
        countuser = countuser +1
    for user in project.map_invite:
       countinvite = countinvite+1
    total = countuser+countinvite
    for l in detail:
        data = Sprintplanning.query.filter_by(date=l.date).all()
        standuplength = len(data)
        percentage = float(standuplength/total)*100
        data={
            "attendence":percentage
        }
        attended_array.append(data)



    return jsonify({'team': attended_array})