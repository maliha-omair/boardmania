from .db import db

class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id", onDelete="CASCADE"), nullable=False)
  

    # relationships
    players = db.relationship("game_players", back_populates="room")
    games = db.relationship("games", back_populates="room")
    members = db.relationship("members", back_populates="room")
    owner = db.relationship("users", back_populates="room")