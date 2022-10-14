package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/principal"
)

type CuratedPostsFeedData struct {
	Principal *principal.Principal
	AccountId string
}

type CuratedPostsFeedDataHandler struct {
	pr curation.Repository
}

func NewCuratedPostsFeedDataHandler(pr curation.Repository) CuratedPostsFeedDataHandler {
	return CuratedPostsFeedDataHandler{pr: pr}
}

func (h CuratedPostsFeedDataHandler) Handle(ctx context.Context, query CuratedPostsFeedData) (*curation.PostsFeedData, error) {

	result, err := h.pr.GetCuratedPostsFeedData(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
