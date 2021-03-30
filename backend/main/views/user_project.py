from flask import jsonify, request, Response
from backend.main import app, db
from backend.main.models.user_table import User
from backend.main.models.project_table import Project
from backend.main.models.invite_table import Invite
import json
from backend.main.models.event_table import Event
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from backend.main.views.utils import event_details
from backend.main.views.utils import get_team_members


@app.route("/project", methods=["POST"])
@jwt_required
def project_add():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    data = request.get_json()
    project_name = data.get('title')
    team_member = data.get('TeamMembers')
    description = data.get('description')
    member_check_list = []
    for member in team_member:
        person = member.get('email')
        member_check_list.append(person)
    if len(set(member_check_list)) != len(member_check_list):
        errors = {
            'Intergrity-error': {
                'message': "You can't add same user again"
            }
        }
        return jsonify(errors), 409
    else:
        if project_name is None or team_member is None or description is None:
            errors = {
                'Intergrity-error': {
                    'message': "there is a missing feild check email ,name and description again"
                }
            }
            return jsonify(errors), 500
        else:
            check = Project.query.filter_by(project_name=project_name).first()
            if check:

                errors = {
                    'UserAlreadyExistsError': {
                        'message': "A project with that name already exists."

                    }
                }
                return jsonify(errors), 409
            else:
                add_project = Project(project_name=project_name, description=description, user_id=user.id)
                for member in team_member:
                    get_team_member = User.query.filter_by(email=member.get('email')).first()
                    if get_team_member:
                        try:
                            db.session.add(add_project)
                            db.session.commit()

                            add_project.connections.append(get_team_member)
                            db.session.commit()
                        except IntegrityError:
                            errors = {
                                'Intergrity-error': {
                                    'message': "there is some missing feild"
                                }
                            }
                            db.session.rollback()
                            return jsonify(errors), 500

                    else:
                        db.session.add(add_project)
                        db.session.commit()
                        add_invite = Invite(email=member.get('email'), name=member.get('name'),
                                            project_id=add_project.id)
                        db.session.add(add_invite)
                        db.session.commit()
                data = {
                    'message': "project added"
                }
                js = json.dumps(data)
                resp = Response(js, status=200, mimetype='application/json')
                db.session.add(add_project)
                db.session.commit()
                add_project.connections.append(user)
                db.session.commit()
                return resp


@app.route("/project/<project_id>", methods=["PUT"])
@jwt_required
def project_update(project_id):
    data = request.get_json()
    prev_team_members = data.get('prevTeamMembers')
    next_team_members = data.get('nextTeamMembers')
    project_name = next_team_members['project_name']
    members = prev_team_members['team']
    new_members = next_team_members['team']
    next_desc = next_team_members['description']
    project = Project.query.filter_by(id=project_id).first()

    if project_name:
        try:
            project.project_name = project_name
            project.description = next_desc
            db.session.commit()
        except IntegrityError:
            errors = {
                'Intergrity-error': {
                    'message': "there is some missing feild"
                }
            }
            db.session.rollback()
            return jsonify(errors)
    if members and new_members:
        for member in members:
            count = 0
            for new_mem in new_members:
                if member['email'] == new_mem['email']:
                    break
                else:
                    count = count + 1
                    if count == len(new_members):
                        project_get = Project.query.filter_by(project_name=project_name).first()
                        print(project_get.project_name)
                        user = User.query.filter_by(email=member.get('email')).first()
                        if user:
                            project_get.connections.remove(user)
                            db.session.commit()
                        else:
                            invite = Invite.query.filter_by(email=member.get('email')).first()
                            print(invite.email)
                            db.session.delete(invite)
                            db.session.commit()

        for member in new_members:
            count = 0
            project_get = Project.query.filter_by(project_name=project_name).first()
            for user in project_get.relation:
                if member['email'] == user.email:
                    break
                else:
                    count = count + 1
                    if count == len(project_get.relation):
                        user = User.query.filter_by(email=member.get('email')).first()
                        if user:
                            project_get.connections.append(user)
                            db.session.commit()
                        else:
                            invite_user = Invite.query.filter_by(email=member.get('email')).first()
                            if not invite_user:
                                add_invite = Invite(email=member.get('email'), name=member.get('name'),
                                                    project_id=project_get.id)
                                db.session.add(add_invite)
                                db.session.commit()
    data = {
        "message": "updated success"
    }
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp


@app.route("/relation", methods=["GET"])
@cross_origin()
@jwt_required
def view_project_mapped():
    current_user = get_jwt_identity()
    project_list = []
    response_event = []
    firstproject = []
    count = 0
    user_get = User.query.filter_by(email=current_user).first()
    print(user_get.email,"relation")
    project_first = None

    if len(user_get.relation) > 0:
        for user in user_get.relation:
            team_list = []
            project_name = Project.query.filter_by(project_name=user.project_name).first()
            event_data = Event.query.filter_by(project_id=project_name.id).all()
            if count == 0:
                print("hello")
                project_first = project_name.id
                count = count + 1
                ret_team_mem_details, ret_project_mem_details = get_team_members(project_name, user_get, user)
                project_list.extend(ret_project_mem_details)
                team_list.extend(ret_team_mem_details)
                for data in event_data:
                    get_response_event = event_details(data, user_get)
                    response_event.extend(get_response_event)
            else:
                ret_team_mem_details, ret_project_mem_details = get_team_members(project_name, user_get, user)
                project_list.extend(ret_project_mem_details)
                team_list.extend(ret_team_mem_details)

        return jsonify({"projects": project_list, "events": response_event, "project_id": project_first})
    else:
        return jsonify({"projects": project_list, "events": firstproject, "project_id": 0})


# def get_team_members(project_name, curr_user, user):
#     team_members = []
#     project_list = []
#
#     for member in project_name.relation:
#         details = {
#
#             'email': member.email,
#             'name': member.name
#         }
#         team_members.append(details)
#     for member_invite in project_name.map_invite:
#         details = {
#
#             'email': member_invite.email,
#             'name': member_invite.name
#         }
#         team_members.append(details)
#
#     projectdetails = {
#         'created_by': curr_user.email,
#         'project_name': user.project_name,
#         'project_id': user.id,
#         'project_desc': user.description,
#         'team': team_members
#
#     }
#     project_list.append(projectdetails)
#     print(team_members)
#
#     return team_members, project_list


@app.route("/teammembers/<project_id>", methods=["GET"])
@cross_origin()
@jwt_required
def team_members(project_id):
    project_get = Project.query.filter_by(id=project_id).first()
    project_team_members = []
    for member in project_get.relation:
        details = {

            'email': member.email,
            'name': member.name
        }
        project_team_members.append(details)
    for member_invite in project_get.map_invite:
        details = {

            'email': member_invite.email,
            'name': member_invite.name
        }

        project_team_members.append(details)
    return jsonify(project_team_members)
