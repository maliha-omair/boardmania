from .db import db

class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    isPublic = db.Column(db.Boolean, nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  

    # relationships
    # players = db.relationship("game_players", back_populates="room")
    games = db.relationship("Game", cascade="all, delete",back_populates="room", lazy=False)
    members = db.relationship("Member", cascade="all, delete", back_populates="room", lazy=False)
    owner = db.relationship("User", back_populates="room",cascade="all, delete", lazy=False)


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'isPublic': self.isPublic,
            'owner_id': self.owner_id
        }
