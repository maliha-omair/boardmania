from .db import db

class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer,db.ForeignKey("rooms.id", onDelete="CASCADE"), nullable=False)
    game_status = db.Column(db.String(100), nullable=False)

    # relationships
    game_moves = db.relationship("game_moves", back_populates="game")
    room = db.relationship("rooms", back_populates="games")
    