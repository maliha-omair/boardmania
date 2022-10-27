from .db import db

class GameMove(db.Model):
    __tablename__ = "game_moves"

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey("game_players.id", onDelete="CASCADE"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", onDelete="CASCADE"), nullable=False)
    move_order = db.Column(db.Integer, nullable=False)
    diceroll = db.Column(db.Integer,nullable=False)
    move_start_position = db.Column(db.String(50), nullable=False)
    move_end_position = db.Column(db.String(50), nullable=False)

    # relationships
    player = db.relationship("game_players", back_populates="game_moves")
    game = db.relationship("games", back_populates="game_moves")
