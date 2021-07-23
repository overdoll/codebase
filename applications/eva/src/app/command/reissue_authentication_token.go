package command

import (
	"context"

	"overdoll/applications/eva/src/domain/token"
)

type ReissueAuthenticationTokenHandler struct {
	cr token.Repository
}

func NewReissueAuthenticationTokenHandler(cr token.Repository) ReissueAuthenticationTokenHandler {
	return ReissueAuthenticationTokenHandler{cr: cr}
}

func (h ReissueAuthenticationTokenHandler) Handle(ctx context.Context, tokenId string) error {

	// send email for token

	return nil
}
