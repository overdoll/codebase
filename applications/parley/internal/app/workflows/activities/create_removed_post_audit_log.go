package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"time"
)

type CreateRemovedPostAuditLogInput struct {
	Id        string
	AccountId string
	PostId    string
	RuleId    string
	Notes     *string
	RemovedAt time.Time
}

func (h *Activities) CreateRemovedPostAuditLog(ctx context.Context, input CreateRemovedPostAuditLogInput) error {

	// create new audit log - all necessary permission checks will be performed
	postAuditLog, err := post_audit_log.NewRemovePostAuditLog(
		input.Id,
		input.AccountId,
		input.PostId,
		input.RuleId,
		input.Notes,
		input.RemovedAt,
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
