package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchPostModeratorQueue struct {
	Principal *principal.Principal

	Cursor    *paging.Cursor
	AccountId string
}

type SearchPostModeratorQueueHandler struct {
	mr moderator.Repository
}

func NewSearchPostModeratorQueueHandler(mr moderator.Repository) SearchPostModeratorQueueHandler {
	return SearchPostModeratorQueueHandler{mr: mr}
}

func (h SearchPostModeratorQueueHandler) Handle(ctx context.Context, query SearchPostModeratorQueue) ([]*moderator.PostModeratorQueue, error) {

	postQueue, err := h.mr.SearchPostModeratorQueue(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return postQueue, nil
}
