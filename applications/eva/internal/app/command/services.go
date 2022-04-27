package command

import (
	"context"
)

type CarrierService interface {
	ConfirmAccountEmail(ctx context.Context, accountId, email, id, secret string) error
	NewLoginToken(ctx context.Context, email, token, secret string) error
}
