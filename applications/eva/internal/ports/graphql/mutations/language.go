package mutations

import (
	"context"

	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/translations"
)

func (r *MutationResolver) UpdateLanguage(ctx context.Context, input types.UpdateLanguageInput) (*types.UpdateLanguagePayload, error) {

	lang := translations.FromContext(ctx)

	if err := lang.MutateLanguage(ctx, func(language *translations.Language) error {
		return lang.SetLocale(input.Locale)
	}); err != nil {
		return nil, err
	}

	return &types.UpdateLanguagePayload{Language: types.MarshalLanguageToGraphQL(lang)}, nil
}
