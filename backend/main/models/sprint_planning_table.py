from backend.main import db


class Sprintplanning(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    updated_backlog = db.Column(db.String, nullable=False)
    sprint_goal = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    date = db.Column(db.String(100))
    is_data = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, updated_backlog, sprint_goal, date, user_id, project_id, is_data):
        self.updated_backlog = updated_backlog

        self.sprint_goal = sprint_goal
        self.user_id = user_id
        self.project_id = project_id
        self.date = date
        self.is_data = is_data