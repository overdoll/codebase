package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
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
	eva    EvaService
	sting  StingService
	stella StellaService
}

func NewRemovePostHandler(pr post_audit_log.Repository, rr rule.Repository, cr club_infraction.Repository, eva EvaService, sting StingService, stella StellaService) RemovePostHandler {
	return RemovePostHandler{sting: sting, eva: eva, pr: pr, rr: rr, cr: cr, stella: stella}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) (*post_audit_log.PostAuditLog, error) {

	_, clubId, err := h.sting.GetPost(ctx, cmd.PostId)

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

	if ruleItem.Infraction() {

		pastInfractionHistory, err := h.cr.GetClubInfractionHistoryByClubId(ctx, cmd.Principal, nil, clubId)

		if err != nil {
			return nil, err
		}

		// create a new infraction for this club
		infraction, err := club_infraction.IssueClubInfractionHistoryFromPostManualRemoval(cmd.Principal, clubId, pastInfractionHistory, ruleItem)

		if err != nil {
			return nil, err
		}

		if err := h.cr.CreateClubInfractionHistory(ctx, infraction); err != nil {
			return nil, err
		}

		if err := h.stella.SuspendClub(ctx, clubId, infraction.ClubSuspensionLength()); err != nil {
			return nil, err
		}
	}

	// remove post
	if err := h.sting.RemovePost(ctx, postAuditLog.PostId()); err != nil {
		return nil, errors.Wrap(err, "failed to remove post")
	}

	return postAuditLog, nil
}
