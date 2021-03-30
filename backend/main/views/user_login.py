from flask import jsonify, request
from backend.main import app, db
from backend.main.models.user_table import User, user_schema, users_schema
from backend.main.models.invite_table import Invite
from backend.main.models.project_table import Project
from flask_cors import cross_origin
from flask_jwt_extended import (
     jwt_required, create_access_token
)
import datetime
from backend.main.views.utils import save_user_details


@app.route("/user", methods=["POST"])
@cross_origin()
def add_user():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    provider_id = data.get('provider_id')
    token_expires = datetime.timedelta(days=365)

    if len(email) == 0 or len(name) == 0 or len(str(provider_id)) == 0:
        errors = {
            'Intergrity-error': {
                'message': "there is a missing feild check email ,name and provider_id again"
            }
        }
        return jsonify(errors), 500
    else:
        check_email = User.query.filter_by(email=email).first()

        if check_email:
            jwt_token = create_access_token(identity=email, expires_delta=token_expires)
            if check_email.is_manager is True:

                return jsonify({"jwt_token": jwt_token, "Role": "ProjectManager"}),200
            else:
                return jsonify({"jwt_token": jwt_token, "Role": "Employee"}), 200
        else:
            invite_user_check = Invite.query.filter_by(email=email).first()
            if invite_user_check:
                save_user_details(email, name, provider_id)
                jwt_token = create_access_token(identity=email, expires_delta=token_expires)

                user = User.query.filter_by(email=email).first()
                project_add_id = invite_user_check.project_id
                project_name = Project.query.filter_by(id=project_add_id).first()
                project_name.connections.append(user)
                db.session.commit()
                db.session.delete(invite_user_check)
                db.session.commit()
                if user.is_manager is True:

                    return jsonify({"jwt_token": jwt_token, "Role": "ProjectManager"})
                else:

                    return jsonify({"jwt_token": jwt_token, "Role": "Employee"})
            else:
                save_user_details(email, name, provider_id)
                user = User.query.filter_by(email=email).first()
                jwt_token = create_access_token(identity=email, expires_delta=token_expires)

                if user.is_manager is True:
                    return jsonify({"jwt_token": jwt_token, "Role": "ProjectManager"})
                else:
                    return jsonify({"jwt_token": jwt_token, "Role": "Employee"})


@app.route("/user", methods=["GET"])
@jwt_required
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)


@app.route("/user/<user_id>", methods=["DELETE"])
def user_delete(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()

    return "success"


@app.route("/user/<user_id>", methods=["GET"])
def user_detail(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)


@app.errorhandler(404)
def page_not_found():
    resp = {
        "message": "the end point you are searching for not exist"
    }
    # note that we set the 404 status explicitly
    return jsonify(resp), 404
