
from app.models.members import db,Member


# Adds a demo user, you can add other users here if you want
def seed_members():
    
    member1 = Member(
        user_id='1', room_id='4', membership_status="member")
    db.session.add(member1)

    member2 = Member(
        user_id='1', room_id='5', membership_status="member")
    db.session.add(member2)

    member3 = Member(
        user_id='2', room_id='8', membership_status="member")
    db.session.add(member3)

    member4 = Member(
        user_id='2', room_id='9', membership_status="member")
    db.session.add(member4)

    member5 = Member(
        user_id='2', room_id='10', membership_status="pending")
    db.session.add(member5)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the members table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
