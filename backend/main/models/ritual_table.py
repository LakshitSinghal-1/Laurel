from backend.main import db, ma
from datetime import datetime


class Ritual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ritual_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=False)
    ritual_type = db.Column(db.String(100), nullable=False)
    notes=db.Column(db.String(500),nullable=True)
    description=db.Column(db.String(500),nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    # view_ritual = db.relationship('Viewritual', backref='author', lazy=True)

    def __init__(self, ritual_name, status, ritual_type, date_created, project_id,notes,description):
        self.ritual_name = ritual_name
        self.status = status
        self.ritual_type = ritual_type
        self.date_created = date_created
        # self.project_id = project_id
        self.notes=notes
        self.description=description


class RitualSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('ritual_name', 'ritual_type', 'status', 'date_created')


ritual_schema = RitualSchema
rituals_schema = RitualSchema(many=True)
