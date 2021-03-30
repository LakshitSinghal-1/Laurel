from backend.main import db

class Mappe(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    relate_id = db.Column(db.Integer, db.ForeignKey('relate.id'), nullable=False)
    email = db.Column(db.String(100), nullable=False)


    def __init__(self, email, relate_id):
        self.email = email

        self.relate_id = relate_id