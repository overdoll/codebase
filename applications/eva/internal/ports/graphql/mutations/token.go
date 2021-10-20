package mutations

import (
	"context"
	"crypto/sha256"
	"net/http"
	"overdoll/libraries/validation"
	"strings"
	"time"

	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

func (r *MutationResolver) GrantAuthenticationToken(ctx context.Context, input types.GrantAuthenticationTokenInput) (*types.GrantAuthenticationTokenPayload, error) {

	// Capture session data
	userAgent := strings.Join(helpers.GinContextFromContext(ctx).Request.Header["User-Agent"], ",")

	instance, err := r.App.Commands.GrantAuthenticationToken.Handle(ctx, command.GrantAuthenticationToken{
		Email:     input.Email,
		UserAgent: userAgent,
		IP:        helpers.GetIp(ctx),
	})

	if err != nil {

		if err == validation.ErrInvalidEmail {
			invalid := types.GrantAuthenticationTokenValidationInvalidEmail
			return &types.GrantAuthenticationTokenPayload{Validation: &invalid}, nil
		}

		return nil, err
	}

	if err := cookies.SetCookie(ctx, &http.Cookie{
		Name:    token.OTPKey,
		Value:   instance.Token(),
		Expires: time.Now().Add(instance.Expiration()),
	}); err != nil {
		return nil, err
	}

	return &types.GrantAuthenticationTokenPayload{
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ctx, instance),
	}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationToken(ctx context.Context) (*types.GrantAccountAccessWithAuthenticationTokenPayload, error) {

	tk, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		if err == cookies.ErrCookieNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		TokenId: tk.Value,
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	// Remove OTP cookie
	cookies.DeleteCookie(ctx, token.OTPKey)

	// Update passport to include our new user
	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenPayload{
		Account: types.MarshalAccountToGraphQL(acc),
	}, nil
}

func (r *MutationResolver) VerifyAuthenticationToken(ctx context.Context, input types.VerifyAuthenticationTokenInput) (*types.VerifyAuthenticationTokenPayload, error) {

	err := r.App.Commands.VerifyAuthenticationToken.Handle(ctx, command.VerifyAuthenticationToken{
		TokenId: input.AuthenticationTokenID,
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			expired := types.VerifyAuthenticationTokenValidationTokenExpired
			return &types.VerifyAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	// get updated token
	ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, query.AuthenticationTokenById{
		TokenId: input.AuthenticationTokenID,
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			expired := types.VerifyAuthenticationTokenValidationTokenExpired
			return &types.VerifyAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	// cookie redeemed not in the same session, just redeem it
	return &types.VerifyAuthenticationTokenPayload{
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ctx, ck),
	}, nil
}

func (r *MutationResolver) ReissueAuthenticationToken(ctx context.Context) (*types.ReissueAuthenticationTokenPayload, error) {

	tk, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		if err == cookies.ErrCookieNotFound {
			expired := types.ReissueAuthenticationTokenValidationTokenExpired
			return &types.ReissueAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	if err := r.App.Commands.ReissueAuthenticationToken.Handle(ctx, command.ReissueAuthenticationToken{
		TokenId: tk.Value,
	}); err != nil {

		if err == token.ErrTokenNotFound {
			expired := types.ReissueAuthenticationTokenValidationTokenExpired
			return &types.ReissueAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.ReissueAuthenticationTokenPayload{AuthenticationToken: nil}, nil
}

func (r *MutationResolver) RevokeAuthenticationToken(ctx context.Context, input types.RevokeAuthenticationTokenInput) (*types.RevokeAuthenticationTokenPayload, error) {

	tokenId := ""

	// check for empty string as well
	if input.AuthenticationTokenID != nil && *input.AuthenticationTokenID != "" {
		tokenId = *input.AuthenticationTokenID
	} else {
		otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

		if err == nil {
			tokenId = otpCookie.Value
		}
	}

	if tokenId == "" {
		return &types.RevokeAuthenticationTokenPayload{RevokedAuthenticationTokenID: relay.NewID("")}, nil
	}

	if err := r.App.Commands.RevokeAuthenticationToken.Handle(ctx, command.RevokeAuthenticationToken{
		TokenId: tokenId,
	}); err != nil {
		return nil, err
	}

	// the hash of the revoked token
	hash := sha256.Sum256([]byte(tokenId))
	return &types.RevokeAuthenticationTokenPayload{RevokedAuthenticationTokenID: relay.NewID(types.AuthenticationToken{}, string(hash[:]))}, nil
}

func (r *MutationResolver) CreateAccountWithAuthenticationToken(ctx context.Context, input types.CreateAccountWithAuthenticationTokenInput) (*types.CreateAccountWithAuthenticationTokenPayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {
		if err == cookies.ErrCookieNotFound {
			expired := types.CreateAccountWithAuthenticationTokenValidationTokenExpired
			return &types.CreateAccountWithAuthenticationTokenPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	acc, err := r.App.Commands.CreateAccountWithAuthenticationToken.Handle(ctx, command.CreateAccountWithAuthenticationToken{
		TokenId:  currentCookie.Value,
		Username: input.Username,
	})

	if err != nil {
		if err == token.ErrTokenNotFound {
			expired := types.CreateAccountWithAuthenticationTokenValidationTokenExpired
			return &types.CreateAccountWithAuthenticationTokenPayload{Validation: &expired}, nil
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

	cookies.DeleteCookie(ctx, token.OTPKey)

	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.CreateAccountWithAuthenticationTokenPayload{Account: types.MarshalAccountToGraphQL(acc)}, err
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput) (*types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {
		if err == cookies.ErrCookieNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		TokenId: currentCookie.Value,
		Code:    &input.Code,
	})

	if err != nil {

		// different errors that can occur due to validation
		if err == token.ErrTokenNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Validation: &expired}, nil
		}

		if err == multi_factor.ErrTOTPCodeInvalid {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationInvalidCode
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	cookies.DeleteCookie(ctx, token.OTPKey)

	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput) (*types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {
		if err == cookies.ErrCookieNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Validation: &expired}, nil
		}

		return nil, err
	}

	acc, err := r.App.Commands.GrantAccountAccessWithAuthenticationToken.Handle(ctx, command.GrantAccountAccessWithAuthenticationToken{
		TokenId:      currentCookie.Value,
		RecoveryCode: &input.RecoveryCode,
	})

	if err != nil {

		// different errors that can occur due to validation
		if err == token.ErrTokenNotFound {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenExpired
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Validation: &expired}, nil
		}

		if err == multi_factor.ErrRecoveryCodeInvalid {
			expired := types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationInvalidRecoveryCode
			return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Validation: &expired}, nil
		}

		return nil, err
	}

	cookies.DeleteCookie(ctx, token.OTPKey)

	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}
