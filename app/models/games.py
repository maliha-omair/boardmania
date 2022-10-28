from .db import db
import enum

class MyMode(str,enum.Enum):
    twoPlayer = "twoPlayer"
    onePlayer = "onePlayer"

class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer,db.ForeignKey("rooms.id", ondelete="CASCADE"), nullable=False)
    game_status = db.Column(db.String(100), nullable=False)
    mode = db.Column(db.Enum(MyMode))

    # relationships
    game_moves = db.relationship("GameMove", back_populates="game",cascade="all, delete", lazy=False)
    room = db.relationship("Room", back_populates="games",cascade="all, delete", lazy=False)
    player = db.relationship("GamePlayer", back_populates="game",cascade="all, delete", lazy=False)
    

    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'game_status': self.game_status,
            'mode': self.mode,
        }
