package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/personalization"

	"overdoll/libraries/principal"
)

type PersonalizationProfileByAccountId struct {
	Principal *principal.Principal
	AccountId string
}

type PersonalizationProfileByAccountIdHandler struct {
	pr personalization.Repository
}

func NewPersonalizationProfileByAccountIdHandler(pr personalization.Repository) PersonalizationProfileByAccountIdHandler {
	return PersonalizationProfileByAccountIdHandler{pr: pr}
}

func (h PersonalizationProfileByAccountIdHandler) Handle(ctx context.Context, query PersonalizationProfileByAccountId) (*personalization.Profile, error) {

	result, err := h.pr.GetProfileByAccountId(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
