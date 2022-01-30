package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostsByIds struct {
	Ids       []string
	Principal *principal.Principal
}

type PostsByIdsHandler struct {
	pr post.Repository
}

func NewPostsByIdsHandler(pr post.Repository) PostsByIdsHandler {
	return PostsByIdsHandler{pr: pr}
}

func (h PostsByIdsHandler) Handle(ctx context.Context, query PostsByIds) ([]*post.Post, error) {

	pst, err := h.pr.GetPostsByIds(ctx, query.Principal, query.Ids)

	if err != nil {
		return nil, err
	}

	return pst, nil
}
