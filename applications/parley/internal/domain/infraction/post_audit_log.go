package infraction

import (
	"errors"
	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrInvalidModerator = errors.New("moderator does not match")
)

// A class simply used to store the details of a PendingPost that we can use
// later on
type PostAuditLog struct {
	*paging.Node

	id            string
	pendingPostId string

	moderatorId   string
	contributorId string

	notes *string

	status PostAuditLogStatus

	rejectionReason   *PostRejectionReason
	accountInfraction *AccountInfractionHistory
}

func NewRemovePostAuditLog(requester *principal.Principal, postId, contributorId string, rejectionReason *PostRejectionReason, notes *string) (*PostAuditLog, error) {
	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	return &PostAuditLog{
		id:              ksuid.New().String(),
		pendingPostId:   postId,
		moderatorId:     requester.AccountId(),
		contributorId:   contributorId,
		status:          PostAuditLogStatusRemoved,
		rejectionReason: rejectionReason,
		notes:           notes,
	}, nil
}

func NewApprovePostAuditLog(requester *principal.Principal, postId, moderatorId, contributorId string) (*PostAuditLog, error) {
	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	return &PostAuditLog{
		id:                ksuid.New().String(),
		pendingPostId:     postId,
		moderatorId:       moderatorId,
		contributorId:     contributorId,
		status:            PostAuditLogStatusApproved,
		rejectionReason:   nil,
		notes:             nil,
		accountInfraction: nil,
	}, nil
}

func NewRejectPostAuditLog(requester *principal.Principal, userInfractionHistory []*AccountInfractionHistory, postId, moderatorId, contributorId string, rejectionReason *PostRejectionReason, notes *string) (*PostAuditLog, error) {
	// Do some permission checks here to make sure the proper user is doing everything

	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	var accountInfraction *AccountInfractionHistory
	var err error

	if rejectionReason.Infraction() {
		accountInfraction, err = NewAccountInfractionHistory(requester, contributorId, userInfractionHistory, rejectionReason)

		if err != nil {
			return nil, err
		}
	}

	return &PostAuditLog{
		id:                ksuid.New().String(),
		pendingPostId:     postId,
		moderatorId:       moderatorId,
		contributorId:     contributorId,
		status:            PostAuditLogStatusDenied,
		rejectionReason:   rejectionReason,
		notes:             notes,
		accountInfraction: accountInfraction,
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, contributorId, status string, rejectionReason *PostRejectionReason, notes *string, userInfraction *AccountInfractionHistory) *PostAuditLog {

	st, _ := PostAuditLogStatusFromString(status)

	return &PostAuditLog{
		id:                id,
		pendingPostId:     postId,
		moderatorId:       moderatorId,
		contributorId:     contributorId,
		status:            st,
		rejectionReason:   rejectionReason,
		notes:             notes,
		accountInfraction: userInfraction,
	}
}

func (m *PostAuditLog) ID() string {
	return m.id
}

func (m *PostAuditLog) PostID() string {
	return m.pendingPostId
}

func (m *PostAuditLog) Status() PostAuditLogStatus {
	return m.status
}

func (m *PostAuditLog) Notes() *string {
	return m.notes
}

func (m *PostAuditLog) ModeratorId() string {
	return m.moderatorId
}

func (m *PostAuditLog) ContributorId() string {
	return m.contributorId
}

func (m *PostAuditLog) IsApproved() bool {
	return m.status == PostAuditLogStatusApproved
}

func (m *PostAuditLog) IsRemoved() bool {
	return m.status == PostAuditLogStatusRemoved
}

func (m *PostAuditLog) IsDenied() bool {
	return m.status == PostAuditLogStatusDenied
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

func (m *PostAuditLog) AccountInfraction() *AccountInfractionHistory {
	return m.accountInfraction
}

func (m *PostAuditLog) IsDeniedWithInfraction() bool {
	return m.status == PostAuditLogStatusDenied && m.rejectionReason.Infraction()
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
