from app.models import db, Room


# Adds a demo user, you can add other users here if you want
def seed_rooms():
    
    roomDemo = Room(
        title='Demo', description='this is a demo room', isPublic=True, owner_id= 1)
   
    friendsClub = Room(
        title='Friends Club', description='this is a room for friends to play ludo', isPublic=False, owner_id= 1)

    Club = Room(
        title='Club', description='this is a room for the ludo experts', isPublic=False, owner_id= 1)

    bigBoss = Room(
        title='Big Boss', description='Big boss game room join to play ludo', isPublic=True, owner_id= 2)

    ludoCrew = Room(
        title='Ludo Crew', description='Ludo crew is the best room', isPublic=True, owner_id= 2)

    if Room.query.filter_by(title=roomDemo.title).first() is None:
        db.session.add(roomDemo)
    if Room.query.filter_by(title=friendsClub.title).first() is None:
        db.session.add(friendsClub)
    if Room.query.filter_by(title=Club.title).first() is None:
        db.session.add(Club)
    if Room.query.filter_by(title=bigBoss.title).first() is None:
        db.session.add(bigBoss)
    if Room.query.filter_by(title=ludoCrew.title).first() is None:
        db.session.add(ludoCrew) 

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rooms():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
