from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Room, db
from app.forms import CreateRoom,UpdateRoom

room_routes = Blueprint('rooms', __name__)


@room_routes.route('')
@login_required
def rooms():
    """
    lists all rooms
    """
    rooms = Room.query.filter_by(isPublic=True).all()
    return {'rooms': [room.to_dict() for room in rooms]}


@room_routes.route('/<int:id>')
@login_required
def room(id):
    """
    list room by Id
    """
    room = Room.query.get(id)
    return room.to_dict()

@room_routes.route('', methods=["POST"])
@login_required
def create_new_room():
    """
    Create new room
    """
    owner_id = current_user.id
    form = CreateRoom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        room = Room()
        form.populate_obj(room)
        room.owner_id = owner_id
        db.session.add(room)
        db.session.commit()
        return {'room': room.to_dict()}
    else:
        return {'errors': form.errors}, 400

    
@room_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_room(id):
    """
    Update item
    """
    form = UpdateRoom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        room = Room.query.filter_by(id=id).first()
        if room is None:
            return {'error': "Room couldn't be found"}, 404
        form.populate_obj(room)
        db.session.commit()
        return {'rooms': room.to_dict()}
    else:
        return {'errors': form.errors}, 400