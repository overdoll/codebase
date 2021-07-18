package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedModeratePendingPost = errors.New("get moderator failed")
)

type ModeratePendingPostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewModeratePendingPostHandler(ir infraction.Repository, eva EvaService, sting StingService) ModeratePendingPostHandler {
	return ModeratePendingPostHandler{sting: sting, eva: eva, ir: ir}
}

func (h ModeratePendingPostHandler) Handle(ctx context.Context, moderatorId, pendingPostId, rejectionReasonId, notes string) (*infraction.PendingPostAuditLog, error) {

	// Get user, to perform permission checks
	usr, err := h.eva.GetAccount(ctx, moderatorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedModeratePendingPost
	}

	if !usr.IsModerator() {
		return nil, ErrFailedModeratePendingPost
	}

	// Get pending post
	postModeratorId, postContributorId, err := h.sting.GetPendingPost(ctx, pendingPostId)

	if err != nil {
		zap.S().Errorf("failed to get post: %s", err)
		return nil, ErrFailedModeratePendingPost
	}

	postContributor, err := h.eva.GetAccount(ctx, postContributorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedModeratePendingPost
	}

	var rejectionReason *infraction.PendingPostRejectionReason
	var accountInfractionHistory []*infraction.AccountInfractionHistory

	// if not approved, get rejection reason
	if rejectionReasonId != "" {
		rejectionReason, err = h.ir.GetRejectionReason(ctx, rejectionReasonId)

		if err != nil {
			zap.S().Errorf("failed to get rejection reason: %s", err)
			return nil, ErrFailedModeratePendingPost
		}

		// also grab the infraction history, since we will need it to calculate the time for the next infraction
		accountInfractionHistory, _, err = h.ir.GetAccountInfractionHistory(ctx, nil, postContributorId)

		if err != nil {
			zap.S().Errorf("failed to get user infraction history: %s", err)
			return nil, ErrFailedModeratePendingPost
		}
	}

	// create new audit log - all necessary permission checks will be performed
	infractionAuditLog, err := infraction.NewPendingPostAuditLog(
		usr,
		accountInfractionHistory,
		pendingPostId,
		postModeratorId,
		postContributor,
		rejectionReason,
		notes,
	)

	if err != nil {
		return nil, err
	}

	// Based on outcome of moderation action, perform moderation action (has to be done on sting)
	// has to be done synchronously since it may perform some checks (i.e. creates a new user, etc..)
	if infractionAuditLog.IsDeniedWithInfraction() {
		if err := h.sting.DiscardPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to discard pending post: %s", err)
			return nil, ErrFailedModeratePendingPost
		}

		// Lock user account
		if err := h.eva.LockAccount(ctx, infractionAuditLog.Contributor().ID(), infractionAuditLog.UserInfraction().UserLockLength()); err != nil {
			zap.S().Errorf("failed to lock account: %s", err)
			return nil, ErrFailedModeratePendingPost
		}
	} else if infractionAuditLog.IsDenied() {
		if err := h.sting.RejectPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to reject pending post: %s", err)
			return nil, ErrFailedModeratePendingPost
		}
	} else {
		// post approved
		if err := h.sting.PublishPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to publish pending post: %s", err)
			return nil, ErrFailedModeratePendingPost
		}
	}

	// create audit log record
	if err := h.ir.CreatePendingPostAuditLog(ctx, infractionAuditLog); err != nil {
		zap.S().Errorf("failed to create audit log: %s", err)
		return nil, ErrFailedModeratePendingPost
	}

	return infractionAuditLog, nil
}
