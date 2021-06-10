package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/applications/parley/src/domain/moderator"
)

var (
	ErrFailedModeratePendingPost = errors.New("get moderator failed")
)

type ModeratePendingPostHandler struct {
	mr    moderator.Repository
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewModeratePendingPostHandler(mr moderator.Repository, eva EvaService, sting StingService) ModeratePendingPostHandler {
	return ModeratePendingPostHandler{mr: mr, sting: sting, eva: eva}
}

func (h ModeratePendingPostHandler) Handle(ctx context.Context, moderatorId, pendingPostId, rejectionReasonId, notes string) error {

	// Get user, to perform permission checks
	usr, err := h.eva.GetUser(ctx, moderatorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return ErrFailedModeratePendingPost
	}

	// have to have moderator role
	if !usr.IsModerator() {
		return ErrFailedModeratePendingPost
	}

	// Get pending post
	postModeratorId, postContributorId, err := h.sting.GetPendingPost(ctx, pendingPostId)

	if err != nil {
		zap.S().Errorf("failed to get post: %s", err)
		return ErrFailedModeratePendingPost
	}

	postContributor, err := h.eva.GetUser(ctx, postContributorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return ErrFailedModeratePendingPost
	}

	var rejectionReason *infraction.PendingPostRejectionReason
	var userInfractionHistory []*infraction.UserInfractionHistory

	// if not approved, get rejection reason
	if rejectionReasonId != "" {
		rejectionReason, err = h.ir.GetRejectionReason(ctx, rejectionReasonId)

		if err != nil {
			zap.S().Errorf("failed to get rejection reason: %s", err)
			return ErrFailedModeratePendingPost
		}

		// also grab the infraction history, since we will need it to calculate the time for the next infraction
		userInfractionHistory, err = h.ir.GetUserInfractionHistory(ctx, postContributorId)

		if err != nil {
			zap.S().Errorf("failed to get user infraction history: %s", err)
			return ErrFailedModeratePendingPost
		}
	}

	// create new audit log - all necessary permission checks will be performed
	infractionAuditLog, err := infraction.NewPendingPostAuditLog(
		usr,
		userInfractionHistory,
		pendingPostId,
		postModeratorId,
		postContributor,
		rejectionReason,
		notes,
	)

	if err != nil {
		return err
	}

	// Based on outcome of moderation action, perform moderation action (has to be done on sting)
	// has to be done synchronously since it may perform some checks (i.e. creates a new user, etc..)
	if infractionAuditLog.IsDeniedWithInfraction() {
		if err := h.sting.DiscardPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to discard pending post: %s", err)
			return ErrFailedModeratePendingPost
		}

		// Lock user account
		if err := h.eva.LockUser(ctx, infractionAuditLog.Contributor().ID(), infractionAuditLog.UserInfraction().UserLockLength()); err != nil {
			zap.S().Errorf("failed to lock account: %s", err)
			return ErrFailedModeratePendingPost
		}
	} else if infractionAuditLog.IsDenied() {
		if err := h.sting.RejectPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to reject pending post: %s", err)
			return ErrFailedModeratePendingPost
		}
	} else {
		// post approved
		if err := h.sting.PublishPendingPost(ctx, pendingPostId); err != nil {
			zap.S().Errorf("failed to publish pending post: %s", err)
			return ErrFailedModeratePendingPost
		}
	}

	// create audit log record
	if err := h.ir.CreatePendingPostAuditLog(ctx, infractionAuditLog); err != nil {
		zap.S().Errorf("failed to create audit log: %s", err)
		return ErrFailedModeratePendingPost
	}

	return nil
}
