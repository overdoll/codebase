package infraction

import (
	"overdoll/libraries/paging"
)

type PendingPostRejectionReason struct {
	*paging.Node

	id         string
	reason     string
	infraction bool
}

func (m *PendingPostRejectionReason) ID() string {
	return m.id
}

func (m *PendingPostRejectionReason) Reason() string {
	return m.reason
}

func (m *PendingPostRejectionReason) Infraction() bool {
	return m.infraction
}

func UnmarshalPendingPostRejectionReasonFromDatabase(id, reason string, infraction bool) *PendingPostRejectionReason {
	return &PendingPostRejectionReason{
		id:         id,
		reason:     reason,
		infraction: infraction,
	}
}
