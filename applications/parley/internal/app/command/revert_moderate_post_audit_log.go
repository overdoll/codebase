package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type RevertModeratePost struct {
	Principal  *principal.Principal
	AuditLogId string
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

	// update audit log to revert any infractions and user locks, as well as mark it as reverted
	auditLog, err := h.ir.UpdatePostAuditLog(ctx, cmd.Principal, cmd.AuditLogId, func(log *infraction.PostAuditLog) error {

		infractionId := ""

		// save infraction ID so we can delete it after the revert
		if log.IsDeniedWithInfraction() {
			infractionId = log.UserInfraction().ID()
		}

		if err := log.Revert(); err != nil {
			return err
		}

		if infractionId != "" {

			// delete infraction from user's history
			if err := h.ir.DeleteAccountInfractionHistory(ctx, cmd.Principal, log.ContributorId(), infractionId); err != nil {
				return err
			}

			// unlock account - sending "0" unlocks the account
			if err := h.eva.LockAccount(ctx, log.ContributorId(), 0); err != nil {
				return errors.Wrap(err, "failed to lock account")
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
