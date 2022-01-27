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
	CanAccountViewPostUnderClub(ctx context.Context, postId, accountId string) (bool, error)
	GetSuspendedClubs(ctx context.Context) ([]string, error)
	CanAccountCreatePostUnderClub(ctx context.Context, clubId string, accountId string) (bool, error)
}
