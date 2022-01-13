package query

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StellaService interface {
	GetClubMembershipsForAccount(ctx context.Context, accountId string) ([]string, error)
}
