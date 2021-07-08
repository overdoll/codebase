package queries

import (
	"context"

	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

// TODO: only load if fields are requested?
func (r *QueryResolver) AccountSettings(ctx context.Context) (*types.AccountSettings, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	acc, err := r.App.Queries.GetAccount.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	emails, err := r.App.Queries.GetAccountEmails.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var accEmails []*types.AccountEmail

	for _, email := range emails {

		var status types.AccountEmailStatusEnum

		if email.IsConfirmed() {
			status = types.AccountEmailStatusEnumConfirmed
		}

		if email.IsUnconfirmed() {
			status = types.AccountEmailStatusEnumUnconfirmed
		}

		if email.IsPrimary() {
			status = types.AccountEmailStatusEnumPrimary
		}

		accEmails = append(accEmails, &types.AccountEmail{
			Email:  email.Email(),
			Status: status,
		})
	}

	usernames, err := r.App.Queries.GetAccountUsernames.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var accUsernames []*types.AccountUsername

	for _, username := range usernames {
		accUsernames = append(accUsernames, &types.AccountUsername{
			Username: username.Username(),
		})
	}

	sessions, err := r.App.Queries.GetAccountSessions.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var accSessions []*types.AccountSession

	for _, session := range sessions {
		accSessions = append(accSessions, &types.AccountSession{
			UserAgent: session.UserAgent(),
			IP:        session.IP(),
			Created:   session.Created(),
			ID:        session.ID(),
		})
	}

	codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	totpEnabled, err := r.App.Queries.IsAccountMultiFactorTOTPEnabled.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	return &types.AccountSettings{
		AccountID: pass.AccountID(),
		General:   &types.AccountGeneralSettings{Emails: accEmails, Usernames: accUsernames},
		Security: &types.AccountSecuritySettings{
			Sessions: accSessions,
			MultiFactor: &types.AccountMultiFactorSecuritySettings{
				RecoveryCodesGenerated:    len(codes) > 0,
				MultiFactorEnabled:        acc.MultiFactorEnabled(),
				CanDisableMultiFactor:     acc.CanDisableMultiFactor(),
				MultiFactorTOTPConfigured: totpEnabled,
			},
		},
	}, nil
}

func (r *QueryResolver) ConfirmAccountEmail(ctx context.Context, id string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.ConfirmAccountEmail.Handle(ctx, pass.AccountID(), id)

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
