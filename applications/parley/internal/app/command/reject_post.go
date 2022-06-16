package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/rule"

	"overdoll/libraries/principal"
)

type RejectPost struct {
	Principal *principal.Principal
	PostId    string
	RuleId    string
	Notes     *string
}

type RejectPostHandler struct {
	pr    post_audit_log.Repository
	cr    club_infraction.Repository
	mr    moderator.Repository
	event event.Repository

	rr    rule.Repository
	eva   EvaService
	sting StingService
}

func NewRejectPostHandler(pr post_audit_log.Repository, rr rule.Repository, cr club_infraction.Repository, mr moderator.Repository, event event.Repository, eva EvaService, sting StingService) RejectPostHandler {
	return RejectPostHandler{sting: sting, eva: eva, mr: mr, event: event, pr: pr, rr: rr, cr: cr}
}

func (h RejectPostHandler) Handle(ctx context.Context, cmd RejectPost) error {

	clubId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return err
	}

	postModerator, err := h.mr.GetPostModeratorByPostId(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return err
	}

	if err := h.event.RejectPost(ctx, cmd.Principal, postModerator, clubId, cmd.PostId, ruleItem, cmd.Notes); err != nil {
		return err
	}

	return nil
}
