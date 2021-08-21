package report

import (
	"errors"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrPostReportReasonNotFound = errors.New("post report reason not found")
)

type PostReportReason struct {
	*paging.Node

	reason string
	id     string
}

func (m *PostReportReason) ID() string {
	return m.id
}

func (m *PostReportReason) Reason() string {
	return m.reason
}

func (m *PostReportReason) CanView(requester *principal.Principal) error {
	return CanViewPostReportReasons(requester)
}

func CanViewPostReportReasons(requester *principal.Principal) error {
	if !(requester.IsModerator() || requester.IsStaff()) {
		return principal.ErrNotAuthorized
	}

	return nil
}

func UnmarshalPostReportReasonFromDatabase(id, reason string) *PostReportReason {
	return &PostReportReason{
		id:     id,
		reason: reason,
	}
}
