from .db import db
import enum

class MyMode(str,enum.Enum):
    twoPlayer = "twoPlayer"
    onePlayer = "onePlayer"

class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    mode = db.Column(db.Enum(MyMode))

    # relationships
    players = db.relationship("game_players", back_populates="room")
    games = db.relationship("games", back_populates="room")
    members = db.relationship("members", back_populates="room")