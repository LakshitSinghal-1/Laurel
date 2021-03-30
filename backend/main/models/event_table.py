from backend.main import db
from datetime import datetime



class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    start = db.Column(db.String(100),nullable=False)
    end = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)


def __init__(self, event_type, title, start, end, user_id, project_id,date):
    self.event_type = event_type
    self.title = title
    self.start = start
    self.end = end
    self.user.id = user_id
    self.project_id = project_id
    self.date = date

