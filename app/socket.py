from flask_socketio import SocketIO, emit, join_room, leave_room
import os
import json
from app.models import Game, db, GameMove
from app.models.games import GameStatus


# configure cors_allowed_origins
# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'https://boardmania.herokuapp.com/',
#         'http://boardmania.herokuapp.com/'
#     ]
# else:
#     origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins= "*")


@socketio.on('join')
def on_join(msg):
    print(str(msg))
    join_room(msg['room'])
    emit("chatControl", { 'user': msg['user'],  'payload': {'msg': msg['user'] + ' has entered the room.'}}, room=msg['room'])


@socketio.on('leave')
def on_leave(msg):
    print(str(msg))
    emit("leave",msg, room = msg['room'])
    leave_room(msg['room'])


# handle chat messages
@socketio.on("move")
def handle_move(msg):
    print(str(msg))
    game = Game.query.get(msg['gameId'])
    gameMove = GameMove()
    gameMove.move_order = 0
    gameMove.payload = json.dumps(msg)
    game.game_moves.append(gameMove)
    db.session.add(game)
    db.session.commit()

    if msg['payload']['action'] == "INIT":
        game.game_status = GameStatus.IN_PROGRESS


    if msg['payload']['action'] == "GAME_END":
        game.game_status = GameStatus.DONE
    
    

    emit("move", msg, room = msg['room'])

# handle chat messages
@socketio.on("chat")
def handle_chat(msg):
    print(str(msg))
    emit("chat", msg, room = msg['room'])

# handle chat messages
@socketio.on("chatControl")
def handle_chat(msg):
    print(str(msg))
    emit("chat", msg, room = msg['room'])
