package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"

	"github.com/pkg/errors"
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
	eva   EvaService
	sting StingService
}

func NewReportPostHandler(rr report.Repository, rur rule.Repository, eva EvaService, sting StingService) ReportPostHandler {
	return ReportPostHandler{sting: sting, eva: eva, rr: rr, rur: rur}
}

func (h ReportPostHandler) Handle(ctx context.Context, cmd ReportPost) (*report.PostReport, error) {

	// Get post - just ensuring it exists
	_, _, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
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

	// create post report record
	if err := h.rr.CreatePostReport(ctx, postReport); err != nil {
		return nil, err
	}

	return postReport, nil
}
