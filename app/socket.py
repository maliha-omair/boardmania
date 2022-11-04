from flask_socketio import SocketIO, emit
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


# handle chat messages
@socketio.on("move")
def handle_move(data):
    print(data)
    # GameMove.query.filter()
    emit("move", data, broadcast=True)

# handle chat messages
@socketio.on("chat")
def handle_chat(msg):
    print(str(msg))
    emit("chat", msg, broadcast=True)
