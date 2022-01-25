package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/principal"
)

type UpdatePostRejectionReasonDeprecated struct {
	Principal         *principal.Principal
	RejectionReasonId string
	Deprecated        bool
}

type UpdatePostRejectionReasonDeprecatedHandler struct {
	pr post_audit_log.Repository
}

func NewUpdatePostRejectionReasonDeprecatedHandler(pr post_audit_log.Repository) UpdatePostRejectionReasonDeprecatedHandler {
	return UpdatePostRejectionReasonDeprecatedHandler{pr: pr}
}

func (h UpdatePostRejectionReasonDeprecatedHandler) Handle(ctx context.Context, cmd UpdatePostRejectionReasonDeprecated) (*post_audit_log.PostRejectionReason, error) {

	postRejectionReason, err := h.pr.UpdatePostRejectionReasonDeprecated(ctx, cmd.RejectionReasonId, func(postRejectionReason *post_audit_log.PostRejectionReason) error {
		return postRejectionReason.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return postRejectionReason, nil
}
