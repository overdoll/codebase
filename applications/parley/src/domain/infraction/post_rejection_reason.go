package infraction

import (
	"overdoll/libraries/paging"
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

func UnmarshalPostRejectionReasonFromDatabase(id, reason string, infraction bool) *PostRejectionReason {
	return &PostRejectionReason{
		id:         id,
		reason:     reason,
		infraction: infraction,
	}
}
