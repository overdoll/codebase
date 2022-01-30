package report

import (
	"errors"
	"overdoll/applications/parley/internal/domain/rule"

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
	ruleId             string
}

func NewPostReport(requester *principal.Principal, postId string, ruleInstance *rule.Rule) (*PostReport, error) {

	if ruleInstance.Deprecated() {
		return nil, rule.ErrRuleDeprecated
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	return &PostReport{
		id:                 ksuid.New().String(),
		postId:             postId,
		reportingAccountId: requester.AccountId(),
		ruleId:             ruleInstance.ID(),
	}, nil
}

func UnmarshalPostReportFromDatabase(id, postId, reportingAccountId string, ruleId string) *PostReport {
	return &PostReport{
		id:                 id,
		postId:             postId,
		ruleId:             ruleId,
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

func (m *PostReport) RuleId() string {
	return m.ruleId
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
