package details

import (
	"context"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetAccountDetailsById(ctx context.Context, requester *principal.Principal, accountId string) (*AccountDetails, error)
	UpdateAccountDetails(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(id *AccountDetails) error) (*AccountDetails, error)
}
