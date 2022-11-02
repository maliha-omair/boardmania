from .db import db
import enum

class MemberStatus(str,enum.Enum):
    pending = "pending"
    member = "member"
    deleted = "deleted"



class Member(db.Model):
    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id", ondelete="CASCADE"), nullable=False)
    membership_status = db.Column(db.Enum(MemberStatus))

    # relationships
    player = db.relationship("GamePlayer", back_populates="member",cascade="all, delete", lazy=False)
    # check delete
    user = db.relationship("User", back_populates="member", lazy=False)
    room = db.relationship("Room", back_populates="members",lazy=False)


    def to_dict(self):
        return {
            'id': self.id,
            # 'user_id': self.user_id,
            # 'room_id': self.room_id,
            'user':  self.user.to_dict(),
            'room':  {
                'id': self.room.id,
                'title': self.room.title,
                'description': self.room.description,
                'isPublic': self.room.isPublic,
                'owner_id': self.room.owner_id
            },
            'status':  self.membership_status,
            # 'room':  self.room.to_dict(),
            # 'player':  self.player.to_dict(),
        }