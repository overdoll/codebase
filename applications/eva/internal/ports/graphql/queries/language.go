package queries

import (
	"context"

	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/translations"
)

func (r *QueryResolver) Languages(ctx context.Context) ([]*types.Language, error) {

	var langs []*types.Language

	for _, l := range translations.SupportedLanguages {
		langs = append(langs, types.MarshalLanguageToGraphQL(l))
	}

	return langs, nil
}

func (r *QueryResolver) Language(ctx context.Context) (*types.Language, error) {
	return types.MarshalLanguageToGraphQL(translations.FromContext(ctx)), nil
}
