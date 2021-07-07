package mutations

import (
	"context"
	"net/http"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

func (r *MutationResolver) GenerateAccountMultiFactorRecoveryCodes(ctx context.Context) ([]*types.AccountMultiFactorRecoveryCode, error) {
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
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.RawCode()})
	}

	return recoveryCodes, nil
}

func (r *MutationResolver) GetAccountMultiFactorRecoveryCodes(ctx context.Context) ([]*types.AccountMultiFactorRecoveryCode, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.RawCode()})
	}

	return recoveryCodes, nil
}

func (r *MutationResolver) GenerateAccountMultiFactorTotp(ctx context.Context) (*types.AccountMultiFactorTotp, error) {
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
		Value: totp.RawSecret(),
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
		Secret:   totp.RawSecret(),
		ImageSrc: img,
	}, nil
}

func (r *MutationResolver) EnrollAccountMultiFactorTotp(ctx context.Context, code string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, multi_factor.TOTPCookieKey)

	if err != nil {

		// Cookie doesn't exist - fail it
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

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) ToggleMultiFactor(ctx context.Context) (*types.Response, error) {
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
