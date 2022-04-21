package query

import (
	"context"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StellaService interface {
	CanAccountCreatePostUnderClub(ctx context.Context, accountId, clubId string) (bool, error)
	GetClubById(ctx context.Context, clubId string) (*string, error)
}
