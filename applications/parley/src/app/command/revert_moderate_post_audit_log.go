package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	errFailedRevertModeratePendingPost = errors.New("revert audit log failed")
)

type RevertModeratePostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewRevertModeratePostHandler(ir infraction.Repository, eva EvaService, sting StingService) RevertModeratePostHandler {
	return RevertModeratePostHandler{ir: ir, sting: sting, eva: eva}
}

func (h RevertModeratePostHandler) Handle(ctx context.Context, moderatorId, auditLogId string) (*infraction.PostAuditLog, error) {

	// Get user, to perform permission checks
	usr, err := h.eva.GetAccount(ctx, moderatorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, errFailedRevertModeratePendingPost
	}

	if !usr.IsModerator() {
		return nil, errFailedRevertModeratePendingPost
	}

	// update audit log to revert any infractions and user locks, as well as mark it as reverted
	auditLog, err := h.ir.UpdatePostAuditLog(ctx, auditLogId, func(log *infraction.PostAuditLog) error {

		infractionId := ""

		// save infraction ID so we can delete it after the revert
		if log.IsDeniedWithInfraction() {
			infractionId = log.UserInfraction().ID()
		}

		if err := log.Revert(); err != nil {
			return err
		}

		if infractionId != "" {

			// unlock account - sending "0" unlocks the account
			if err := h.eva.LockAccount(ctx, log.ContributorId(), 0); err != nil {
				return err
			}

			// delete infraction from user's history
			if err := h.ir.DeleteAccountInfractionHistory(ctx, log.ContributorId(), infractionId); err != nil {
				return err
			}
		}

		// tell sting to undo the pending post
		if err := h.sting.UndoPost(ctx, log.PendingPostID()); err != nil {
			zap.S().Errorf("failed to publish pending post: %s", err)
			return err
		}

		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to update audit log: %s", err)
		return nil, errFailedRevertModeratePendingPost
	}

	return auditLog, nil
}
