package mutations

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App *app.Application
}

func (r *MutationResolver) GrantAuthenticationToken(ctx context.Context, input types.GrantAuthenticationTokenInput) (*types.GrantAuthenticationTokenPayload, error) {

	gc := helpers.GinContextFromContext(ctx)

	// Capture session data
	type SessionData struct {
		UserAgent string `json:"user-agent"`
	}

	sessionData := SessionData{UserAgent: strings.Join(gc.Request.Header["User-Agent"], ",")}

	sessionJson, err := json.Marshal(sessionData)

	if err != nil {
		zap.S().Errorf("failed to unmarshal: %s", err)
		return nil, errors.New("error")
	}

	instance, err := r.App.Commands.Authenticate.Handle(ctx, input.Email, string(sessionJson))

	if err != nil {
		return nil, nil
	}

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	err = cookies.SetCookie(ctx, &http.Cookie{
		Name:    token.OTPKey,
		Value:   instance.Token(),
		Expires: time.Now().Add(instance.Expiration()),
	})

	if err != nil {
		zap.S().Errorf("failed to set cookie: %s", err)
		return nil, command.ErrFailedAuthenticate
	}

	return &types.GrantAuthenticationTokenPayload{AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(instance, true, false)}, nil
}

func (r *MutationResolver) RevokeAuthenticationToken(ctx context.Context) (*types.RevokeAuthenticationTokenPayload, error) {
	panic("implement me")
}

func (r *MutationResolver) CreateAccountWithAuthenticationToken(ctx context.Context, input types.CreateAccountWithAuthenticationTokenInput) (*types.CreateAccountWithAuthenticationTokenPayload, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedRegister
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedRegister
	}

	usr, err := r.App.Commands.Register.Handle(ctx, currentCookie.Value, data.Username)

	if err != nil {
		return nil, err
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetAccount(usr.ID())
		return nil
	}); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, err
}

func (r *MutationResolver) RevokeAccountAccess(ctx context.Context) (*types.RevokeAccountAccessPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	// logout just revokes the currently-authenticated user from the passport
	if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		return p.RevokeAccount()
	}); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) ReissueAuthenticationToken(ctx context.Context) (*types.ReissueAuthenticationTokenPayload, error) {
	panic("implement me")
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndTotp(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndTotpInput) (*types.GrantAccountAccessWithAuthenticationTokenAndTotpPayload, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedAuthenticateMultiFactor
	}

	usr, validation, err := r.App.Commands.FinishAuthenticateMultiFactor.Handle(ctx, false, currentCookie.Value, code)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetAccount(usr.ID())
		return nil
	}); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndRecoveryCode(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndRecoveryCodeInput) (*types.GrantAccountAccessWithAuthenticationTokenAndRecoveryCodePayload, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedAuthenticateMultiFactor
	}

	usr, validation, err := r.App.Commands.FinishAuthenticateMultiFactor.Handle(ctx, true, currentCookie.Value, code)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetAccount(usr.ID())
		return nil
	}); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) UnlockAccount(ctx context.Context, input types.UnlockAccountInput) (*types.UnlockAccountPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	_, err := r.App.Commands.UnlockAccount.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) AddAccountEmail(ctx context.Context, input types.AddAccountEmailInput) (*types.AddAccountEmailPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.AddAccountEmail.Handle(ctx, pass.AccountID(), email)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) DeleteAccountEmail(ctx context.Context, input types.DeleteAccountEmailInput) (*types.DeleteAccountEmailPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	if err := r.App.Commands.RemoveAccountEmail.Handle(ctx, pass.AccountID(), email); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) UpdateAccountUsernameAndRetainPrevious(ctx context.Context, input types.UpdateAccountUsernameAndRetainPreviousInput) (*types.UpdateAccountUsernameAndRetainPreviousPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.ModifyAccountUsername.Handle(ctx, pass.AccountID(), username)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) RevokeAccountSession(ctx context.Context, input types.RevokeAccountSessionInput) (*types.RevokeAccountSessionPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	err := r.App.Commands.RevokeAccountSession.Handle(ctx, pass.AccountID(), id)

	if err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) UpdateAccountEmailStatusToPrimary(ctx context.Context, input types.UpdateAccountEmailStatusToPrimaryInput) (*types.UpdateAccountEmailStatusToPrimaryPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.MakeAccountEmailPrimary.Handle(ctx, pass.AccountID(), email)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) CreateAccountMultiFactorRecoveryCodesAndDeletePrevious(ctx context.Context) (*types.CreateAccountMultiFactorRecoveryCodesAndDeletePreviousPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	codes, err := r.App.Commands.GenerateAccountRecoveryCodes.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return recoveryCodes, nil
}

func (r *MutationResolver) GenerateAccountMultiFactorTotp(ctx context.Context) (*types.GenerateAccountMultiFactorTotpPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	totp, err := r.App.Commands.GenerateAccountMultiFactorTOTP.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	// add TOTP secret to cookie, which will be read when enrolling
	err = cookies.SetCookie(ctx, &http.Cookie{
		Name:  multi_factor.TOTPCookieKey,
		Value: totp.Secret(),
	})

	if err != nil {
		zap.S().Errorf("failed to set cookie: %s", err)
		return nil, command.ErrFailedGenerateAccountMultiFactorTOTP
	}

	img, err := totp.Image()

	if err != nil {
		zap.S().Errorf("failed to generate image: %s", err)
		return nil, command.ErrFailedGenerateAccountMultiFactorTOTP
	}

	return &types.AccountMultiFactorTotp{
		Secret:   totp.Secret(),
		ImageSrc: img,
	}, nil
}

func (r *MutationResolver) EnrollAccountMultiFactorTotp(ctx context.Context, input types.EnrollAccountMultiFactorTotpInput) (*types.EnrollAccountMultiFactorTotpPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, multi_factor.TOTPCookieKey)

	if err != nil {

		// AuthenticationToken doesn't exist - fail it
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedEnrollAccountMultiFactorTOTP
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedEnrollAccountMultiFactorTOTP
	}

	validation, err := r.App.Commands.EnrollAccountMultiFactorTOTP.Handle(ctx, pass.AccountID(), currentCookie.Value, code)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) DisableAccountMultiFactor(ctx context.Context) (*types.DisableAccountMultiFactorPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	if err := r.App.Commands.ToggleAccountMultiFactor.Handle(ctx, pass.AccountID()); err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}
