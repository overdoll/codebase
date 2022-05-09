package query

import (
	"context"
	"overdoll/libraries/location"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
	LocationFromIp(ctx context.Context, ip string) (*location.Location, error)
}

type StellaService interface {
	GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error)
}
