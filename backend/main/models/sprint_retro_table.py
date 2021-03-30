from backend.main import db


class Sprintretro(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    went_well_points = db.Column(db.String(200))
    not_went_well_points = db.Column(db.String(200))
    action_items = db.Column(db.String(300))
    keep_doing = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    date = db.Column(db.String(100))
    is_data = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, went_well_points, not_went_well_points, action_items, keep_doing, date, user_id, project_id, is_data):
        self.went_well_points = went_well_points
        self.not_went_well_points = not_went_well_points
        self.action_items = action_items
        self.keep_doing = keep_doing
        self.date = date
        self.user_id = user_id
        self.project_id = project_id
        self.is_data = is_data
