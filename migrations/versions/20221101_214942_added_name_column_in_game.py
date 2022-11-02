"""added name column in game

Revision ID: d39b15c51f8c
Revises: e105284310a9
Create Date: 2022-11-01 21:49:42.466964

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd39b15c51f8c'
down_revision = 'e105284310a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('games', sa.Column('name', sa.String(length=100), nullable=False))
    op.drop_constraint(None, 'rooms', type_='foreignkey')
    op.create_foreign_key(None, 'rooms', 'users', ['owner_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'rooms', type_='foreignkey')
    op.create_foreign_key(None, 'rooms', 'users', ['owner_id'], ['id'])
    op.drop_column('games', 'name')
    # ### end Alembic commands ###
