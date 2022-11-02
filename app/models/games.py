from .db import db
import enum

class MyMode(str,enum.Enum):
    twoPlayer = "twoPlayer"
    fourPlayer = "fourPlayer"

class MemberMode(str,enum.Enum):
    TWO_PLAYER = "twoPlayer"
    FOUR_PLAYER = "fourPlayer"

class GameStatus(str,enum.Enum):
    NEW = "new"
    DONE = "done"
    IN_PROGRESS = "onGoing"


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    room_id = db.Column(db.Integer,db.ForeignKey("rooms.id", ondelete="CASCADE"), nullable=False)
    game_status = db.Column(db.String(100), nullable=False)
    mode = db.Column(db.Enum(MyMode))

    # relationships
    game_moves = db.relationship("GameMove", back_populates="game",cascade="all, delete", lazy=False)
    room = db.relationship("Room", back_populates="games", lazy=False)
    players = db.relationship("GamePlayer", back_populates="game",cascade="all, delete", lazy=False)
    

    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'game_status': self.game_status ,
            'mode': self.mode,
            'name': self.name,
            'players': [p.to_dict() for p in self.players]
        }
