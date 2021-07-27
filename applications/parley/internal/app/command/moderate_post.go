package command

import (
	"context"
	"errors"

	"overdoll/applications/parley/internal/domain/infraction"
)

type ModeratePost struct {
	ModeratorAccountId string
	PostId             string
	// optional
	PostRejectionReasonId *string
	Notes                 string
}

type ModeratePostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewModeratePostHandler(ir infraction.Repository, eva EvaService, sting StingService) ModeratePostHandler {
	return ModeratePostHandler{sting: sting, eva: eva, ir: ir}
}

func (h ModeratePostHandler) Handle(ctx context.Context, cmd ModeratePost) (*infraction.PostAuditLog, error) {

	// Get user, to perform permission checks
	usr, err := h.eva.GetAccount(ctx, cmd.ModeratorAccountId)

	if err != nil {
		return nil, err
	}

	if !usr.IsModerator() {
		return nil, errors.New("not moderator")
	}

	// Get pending post
	postModeratorId, postContributorId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, err
	}

	postContributor, err := h.eva.GetAccount(ctx, postContributorId)

	if err != nil {
		return nil, err
	}

	var rejectionReason *infraction.PostRejectionReason
	var accountInfractionHistory []*infraction.AccountInfractionHistory

	// if not approved, get rejection reason
	if cmd.PostRejectionReasonId != nil {

		rejectionReason, err = h.ir.GetPostRejectionReason(ctx, *cmd.PostRejectionReasonId)

		if err != nil {
			return nil, err
		}

		// also grab the infraction history, since we will need it to calculate the time for the next infraction
		accountInfractionHistory, err = h.ir.GetAccountInfractionHistory(ctx, nil, postContributorId)

		if err != nil {
			return nil, err
		}
	}

	// create new audit log - all necessary permission checks will be performed
	infractionAuditLog, err := infraction.NewPendingPostAuditLog(
		usr,
		accountInfractionHistory,
		cmd.PostId,
		postModeratorId,
		postContributor,
		rejectionReason,
		cmd.Notes,
	)

	if err != nil {
		return nil, err
	}

	// Based on outcome of moderation action, perform moderation action (has to be done on sting)
	// has to be done synchronously since it may perform some checks (i.e. creates a new user, etc..)
	if infractionAuditLog.IsDeniedWithInfraction() {
		if err := h.sting.DiscardPost(ctx, cmd.PostId); err != nil {
			return nil, err
		}

		// Lock user account
		if err := h.eva.LockAccount(ctx, infractionAuditLog.ContributorId(), infractionAuditLog.UserInfraction().UserLockLength()); err != nil {
			return nil, err
		}
	} else if infractionAuditLog.IsDenied() {
		if err := h.sting.RejectPost(ctx, cmd.PostId); err != nil {
			return nil, err
		}
	} else {
		// post approved
		if err := h.sting.PublishPost(ctx, cmd.PostId); err != nil {
			return nil, err
		}
	}

	// create audit log record
	if err := h.ir.CreatePostAuditLog(ctx, infractionAuditLog); err != nil {
		return nil, err
	}

	return infractionAuditLog, nil
}
