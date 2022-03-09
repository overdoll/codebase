package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/moderator"
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
	pr     post_audit_log.Repository
	rr     rule.Repository
	cr     club_infraction.Repository
	mr     moderator.Repository
	event  event.Repository
	eva    EvaService
	sting  StingService
	stella StellaService
}

func NewRemovePostHandler(pr post_audit_log.Repository, rr rule.Repository, cr club_infraction.Repository, mr moderator.Repository, event event.Repository, eva EvaService, sting StingService, stella StellaService) RemovePostHandler {
	return RemovePostHandler{sting: sting, eva: eva, pr: pr, rr: rr, mr: mr, cr: cr, stella: stella, event: event}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) error {

	clubId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return errors.Wrap(err, "failed to get post")
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return err
	}

	if err := post_audit_log.CanRemovePost(cmd.Principal, ruleItem); err != nil {
		return err
	}

	if err := h.event.RemovePost(ctx, cmd.Principal, clubId, cmd.PostId, cmd.RuleId, cmd.Notes); err != nil {
		return err
	}

	return nil
}
