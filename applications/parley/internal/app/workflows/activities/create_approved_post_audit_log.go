package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
)

type CreateApprovedPostAuditLogInput struct {
	AccountId string
	PostId    string
}

func (h *Activities) CreateApprovedPostAuditLog(ctx context.Context, input CreateApprovedPostAuditLogInput) error {

	// create new audit log - all necessary permission checks will be performed
	postAuditLog, err := post_audit_log.NewApprovePostAuditLog(
		input.AccountId,
		input.PostId,
	)

	if err != nil {
		return err
	}

	// create audit log record
	if err := h.pr.CreatePostAuditLog(ctx, postAuditLog); err != nil {
		return err
	}

	return nil
}
