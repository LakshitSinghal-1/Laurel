from backend.main import db


class Standup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    yesterday = db.Column(db.String(100), nullable=False)
    today = db.Column(db.String(100), nullable=False)
    blocker = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable = False)
    date = db.Column(db.String(100))

    is_data = db.Column(db.Boolean, default=False, nullable=False)



def __init__(self, yesterday, today, blocker, user_id, project_id, date, is_data):
    self.yesterday = yesterday
    self.today = today
    self.blocker = blocker
    self.user_id = user_id
    self.project_id = project_id
    self.date = date
    self.is_data = is_data














