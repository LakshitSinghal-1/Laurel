from flask import jsonify, request, Response
from backend.main import app, db
import json
from backend.main.models.project_table import Project
from backend.main.models.ritual_table import Ritual
from flask_jwt_extended import jwt_required
from datetime import datetime
from sqlalchemy.exc import IntegrityError


@app.route("/ritual", methods=["POST"])
@jwt_required
def add_ritual():
    data = request.get_json()
    print(data)
    rituals = data.get('ritual')
    project_id = data.get('project_id')

    if rituals is None or project_id is None:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild ritual or project name"
            }
        }
        return jsonify(errors)
    project_get = Project.query.filter_by(id=project_id).first()

    project_ritual_get = Ritual.query.filter_by(project_id=project_get.id).all()
    print(project_ritual_get)
    ritual_list = []
    if project_ritual_get == ritual_list:
        data = {
            'message': "adding successful"
        }
        js = json.dumps(data)
        resp = Response(js, status=200, mimetype='application/json')

        for ritual in rituals:
            try:
                ritual_name = ritual.get('ritualname')
                ritual_type = ritual.get('ritualtype')
                status = ritual.get('status')
                description = ritual.get('ritualdescription')
                notes = ritual.get('outcome')
                ritual_adding = Ritual(ritual_name=ritual_name, ritual_type=ritual_type, status=status,
                                       date_created=datetime.now(), project_id=project_get.id,notes=notes,description=description)
                db.session.add(ritual_adding)
                db.session.commit()
            except IntegrityError:
                errors = {
                    'Intergrity-error': {
                        'message': "there is some missing feild"
                    }
                }
                db.session.rollback()
                return jsonify(errors)

        return resp
    else:
        for ritual in rituals:
            ritual_name = ritual.get('ritualname')
            ritual_type = ritual.get('ritualtype')
            status = ritual.get('status')
            description = ritual.get('ritualdescription')
            notes = ritual.get('outcome')

            for ritual_g in project_ritual_get:
                print(ritual_g.ritual_name, "AAAAAAAAAAAAAAAAAAAAAAAAAa")
                if ritual_g.ritual_name == ritual_name:
                    errors = {
                        'UserAlreadyExistsError': {
                            'message': "A ritual with that name already exists.",
                            'status': 409
                        }
                    }
                    return jsonify(errors),409
            try:
                ritual_adding = Ritual(ritual_name=ritual_name, ritual_type=ritual_type, status=status,
                                       date_created=datetime.now(), project_id=project_get.id,notes=notes,description=description)
                db.session.add(ritual_adding)
                db.session.commit()
            except IntegrityError:
                errors = {
                    'Intergrity-error': {
                        'message': "there is some missing feild"
                    }
                }
                db.session.rollback()
                return jsonify(errors)

        data = {
            'message': "added success"
        }
        js = json.dumps(data)
        resp = Response(js, status=200, mimetype='application/json')
        return resp


@app.route("/ritual/<project_id>", methods=["GET"])
def get_ritual(project_id):
    outcome= []
    project_get = Project.query.filter_by(id=project_id).first()

    if project_get:
        for ritual in project_get.ritual_map:
            print(project_get.ritual_map, "@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            details = {
                'project_name': project_get.project_name,
                'ritual_name': ritual.ritual_name,
                'ritual_type': ritual.ritual_type,
                'status': ritual.status,
                'outcome':ritual.notes,
                'description':ritual.description,
                'date':ritual.date_created,
                'ritual_id':ritual.id
            }
            outcome.append(details)
        return jsonify({"outcome": outcome})
    else:
        data = {
            'message': "project not exist "
        }
        js = json.dumps(data)
        resp = Response(js, status=404, mimetype='application/json')
        return resp, 404



@app.route("/ritual-description/<project_id>", methods=["PUT"])
def update_ritual(project_id):
    data = request.get_json()
    prev_ritual_name =data.get('prev_ritual_name')
    ritual_name = data.get('ritual_name')
    # update_project_name = data.get('project_name')
    ritual_type = data.get('ritual_type')
    description = data.get("description")
    notes = data.get("outcome")
    status= data.get("status")

    project_get = Project.query.filter_by(id=project_id).first()

    ritual_all = Ritual.query.filter_by(project_id=project_get.id).all()
    for name in ritual_all:
        ritual = name.ritual_name
        if(name.ritual_name == prev_ritual_name):
            name.ritual_name = ritual_name
            name.ritual_type = ritual_type
            name.status = status
            name.description=description
            name.notes=notes
            db.session.commit()
    data = {
        'message': "updated "
    }
    js = json.dumps(data)
    resp = Response(js, status=404, mimetype='application/json')
    return resp,200