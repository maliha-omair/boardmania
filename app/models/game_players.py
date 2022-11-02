import enum
from .db import db

class PlayerType(str,enum.Enum):
    PLAYER = "player"
    VIEWER = "viewer"

class PlayerColor(str,enum.Enum):
    RED = "red"
    BLUE = "blue"
    YELLOW = "yellow"
    GREEN = "green"


class GamePlayer(db.Model):
    __tablename__ = "game_players"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id", ondelete="CASCADE"), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(50),nullable=False)
    game_position = db.Column(db.String(50), nullable=False)

    # relationships
    game_moves = db.relationship("GameMove", back_populates="player",cascade="all, delete", lazy=False)
    member = db.relationship("Member", back_populates="player", lazy=False)
    game = db.relationship("Game", back_populates="players",cascade="all, delete", lazy=False)

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'member_id': self.member_id,
            'type': self.type,
            'color': self.color,
            'game_position': self.game_position,
            'member': self.member.to_dict()
        }
