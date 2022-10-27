from .db import db

class Member(db.Model):
    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", onDelete="CASCADE"), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id", onDelete="CASCADE"), nullable=False)

    # relationships
    player = db.relationship("game_players", back_populates="member")
    user = db.relationship("users", back_populates="member")
    room = db.relationship("rooms", back_populates="members")