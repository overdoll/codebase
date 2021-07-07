package queries

import (
	"context"
	"net/http"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) RedeemCookie(ctx context.Context, cookieId string) (*types.Cookie, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedCookieRedeem
	}

	usr, ck, err := r.App.Commands.RedeemCookie.Handle(ctx, isSameSession, cookieId)

	if err != nil {
		return nil, err
	}

	// If ck is returned as nil, cookie is invalid
	if ck == nil {
		return &types.Cookie{
			SameSession: false,
			Registered:  false,
			Redeemed:    false,
			Session:     "",
			Email:       "",
			Invalid:     true,
		}, nil
	}

	// Cookie was consumed
	if ck.Consumed() {
		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(usr.ID())
			return nil
		}); err != nil {
			return nil, err
		}
	}

	return &types.Cookie{
		SameSession: ck.SameSession(),
		Registered:  ck.Consumed(),
		Redeemed:    true,
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
	}, nil
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {

	userId := ""

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		userId = pass.AccountID()
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil && err != http.ErrNoCookie {
		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, command.ErrFailedCheckAuthentication
	}

	cookieValue := ""

	if otpCookie != nil {
		cookieValue = otpCookie.Value
	}

	hasCookie := err == nil

	ck, acc, err := r.App.Commands.Authentication.Handle(ctx, userId, hasCookie, cookieValue)

	if err != nil {
		return nil, err
	}

	if acc != nil {
		// user had cookie and it was used to log in
		if hasCookie {
			http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

			// Update passport to include our new user
			if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
				return nil, err
			}
		}

		return &types.Authentication{
			Cookie: nil,
			User:   types.MarshalUserToGraphQL(acc),
		}, nil
	}

	if ck != nil {
		return &types.Authentication{
			Cookie: &types.Cookie{
				SameSession: true,
				Registered:  false,
				Redeemed:    ck.Redeemed(),
				Session:     ck.Session(),
				Email:       ck.Email(),
				Invalid:     false,
			},
			User: nil,
		}, nil
	}

	return &types.Authentication{
		Cookie: nil,
		User:   nil,
	}, nil
}

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
