package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type TopicResolver struct {
	App *app.Application
}

func (r TopicResolver) Title(ctx context.Context, obj *types.Topic, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}

func (r TopicResolver) Description(ctx context.Context, obj *types.Topic, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.DescriptionTranslations, locale)
}

func (r TopicResolver) Categories(ctx context.Context, obj *types.Topic, after *string, before *string, first *int, last *int, slugs []string, title *string, sortBy types.CategoriesSort) (*types.CategoryConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	topicId := obj.ID.GetID()

	results, err := r.App.Queries.SearchCategories.Handle(ctx, query.SearchCategories{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Title:     title,
		Slugs:     slugs,
		SortBy:    sortBy.String(),
		TopicId:   &topicId,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCategoryToGraphQLConnection(ctx, results, cursor), nil
}
