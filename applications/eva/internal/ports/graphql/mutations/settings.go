package mutations

import (
	"context"
	"encoding/hex"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/ports/graphql/types"
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
		Secret:    input.Secret,
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

	accountId := passport.FromContext(ctx).AccountID()

	// logout just revokes the currently-authenticated user from the passport
	if err := passport.
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				return p.RevokeAccount()
			}); err != nil {
		return nil, err
	}

	return &types.RevokeAccountAccessPayload{
		RevokedAccountID: relay.NewID(types.Account{}, accountId),
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

	img, err := totp.Image()

	if err != nil {
		return nil, err
	}

	return &types.GenerateAccountMultiFactorTotpPayload{
		MultiFactorTotp: &types.MultiFactorTotp{
			Secret:   totp.Secret(),
			ImageSrc: img,
			ID:       totp.ID(),
		},
	}, nil
}

func (r *MutationResolver) EnrollAccountMultiFactorTotp(ctx context.Context, input types.EnrollAccountMultiFactorTotpInput) (*types.EnrollAccountMultiFactorTotpPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.EnrollAccountMultiFactorTOTP.Handle(ctx, command.EnrollAccountMultiFactorTOTP{
		Principal: principal.FromContext(ctx),
		ID:        input.ID,
		Code:      input.Code,
	})

	if err != nil {
		if err == account.ErrTOTPCodeInvalid {
			expired := types.EnrollAccountMultiFactorTotpValidationInvalidCode
			return &types.EnrollAccountMultiFactorTotpPayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.EnrollAccountMultiFactorTotpPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) AddAccountEmail(ctx context.Context, input types.AddAccountEmailInput) (*types.AddAccountEmailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	confirmEmail, err := r.App.Commands.AddAccountEmail.Handle(ctx, command.AddAccountEmail{
		Principal: principal.FromContext(ctx),
		Email:     input.Email,
	})

	if err != nil {
		return nil, err
	}

	return &types.AddAccountEmailPayload{AccountEmail: types.MarshalConfirmEmailToGraphQL(confirmEmail, input.Email)}, nil
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

func (r *MutationResolver) UpdateAccountUsername(ctx context.Context, input types.UpdateAccountUsernameInput) (*types.UpdateAccountUsernamePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.UpdateAccountUsername.Handle(ctx, command.UpdateAccountUsername{
		Principal: principal.FromContext(ctx),
		Username:  input.Username,
	})

	if err != nil {

		if err == account.ErrUsernameNotUnique {
			expired := types.UpdateAccountUsernameValidationUsernameTaken
			return &types.UpdateAccountUsernamePayload{Validation: &expired}, nil
		}

		return nil, err
	}

	return &types.UpdateAccountUsernamePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) RevokeAccountSession(ctx context.Context, input types.RevokeAccountSessionInput) (*types.RevokeAccountSessionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	val, err := hex.DecodeString(input.AccountSessionID.GetID())

	if err != nil {
		return nil, err
	}

	if err := r.App.Commands.RevokeAccountSession.Handle(ctx, command.RevokeAccountSession{
		Principal: principal.FromContext(ctx),
		Passport:  passport.FromContext(ctx),
		SessionId: string(val),
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

	return &types.GenerateAccountMultiFactorRecoveryCodesPayload{
		AccountMultiFactorRecoveryCodes: types.MarshalRecoveryCodesToGraphql(ctx, codes),
	}, nil
}

func (r *MutationResolver) DisableAccountMultiFactor(ctx context.Context) (*types.DisableAccountMultiFactorPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.DisableAccountMultiFactor.Handle(ctx, command.DisableAccountMultiFactor{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.DisableAccountMultiFactorPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}
