from backend.main import db

class Sprintreview(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    stories_rejected = db.Column(db.String(200))
    stories_accepted = db.Column(db.String(200))
    updated_backlog = db.Column(db.String(300))
    numbers_stories_accepted = db.Column(db.Integer, nullable=False)
    numbers_stories_rejected = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    date = db.Column(db.String(100))
    is_data = db.Column(db.Boolean, default=False, nullable=False)


def __init__(self, stories_accepted, stories_rejected, updated_backlog, numbers_stories_accepted
                 , numbers_stories_rejected, date, user_id, project_id, is_data):

    self.stories_accepted = stories_accepted
    self.stories_rejected = stories_rejected
    self.update_backlog = updated_backlog
    self.date = date
    self.numbers_stories_accepted = numbers_stories_accepted
    self.numbers_stories_rejected = numbers_stories_rejected
    self.user_id = user_id
    self.project_id = project_id
    self.is_data = is_data





