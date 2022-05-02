package queries

import (
	"context"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/localization"
)

func (r *QueryResolver) Languages(ctx context.Context) ([]*graphql.Language, error) {

	var langs []*graphql.Language

	for _, l := range localization.SupportedLanguages {
		langs = append(langs, types.MarshalLanguageToGraphQL(l))
	}

	return langs, nil
}
