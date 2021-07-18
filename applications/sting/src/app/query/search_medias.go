package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql/relay"
)

var (
	ErrSearchFailed = errors.New("search failed")
)

type SearchMediasHandler struct {
	pr post.IndexRepository
}

func NewSearchMediasHandler(pr post.IndexRepository) SearchMediasHandler {
	return SearchMediasHandler{pr: pr}
}

func (h SearchMediasHandler) Handle(ctx context.Context, cursor *relay.Cursor, query string) ([]*post.Media, *relay.Paging, error) {

	medias, err := h.pr.SearchMedias(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return medias, nil
}
