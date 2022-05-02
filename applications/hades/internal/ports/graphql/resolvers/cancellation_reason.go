package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type CancellationReasonResolver struct {
	App *app.Application
}

func (c CancellationReasonResolver) Title(ctx context.Context, obj *types.CancellationReason, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}
