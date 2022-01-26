package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/principal"
)

type UpdatePostRejectionReasonTitle struct {
	Principal         *principal.Principal
	RejectionReasonId string
	Title             string
	Locale            string
}

type UpdatePostRejectionReasonTitleHandler struct {
	pr post_audit_log.Repository
}

func NewUpdatePostRejectionReasonTitleHandler(pr post_audit_log.Repository) UpdatePostRejectionReasonTitleHandler {
	return UpdatePostRejectionReasonTitleHandler{pr: pr}
}

func (h UpdatePostRejectionReasonTitleHandler) Handle(ctx context.Context, cmd UpdatePostRejectionReasonTitle) (*post_audit_log.PostRejectionReason, error) {

	postRejectionReason, err := h.pr.UpdatePostRejectionReasonTitle(ctx, cmd.RejectionReasonId, func(postRejectionReason *post_audit_log.PostRejectionReason) error {
		return postRejectionReason.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return postRejectionReason, nil
}
