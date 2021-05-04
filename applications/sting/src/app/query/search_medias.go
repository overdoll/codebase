package query

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type SearchMediasHandler struct {
	pr post.IndexRepository
}

func NewSearchMediasHandler(pr post.IndexRepository) SearchMediasHandler {
	return SearchMediasHandler{pr: pr}
}

func (h SearchMediasHandler) Handle(ctx context.Context, query string) ([]*post.Media, error) {
	return h.pr.SearchMedias(ctx, query)
}
