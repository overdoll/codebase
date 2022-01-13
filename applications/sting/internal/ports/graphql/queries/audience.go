package queries

import (
	"context"
	"strings"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Audiences(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, title *string, sortBy types.AudiencesSort) (*types.AudienceConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchAudience.Handle(ctx, query.SearchAudience{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Slugs:     slugs,
		SortBy:    strings.ToLower(sortBy.String()),
		Title:     title,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAudienceToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Audience(ctx context.Context, slug string) (*types.Audience, error) {

	media, err := r.App.Queries.AudienceBySlug.Handle(ctx, query.AudienceBySlug{
		Principal: principal.FromContext(ctx),
		Slug:      slug,
	})

	if err != nil {

		if err == post.ErrAudienceNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAudienceToGraphQL(ctx, media), nil
}
