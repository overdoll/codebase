package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type RejectPost struct {
	Principal *principal.Principal
	PostId    string
	// optional
	PostRejectionReasonId string
	Notes                 *string
}

type RejectPostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewRejectPostHandler(ir infraction.Repository, eva EvaService, sting StingService) RejectPostHandler {
	return RejectPostHandler{sting: sting, eva: eva, ir: ir}
}

func (h RejectPostHandler) Handle(ctx context.Context, cmd RejectPost) (*infraction.PostAuditLog, error) {

	// Get pending post
	postModeratorId, postContributorId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	rejectionReason, err := h.ir.GetPostRejectionReason(ctx, cmd.Principal, cmd.PostRejectionReasonId)

	if err != nil {
		return nil, err
	}

	// also grab the infraction history, since we will need it to calculate the time for the next infraction
	accountInfractionHistory, err := h.ir.GetAccountInfractionHistory(ctx, cmd.Principal, nil, postContributorId)

	if err != nil {
		return nil, err
	}

	// create new audit log - all necessary permission checks will be performed
	infractionAuditLog, err := infraction.NewRejectPostAuditLog(
		cmd.Principal,
		accountInfractionHistory,
		cmd.PostId,
		postModeratorId,
		postContributorId,
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
			return nil, errors.Wrap(err, "failed to discard post")
		}

		// Lock user account
		if err := h.eva.LockAccount(ctx, infractionAuditLog.ContributorId(), infractionAuditLog.AccountInfraction().UserLockLength()); err != nil {
			return nil, errors.Wrap(err, "failed to lock account")
		}
	} else {
		if err := h.sting.RejectPost(ctx, cmd.PostId); err != nil {
			return nil, errors.Wrap(err, "failed to reject post")
		}
	}

	// create audit log record
	if err := h.ir.CreatePostAuditLog(ctx, infractionAuditLog); err != nil {
		return nil, err
	}

	return infractionAuditLog, nil
}
