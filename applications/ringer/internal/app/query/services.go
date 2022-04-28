package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/club"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StellaService interface {
	GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error)
	GetClubById(ctx context.Context, clubId string) (*club.Club, error)
}
