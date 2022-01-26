package report

import (
	"errors"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrPostReportNotFound = errors.New("post report not found")
)

type PostReport struct {
	*paging.Node

	id                 string
	reportingAccountId string
	postId             string
	reportReason       *PostReportReason
}

func NewPostReport(requester *principal.Principal, postId string, reportReason *PostReportReason) (*PostReport, error) {

	if reportReason.Link() != nil {
		return nil, ErrPostReportReasonIsLink
	}

	return &PostReport{
		id:                 ksuid.New().String(),
		postId:             postId,
		reportingAccountId: requester.AccountId(),
		reportReason:       reportReason,
	}, nil
}

func UnmarshalPostReportFromDatabase(id, postId, reportingAccountId string, reportReason *PostReportReason) *PostReport {
	return &PostReport{
		id:                 id,
		postId:             postId,
		reportReason:       reportReason,
		reportingAccountId: reportingAccountId,
	}
}

func (m *PostReport) ID() string {
	return m.id
}

func (m *PostReport) PostID() string {
	return m.postId
}

func (m *PostReport) ReportingAccountId() string {
	return m.reportingAccountId
}

func (m *PostReport) ReportReason() *PostReportReason {
	return m.reportReason
}

func (m *PostReport) CanView(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(m.reportingAccountId)
}

func CanViewWithFilters(requester *principal.Principal, filter *PostReportFilters) error {

	if requester.IsStaff() {
		return nil
	}

	return principal.ErrNotAuthorized
}
