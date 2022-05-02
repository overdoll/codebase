package resolvers

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type RuleResolver struct {
	App *app.Application
}

func (r RuleResolver) Title(ctx context.Context, obj *types.Rule, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}

func (r RuleResolver) Description(ctx context.Context, obj *types.Rule, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.DescriptionTranslations, locale)
}
