package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"

	"overdoll/libraries/principal"
)

type PersonalizationProfileByAccountId struct {
	Principal *principal.Principal
	AccountId string
}

type CurationProfileByAccountIdHandler struct {
	pr curation.Repository
}

func NewPersonalizationProfileByAccountIdHandler(pr curation.Repository) CurationProfileByAccountIdHandler {
	return CurationProfileByAccountIdHandler{pr: pr}
}

func (h CurationProfileByAccountIdHandler) Handle(ctx context.Context, query PersonalizationProfileByAccountId) (*curation.Profile, error) {

	result, err := h.pr.GetProfileByAccountId(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
