from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.models.sprint_retro_table import Sprintretro
import json
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date


@app.route("/sprintretro/<project_id>", methods=["POST"])
@jwt_required
def retro_add(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    went_well_points = data.get('WhatWentWell')
    not_went_well_points = data.get('NotWentWell')
    action_items = data.get('ActionItems')
    keep_doing = data.get('KeepDoing')
    retro_date = data.get('date')
    if went_well_points is None or not_went_well_points is None or action_items is None or keep_doing is None:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild"
            }
        }
        return jsonify(errors), 500
    else:

        today_date = str(date.today())
        check_date = retro_date[0:10]
        print(check_date)
        date_today_compare = datetime(int(today_date[0:4]), int(today_date[5:7]), int(today_date[8:]))
        check_date_compare = datetime(int(check_date[0:4]), int(check_date[5:7]), int(check_date[8:]))
        flag = check_date_compare < date_today_compare
        if flag:
            return jsonify({"message": "TIME CONTRAINT REACHED YOU ARE NOT ALLOWED TO CREATE STANDUP"}), 500


        try:
            sprint_retro_details = Sprintretro(went_well_points=went_well_points,
                                               not_went_well_points=not_went_well_points,
                                               action_items=action_items, keep_doing=keep_doing, date=retro_date,
                                               user_id=user.id, project_id=project_id, is_data=True)
            db.session.add(sprint_retro_details)
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


@app.route("/sprintretro/<project_id>", methods=["GET"])
@jwt_required
def retro_get(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    sprint_retro = []
    retro_data = Sprintretro.query.filter_by(project_id=project_id).all()
    for data in retro_data:
        if user.id == data.user_id:
            details = {
                "WhatWentWell": data.went_well_points,
                "NotWentWell": data.not_went_well_points,
                "ActionItems": data.action_items,
                "KeepDoing": data.keep_doing,
                "date": data.date,
                "user_id": data.user_id,
                "user_email": user.email,
                "project_id": project_id,

            }
            sprint_retro.append(details)
    return jsonify(sprint_retro)


@app.route("/project/<project_id>", methods=["PUT"])
@jwt_required
def retro_put(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    what_went_well = data.get('What_Went_Well')
    not_went_well = data.get('Not_Went_Well')
    action_items = data.get('Action_Items')
    keep_doing = data.get('Keep_Doing')
    # date = data.get('date')
    retro_data = Sprintretro.query.filter_by(project_id=project_id).all()
    for outcome in retro_data:
        if user.id == outcome.user_id:
                try:
                    outcome.what_went_well = what_went_well
                    outcome.stories_rejected = not_went_well
                    outcome.action_items = action_items
                    outcome.keep_doing = keep_doing
                    db.session.commit()
                    return jsonify({"message": "update success"}), 200
                except IntegrityError:
                    errors = {
                        'Intergrity-error': {
                            'message': "there is some missing feild"
                        }
                    }
                    db.session.rollback()
                    return jsonify(errors), 422


@app.route("/visual_retro/<project_id>", methods=["GET"])
@jwt_required
def visual_retro(project_id):
    current_user = get_jwt_identity()
    attended_array = []
    count_user = 0
    count_invite = 0
    project = Project.query.filter_by(id=project_id).first()
    detail = Sprintretro.query.filter_by(project_id=project_id).all()
    for user in project.relation:
        count_user = count_user +1
    for user in project.map_invite:
       count_invite = count_invite+1
    total = count_user+count_invite
    for data in detail:
        data = Sprintretro.query.filter_by(date=data.date).all()
        sprint_retro_length = len(data)
        percentage = float(sprint_retro_length/total)*100
        data = {
            "attendence": percentage
        }
        attended_array.append(data)
    return jsonify({'team': attended_array})