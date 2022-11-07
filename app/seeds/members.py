
from app.models.members import db,Member


# Adds a demo user, you can add other users here if you want
def seed_members():
    
   
    member1 = Member(
        user_id='1', room_id='4', membership_status="member")
    if Member.query.filter(Member.user_id == member1.user_id, Member.room_id == member1.room_id).first() is None:
        db.session.add(member1)

    member2 = Member(
        user_id='1', room_id='3', membership_status="member")
    if Member.query.filter(Member.user_id == member2.user_id, Member.room_id == member2.room_id).first() is None:
        db.session.add(member2)


    member3 = Member(
        user_id='2', room_id='1', membership_status="member")
    if Member.query.filter(Member.user_id == member3.user_id, Member.room_id == member3.room_id).first() is None:
        db.session.add(member3)

    member4 = Member(
        user_id='2', room_id='2', membership_status="member")
    if Member.query.filter(Member.user_id == member4.user_id, Member.room_id == member4.room_id).first() is None:
        db.session.add(member4)

    member5 = Member(
        user_id='2', room_id='3', membership_status="member")
    if Member.query.filter(Member.user_id == member5.user_id, Member.room_id == member5.room_id).first() is None:
        db.session.add(member5)

    member6 = Member(
        user_id='1', room_id='1', membership_status="member")
    if Member.query.filter(Member.user_id == member6.user_id, Member.room_id == member6.room_id).first() is None:
        db.session.add(member6)

    member7 = Member(
        user_id='1', room_id='2', membership_status="member")
    if Member.query.filter(Member.user_id == member7.user_id, Member.room_id == member7.room_id).first() is None:
        db.session.add(member7)

    member8 = Member(
        user_id='1', room_id='3', membership_status="member")
    if Member.query.filter(Member.user_id == member8.user_id, Member.room_id == member8.room_id).first() is None:
        db.session.add(member8)

    
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the members table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
