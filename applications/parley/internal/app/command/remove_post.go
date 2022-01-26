package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/rule"

	"github.com/pkg/errors"
	"overdoll/libraries/principal"
)

type RemovePost struct {
	Principal *principal.Principal
	PostId    string
	RuleId    string
	Notes     *string
}

type RemovePostHandler struct {
	pr    post_audit_log.Repository
	rr    rule.Repository
	eva   EvaService
	sting StingService
}

func NewRemovePostHandler(pr post_audit_log.Repository, rr rule.Repository, eva EvaService, sting StingService) RemovePostHandler {
	return RemovePostHandler{sting: sting, eva: eva, pr: pr, rr: rr}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) (*post_audit_log.PostAuditLog, error) {

	_, _, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return nil, err
	}

	postAuditLog, err := post_audit_log.NewRemovePostAuditLog(
		cmd.Principal,
		cmd.PostId,
		ruleItem,
		cmd.Notes,
	)

	if err != nil {
		return nil, err
	}

	// create audit log record
	if err := h.pr.CreatePostAuditLog(ctx, postAuditLog); err != nil {
		return nil, err
	}

	return postAuditLog, nil
}
