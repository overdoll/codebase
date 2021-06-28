package infraction

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/account"
)

const (
	StatusApproved = "approved"
	StatusDenied   = "denied"
)

var (
	ErrInvalidModerator = errors.New("moderator does not match")
)

type PendingPostAuditLogFilters struct {
	moderatorId   string
	contributorId string
	postId        string
	dateRange     []time.Time
}

func NewPendingPostAuditLogFilters(moderatorId, contributorId, postId string, dateRange []int) (*PendingPostAuditLogFilters, error) {

	// DateRange will be UTC unix timestamps, so we check for that here
	// if no date range is provided, we take the current time

	if moderatorId == "" {
		return nil, errors.New("moderator must be specified")
	}

	var times []time.Time

	if len(dateRange) == 0 {
		times = append(times, time.Now())
	} else {
		for _, item := range dateRange {
			times = append(times, time.Unix(int64(item), 0))
		}
	}

	return &PendingPostAuditLogFilters{
		moderatorId:   moderatorId,
		contributorId: contributorId,
		postId:        postId,
		dateRange:     times,
	}, nil
}

func (e *PendingPostAuditLogFilters) ModeratorId() string {
	return e.moderatorId
}

func (e *PendingPostAuditLogFilters) PostId() string {
	return e.postId
}

func (e *PendingPostAuditLogFilters) ContributorId() string {
	return e.contributorId
}

func (e *PendingPostAuditLogFilters) DateRange() []time.Time {
	return e.dateRange
}

// A class simply used to store the details of a PendingPost that we can use
// later on
type PendingPostAuditLog struct {
	id     string
	postId string

	createdMs int

	moderator   *account.Account
	contributor *account.Account
	notes       string
	reverted    bool

	status string

	rejectionReason *PendingPostRejectionReason
	userInfraction  *AccountInfractionHistory
}

func NewPendingPostAuditLog(user *account.Account, userInfractionHistory []*AccountInfractionHistory, postId, moderatorId string, contributor *account.Account, rejectionReason *PendingPostRejectionReason, notes string) (*PendingPostAuditLog, error) {
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

	return &PendingPostAuditLog{
		id:              ksuid.New().String(),
		postId:          postId,
		moderator:       user,
		contributor:     contributor,
		status:          status,
		rejectionReason: rejectionReason,
		notes:           notes,
		reverted:        false,
		userInfraction:  userInfraction,
		createdMs:       int(time.Now().Unix()),
	}, nil
}

func UnmarshalPendingPostAuditLogFromDatabase(id, postId, moderatorId, moderatorUsername, contributorId, contributorUsername, status, userInfractionId, reason, notes string, reverted bool, userInfraction *AccountInfractionHistory, createdMs int) *PendingPostAuditLog {
	return &PendingPostAuditLog{
		id:              id,
		postId:          postId,
		moderator:       account.NewUserOnlyIdAndUsername(moderatorId, moderatorUsername),
		contributor:     account.NewUserOnlyIdAndUsername(contributorId, contributorUsername),
		status:          status,
		rejectionReason: UnmarshalPendingPostRejectionReasonFromDatabase(ksuid.New().String(), reason, userInfractionId != ""),
		notes:           notes,
		reverted:        reverted,
		userInfraction:  userInfraction,
		createdMs:       createdMs,
	}
}

func (m *PendingPostAuditLog) ID() string {
	return m.id
}

func (m *PendingPostAuditLog) PostId() string {
	return m.postId
}

func (m *PendingPostAuditLog) Status() string {
	return m.status
}

func (m *PendingPostAuditLog) Notes() string {
	return m.notes
}

func (m *PendingPostAuditLog) Moderator() *account.Account {
	return m.moderator
}

func (m *PendingPostAuditLog) Contributor() *account.Account {
	return m.contributor
}

func (m *PendingPostAuditLog) IsApproved() bool {
	return m.status == StatusApproved
}

func (m *PendingPostAuditLog) IsDenied() bool {
	return m.status == StatusDenied
}

func (m *PendingPostAuditLog) Reverted() bool {
	return m.reverted
}

func (m *PendingPostAuditLog) reversible() bool {
	parse, err := ksuid.Parse(m.id)

	if err != nil {
		return false
	}

	return !parse.Time().After(time.Now().Add(time.Minute * 10))
}

func (m *PendingPostAuditLog) CanRevert() bool {
	return m.reversible()
}

func (m *PendingPostAuditLog) CreatedMs() int {
	return m.createdMs
}

// revert log
func (m *PendingPostAuditLog) Revert() error {
	// cant revert after 15 minutes
	if !m.reversible() {
		return errors.New("revert log period has passed")
	}

	// remove infraction (else we have bad ids)
	m.userInfraction = nil
	m.reverted = true
	m.rejectionReason = UnmarshalPendingPostRejectionReasonFromDatabase(m.rejectionReason.ID(), m.rejectionReason.Reason(), false)

	return nil
}

func (m *PendingPostAuditLog) UpdateModerator(mod *account.Account) {
	m.moderator = mod
}

func (m *PendingPostAuditLog) RejectionReason() *PendingPostRejectionReason {
	return m.rejectionReason
}

func (m *PendingPostAuditLog) UserInfraction() *AccountInfractionHistory {
	return m.userInfraction
}

func (m *PendingPostAuditLog) IsDeniedWithInfraction() bool {
	return m.status == StatusDenied && m.rejectionReason.Infraction()
}
