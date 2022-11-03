import imp
from socket import SocketIO
from flask_socketio import send, emit
from ...app import socketio

@socketio.on('game_history')
def get_game_history(json):
    send("This is a test message" + str(json))
