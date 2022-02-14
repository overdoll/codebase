package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubMembersPostsFeed struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type ClubMembersPostsFeedHandler struct {
	pi     post.IndexRepository
	stella StellaService
}

func NewClubMembersPostsFeedHandler(stella StellaService, pi post.IndexRepository) ClubMembersPostsFeedHandler {
	return ClubMembersPostsFeedHandler{stella: stella, pi: pi}
}

func (h ClubMembersPostsFeedHandler) Handle(ctx context.Context, query ClubMembersPostsFeed) ([]*post.Post, error) {

	posts, err := h.pi.ClubMembersPostsFeed(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
