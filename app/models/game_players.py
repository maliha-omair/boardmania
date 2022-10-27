from .db import db

class GamePlayer(db.Model):
    __tablename__ = "game_players"

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id", onDelete="CASCADE"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id", onDelete="CASCADE"), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(50),nullable=False)
    game_position = db.Column(db.String(50), nullable=False)

    # relationships
    game_moves = db.relationship("game_moves", back_populates="player")
    room = db.relationship("rooms", back_populates="players")
    member = db.relationship("members", back_populates="player")