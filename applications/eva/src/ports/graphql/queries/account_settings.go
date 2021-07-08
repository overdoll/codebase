package queries

import (
	"context"

	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
)

func (r *QueryResolver) AccountSettings(ctx context.Context) (*types.AccountSettings, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	acc, err := r.App.Queries.GetAccount.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	preloads := graphql.GetPreloads(ctx)

	accountSettings := &types.AccountSettings{
		AccountID: pass.AccountID(),
		General: &types.AccountGeneralSettings{
			Emails:    nil,
			Usernames: nil,
		},
		Security: &types.AccountSecuritySettings{
			Sessions:    nil,
			MultiFactor: nil,
		},
	}

	// only load fields when requested
	for _, preload := range preloads {
		if preload == "general.emails" {
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

			accountSettings.General.Emails = accEmails
		}

		if preload == "general.usernames" {
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

			accountSettings.General.Usernames = accUsernames
		}

		if preload == "security.sessions" {

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

			accountSettings.Security.Sessions = accSessions
		}

		if preload == "security.multiFactor" {

			codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, pass.AccountID())

			if err != nil {
				return nil, err
			}

			totpEnabled, err := r.App.Queries.IsAccountMultiFactorTOTPEnabled.Handle(ctx, pass.AccountID())

			if err != nil {
				return nil, err
			}

			accountSettings.Security.MultiFactor = &types.AccountMultiFactorSecuritySettings{
				RecoveryCodesGenerated:    len(codes) > 0,
				MultiFactorEnabled:        acc.MultiFactorEnabled(),
				CanDisableMultiFactor:     acc.CanDisableMultiFactor(),
				MultiFactorTOTPConfigured: totpEnabled,
			}

		}
	}

	return accountSettings, nil
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