package activities

import (
	"context"
)

type DeleteAccountCurationProfileInput struct {
	AccountId string
}

func (h *Activities) DeleteAccountCurationProfile(ctx context.Context, input DeleteAccountCurationProfileInput) error {
	return h.cur.DeleteProfileOperator(ctx, input.AccountId)
}
