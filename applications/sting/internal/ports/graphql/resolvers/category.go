package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type CategoryResolver struct {
	App *app.Application
}

func (r CategoryResolver) Title(ctx context.Context, obj *types.Category, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}

func (r CategoryResolver) Posts(ctx context.Context, obj *types.Category, after *string, before *string, first *int, last *int, audienceSlugs []string, characterSlugs []string, seriesSlugs []string, clubCharacterSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, seed *string, sortBy types.PostsSort) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	var supporterOnly []string

	for _, s := range supporterOnlyStatus {
		supporterOnly = append(supporterOnly, s.String())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:              cursor,
		AudienceSlugs:       audienceSlugs,
		CharacterSlugs:      characterSlugs,
		SeriesSlugs:         seriesSlugs,
		SupporterOnlyStatus: supporterOnly,
		State:               stateModified,
		ClubCharacterSlugs:  clubCharacterSlugs,
		CategorySlugs:       []string{obj.Slug},
		Principal:           principal.FromContext(ctx),
		SortBy:              sortBy.String(),
		ShowSuspendedClubs:  false,
		Seed:                seed,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r CategoryResolver) Topic(ctx context.Context, obj *types.Category) (*types.Topic, error) {

	if obj.Topic == nil {
		return nil, nil
	}

	return dataloader.For(ctx).GetTopicById(ctx, obj.Topic.ID.GetID())
}
