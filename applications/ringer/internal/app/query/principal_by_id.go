package query

import (
	"context"
	"overdoll/libraries/principal"
)

type PrincipalByIdHandler struct {
	eva   EvaService
	sting StingService
}

func NewPrincipalByIdHandler(eva EvaService, sting StingService) PrincipalByIdHandler {
	return PrincipalByIdHandler{eva: eva, sting: sting}
}

func (h PrincipalByIdHandler) Handle(ctx context.Context, id string) (*principal.Principal, error) {

	result, err := h.eva.GetAccount(ctx, id)

	if err != nil {
		return nil, err
	}

	clubExtension, err := h.sting.GetAccountClubPrincipalExtension(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := result.ExtendWithClubExtension(clubExtension); err != nil {
		return nil, err
	}

	return result, nil
}
