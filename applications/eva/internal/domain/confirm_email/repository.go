package confirm_email

import (
	"context"
	"overdoll/libraries/principal"
)

type Repository interface {
	DeleteConfirmEmail(ctx context.Context, requester *principal.Principal, confirmEmail *ConfirmEmail) error
	AddConfirmEmail(ctx context.Context, confirmEmail *ConfirmEmail) error
	GetConfirmEmail(ctx context.Context, requester *principal.Principal, id string) (*ConfirmEmail, error)
}
