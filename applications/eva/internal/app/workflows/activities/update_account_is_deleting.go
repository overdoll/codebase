package activities

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/sentry_support"
	"time"
)

type UpdateAccountIsDeletingInput struct {
	AccountId  string
	Timestamp  time.Time
	WorkflowId string
}

type UpdateAccountIsDeletingPayload struct {
	DeletionDate time.Time
}

func (h *Activities) UpdateAccountIsDeleting(ctx context.Context, input UpdateAccountIsDeletingInput) (*UpdateAccountIsDeletingPayload, error) {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	acc, err := h.ar.UpdateAccountDeleting(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkDeleting(input.Timestamp, input.WorkflowId)
	})

	if err != nil {
		return nil, err
	}

	return &UpdateAccountIsDeletingPayload{DeletionDate: *acc.ScheduledDeletionAt()}, nil
}
