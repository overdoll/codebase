package mailing

import (
	"context"
)

type Repository interface {
	SendEmail(ctx context.Context, recipient *Recipient, email *Template) error
}
