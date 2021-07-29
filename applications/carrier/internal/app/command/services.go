package command

import (
	"context"

	"overdoll/applications/carrier/internal/domain/identifier"
)

type EvaService interface {
	GetAccount(context.Context, string) (*identifier.Identifier, error)
}