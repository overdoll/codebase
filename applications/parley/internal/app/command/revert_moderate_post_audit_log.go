package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
)

type RevertModeratePost struct {
	ModeratorAccountId string
	AuditLogId         string
}

type RevertModeratePostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewRevertModeratePostHandler(ir infraction.Repository, eva EvaService, sting StingService) RevertModeratePostHandler {
	return RevertModeratePostHandler{ir: ir, sting: sting, eva: eva}
}

func (h RevertModeratePostHandler) Handle(ctx context.Context, cmd RevertModeratePost) (*infraction.PostAuditLog, error) {

	// Get user, to perform permission checks
	usr, err := h.eva.GetAccount(ctx, cmd.ModeratorAccountId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get account")
	}

	if !usr.IsModerator() {
		return nil, errors.New("not moderator")
	}

	// update audit log to revert any infractions and user locks, as well as mark it as reverted
	auditLog, err := h.ir.UpdatePostAuditLog(ctx, cmd.AuditLogId, func(log *infraction.PostAuditLog) error {

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
				return errors.Wrap(err, "failed to lock account")
			}

			// delete infraction from user's history
			if err := h.ir.DeleteAccountInfractionHistory(ctx, log.ContributorId(), infractionId); err != nil {
				return err
			}
		}

		// tell sting to undo the pending post
		if err := h.sting.UndoPost(ctx, log.PostID()); err != nil {
			return errors.Wrap(err, "failed to undo post")
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return auditLog, nil
}
