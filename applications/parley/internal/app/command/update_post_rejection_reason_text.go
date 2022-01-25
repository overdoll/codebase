package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/principal"
)

type UpdatePostRejectionReasonText struct {
	Principal         *principal.Principal
	RejectionReasonId string
	Reason            string
	Locale            string
}

type UpdatePostRejectionReasonTextHandler struct {
	pr post_audit_log.Repository
}

func NewUpdatePostRejectionReasonTextHandler(pr post_audit_log.Repository) UpdatePostRejectionReasonTextHandler {
	return UpdatePostRejectionReasonTextHandler{pr: pr}
}

func (h UpdatePostRejectionReasonTextHandler) Handle(ctx context.Context, cmd UpdatePostRejectionReasonText) (*post_audit_log.PostRejectionReason, error) {

	postRejectionReason, err := h.pr.UpdatePostRejectionReasonDeprecated(ctx, cmd.RejectionReasonId, func(postRejectionReason *post_audit_log.PostRejectionReason) error {
		return postRejectionReason.UpdateReason(cmd.Principal, cmd.Reason, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return postRejectionReason, nil
}
