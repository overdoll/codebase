package mutations

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

// Authenticate - Generate an OTP code that will be used to authenticate the user
// if user opens the link in the same browser, then we automatically authorize them
// if not, then we redeem the cookie and the original browser should be logged in,
func (r *MutationResolver) Authenticate(ctx context.Context, data *types.AuthenticationInput) (*types.Response, error) {

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

	instance, err := r.App.Commands.Authenticate.Handle(ctx, data.Email, string(sessionJson))

	if err != nil {
		return nil, nil
	}

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	err = cookies.SetCookie(ctx, &http.Cookie{
		Name:    cookie.OTPKey,
		Value:   instance.Cookie(),
		Expires: time.Now().Add(instance.Expiration()),
	})

	if err != nil {
		zap.S().Errorf("failed to set cookie: %s", err)
		return nil, command.ErrFailedAuthenticate
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) Register(ctx context.Context, data *types.RegisterInput) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
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

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

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

func (r *MutationResolver) AuthenticateTotp(ctx context.Context, code string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
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

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

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

func (r *MutationResolver) AuthenticateRecoveryCode(ctx context.Context, code string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return nil, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
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

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

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

func (r *MutationResolver) AuthenticateEmail(ctx context.Context) (*types.Response, error) {
	panic("implement me")
}

func (r *MutationResolver) Logout(ctx context.Context) (*types.Response, error) {
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

func (r *MutationResolver) UnlockAccount(ctx context.Context) (*types.Response, error) {
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
