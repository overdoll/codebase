package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/club"

	"overdoll/applications/carrier/internal/domain/identifier"
)

type EvaService interface {
	GetAccount(context.Context, string) (*identifier.Identifier, error)
}

type StellaService interface {
	GetClub(context.Context, string) (*club.Club, error)
}
