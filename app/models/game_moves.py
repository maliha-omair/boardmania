from .db import db

class GameMove(db.Model):
    __tablename__ = "game_moves"

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey("game_players.id", ondelete="CASCADE"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"), nullable=False)
    move_order = db.Column(db.Integer, nullable=False)
    diceroll = db.Column(db.Integer,nullable=False)
    move_start_position = db.Column(db.String(50), nullable=False)
    move_end_position = db.Column(db.String(50), nullable=False)

    # relationships
    player = db.relationship("GamePlayer", back_populates="game_moves",cascade="all, delete", lazy=False)
    game = db.relationship("Game", back_populates="game_moves",cascade="all, delete", lazy=False)


    def to_dict(self):
        return {
            'id': self.id,
            'player_id': self.player_id,
            'game_id': self.game_id,
            'move_order': self.move_order,
            'diceroll': self.diceroll,
            'move_start_position': self.move_start_position,
            'move_end_position': self.move_end_position
        }
