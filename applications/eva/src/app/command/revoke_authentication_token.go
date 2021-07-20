package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/token"
)

var (
	errFailedRevokeAuthenticationToken = errors.New("failed to revoke token")
)

type RevokeAuthenticationTokenHandler struct {
	cr token.Repository
}

func NewRevokeAuthenticationTokenHandler(cr token.Repository) RevokeAuthenticationTokenHandler {
	return RevokeAuthenticationTokenHandler{cr: cr}
}

func (h RevokeAuthenticationTokenHandler) Handle(ctx context.Context, tokenId string) error {

	if err := h.cr.DeleteAuthenticationTokenById(ctx, tokenId); err != nil {
		zap.S().Errorf("failed to delete token: %s", err)
		return errFailedRevokeAuthenticationToken
	}

	return nil

}
