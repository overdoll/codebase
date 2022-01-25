package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StingService interface {
	GetPost(context.Context, string) (string, string, error)
}

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) error
}
