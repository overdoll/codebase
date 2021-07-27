package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/token"
)

type RevokeAuthenticationToken struct {
	TokenId string
}

type RevokeAuthenticationTokenHandler struct {
	cr token.Repository
}

func NewRevokeAuthenticationTokenHandler(cr token.Repository) RevokeAuthenticationTokenHandler {
	return RevokeAuthenticationTokenHandler{cr: cr}
}

func (h RevokeAuthenticationTokenHandler) Handle(ctx context.Context, cmd RevokeAuthenticationToken) error {
	return h.cr.DeleteAuthenticationTokenById(ctx, cmd.TokenId)
}
