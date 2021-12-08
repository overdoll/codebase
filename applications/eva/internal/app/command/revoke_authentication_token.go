package command

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/token"
)

type RevokeAuthenticationToken struct {
	Token    string
	Secret   *string
	Passport *passport.Passport
}

type RevokeAuthenticationTokenHandler struct {
	cr token.Repository
}

func NewRevokeAuthenticationTokenHandler(cr token.Repository) RevokeAuthenticationTokenHandler {
	return RevokeAuthenticationTokenHandler{cr: cr}
}

func (h RevokeAuthenticationTokenHandler) Handle(ctx context.Context, cmd RevokeAuthenticationToken) error {
	return h.cr.DeleteAuthenticationToken(ctx, cmd.Passport, cmd.Token, cmd.Secret)
}
