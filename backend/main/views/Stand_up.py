from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.stand_up import Standup
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.models.manager_table import Manager
import json
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date, timedelta
# import datetime
import time


@app.route("/standup/<project_id>", methods=["POST"])
@jwt_required
def post(project_id):
    check_list = []
    data = request.get_json()
    yesterday = data.get('Yesterday')
    today = data.get('Today')
    blocker = data.get('Blocker')
    standup_date = data.get('start_date')
    print(standup_date)
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # project=Project.query.filter_by(id=project_id).first()
    standup_data = Standup.query.filter_by(date=standup_date).all()

    today_date = str(date.today())
    check_date = standup_date[0:10]
    print(check_date)
    date_today_compare = datetime(int(today_date[0:4]), int(today_date[5:7]), int(today_date[8:]))
    check_date_compare = datetime(int(check_date[0:4]), int(check_date[5:7]), int(check_date[8:]))
    flag = check_date_compare < date_today_compare
    if flag:
        return jsonify({"message": "TIME CONTRAINT REACHED YOU ARE NOT ALLOWED TO CREATE STANDUP"}), 500
    else:
        t = time.localtime()
        current_time = time.strftime("%H:%M:%S", t)
        check_time = standup_date[11:19]
        if (current_time > check_time):
            if (int(current_time[0:2]) - int(check_time[0:2]) > 2):
                return jsonify({"message": "TIME CONTRAINT REACHED YOU ARE NOT ALLOWED TO CREATE STANDUP"}), 500

    if standup_data != check_list:
        for data in standup_data:
            if data.user_id == user.id:
                data = {
                    "message": "outcome already exists"
                }
                js = json.dumps(data)
                return jsonify(js), 409

    if yesterday is None or today is None or blocker is None:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild"
            }
        }
        return errors, 422
    else:
        try:
            standup_details = Standup(yesterday=yesterday, today=today, blocker=blocker, date=standup_date,
                                      user_id=user.id,
                                      project_id=project_id, is_data=True)

            db.session.add(standup_details)
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
            return jsonify(errors), 422


@app.route("/standup/<project_id>", methods=["GET"])
@jwt_required
def get(project_id):
    current_user = get_jwt_identity()
    params_date = request.args.get('params')
    print(params_date)
    slice_date = params_date[4:24]
    date = datetime.strptime(slice_date, "%b %d %Y %X")
    delta_date = str(date - timedelta(hours=5, minutes=30))
    string_date = delta_date[0:10]
    string_time = delta_date[11:]
    actual_date = string_date + "T" + string_time + ".000Z"
    print(actual_date, "@@@@@@@@@@@@@@@@@@@@")
    user = User.query.filter_by(email=current_user).first()
    manager = Manager.query.filter_by(email=current_user).first()
    project = Project.query.filter_by(id=project_id).first()
    standup = []
    details = Standup.query.filter_by(project_id=project_id).all()

    if manager:
        for data in details:
            if data.date == params_date:
                response = {
                    "yesterday": data.yesterday,
                    "today": data.today,
                    "blocker": data.blocker,
                    "date": data.date,
                    "user_id": data.user_id,
                    "user_email": user.email,

                    "project_id": project_id,
                    "project_name": project.project_name
                }
                standup.append(response)
        return jsonify(standup)

    else:
        for data in details:
            if user.id == data.user_id:
                if data.date == actual_date:
                    response = {

                        "yesterday": data.yesterday,
                        "today": data.today,
                        "blocker": data.blocker,
                        "date": data.date,
                        "user_id": data.user_id,
                        "user_email": "test@nineleaps.com",
                        "project_id": project_id,
                        "project_name": project.project_name
                    }
                    standup.append(response)
        return jsonify(standup), 200


@app.route("/project/<project_id>", methods=["PUT"])
def put(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    yesterday = data.get('Yesterday')
    today = data.get('Today')
    blocker = data.get('Blocker')
    # date = data.get('date')
    standup_details = Standup.query.filter_by(project_id=project_id).all()
    for l in standup_details:
        if user.id == l.user_id:
            try:
                l.yesterday = yesterday
                l.today = today
                l.blocker = blocker
                db.session.commit()
            except IntegrityError:
                errors = {
                    'Intergrity-error': {
                        'message': "there is some missing feild"
                    }
                }
                db.session.rollback()
                return jsonify(errors)


@app.route("/visual_standup/<project_id>", methods=["GET"])
@jwt_required
def visual_standup(project_id):
    team_members_attended_array = []
    count_user = 0
    count_invite = 0
    project = Project.query.filter_by(id=project_id).first()
    detail = Standup.query.filter_by(project_id=project_id).all()
    for user in project.relation:
        count_user = count_user + 1
    for user in project.map_invite:
        count_invite = count_invite + 1
    total = count_user + count_invite
    for data in detail:
        standupdata = Standup.query.filter_by(date=data.date).all()
        standuplength = len(standupdata)
        percentage = float(standuplength / total) * 100
        response = {
            "attendence": percentage,
            'date': data.date
        }
        team_members_attended_array.append(response)
    return jsonify({'team': team_members_attended_array})
