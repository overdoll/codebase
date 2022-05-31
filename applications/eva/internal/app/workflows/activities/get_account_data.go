package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

type GetAccountDataPayload struct {
	Username string
	Email    string
}

func (h *Activities) GetAccountData(ctx context.Context, accountId string) (*GetAccountDataPayload, error) {

	acc, err := h.ar.GetAccountById(ctx, accountId)

	if err != nil {
		sentry.CurrentHub().CaptureException(err)
		return nil, err
	}

	return &GetAccountDataPayload{
		Username: acc.Username(),
		Email:    acc.Email(),
	}, nil
}
