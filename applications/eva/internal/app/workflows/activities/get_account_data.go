package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
)

type GetAccountDataPayload struct {
	Username string
	Email    string
}

func (h *Activities) GetAccountData(ctx context.Context, accountId string) (*GetAccountDataPayload, error) {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	acc, err := h.ar.GetAccountById(ctx, accountId)

	if err != nil {
		return nil, err
	}

	return &GetAccountDataPayload{
		Username: acc.Username(),
		Email:    acc.Email(),
	}, nil
}
