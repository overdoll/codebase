package infraction

import (
	"errors"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrPostRejectionReasonNotFound = errors.New("post rejection reason not found")
)

var (
	ErrPostAuditLogNotFound = errors.New("post audit log not found")
)

type PostRejectionReason struct {
	*paging.Node

	id         string
	reason     string
	infraction bool
}

func (m *PostRejectionReason) ID() string {
	return m.id
}

func (m *PostRejectionReason) Reason() string {
	return m.reason
}

func (m *PostRejectionReason) Infraction() bool {
	return m.infraction
}

func (m *PostRejectionReason) CanView(requester *principal.Principal) error {
	return CanViewRejectionReasons(requester)
}

func CanViewRejectionReasons(requester *principal.Principal) error {
	if !(requester.IsModerator() || requester.IsStaff()) {
		return principal.ErrNotAuthorized
	}

	return nil
}

func UnmarshalPostRejectionReasonFromDatabase(id, reason string, infraction bool) *PostRejectionReason {
	return &PostRejectionReason{
		id:         id,
		reason:     reason,
		infraction: infraction,
	}
}
