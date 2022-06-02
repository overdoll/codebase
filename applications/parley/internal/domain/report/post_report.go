package report

import (
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type PostReport struct {
	*paging.Node

	reportingAccountId string
	postId             string
	ruleId             string
	createdAt          time.Time
}

func NewPostReport(requester *principal.Principal, postId string, ruleInstance *rule.Rule) (*PostReport, error) {

	if ruleInstance.Deprecated() {
		return nil, rule.ErrRuleDeprecated
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	return &PostReport{
		postId:             postId,
		reportingAccountId: requester.AccountId(),
		ruleId:             ruleInstance.ID(),
		createdAt:          time.Now(),
	}, nil
}

func UnmarshalPostReportFromDatabase(postId, reportingAccountId string, ruleId string, createdAt time.Time) *PostReport {
	return &PostReport{
		postId:             postId,
		ruleId:             ruleId,
		createdAt:          createdAt,
		reportingAccountId: reportingAccountId,
	}
}

func (m *PostReport) PostId() string {
	return m.postId
}

func (m *PostReport) CreatedAt() time.Time {
	return m.createdAt
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
