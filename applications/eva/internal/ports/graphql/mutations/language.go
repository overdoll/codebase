package mutations

import (
	"context"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"

	"overdoll/applications/eva/internal/ports/graphql/types"
)

func (r *MutationResolver) UpdateLanguage(ctx context.Context, input types.UpdateLanguageInput) (*types.UpdateLanguagePayload, error) {

	if err := passport.MutatePassport(ctx, func(p *passport.Passport) error {
		return p.UpdateDeviceLanguage(input.Locale)
	}); err != nil {
		return nil, err
	}

	return &types.UpdateLanguagePayload{Language: types.MarshalLanguageToGraphQL(passport.FromContext(ctx).Language())}, nil
}

func (r *MutationResolver) UpdateAccountLanguage(ctx context.Context, input types.UpdateAccountLanguageInput) (*types.UpdateAccountLanguagePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.UpdateAccountLanguage.Handle(ctx, command.UpdateAccountLanguage{
		Principal: principal.FromContext(ctx),
		Locale:    input.Locale,
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateAccountLanguagePayload{
		Language: types.MarshalLanguageToGraphQL(acc.Language()),
		Account:  types.MarshalAccountToGraphQL(acc),
	}, nil
}
