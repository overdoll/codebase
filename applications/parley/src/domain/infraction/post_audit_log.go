package infraction

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/account"
	"overdoll/libraries/paging"
)

const (
	StatusApproved = "approved"
	StatusDenied   = "denied"
)

var (
	ErrInvalidModerator = errors.New("moderator does not match")
)

type PostAuditLogFilters struct {
	moderatorId string
	postId      string
	dateRange   []time.Time
}

func NewPostAuditLogFilters(moderatorId, postId string, dateRange []int) (*PostAuditLogFilters, error) {

	// DateRange will be UTC unix timestamps, so we check for that here
	// if no date range is provided, we take the current time
	var times []time.Time

	if len(dateRange) == 0 {
		times = append(times, time.Now())
	} else {
		for _, item := range dateRange {
			times = append(times, time.Unix(int64(item), 0))
		}
	}

	return &PostAuditLogFilters{
		moderatorId: moderatorId,
		postId:      postId,
		dateRange:   times,
	}, nil
}

func (e *PostAuditLogFilters) ModeratorId() string {
	return e.moderatorId
}

func (e *PostAuditLogFilters) PostId() string {
	return e.postId
}

func (e *PostAuditLogFilters) DateRange() []time.Time {
	return e.dateRange
}

// A class simply used to store the details of a PendingPost that we can use
// later on
type PostAuditLog struct {
	*paging.Node

	id            string
	pendingPostId string

	createdMs int

	moderatorId   string
	contributorId string

	notes    string
	reverted bool

	status string

	rejectionReason *PostRejectionReason
	userInfraction  *AccountInfractionHistory
}

func NewPendingPostAuditLog(user *account.Account, userInfractionHistory []*AccountInfractionHistory, postId, moderatorId string, contributor *account.Account, rejectionReason *PostRejectionReason, notes string) (*PostAuditLog, error) {
	// Do some permission checks here to make sure the proper user is doing everything

	if !user.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if user.ID() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	var userInfraction *AccountInfractionHistory

	status := StatusApproved

	if rejectionReason != nil {
		status = StatusDenied

		if rejectionReason.Infraction() {
			userInfraction = NewAccountInfractionHistory(contributor.ID(), userInfractionHistory, rejectionReason.Reason())
		}
	}

	return &PostAuditLog{
		id:              ksuid.New().String(),
		pendingPostId:   postId,
		moderatorId:     moderatorId,
		contributorId:   contributor.ID(),
		status:          status,
		rejectionReason: rejectionReason,
		notes:           notes,
		reverted:        false,
		userInfraction:  userInfraction,
		createdMs:       int(time.Now().Unix()),
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, contributorId, status, userInfractionId, reason, notes string, reverted bool, userInfraction *AccountInfractionHistory, createdMs int) *PostAuditLog {
	return &PostAuditLog{
		id:              id,
		pendingPostId:   postId,
		moderatorId:     moderatorId,
		contributorId:   contributorId,
		status:          status,
		rejectionReason: UnmarshalPostRejectionReasonFromDatabase(ksuid.New().String(), reason, userInfractionId != ""),
		notes:           notes,
		reverted:        reverted,
		userInfraction:  userInfraction,
		createdMs:       createdMs,
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

func (m *PostAuditLog) Notes() string {
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

func (m *PostAuditLog) CreatedMs() int {
	return m.createdMs
}

// revert log
func (m *PostAuditLog) Revert() error {
	// cant revert after 15 minutes
	if !m.reversible() {
		return errors.New("revert log period has passed")
	}

	// remove infraction (else we have bad ids)
	m.userInfraction = nil
	m.reverted = true
	m.rejectionReason = UnmarshalPostRejectionReasonFromDatabase(m.rejectionReason.ID(), m.rejectionReason.Reason(), false)

	return nil
}

func (m *PostAuditLog) RejectionReason() *PostRejectionReason {
	return m.rejectionReason
}

func (m *PostAuditLog) UserInfraction() *AccountInfractionHistory {
	return m.userInfraction
}

func (m *PostAuditLog) IsDeniedWithInfraction() bool {
	return m.status == StatusDenied && m.rejectionReason.Infraction()
}
