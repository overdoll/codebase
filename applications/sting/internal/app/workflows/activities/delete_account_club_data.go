package activities

import (
	"context"
)

type DeleteAccountClubDataInput struct {
	AccountId string
}

func (h *Activities) DeleteAccountClubData(ctx context.Context, input DeleteAccountClubDataInput) error {
	return h.cr.DeleteAccountData(ctx, input.AccountId)
}
