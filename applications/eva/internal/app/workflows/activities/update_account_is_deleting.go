package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
	"overdoll/applications/eva/internal/domain/account"
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

	acc, err := h.ar.UpdateAccountDeleting(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkDeleting(input.Timestamp, input.WorkflowId)
	})

	if err != nil {
		sentry.CurrentHub().CaptureException(err)
		return nil, err
	}

	return &UpdateAccountIsDeletingPayload{DeletionDate: *acc.ScheduledDeletionAt()}, nil
}
