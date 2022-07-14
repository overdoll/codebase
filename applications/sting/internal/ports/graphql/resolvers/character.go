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

type CharacterResolver struct {
	App *app.Application
}

func (r CharacterResolver) Club(ctx context.Context, obj *types.Character) (*types.Club, error) {
	if obj.Club == nil {
		return nil, nil
	}

	return dataloader.For(ctx).GetClubById(ctx, obj.Club.ID.GetID())
}

func (r CharacterResolver) Name(ctx context.Context, obj *types.Character, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.NameTranslations, locale)
}

func (r CharacterResolver) Posts(ctx context.Context, obj *types.Character, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, sortBy types.PostsSort) (*types.PostConnection, error) {

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
		CharacterIds:        []string{obj.ID.GetID()},
		Principal:           principal.FromContext(ctx),
		State:               stateModified,
		SupporterOnlyStatus: supporterOnly,
		AudienceSlugs:       audienceSlugs,
		CategorySlugs:       categorySlugs,
		SortBy:              sortBy.String(),
		ShowSuspendedClubs:  false,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
