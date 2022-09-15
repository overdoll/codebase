package event

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type Repository interface {
	DeleteAccount(ctx context.Context, requester *principal.Principal, acc *account.Account) error
	CancelAccountDeletion(ctx context.Context, requester *principal.Principal, acc *account.Account) error
	NewAccountRegistration(ctx context.Context, acc *account.Account) error
}
