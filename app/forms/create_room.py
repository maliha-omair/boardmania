from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms import validators
from wtforms.validators import ValidationError
from app.models import Room



def room_exists(form,field):
    title = field.data
    room = Room.query.filter(Room.title == title).first()
    if room:
        raise ValidationError('Room with this title already exists')

class CreateRoom(FlaskForm):
    title = StringField('title',validators=[validators.input_required(), room_exists])
    description = StringField('description',validators=[validators.input_required()])
    isPublic = BooleanField('isPublic',validators=[validators.input_required()])
    
   
