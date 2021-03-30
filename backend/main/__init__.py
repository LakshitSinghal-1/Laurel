from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager
from itsdangerous import URLSafeSerializer
from flask_jwt_extended import (
    JWTManager
)
from datetime import timedelta


app = Flask(__name__)
app.config['SECRET_KEY'] = '123ABC'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
cors = CORS(app)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'alok'
app.config['JWT_EXPIRATION_DELTA']=timedelta(seconds=3600)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
ma = Marshmallow(app)
login_manager = LoginManager(app)
login_manager.init_app(app)
serializer = URLSafeSerializer(app.secret_key)

from backend.main.models.revoke import Revoky

@app.before_first_request
def create_tables():
    db.create_all()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return Revoky.is_jti_blacklisted(jti)

# login_manager.login_view = 'logout'
# login_manager.login_view = 'project_add'
# login_manager.login_view ='view_project_mapped'
# login_manager.login_view ='add_ritual'
# login_manager.login_view = ' '
# login_manager.login_view =''
# login_manager.login_view ='view_add_ritual'


from backend. main.views import user_project, user_login, logout_user, event, Stand_up, Sprint_review, sprint_planning, sprint_retro


