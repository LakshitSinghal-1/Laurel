from flask import jsonify
from backend.main import db
from backend.main import app
from flask_jwt_extended import (
     jwt_required, get_raw_jwt
)
from backend.main.models.revoke import Revoky
# import redis
#
# db = redis.Redis('localhost')
#
@app.route('/logout', methods=["GET"])
@jwt_required
def logout_app():
    jti = get_raw_jwt()['jti']
    try:
        revoked_token = Revoky(jti=jti)
        revoked_token.add()
        return jsonify({'message': "successful logout"})
    except:
        return jsonify({"message": "seomething wrong"}),500

#Logout
