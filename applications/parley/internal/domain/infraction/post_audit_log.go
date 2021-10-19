package infraction

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

const (
	StatusRemoved  = "removed"
	StatusApproved = "approved"
	StatusDenied   = "denied"
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

	notes    *string
	reverted bool

	status string

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
		status:          StatusRemoved,
		rejectionReason: rejectionReason,
		notes:           notes,
		reverted:        false,
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
		status:            StatusApproved,
		rejectionReason:   nil,
		notes:             nil,
		reverted:          false,
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
		status:            StatusDenied,
		rejectionReason:   rejectionReason,
		notes:             notes,
		reverted:          false,
		accountInfraction: accountInfraction,
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, contributorId, status string, rejectionReason *PostRejectionReason, notes *string, reverted bool, userInfraction *AccountInfractionHistory) *PostAuditLog {
	return &PostAuditLog{
		id:                id,
		pendingPostId:     postId,
		moderatorId:       moderatorId,
		contributorId:     contributorId,
		status:            status,
		rejectionReason:   rejectionReason,
		notes:             notes,
		reverted:          reverted,
		accountInfraction: userInfraction,
	}
}

func (m *PostAuditLog) ID() string {
	return m.id
}

func (m *PostAuditLog) PostID() string {
	return m.pendingPostId
}

func (m *PostAuditLog) Status() string {
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
	return m.status == StatusApproved
}

func (m *PostAuditLog) IsRemoved() bool {
	return m.status == StatusRemoved
}

func (m *PostAuditLog) IsDenied() bool {
	return m.status == StatusDenied
}

func (m *PostAuditLog) Reverted() bool {
	return m.reverted
}

func (m *PostAuditLog) reversible() bool {
	parse, err := ksuid.Parse(m.id)

	if err != nil {
		return false
	}

	return !parse.Time().After(time.Now().Add(time.Minute * 10))
}

func (m *PostAuditLog) ReversibleUntil() time.Time {
	parse, err := ksuid.Parse(m.id)

	if err != nil {
		return time.Now()
	}

	return parse.Time().Add(time.Minute * 10)
}

// revert log
func (m *PostAuditLog) Revert() error {
	// cant revert after 15 minutes
	if !m.reversible() {
		return errors.New("revert log period has passed")
	}

	// remove infraction (else we have bad ids)
	m.accountInfraction = nil
	m.reverted = true

	return nil
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
	return m.status == StatusDenied && m.rejectionReason.Infraction()
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
