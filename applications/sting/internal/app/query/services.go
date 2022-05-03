package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StellaService interface {
	GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error)
	GetClubById(ctx context.Context, clubId string) (*club.Club, error)
	NewSupporterPost(ctx context.Context, clubId string) error
}
