package queries

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/localization"
)

func (r *QueryResolver) Languages(ctx context.Context) ([]*types.Language, error) {

	var langs []*types.Language

	for _, l := range localization.SupportedLanguages {
		langs = append(langs, types.MarshalLanguageToGraphQL(l))
	}

	return langs, nil
}

func (r *QueryResolver) Language(ctx context.Context) (*types.Language, error) {
	return types.MarshalLanguageToGraphQL(passport.FromContext(ctx).Language()), nil
}
