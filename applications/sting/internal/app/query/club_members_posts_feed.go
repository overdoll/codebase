package query

import (
	"context"
	"github.com/pkg/errors"
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

	clubIds, err := h.stella.GetClubMembershipsForAccount(ctx, query.AccountId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get club memberships for account")
	}

	// no club ids - return empty feed
	if len(clubIds) == 0 {
		return nil, nil
	}

	filters, err := post.NewClubMembersPostsFeed(clubIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
