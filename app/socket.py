from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from app.models.game_moves import GameMove

from app.models.games import Game


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
def on_join(msg):
    leave_room(msg['room'])
    emit("chatControl", {'msg': msg['user'] + ' has left the room.'}, room=msg['room'])


# handle chat messages
@socketio.on("move")
def handle_move(msg):
    print(str(msg))
    # GameMove.query.filter()
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
