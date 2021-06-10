package infraction

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/user"
)

const (
	STATUS_APPROVED = "approved"
	STATUS_DENIED   = "denied"
)

var (
	ErrInvalidModerator = errors.New("moderator does not match")
)

// A class simply used to store the details of a PendingPost that we can use
// later on
type PendingPostAuditLog struct {
	id     string
	postId string

	moderator   *user.User
	contributor *user.User
	notes       string
	reverted    bool

	status string

	rejectionReason *PendingPostRejectionReason
	userInfraction  *UserInfractionHistory
}

func NewPendingPostAuditLog(user *user.User, userInfractionHistory []*UserInfractionHistory, postId, moderatorId string, contributor *user.User, rejectionReason *PendingPostRejectionReason, notes string) (*PendingPostAuditLog, error) {
	// Do some permission checks here to make sure the proper user is doing everything

	if !user.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if user.ID() != moderatorId {
			return nil, ErrInvalidModerator
		}
	}

	var userInfraction *UserInfractionHistory

	status := STATUS_DENIED

	if rejectionReason != nil {
		status = STATUS_APPROVED

		if rejectionReason.Infraction() {
			userInfraction = NewUserInfractionHistory(contributor.ID(), userInfractionHistory, rejectionReason.Reason())
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
	}, nil
}

func UnmarshalPendingPostAuditLogFromDatabase(id, postId, moderatorId, moderatorUsername, contributorId, contributorUsername, status, userInfractionId, reason, notes string, reverted bool, userInfraction *UserInfractionHistory) *PendingPostAuditLog {
	return &PendingPostAuditLog{
		id:              id,
		postId:          postId,
		moderator:       user.NewUserOnlyIdAndUsername(moderatorId, moderatorUsername),
		contributor:     user.NewUserOnlyIdAndUsername(contributorId, contributorUsername),
		status:          status,
		rejectionReason: UnmarshalPendingPostRejectionReasonFromDatabase(ksuid.New().String(), reason, userInfractionId != ""),
		notes:           notes,
		reverted:        reverted,
		userInfraction:  userInfraction,
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
	return m.status
}

func (m *PendingPostAuditLog) Moderator() *user.User {
	return m.moderator
}

func (m *PendingPostAuditLog) Contributor() *user.User {
	return m.contributor
}

func (m *PendingPostAuditLog) IsApproved() bool {
	return m.status == STATUS_APPROVED
}

func (m *PendingPostAuditLog) IsDenied() bool {
	return m.status == STATUS_DENIED
}

func (m *PendingPostAuditLog) Reverted() bool {
	return m.reverted
}

// revert log
func (m *PendingPostAuditLog) Revert() error {
	parse, err := ksuid.Parse(m.id)

	if err != nil {
		return err
	}

	// cant revert after 15 minutes
	if parse.Time().After(time.Now().Add(time.Minute * 10)) {
		return errors.New("revert log period has passed")
	}

	// remove infraction (else we have bad ids)
	m.userInfraction = nil
	m.reverted = true

	return nil
}

func (m *PendingPostAuditLog) UpdateModerator(mod *user.User) {
	m.moderator = mod
}

func (m *PendingPostAuditLog) RejectionReason() *PendingPostRejectionReason {
	return m.rejectionReason
}

func (m *PendingPostAuditLog) UserInfraction() *UserInfractionHistory {
	return m.userInfraction
}

func (m *PendingPostAuditLog) IsDeniedWithInfraction() bool {
	return m.status == STATUS_DENIED && m.rejectionReason.Infraction()
}
