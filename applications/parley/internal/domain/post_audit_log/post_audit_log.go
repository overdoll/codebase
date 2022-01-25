package post_audit_log

import (
	"errors"
	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrInvalidModerator     = errors.New("moderator does not match")
	ErrPostAuditLogNotFound = errors.New("post audit log not found")
)

type PostAuditLog struct {
	*paging.Node

	id     string
	postId string

	moderatorId   string
	contributorId string

	notes *string

	action PostAuditLogAction

	rejectionReason *PostRejectionReason
}

func NewRemovePostAuditLog(requester *principal.Principal, postId string, rejectionReason *PostRejectionReason, notes *string) (*PostAuditLog, error) {
	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	return &PostAuditLog{
		id:              ksuid.New().String(),
		postId:          postId,
		moderatorId:     requester.AccountId(),
		action:          PostAuditLogActionRemoved,
		rejectionReason: rejectionReason,
		notes:           notes,
	}, nil
}

func NewApprovePostAuditLog(requester *principal.Principal, postId, moderatorId string) (*PostAuditLog, error) {
	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	return &PostAuditLog{
		id:              ksuid.New().String(),
		postId:          postId,
		moderatorId:     moderatorId,
		action:          PostAuditLogActionApproved,
		rejectionReason: nil,
		notes:           nil,
	}, nil
}

func NewRejectPostAuditLog(requester *principal.Principal, postId, moderatorId string, rejectionReason *PostRejectionReason, notes *string) (*PostAuditLog, error) {
	// Do some permission checks here to make sure the proper user is doing everything

	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	return &PostAuditLog{
		id:              ksuid.New().String(),
		postId:          postId,
		moderatorId:     moderatorId,
		action:          PostAuditLogActionDenied,
		rejectionReason: rejectionReason,
		notes:           notes,
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, status string, rejectionReason *PostRejectionReason, notes *string) *PostAuditLog {

	st, _ := PostAuditLogActionFromString(status)

	return &PostAuditLog{
		id:              id,
		postId:          postId,
		moderatorId:     moderatorId,
		action:          st,
		rejectionReason: rejectionReason,
		notes:           notes,
	}
}

func (m *PostAuditLog) ID() string {
	return m.id
}

func (m *PostAuditLog) PostId() string {
	return m.postId
}

func (m *PostAuditLog) Action() PostAuditLogAction {
	return m.action
}

func (m *PostAuditLog) Notes() *string {
	return m.notes
}

func (m *PostAuditLog) ModeratorId() string {
	return m.moderatorId
}

func (m *PostAuditLog) IsApproved() bool {
	return m.action == PostAuditLogActionApproved
}

func (m *PostAuditLog) IsRemoved() bool {
	return m.action == PostAuditLogActionRemoved
}

func (m *PostAuditLog) IsDenied() bool {
	return m.action == PostAuditLogActionDenied
}

func (m *PostAuditLog) CanView(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(m.moderatorId)
}

func (m *PostAuditLog) CanUpdate(requester *principal.Principal) error {
	return requester.BelongsToAccount(m.moderatorId)
}

func (m *PostAuditLog) RejectionReason() *PostRejectionReason {
	return m.rejectionReason
}

func (m *PostAuditLog) IsDeniedWithInfraction() bool {
	return m.action == PostAuditLogActionDenied && m.rejectionReason.IsInfraction()
}

func CanViewWithFilters(requester *principal.Principal, filter *PostAuditLogFilters) error {
	// filtering by moderator
	if filter.ModeratorId() != nil {

		if requester.IsStaff() {
			return nil
		}

		return requester.BelongsToAccount(*filter.ModeratorId())
	}

	return nil
}
