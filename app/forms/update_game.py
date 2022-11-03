from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms import validators
from wtforms.validators import ValidationError
from app.models import Game



# def room_exists(form,field):
#     title = field.data
#     room = Room.query.filter(Room.title == title).first()
#     if room:
#         raise ValidationError('Room with this title already exists')

class UpdateGame(FlaskForm):
    name = StringField('name',validators=[validators.input_required()])
    
    
    
   
