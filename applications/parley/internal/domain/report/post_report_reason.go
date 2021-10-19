package report

import (
	"errors"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/translations"
)

var (
	ErrPostReportReasonNotFound = errors.New("post report reason not found")
)

type PostReportReason struct {
	*paging.Node

	reason *translations.Translation
	id     string
}

func (m *PostReportReason) ID() string {
	return m.id
}

func (m *PostReportReason) Reason() *translations.Translation {
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

func UnmarshalPostReportReasonFromDatabase(id string, reason map[string]string) *PostReportReason {
	return &PostReportReason{
		id:     id,
		reason: translations.UnmarshalTranslationFromDatabase(reason),
	}
}
