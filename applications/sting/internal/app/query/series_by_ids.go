package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type SeriesByIds struct {
	Principal *principal.Principal
	Ids       []string
}

type SeriesByIdsHandler struct {
	pr post.Repository
}

func NewSeriesByIdsHandler(pr post.Repository) SeriesByIdsHandler {
	return SeriesByIdsHandler{pr: pr}
}

func (h SeriesByIdsHandler) Handle(ctx context.Context, query SeriesByIds) ([]*post.Series, error) {

	result, err := h.pr.GetSeriesByIds(ctx, query.Ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}
