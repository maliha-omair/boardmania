from .rooms import seed_rooms, undo_rooms
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .members import seed_members, undo_members
from .games import seed_games, undo_games

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_rooms()
    seed_members()
    seed_games()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_rooms()
    undo_members()
    undo_games()
    # Add other undo functions here
