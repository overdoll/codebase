package mutations

import (
	"context"
	"net/http"

	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

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

		if err == account.ErrEmailNotUnique {
			expired := types.ConfirmAccountEmailValidationEmailTaken
			return &types.ConfirmAccountEmailPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.ConfirmAccountEmailPayload{
		AccountEmail: types.MarshalAccountEmailToGraphQL(email),
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

	oldEmail, email, err := r.App.Commands.UpdateAccountEmailStatusToPrimary.Handle(ctx, command.UpdateAccountEmailStatusToPrimary{
		Principal: principal.FromContext(ctx),
		Email:     input.AccountEmailID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateAccountEmailStatusToPrimaryPayload{
		PrimaryAccountEmail: types.MarshalAccountEmailToGraphQL(email),
		UpdatedAccountEmail: &types.AccountEmail{
			ID:     relay.NewID(types.AccountEmail{}, email.AccountId(), oldEmail),
			Email:  oldEmail,
			Status: types.AccountEmailStatusConfirmed,
		},
	}, nil
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
