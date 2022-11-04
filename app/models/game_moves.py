from .db import db

class GameMove(db.Model):
    __tablename__ = "game_moves"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"), nullable=False)
    move_order = db.Column(db.Integer, nullable=False)
    payload = db.Column(db.Text,nullable=False)
    

    # relationships
    game = db.relationship("Game", back_populates="game_moves",cascade="all, delete", lazy=False)


    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'move_order': self.move_order,
           
        }
