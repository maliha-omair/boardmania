from app.models.members import Member, MemberStatus, db
from flask import Blueprint
from flask_login import login_required, current_user



member_routes = Blueprint('members', __name__)


@member_routes.route('/<int:member_id>/approve', methods=["PUT"])
@login_required
def approve_member_request(member_id):
    """
    Approve room join request
    """
    memberRequest = Member.query.get(member_id)
    if memberRequest is None:
        return {'message': "Not Found"}, 404

    if memberRequest.room.owner_id != current_user.id:
        return {'message': "Forbidded: Current user is not owner of room"}, 403
    
    if memberRequest.membership_status != MemberStatus.pending:
        return {'message': "Conflict: Member request should be in pending state"}, 409

    memberRequest.membership_status = MemberStatus.member
    db.session.add(memberRequest)
    db.session.commit()
    return memberRequest.to_dict()


@member_routes.route('/<int:member_id>/reject', methods=["DELETE"])
@login_required
def reject_member_request(member_id):
    """
    Reject room join request
    """
    memberRequest = Member.query.get(member_id)
    if memberRequest is None:
        return {'message': "Not Found"}, 404
    print(str(memberRequest))
    if memberRequest.room.owner_id != current_user.id:
        return {'message': "Forbidded: Current user is not owner of room"}, 403
    
    # if memberRequest.membership_status != MemberStatus.pending:
    #     return {'message': "Conflict: Member request should be in pending state"}, 409

    # memberRequest.membership_status = MemberStatus.deleted
    
    db.session.delete(memberRequest)
    db.session.commit()
    return memberRequest.to_dict()
