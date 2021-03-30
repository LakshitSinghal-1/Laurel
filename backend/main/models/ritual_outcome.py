from backend.main import db
from datetime import  datetime
class Viewritual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ritual_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text)
    ritual_id = db.Column(db.Integer, db.ForeignKey('ritual.id'), nullable=False)
    date_create = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    status =db.Column(db.Text, nullable=False)

    def __init__(self, ritual_name, description, notes, ritual_id,status,date_create):
        self.ritual_name = ritual_name
        self.description = description
        self.notes = notes
        self.ritual_id = ritual_id
        self.status = status
        self.date_create = date_create
