package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Topics(ctx context.Context, after *string, before *string, first *int, last *int) (*types.TopicConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchTopics.Handle(ctx, query.SearchTopics{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalTopicsToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Topic(ctx context.Context, slug string) (*types.Topic, error) {

	topic, err := r.App.Queries.TopicBySlug.Handle(ctx, query.TopicBySlug{
		Slug: slug,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalTopicToGraphQL(ctx, topic), nil
}
