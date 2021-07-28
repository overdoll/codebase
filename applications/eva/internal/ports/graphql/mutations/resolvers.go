package mutations

import (
	"context"
	"net/http"
	"strings"
	"time"

	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type MutationResolver struct {
	App *app.Application
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

	ck, err := r.App.Commands.VerifyAuthenticationToken.Handle(ctx, command.VerifyAuthenticationToken{
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
	if input.Token != nil && *input.Token != "" {
		tokenId = *input.Token
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

	return &types.RevokeAuthenticationTokenPayload{RevokedAuthenticationTokenID: relay.NewID("")}, nil
}

func (r *MutationResolver) ConfirmAccountEmail(ctx context.Context, input types.ConfirmAccountEmailInput) (*types.ConfirmAccountEmailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	email, err := r.App.Commands.ConfirmAccountEmail.Handle(ctx, command.ConfirmAccountEmail{
		Principal: principal.FromContext(ctx),
		Id:        input.ID,
	})

	if err != nil {

		if err == account.ErrEmailCodeInvalid {
			expired := types.ConfirmAccountEmailValidationTokenExpired
			return &types.ConfirmAccountEmailPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.ConfirmAccountEmailPayload{
		AccountEmail: types.MarshalAccountEmailToGraphQL(email),
	}, nil
}

func (r *MutationResolver) GrantAuthenticationToken(ctx context.Context, input types.GrantAuthenticationTokenInput) (*types.GrantAuthenticationTokenPayload, error) {

	// Capture session data
	userAgent := strings.Join(helpers.GinContextFromContext(ctx).Request.Header["User-Agent"], ",")

	instance, err := r.App.Commands.GrantAuthenticationToken.Handle(ctx, command.GrantAuthenticationToken{
		Email:     input.Email,
		UserAgent: userAgent,
		IP:        helpers.GetIp(ctx),
	})

	if err != nil {
		return nil, err
	}

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
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

func (r *MutationResolver) RevokeAccountAccess(ctx context.Context) (*types.RevokeAccountAccessPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	// logout just revokes the currently-authenticated user from the passport
	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				return p.RevokeAccount()
			}); err != nil {
		return nil, err
	}

	return &types.RevokeAccountAccessPayload{
		RevokedAccountID: relay.NewID(types.Account{}, passport.FromContext(ctx).AccountID()),
	}, nil
}

func (r *MutationResolver) GenerateAccountMultiFactorTotp(ctx context.Context) (*types.GenerateAccountMultiFactorTotpPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	totp, err := r.App.Commands.GenerateAccountMultiFactorTOTP.Handle(ctx, command.GenerateAccountMultiFactorTOTP{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	// add TOTP secret to cookie, which will be read when enrolling
	if err := cookies.SetCookie(ctx, &http.Cookie{
		Name:  multi_factor.TOTPCookieKey,
		Value: totp.Secret(),
	}); err != nil {
		return nil, err
	}

	img, err := totp.Image()

	if err != nil {
		return nil, err
	}

	return &types.GenerateAccountMultiFactorTotpPayload{
		MultiFactorTotp: &types.MultiFactorTotp{
			Secret:   totp.Secret(),
			ImageSrc: img,
		},
	}, nil
}

func (r *MutationResolver) EnrollAccountMultiFactorTotp(ctx context.Context, input types.EnrollAccountMultiFactorTotpInput) (*types.EnrollAccountMultiFactorTotpPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	currentCookie, err := cookies.ReadCookie(ctx, multi_factor.TOTPCookieKey)

	if err != nil {
		return nil, err
	}

	err = r.App.Commands.EnrollAccountMultiFactorTOTP.Handle(ctx, command.EnrollAccountMultiFactorTOTP{
		Principal: principal.FromContext(ctx),
		Secret:    currentCookie.Value,
		Code:      input.Code,
	})

	if err != nil {

		if err == multi_factor.ErrTOTPCodeInvalid {
			expired := types.EnrollAccountMultiFactorTotpValidationInvalidCode
			return &types.EnrollAccountMultiFactorTotpPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	cookies.DeleteCookie(ctx, token.OTPKey)

	enabled := true

	return &types.EnrollAccountMultiFactorTotpPayload{AccountMultiFactorTotpEnabled: &enabled}, nil
}

func (r *MutationResolver) UnlockAccount(ctx context.Context) (*types.UnlockAccountPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.UnlockAccount.Handle(ctx, command.UnlockAccount{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.UnlockAccountPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) AddAccountEmail(ctx context.Context, input types.AddAccountEmailInput) (*types.AddAccountEmailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	email, err := r.App.Commands.AddAccountEmail.Handle(ctx, command.AddAccountEmail{
		Principal: principal.FromContext(ctx),
		Email:     input.Email,
	})

	if err != nil {

		if err == account.ErrEmailNotUnique {
			expired := types.AddAccountEmailValidationEmailTaken
			return &types.AddAccountEmailPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.AddAccountEmailPayload{AccountEmail: types.MarshalAccountEmailToGraphQL(email)}, nil
}

func (r *MutationResolver) DeleteAccountEmail(ctx context.Context, input types.DeleteAccountEmailInput) (*types.DeleteAccountEmailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.DeleteAccountEmail.Handle(ctx, command.DeleteAccountEmail{
		Principal: principal.FromContext(ctx),
		Email:     input.AccountEmailID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.DeleteAccountEmailPayload{AccountEmailID: input.AccountEmailID}, nil
}

func (r *MutationResolver) UpdateAccountUsernameAndRetainPrevious(ctx context.Context, input types.UpdateAccountUsernameAndRetainPreviousInput) (*types.UpdateAccountUsernameAndRetainPreviousPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	username, err := r.App.Commands.UpdateAccountUsernameAndRetainPrevious.Handle(ctx, command.UpdateAccountUsernameAndRetainPrevious{
		Principal: principal.FromContext(ctx),
		Username:  input.Username,
	})

	if err != nil {

		if err == account.ErrUsernameNotUnique {
			expired := types.UpdateAccountUsernameAndRetainPreviousValidationUsernameTaken
			return &types.UpdateAccountUsernameAndRetainPreviousPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.UpdateAccountUsernameAndRetainPreviousPayload{AccountUsername: types.MarshalAccountUsernameToGraphQL(username)}, nil
}

func (r *MutationResolver) RevokeAccountSession(ctx context.Context, input types.RevokeAccountSessionInput) (*types.RevokeAccountSessionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.RevokeAccountSession.Handle(ctx, command.RevokeAccountSession{
		Principal: principal.FromContext(ctx),
		SessionId: input.AccountSessionID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.RevokeAccountSessionPayload{AccountSessionID: input.AccountSessionID}, nil
}

func (r *MutationResolver) UpdateAccountEmailStatusToPrimary(ctx context.Context, input types.UpdateAccountEmailStatusToPrimaryInput) (*types.UpdateAccountEmailStatusToPrimaryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	email, err := r.App.Commands.UpdateAccountEmailStatusToPrimary.Handle(ctx, command.UpdateAccountEmailStatusToPrimary{
		Principal: principal.FromContext(ctx),
		Email:     input.AccountEmailID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateAccountEmailStatusToPrimaryPayload{AccountEmail: types.MarshalAccountEmailToGraphQL(email)}, nil
}

func (r *MutationResolver) GenerateAccountMultiFactorRecoveryCodes(ctx context.Context) (*types.GenerateAccountMultiFactorRecoveryCodesPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	codes, err := r.App.Commands.GenerateAccountMultiFactorRecoveryCodes.Handle(ctx, command.GenerateAccountMultiFactorRecoveryCodes{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return &types.GenerateAccountMultiFactorRecoveryCodesPayload{AccountMultiFactorRecoveryCodes: recoveryCodes}, nil
}

func (r *MutationResolver) DisableAccountMultiFactor(ctx context.Context) (*types.DisableAccountMultiFactorPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.DisableAccountMultiFactor.Handle(ctx, command.DisableAccountMultiFactor{
		Principal: principal.FromContext(ctx),
	}); err != nil {
		return nil, err
	}

	enabled := false

	return &types.DisableAccountMultiFactorPayload{AccountMultiFactorTotpEnabled: &enabled}, nil
}
