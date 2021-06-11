package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedRevertModeratePendingPost = errors.New("get moderator failed")
)

type RevertModeratePendingPostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewRevertModeratePendingPostHandler(ir infraction.Repository, eva EvaService, sting StingService) RevertModeratePendingPostHandler {
	return RevertModeratePendingPostHandler{ir: ir, sting: sting, eva: eva}
}

func (h RevertModeratePendingPostHandler) Handle(ctx context.Context, moderatorId, auditLogId string) (*infraction.PendingPostAuditLog, error) {

	// Get user, to perform permission checks
	usr, err := h.eva.GetUser(ctx, moderatorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedRevertModeratePendingPost
	}

	if !usr.IsModerator() {
		return nil, ErrFailedRevertModeratePendingPost
	}

	// update audit log to revert any infractions and user locks, as well as mark it as reverted
	auditLog, err := h.ir.UpdatePendingPostAuditLog(ctx, auditLogId, func(log *infraction.PendingPostAuditLog) error {

		// need to set this because user permissions arent available when getting it from the DB (needs to be grabbed from
		// another service)
		log.UpdateModerator(usr)

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
			if err := h.eva.LockUser(ctx, log.Contributor().ID(), 0); err != nil {
				return err
			}

			// delete infraction from user's history
			if err := h.ir.DeleteUserInfractionHistory(ctx, infractionId); err != nil {
				return err
			}
		}

		// tell sting to undo the pending post
		if err := h.sting.UndoPendingPost(ctx, log.PostId()); err != nil {
			zap.S().Errorf("failed to publish pending post: %s", err)
			return err
		}

		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to update audit log: %s", err)
		return nil, ErrFailedRevertModeratePendingPost
	}

	return auditLog, nil
}
