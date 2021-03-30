from backend.main import db


class Invite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable = False)

    def __init__(self, email, name, project_id):
        self.email = email

        self.name = name
        self.project_id = project_id