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

type RemovePost struct {
	Principal *principal.Principal
	PostId    string
	RuleId    string
	Notes     *string
}

type RemovePostHandler struct {
	pr    post_audit_log.Repository
	rr    rule.Repository
	cr    club_infraction.Repository
	mr    moderator.Repository
	event event.Repository
	sting StingService
}

func NewRemovePostHandler(pr post_audit_log.Repository, rr rule.Repository, cr club_infraction.Repository, mr moderator.Repository, event event.Repository, sting StingService) RemovePostHandler {
	return RemovePostHandler{sting: sting, pr: pr, rr: rr, mr: mr, cr: cr, event: event}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) error {

	pst, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return err
	}

	if err := h.event.RemovePost(ctx, cmd.Principal, pst.ClubId(), cmd.PostId, ruleItem, cmd.Notes); err != nil {
		return err
	}

	return nil
}
