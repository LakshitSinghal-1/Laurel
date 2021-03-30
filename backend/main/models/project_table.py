from backend.main import db, ma,login_manager
from flask_login import UserMixin


relate = db.Table('relate',
                  db.Column('id', db.Integer, primary_key=True),

                db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                  db.Column('project_id', db.Integer, db.ForeignKey('project.id'))

                  )


class Project(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.String(20), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    map_invite = db.relationship('Invite', backref='author', lazy=True)
    # ritual_map = db.relationship('Ritual', backref='author', lazy=True)
    event_map = db.relationship('Event',backref='author',lazy=True)
    relation = db.relationship('User', secondary=relate, backref=db.backref('connections', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                           nullable=False)

    def __init__(self, project_name, description, user_id):
        self.project_name = project_name
        self.description = description
        self.user_id = user_id

class ProjectSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'project_name')


project_schema = ProjectSchema
projects_schema = ProjectSchema(many=True)