from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.project_table import Project
from backend.main.models.ritual_outcome import Viewritual
import json
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required
from datetime import datetime

@app.route("/ritual-description", methods=["POST"])
@jwt_required
def view_add_ritual():
    data = request.get_json()
    print(data)
    ritual_name = data.get('ritual_name')
    description = data.get('description')
    notes = data.get('notes')
    status = data.get('status')
    project_name = data.get('project_name')
    if ritual_name is None or description is None or notes is None or project_name is None or status is None:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild ritual_name ,status and description"
            }
        }
        return jsonify(errors)
    else:

        project_get = Project.query.filter_by(project_name=project_name).first()
        for ritual in project_get.ritual_map:
            print(ritual.ritual_name)

            if ritual.ritual_name == ritual_name:
                ritual_id = Viewritual.query.filter_by(ritual_id=ritual.id).first()
                if ritual_id is None:
                    try:
                        view_ritual_store = Viewritual(ritual_name=ritual_name, description=description, notes=notes,
                                                       status=status, ritual_id=ritual.id,date_create=datetime.now())
                        db.session.add(view_ritual_store)
                        db.session.commit()
                        data = {
                            'message': "outcome added"
                        }
                        js = json.dumps(data)
                        resp = Response(js, status=200, mimetype='application/json')

                    except IntegrityError:
                        errors = {
                            'Intergrity-error': {
                                'message': "there is some missing feild"
                            }
                        }
                        db.session.rollback()
                        return jsonify(errors)
                else:
                    data = {
                        'message': "ritual outcome for this project already exist"
                    }
                    js = json.dumps(data)
                    resp = Response(js, status=409, mimetype='application/json')
            else:
                data = {
                    'message': "ritual not exits"
                }
                js = json.dumps(data)
                resp = Response(js, status=409, mimetype='application/json')


        return resp


@app.route("/ritual-description/<project_name>", methods=["GET"])
def get_ritual_outcome(project_name):
    view_ritual_outcome = []
    project_get = Project.query.filter_by(project_name=project_name).first()
    for ritual in project_get.ritual_map:
        print(ritual.ritual_name)
        data = ritual.view_ritual
        print(data)
        # print(data.ritual_name)
        for outcome in data:
            if data:
                details = {
                    "ritual_name": outcome.ritual_name,
                    "description": outcome.description,
                    "status": outcome.status,
                    "notes": outcome.notes,
                     "date": outcome.date_create
                }
                view_ritual_outcome.append(details)

            else:
                data = {
                    'message': "no outcome hasn't been created yet"
                }
                js = json.dumps(data)
                resp = Response(js, status=200, mimetype='application/json')
                return resp, 200

        return jsonify({"outcome": view_ritual_outcome}), 200
