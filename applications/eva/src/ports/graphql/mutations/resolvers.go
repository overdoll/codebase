package mutations

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App *app.Application
}

func (r *MutationResolver) ReissueAuthenticationToken(ctx context.Context) (*types.ReissueAuthenticationTokenPayload, error) {
	return nil, nil
}

func (r *MutationResolver) RevokeAuthenticationToken(ctx context.Context) (*types.RevokeAuthenticationTokenPayload, error) {
	return nil, nil
}

func (r *MutationResolver) VerifyAuthenticationTokenAndAttemptAccountAccessGrant(ctx context.Context, input types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput) (*types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload, error) {
	// RedeemAuthenticationToken - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-key' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab
	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, token.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedTokenRedeem
	}

	// redeemCookie first
	ck, err := r.App.Commands.RedeemAuthenticationToken.Handle(ctx, input.AuthenticationTokenID)

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return nil, nil
	}

	// cookie redeemed not in the same session, just redeem it
	if !isSameSession {
		return &types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload{
			Account:             nil,
			AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ck, isSameSession, false),
		}, nil
	}

	// consume cookie
	usr, ck, err := r.App.Queries.GetAuthenticationTokenStatus.Handle(ctx, input.AuthenticationTokenID)

	if err != nil {
		return nil, err
	}

	if usr != nil {
		// consume cookie since user is valid here
		if err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, input.AuthenticationTokenID); err != nil {
			return nil, err
		}

		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := passport.FromContext(ctx).MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(usr.ID())
			return nil
		}); err != nil {
			return nil, err
		}
	}

	return &types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload{
		Account:             types.MarshalAccountToGraphQL(usr),
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ck, isSameSession, usr != nil),
	}, nil
}

func (r *MutationResolver) ConfirmAccountEmail(ctx context.Context, input types.ConfirmAccountEmailInput) (*types.ConfirmAccountEmailPayload, error) {

	email, validation, err := r.App.Commands.ConfirmAccountEmail.Handle(ctx, passport.FromContext(ctx).AccountID(), input.ID)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	return &types.ConfirmAccountEmailPayload{
		AccountEmail: types.MarshalAccountEmailToGraphQL(email),
	}, nil
}

func (r *MutationResolver) GrantAuthenticationToken(ctx context.Context, input types.GrantAuthenticationTokenInput) (*types.GrantAuthenticationTokenPayload, error) {

	// Capture session data
	type SessionData struct {
		UserAgent string `json:"user-agent"`
	}

	sessionData := SessionData{UserAgent: strings.Join(helpers.GinContextFromContext(ctx).Request.Header["User-Agent"], ",")}

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

	return &types.GrantAuthenticationTokenPayload{
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(instance, true, false),
	}, nil
}

func (r *MutationResolver) CreateAccountWithAuthenticationToken(ctx context.Context, input types.CreateAccountWithAuthenticationTokenInput) (*types.CreateAccountWithAuthenticationTokenPayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedRegister
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedRegister
	}

	acc, err := r.App.Commands.Register.Handle(ctx, currentCookie.Value, input.Username)

	if err != nil {
		return nil, err
	}

	http.SetCookie(helpers.GinContextFromContext(ctx).Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := passport.FromContext(ctx).MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetAccount(acc.ID())
		return nil
	}); err != nil {
		return nil, err
	}

	return &types.CreateAccountWithAuthenticationTokenPayload{Account: types.MarshalAccountToGraphQL(acc)}, err
}

func (r *MutationResolver) RevokeAccountAccess(ctx context.Context) (*types.RevokeAccountAccessPayload, error) {
	// logout just revokes the currently-authenticated user from the passport
	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx, func(p *passport.Passport) error {
			return p.RevokeAccount()
		}); err != nil {
		return nil, err
	}

	return &types.RevokeAccountAccessPayload{
		RevokedAccountID: relay.NewID(types.Account{}, passport.FromContext(ctx).AccountID()),
	}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndTotp(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndTotpInput) (*types.GrantAccountAccessWithAuthenticationTokenAndTotpPayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedAuthenticateMultiFactor
	}

	acc, validation, err := r.App.Commands.FinishAuthenticateMultiFactor.Handle(ctx, false, currentCookie.Value, input.Code)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	http.SetCookie(helpers.GinContextFromContext(ctx).Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := passport.
		FromContext(ctx).
		MutatePassport(ctx,
			func(p *passport.Passport) error {
				p.SetAccount(acc.ID())
				return nil
			}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndTotpPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) GrantAccountAccessWithAuthenticationTokenAndRecoveryCode(ctx context.Context, input types.GrantAccountAccessWithAuthenticationTokenAndRecoveryCodeInput) (*types.GrantAccountAccessWithAuthenticationTokenAndRecoveryCodePayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err != nil {

		// AuthenticationToken doesn't exist
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedAuthenticateMultiFactor
	}

	acc, validation, err := r.App.Commands.FinishAuthenticateMultiFactor.Handle(ctx, true, currentCookie.Value, input.RecoveryCode)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	http.SetCookie(helpers.GinContextFromContext(ctx).Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	if err := passport.FromContext(ctx).MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetAccount(acc.ID())
		return nil
	}); err != nil {
		return nil, err
	}

	return &types.GrantAccountAccessWithAuthenticationTokenAndRecoveryCodePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) UnlockAccount(ctx context.Context) (*types.UnlockAccountPayload, error) {
	acc, err := r.App.Commands.UnlockAccount.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {
		return nil, err
	}

	return &types.UnlockAccountPayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) AddAccountEmail(ctx context.Context, input types.AddAccountEmailInput) (*types.AddAccountEmailPayload, error) {

	email, validation, err := r.App.Commands.AddAccountEmail.Handle(ctx, passport.FromContext(ctx).AccountID(), input.Email)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	return &types.AddAccountEmailPayload{AccountEmail: types.MarshalAccountEmailToGraphQL(email)}, nil
}

