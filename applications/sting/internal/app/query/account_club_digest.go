package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type AccountClubDigest struct {
	AccountId string
}

type AccountClubDigestHandler struct {
	cr club.Repository
}

func NewAccountClubDigestHandler(cr club.Repository) AccountClubDigestHandler {
	return AccountClubDigestHandler{cr: cr}
}

func (h AccountClubDigestHandler) Handle(ctx context.Context, query AccountClubDigest) (*club.AccountClubDigest, error) {

	results, err := h.cr.GetAccountClubDigestById(ctx, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
