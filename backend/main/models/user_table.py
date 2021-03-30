from backend.main import db, ma, login_manager
from backend.main.models.project_table import relate
from flask_login import UserMixin


# from datetime import datetime


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    is_manager = db.Column(db.Boolean, default=False, nullable=False)

    # token = db.Column(db.Text)
    provider_id = db.Column(db.String(100), nullable=False)
    created_by = db.relationship('Project', backref='author', lazy=True)
    relation = db.relationship('Project', secondary=relate, backref=db.backref('connections', lazy='dynamic'))

    def __init__(self, email, name, provider_id, is_manager):
        self.email = email

        self.name = name
        # self.session_token = session_token
        self.provider_id = provider_id
        self.is_manager = is_manager


class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'email', 'name')


user_schema = UserSchema()
users_schema = UserSchema(many=True)
