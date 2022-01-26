package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/paging"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostsFeed struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type PostsFeedHandler struct {
	ppr    curation.Repository
	pr     post.Repository
	pi     post.IndexRepository
	stella StellaService
}

func NewPostsFeedHandler(ppr curation.Repository, pr post.Repository, pi post.IndexRepository, stella StellaService) PostsFeedHandler {
	return PostsFeedHandler{pi: pi, ppr: ppr, pr: pr, stella: stella}
}

func (h PostsFeedHandler) Handle(ctx context.Context, query PostsFeed) ([]*post.Post, error) {

	var audienceIDs []string
	var categoryIds []string

	// non-authenticated accounts can visit this endpoint
	if query.Principal != nil {
		personalProfile, err := h.ppr.GetProfileByAccountId(ctx, query.Principal, query.Principal.AccountId())

		if err != nil {
			return nil, err
		}

		audienceIDs = personalProfile.AudienceIds()
		categoryIds = personalProfile.CategoryIds()
	}

	// no audiences selected, select the "standard"
	if len(audienceIDs) == 0 {

		audiences, err := h.pr.GetAudiences(ctx, query.Principal)

		if err != nil {
			return nil, err
		}

		for _, aud := range audiences {
			if aud.IsStandard() {
				audienceIDs = append(audienceIDs, aud.ID())
			}
		}
	}

	suspendedClubIds, err := h.stella.GetSuspendedClubs(ctx)

	if err != nil {
		return nil, err
	}

	filters, err := post.NewPostFeed(audienceIDs, categoryIds, suspendedClubIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.PostsFeed(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