func (r *MutationResolver) DeleteAccountEmail(ctx context.Context, input types.DeleteAccountEmailInput) (*types.DeleteAccountEmailPayload, error) {

	if err := r.App.Commands.RemoveAccountEmail.Handle(ctx, passport.FromContext(ctx).AccountID(), input.AccountEmailID.GetID()); err != nil {
		return nil, err
	}

	return &types.DeleteAccountEmailPayload{AccountEmailID: input.AccountEmailID}, nil
}

func (r *MutationResolver) UpdateAccountUsernameAndRetainPrevious(ctx context.Context, input types.UpdateAccountUsernameAndRetainPreviousInput) (*types.UpdateAccountUsernameAndRetainPreviousPayload, error) {

	username, validation, err := r.App.Commands.ModifyAccountUsername.Handle(ctx, passport.FromContext(ctx).AccountID(), input.Username)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	return &types.UpdateAccountUsernameAndRetainPreviousPayload{AccountUsername: types.MarshalAccountUsernameToGraphQL(username)}, nil
}

func (r *MutationResolver) RevokeAccountSession(ctx context.Context, input types.RevokeAccountSessionInput) (*types.RevokeAccountSessionPayload, error) {

	if err := r.App.Commands.RevokeAccountSession.Handle(ctx, passport.FromContext(ctx).AccountID(), input.AccountSessionID.GetID()); err != nil {
		return nil, err
	}

	return &types.RevokeAccountSessionPayload{AccountSessionID: input.AccountSessionID}, nil
}

func (r *MutationResolver) UpdateAccountEmailStatusToPrimary(ctx context.Context, input types.UpdateAccountEmailStatusToPrimaryInput) (*types.UpdateAccountEmailStatusToPrimaryPayload, error) {

	email, validation, err := r.App.Commands.MakeAccountEmailPrimary.Handle(ctx, passport.FromContext(ctx).AccountID(), input.AccountEmailID.GetID())

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	return &types.UpdateAccountEmailStatusToPrimaryPayload{AccountEmail: types.MarshalAccountEmailToGraphQL(email)}, nil
}

func (r *MutationResolver) CreateAccountMultiFactorRecoveryCodesAndDeletePrevious(ctx context.Context) (*types.CreateAccountMultiFactorRecoveryCodesAndDeletePreviousPayload, error) {

	codes, err := r.App.Commands.GenerateAccountRecoveryCodes.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return &types.CreateAccountMultiFactorRecoveryCodesAndDeletePreviousPayload{AccountMultiFactorRecoveryCodes: recoveryCodes}, nil
}

func (r *MutationResolver) GenerateAccountMultiFactorTotp(ctx context.Context) (*types.GenerateAccountMultiFactorTotpPayload, error) {

	totp, err := r.App.Commands.GenerateAccountMultiFactorTOTP.Handle(ctx, passport.FromContext(ctx).AccountID())

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

	return &types.GenerateAccountMultiFactorTotpPayload{
		MultiFactorTotp: &types.MultiFactorTotp{
			Secret:   totp.Secret(),
			ImageSrc: img,
		},
	}, nil
}

func (r *MutationResolver) EnrollAccountMultiFactorTotp(ctx context.Context, input types.EnrollAccountMultiFactorTotpInput) (*types.EnrollAccountMultiFactorTotpPayload, error) {

	currentCookie, err := cookies.ReadCookie(ctx, multi_factor.TOTPCookieKey)

	if err != nil {

		// AuthenticationToken doesn't exist - fail it
		if err == http.ErrNoCookie {
			return nil, command.ErrFailedEnrollAccountMultiFactorTOTP
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, command.ErrFailedEnrollAccountMultiFactorTOTP
	}

	validation, err := r.App.Commands.EnrollAccountMultiFactorTOTP.Handle(ctx, passport.FromContext(ctx).AccountID(), currentCookie.Value, input.Code)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	http.SetCookie(
		helpers.GinContextFromContext(ctx).Writer,
		&http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"},
	)

	enabled := true

	return &types.EnrollAccountMultiFactorTotpPayload{AccountMultiFactorTOTPEnabled: &enabled}, nil
}

func (r *MutationResolver) DisableAccountMultiFactor(ctx context.Context) (*types.DisableAccountMultiFactorPayload, error) {

	if err := r.App.Commands.DisableAccountMultiFactor.Handle(ctx, passport.FromContext(ctx).AccountID()); err != nil {
		return nil, err
	}

	enabled := false

	return &types.DisableAccountMultiFactorPayload{AccountMultiFactorTOTPEnabled: &enabled}, nil
}
