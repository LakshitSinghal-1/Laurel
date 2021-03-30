from backend.main import db
from sqlalchemy.exc import IntegrityError
from flask import jsonify
from backend.main.models.user_table import User
from backend.main.models.manager_table import Manager
from backend.main.models.stand_up import Standup
from backend.main.models.sprint_review_table import Sprintreview
from backend.main.models.sprint_planning_table import Sprintplanning
from backend.main.models.sprint_retro_table import Sprintretro


def save_user_details(email, name, provider_id):
    try:
        user = Manager.query.filter_by(email=email).first()
        if(user):
            new_user = User(email=email, name=name,
                            provider_id=provider_id, is_manager=True)
            db.session.add(new_user)
            db.session.commit()
        else:
            new_user = User(email=email, name=name,
                            provider_id=provider_id, is_manager=False)
            db.session.add(new_user)
            db.session.commit()

    except IntegrityError:
        errors = {
            'Intergrity-error': {
                'message': "there is some missing feild"
            }
        }
        db.session.rollback()
        return jsonify(errors), 500


def event_details(data, user):
    response_event = []

    if data.event_type.lower() == 'standup':
        is_standup = False
        count = 0
        standup_data = Standup.query.filter_by(date=data.end).all()
        for datastandup in standup_data:
            count = count + 1
            if (datastandup.user_id == user.id):
                print(user.id,"user")
                print(datastandup.user_id,"standup")
                is_standup = True
                break

        details = {
            "title": data.title,
            "start": data.start,
            "end": data.end,
            "event_type": data.event_type,
            "is_data": is_standup
            # "project_name": project_obj[0].project_name
        }
        response_event.append(details)

    elif data.event_type.lower() == 'sprintreview':
        is_review = False
        count = 0
        review_data = Sprintreview.query.filter_by(date=data.end).all()
        for datareview in review_data:
            count = count + 1
            if (datareview.user_id == user.id):
                is_review = True
                break

        details = {
            "title": data.title,
            "start": data.start,
            "end": data.end,
            "event_type": data.event_type,
            "is_data": is_review
            # "project_name": project_obj[0].project_name
        }
        response_event.append(details)

    elif (data.event_type.lower() == 'sprintplanning'):
        count = 0
        planning_data = Sprintplanning.query.filter_by(date=data.end).all()
        is_planning = False
        for planning in planning_data:
            count = count + 1
            if (planning.user_id == user.id):
                is_planning = True
                break

        details = {
            "title": data.title,
            "start": data.start,
            "end": data.end,
            "event_type": data.event_type,
            "is_data": is_planning
            # "project_name": project_obj[0].project_name
        }
        response_event.append(details)
    else:
        retro_data = Sprintretro.query.filter_by(date=data.end).all()
        count = 0
        is_retro = False
        for retro in retro_data:
            count = count + 1
            if (retro.user_id == user.id):
                is_retro = True
                break

        details = {
            "title": data.title,
            "start": data.start,
            "end": data.end,
            "event_type": data.event_type,
            "is_data": is_retro
            # "project_name": project_obj[0].project_name
        }
        response_event.append(details)

    return response_event


def get_team_members(project_name, curr_user, user):
    team_members = []
    project_list = []

    for member in project_name.relation:
        details = {

            'email': member.email,
            'name': member.name
        }
        team_members.append(details)
    for member_invite in project_name.map_invite:
        details = {

            'email': member_invite.email,
            'name': member_invite.name
        }
        team_members.append(details)

    projectdetails = {
        'created_by': curr_user.email,
        'project_name': user.project_name,
        'project_id': user.id,
        'project_desc': user.description,
        'team': team_members

    }
    project_list.append(projectdetails)
    print(team_members)

    return team_members, project_list