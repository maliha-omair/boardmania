from flask_wtf import FlaskForm
from app.models.game_players import GamePlayer, PlayerColor, PlayerType
from app.models.members import Member, MemberStatus
from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import Game, db
# from app.forms import CreateRoom,UpdateRoom

game_routes = Blueprint('games', __name__)

@game_routes.route('/<int:gameId>/join', methods=["POST"])
@login_required
def join_game(gameId):
    """
    Update game 
    """
    game = Game.query.filter(Game.id == gameId).first()
    if len(game.players) > 2:
        return {'message': 'Validation Errors', 'errors':  ['Only 2 players can play a game']}, 400

    member = Member.query.filter(Member.user_id == current_user.id, Member.room_id == game.room_id).first()
    player = GamePlayer()
    player.member_id = member.id
    player.type = PlayerType.PLAYER
    player.game_position = 2
    player.color = PlayerColor.BLUE
    game.players.append(player)
    db.session.add(game)
    db.session.commit()

    return game.to_dict()

@game_routes.route('/<int:gameId>', methods=["DELETE"])
@login_required
def delete_game(gameId):
    """
    Delete game 
    """
    game = Game.query.filter(Game.id == gameId).first()
    if game is None:
        return {'message': 'Not Found'}, 404


    db.session.delete(game)
    db.session.commit()

    return {'message': 'Deleted Successfully'}, 200


@game_routes.route('/<int:gameId>', methods=["GET"])
@login_required
def get_game(gameId):
    """
    Get game by Id
    """
    game = Game.query.filter(Game.id == gameId).first()
    if game is None:
        return {'message': 'Not Found' }, 404
    return game.to_dict()    