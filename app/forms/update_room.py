from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms import validators
from wtforms.validators import ValidationError
from app.models import Room





class UpdateRoom(FlaskForm):
    title = StringField('title',validators=[validators.input_required()])
    description = StringField('description',validators=[validators.input_required()])
    isPublic = BooleanField('isPublic',validators=[validators.input_required()])