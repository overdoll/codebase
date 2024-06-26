package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/rule"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type ReportPost struct {
	Principal *principal.Principal
	PostId    string
	RuleId    string
}

type ReportPostHandler struct {
	rr    report.Repository
	rur   rule.Repository
	sting StingService
	event event.Repository
}

func NewReportPostHandler(rr report.Repository, rur rule.Repository, sting StingService, event event.Repository) ReportPostHandler {
	return ReportPostHandler{sting: sting, rr: rr, rur: rur, event: event}
}

func (h ReportPostHandler) Handle(ctx context.Context, cmd ReportPost) (*report.PostReport, error) {

	// Get post - just ensuring it exists
	_, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, err
	}

	ruleItem, err := h.rur.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return nil, err
	}

	// create new post report
	postReport, err := report.NewPostReport(cmd.Principal, cmd.PostId, ruleItem)

	if err != nil {
		return nil, err
	}

	if err := h.event.ReportPost(ctx, postReport); err != nil {
		return nil, err
	}

	return postReport, nil
}
