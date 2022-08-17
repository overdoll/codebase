package passport

import (
	"context"
)

func NewTestContext(ctx context.Context, accountId *string) (context.Context, error) {

	pass, err := issueTestingPassport(accountId, nil)

	if err != nil {
		return nil, err
	}

	// add passport to context
	newCtx := withContext(ctx, pass)

	return newCtx, err
}
