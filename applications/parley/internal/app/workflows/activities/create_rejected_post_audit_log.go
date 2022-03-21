package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
)

type CreateRejectedPostAuditLogInput struct {
	AccountId string
	PostId    string
	RuleId    string
	Notes     *string
}

func (h *Activities) CreateRejectedPostAuditLog(ctx context.Context, input CreateRejectedPostAuditLogInput) error {

	// create new audit log - all necessary permission checks will be performed
	postAuditLog, err := post_audit_log.NewRejectPostAuditLog(
		input.AccountId,
		input.PostId,
		input.RuleId,
		input.Notes,
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