package mutations

import (
	"context"

	"overdoll/libraries/translations"

	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

func (r *MutationResolver) GrantAuthenticationToken(ctx context.Context, input types.GrantAuthenticationTokenInput) (*types.GrantAuthenticationTokenPayload, error) {

	instance, err := r.App.Commands.GrantAuthenticationToken.Handle(ctx, command.GrantAuthenticationToken{
		Email:    input.Email,
		Passport: passport.FromContext(ctx),
		// manually send the language because we need it for the email
		Language: translations.FromContext(ctx),
	})

	if err != nil {

		// TODO: detect invalid email??
		//if err == validation.ErrInvalidEmail {
		//	invalid := types.GrantAuthenticationTokenValidationInvalidEmail
		//	return &types.GrantAuthenticationTokenPayload{Validation: &invalid}, nil
		//}

		return nil, err
	}

	return &types.GrantAuthenticationTokenPayload{
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ctx, instance, nil),
	}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationToken(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenInput) (*types.GrantAccountAccessWithAuthenticationTokenPayload, error) {

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		Token:    input.Token,
		Passport: passport.FromContext(ctx),
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			invalid := types.GrantAccountAccessWithAuthenticationTokenValidationTokenInvalid
			return &types.GrantAccountAccessWithAuthenticationTokenPayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	// Update passport to include our new user
	if err := passport.
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.AuthenticateAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenPayload{
		Account:                      types.MarshalAccountToGraphQL(acc),
		RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, input.Token),
	}, nil
}

func (r *MutationResolver) VerifyAuthenticationToken(ctx context.Context, input types.VerifyAuthenticationTokenInput) (*types.VerifyAuthenticationTokenPayload, error) {

	if err := r.App.Commands.VerifyAuthenticationToken.Handle(ctx, command.VerifyAuthenticationToken{
		Token:    input.Token,
		Secret:   input.Secret,
		Passport: passport.FromContext(ctx),
	}); err != nil {

		if err == token.ErrTokenNotFound {
			invalid := types.VerifyAuthenticationTokenValidationTokenInvalid
			return &types.VerifyAuthenticationTokenPayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	// get updated token
	ck, acc, err := r.App.Queries.ViewAuthenticationToken.Handle(ctx, query.ViewAuthenticationToken{
		Token:    input.Token,
		Secret:   &input.Secret,
		Passport: passport.FromContext(ctx),
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			invalid := types.VerifyAuthenticationTokenValidationTokenInvalid
			return &types.VerifyAuthenticationTokenPayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	// cookie redeemed not in the same session, just redeem it
	return &types.VerifyAuthenticationTokenPayload{
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ctx, ck, acc),
	}, nil
}

func (r *MutationResolver) RevokeAuthenticationToken(ctx context.Context, input types.RevokeAuthenticationTokenInput) (*types.RevokeAuthenticationTokenPayload, error) {

	if err := r.App.Commands.RevokeAuthenticationToken.Handle(ctx, command.RevokeAuthenticationToken{
		Token:    input.Token,
		Secret:   input.Secret,
		Passport: passport.FromContext(ctx),
	}); err != nil {
		return nil, err
	}

	return &types.RevokeAuthenticationTokenPayload{RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, input.Token)}, nil
}

func (r *MutationResolver) CreateAccountWithAuthenticationToken(ctx context.Context, input types.CreateAccountWithAuthenticationTokenInput) (*types.CreateAccountWithAuthenticationTokenPayload, error) {

	acc, err := r.App.Commands.CreateAccountWithAuthenticationToken.Handle(ctx, command.CreateAccountWithAuthenticationToken{
		Token:    input.Token,
		Passport: passport.FromContext(ctx),
		Username: input.Username,
		Language: translations.FromContext(ctx),
	})

	if err != nil {
		if err == token.ErrTokenNotFound {
			invalid := types.CreateAccountWithAuthenticationTokenValidationTokenInvalid
			return &types.CreateAccountWithAuthenticationTokenPayload{Validation: &invalid}, nil
		}

		if err == account.ErrUsernameNotUnique {
			expired := types.CreateAccountWithAuthenticationTokenValidationUsernameTaken
			return &types.CreateAccountWithAuthenticationTokenPayload{Validation: &expired}, nil
		}

		if err == account.ErrEmailNotUnique {
			expired := types.CreateAccountWithAuthenticationTokenValidationEmailTaken
			return &types.CreateAccountWithAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	if err := passport.
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.AuthenticateAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.CreateAccountWithAuthenticationTokenPayload{
		Account:                      types.MarshalAccountToGraphQL(acc),
		RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, input.Token),
	}, err
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput) (*types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload, error) {

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		Passport: passport.FromContext(ctx),
		Token:    input.Token,
		Code:     &input.Code,
	})

	if err != nil {

		// different errors that can occur due to validation
		if err == token.ErrTokenNotFound {
			invalid := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenInvalid
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Validation: &invalid}, nil
		}

		if err == multi_factor.ErrTOTPCodeInvalid {
			invalid := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationCodeInvalid
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	if err := passport.
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.AuthenticateAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{
		Account:                      types.MarshalAccountToGraphQL(acc),
		RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, input.Token),
	}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput) (*types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload, error) {

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		Passport:     passport.FromContext(ctx),
		Token:        input.Token,
		RecoveryCode: &input.RecoveryCode,
	})

	if err != nil {

		// different errors that can occur due to validation
		if err == token.ErrTokenNotFound {
			invalid := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenInvalid
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Validation: &invalid}, nil
		}

		if err == multi_factor.ErrRecoveryCodeInvalid {
			invalid := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationRecoveryCodeInvalid
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	if err := passport.
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.AuthenticateAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{
		Account:                      types.MarshalAccountToGraphQL(acc),
		RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, input.Token),
	}, nil
}
