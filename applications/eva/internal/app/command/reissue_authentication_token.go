package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/token"
)

type ReissueAuthenticationTokenHandler struct {
	cr      token.Repository
	carrier CarrierService
}

func NewReissueAuthenticationTokenHandler(cr token.Repository, carrier CarrierService) ReissueAuthenticationTokenHandler {
	return ReissueAuthenticationTokenHandler{cr: cr, carrier: carrier}
}

func (h ReissueAuthenticationTokenHandler) Handle(ctx context.Context, tokenId string) error {

	tk, err := h.cr.GetAuthenticationTokenById(ctx, tokenId)

	if err != nil {
		return err
	}

	return h.carrier.NewLoginToken(ctx, tk.Email(), tk.Token())
}
