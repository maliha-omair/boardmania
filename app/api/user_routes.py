from app.models.members import Member
from app.models.rooms import Room
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/memberships')
@login_required
def memberRoom():
    """
    list user's rooms 
    """    
    rooms = Member.query.join(Room).filter(Member.user_id == current_user.id).all()
    if rooms is not None:
        return {'members': [room.to_dict() for room in rooms]}
    else:
        return {'message': 'You are not member of any room'}, 400
    