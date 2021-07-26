package command

import (
	"context"
)

type CarrierService interface {
	ConfirmAccountEmail(ctx context.Context, accountId, email, token string) error
	NewLoginToken(ctx context.Context, email, token string) error
}
