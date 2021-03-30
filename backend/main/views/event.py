from flask import jsonify, request, Response
from backend.main import app, db
from sqlalchemy.exc import IntegrityError
from backend.main.models.event_table import Event
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.views.utils import event_details
import json

from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date
import datetime

@app.route("/event/<project_id>", methods=["POST"])
@jwt_required
def add_event(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    title = data.get('title')
    start = data.get('start')
    print(start, start)
    end = data.get('end')
    print(end,"end")
    print(start,"start")
    print(end, "end")
    event_type = data.get('event_type')


    today_date = str(date.today())
    check_date = start[0:10]
    date_today_compare= datetime.datetime(int(today_date[0:4]), int(today_date[5:7]), int(today_date[8:]))
    check_date_compare= datetime.datetime(int(check_date[0:4]), int(check_date[5:7]), int(check_date[8:]))
    flag = check_date_compare < date_today_compare
    print(flag)
    if flag:
        return jsonify({"message": "YOU CANNOT CREATE AN EVENT BEFORE TODAY"}), 500



    if len(data) != 4:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild check title,start,end"
            }
        }
        return jsonify(errors), 500
    else:

        try:
            event_add = Event(title=title, start=start, end=end, event_type=event_type, user_id=user.id,
                              project_id=project_id)
            db.session.add(event_add)
            db.session.commit()
            print(event_add.start,"event_start")
            print(event_add.end,"event_end")
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
            return jsonify(errors),500


#
@app.route("/event/<project_id>", methods=["GET"])
@jwt_required
def get_event(project_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    response_event = list()
    event_data = Event.query.filter_by(project_id = project_id).all()
    project_obj = Project.query.filter_by(id=int(project_id)).all()
    project_name = project_obj[0].project_name

    for data in event_data:
        project_get_id = data.project_id

        get_response_event = event_details(data, user)
        response_event.extend(get_response_event)

    return jsonify({"event_details": response_event, "project_id": project_id,"user":user.id,
                    "project_name": project_name}), 200



@app.route("/projectsevents", methods=["GET"])
@jwt_required
def project_event():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()
    event_data = Event.query.filter_by(user_id=user.id).all()
    response_event = list()
    projectarray=[]

    for project in user.relation:
        project_get = Project.query.filter_by(project_name = project.project_name).first()
        project_details = {
            "project_name": project.project_name,
            "id": project.id
        }
        projectarray.append(project_details)
        for data in event_data:
            if(project.id == data.project_id ):
                details = {
                    "project_name":project_get.project_name,
                    "title": data.title,
                    "start": data.start,
                    "end": data.end,
                    "event_type": data.event_type
                    # "is_data": data.is_data
                    # "project_name": project_obj[0].project_name
                }
                response_event.append(details)
        break


    return jsonify({"events":response_event, "projects": projectarray})


@app.route("/mapevent/<project_id>", methods=["GET"])
@jwt_required
def event(project_id):
    current_user = get_jwt_identity()
    project= Project.query.filter_by(id=project_id).first()

    event = Event.query.filter_by(id=1).all()
    print()
    for event in project.event_map:
        print(event)
    return jsonify({"meass":"successs"})