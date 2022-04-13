package query

import (
	"context"

	"overdoll/libraries/principal"
)

type PrincipalByIdHandler struct {
	eva EvaService
}

func NewPrincipalByIdHandler(eva EvaService) PrincipalByIdHandler {
	return PrincipalByIdHandler{eva: eva}
}

func (h PrincipalByIdHandler) Handle(ctx context.Context, id string) (*principal.Principal, error) {

	result, err := h.eva.GetAccount(ctx, id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
