from app.models import db, Game
from app.models.game_players import GamePlayer
from app.models.games import MyMode
from app.models.members import Member


# Adds a demo user, you can add other users here if you want
def seed_games():

    member6 = Member.query.filter(Member.user_id ==1, Member.room_id==1).first()

    game1 = Game(room_id=1, name="Game 001", game_status='new', mode=MyMode.twoPlayer)

    game2 = Game(room_id=1, name="Game 002", game_status='new', mode=MyMode.twoPlayer)

    game3 = Game(room_id=1, name="Game 003", game_status='new', mode=MyMode.twoPlayer)

    game4 = Game(room_id=1, name="Game 004", game_status='new', mode=MyMode.twoPlayer)


    if Game.query.filter(Game.name == game1.name).first() is None:
        g1p1 = GamePlayer(member_id = member6.id, type = "player", color = "green", game_position = 1)
        game1.players.append(g1p1)
        db.session.add(game1)


    if Game.query.filter(Game.name == game2.name).first() is None:
        g2p1 = GamePlayer(member_id = member6.id, type = "player", color = "green", game_position = 1)
        game1.players.append(g2p1)
        db.session.add(game2)

    if Game.query.filter(Game.name == game3.name).first() is None:
        g3p1 = GamePlayer(member_id = member6.id, type = "player", color = "green", game_position = 1)
        game1.players.append(g3p1)
        db.session.add(game3)
    
    if Game.query.filter(Game.name == game4.name).first() is None:
        g4p1 = GamePlayer(member_id = member6.id, type = "player", color = "green", game_position = 1)
        game1.players.append(g4p1)
        db.session.add(game4)
    
    db.session.commit()


    

    
    

    db.session.add(g1p1)
    db.session.add(g2p1)
    db.session.add(g3p1)
    db.session.add(g4p1)
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_games():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
