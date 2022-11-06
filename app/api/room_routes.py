from flask_wtf import FlaskForm
from app.forms.create_game import CreateGame
from app.models.game_players import GamePlayer, PlayerColor, PlayerType
from app.models.games import GameStatus, MemberMode
from app.models.members import Member, MemberStatus
from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import Room, db, Game
from app.forms import CreateRoom,UpdateRoom

room_routes = Blueprint('rooms', __name__)




@room_routes.route('')
@login_required
def rooms():
    """
    lists all rooms
    """
    owner_id = current_user.id
    rooms = Room.query.filter(Room.owner_id != owner_id ).all()
    roomsToFilter = Room.query.join(Member).filter(Room.owner_id != owner_id, Member.user_id == owner_id ).all()
    filteredRooms = [r for r in rooms if r not in roomsToFilter ]
    if rooms: 
        # filteredRooms = filteredRooms.sort(key = lambda e: e.id, reverse=True)
        print(filteredRooms)
        return {'rooms': [room.to_dict() for room in filteredRooms]}
    else:
        return{'message': []}


@room_routes.route('/<int:id>')
@login_required
def room(id):
    """
    list room by Id
    """
    room = Room.query.get(id)
    if room:
        return room.to_dict()
    else:
        return {'message': "Not Found"}, 404

@room_routes.route('/<int:id>/games')
@login_required
def games(id):
    """
    list games of room by Id
    """
    games = Game.query.filter(Game.room_id == id).order_by(Game.id.desc()).all()
    return {'games': [game.to_dict() for game in games]}
    
@room_routes.route('/<int:roomId>/games', methods=["POST"])
@login_required
def create_game(roomId):
    """
    Create a new game 
    """
    member = Member.query.filter(Member.user_id == current_user.id, Member.room_id == roomId).first()
    if member is None:
        return {'message': 'Validation Errors', 'errors':  ['User must be member of the room']}, 400

    game = Game()
    form = CreateGame()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(game)

        if Game.query.filter(Game.name == game.name).first() is not None:
            return {'message': 'Validation Errors', 'errors':  ['Name must be unique']}, 400

        game.room_id = roomId
        game.mode = MemberMode.TWO_PLAYER
        game.game_status = GameStatus.NEW
        player = GamePlayer()
        player.member_id = member.id
        player.type = PlayerType.PLAYER
        player.game_position = 1
        player.color = PlayerColor.YELLOW
        game.players.append(player)
        
        db.session.add(game)
        db.session.commit()
        return game.to_dict()
    else: 
        return {'message': 'Validation Errors', 'errors': form.errors}, 400


@room_routes.route('/userRooms')
@login_required
def userRoom():
    """
    list user's rooms 
    """
    owner = current_user.id
    rooms = Room.query.filter(Room.owner_id == owner).order_by(Room.id.desc()).all()
    return {'rooms': [room.to_dict() for room in rooms]}
    
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

        member = Member()
        member.room_id = room.id
        member.user_id = owner_id
        member.membership_status = MemberStatus.member
        db.session.add(member)
        db.session.commit()
        return room.to_dict()
    else:
        return {'message': 'Validation Errors', 'errors': form.errors}, 400

    
@room_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_room(id):
    """
    Update item
    """
    form = UpdateRoom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        room = Room.query.filter(Room.id == id).first()
        if room is None:
            return {'error': "Room couldn't be found"}, 404
        else: 
            room_owner = Room.query.filter(Room.id == id, Room.owner_id == current_user.id).first()
            if room_owner is not None:
                form.populate_obj(room)
                db.session.commit()
            else:
                return {'message': "Forbidded"}, 403   
        return {'rooms': room.to_dict()}
    else:
        return {'message': 'Validation Errors','errors': form.errors}, 400


@room_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_room_by_id(id):
    """
    Delete room by id
    """
   
    room = Room.query.filter(Room.id == id).first()
    if room is None:
        return {'message': 'Not Found'}, 404
    if room.owner_id == current_user.id:
        db.session.delete(room)
        db.session.commit()
        return {'message': 'successfuly deleted'}
    else:
        return {'message': "Forbidded"}, 403    
        



@room_routes.route('/<int:room_id>/members', methods=["POST"])
@login_required
def join_room(room_id):
    """
    Send request to join a room
    """
    m = Member.query.filter(Member.room_id == room_id,Member.user_id == current_user.id).first()
    if m:
        return {'message': 'Conflict: Room join request for user already exist'}, 409
        

    member = Member()
    member.user_id = current_user.id
    member.room_id = room_id
    member.membership_status = MemberStatus.pending
    db.session.add(member)
    db.session.commit()
    return member.to_dict()

@room_routes.route('/<int:room_id>/members', methods=["GET"])
@login_required
def get_room_members(room_id):
    """
    Get all room members
    """
    members = Member.query.filter(Member.room_id == room_id).order_by(Member.id.desc()).all()
    return {'members': [m.to_dict() for m in members]}

