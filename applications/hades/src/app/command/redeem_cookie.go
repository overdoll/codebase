package command

import (
	"context"
	"net/http"

	"github.com/streadway/amqp"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type RedeemCookieHandler struct{}

func NewRedeemCookieHandler() RedeemCookieHandler {
	return RedeemCookieHandler{}
}

func (h RedeemCookieHandler) Handle(ctx context.Context, cookie string) (*types.Cookie, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	// Redeem our authentication cookie
	getRedeemedCookie, err := r.Services.Eva().RedeemAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: cookie})

	// Cookie is expired or not valid - send back nil
	if err != nil {
		return &models.Cookie{
			Invalid:     true,
			Registered:  false,
			SameSession: false,
			Redeemed:    false,
		}, nil
	}

	// Our cookie
	redeemedCookie := &models.Cookie{
		Registered:  false,
		SameSession: true,
		Redeemed:    true,
		Invalid:     false,
		Session:     getRedeemedCookie.Session,
		Email:       getRedeemedCookie.Email,
	}

	currentCookie, err := helpers.ReadCookie(ctx, helpers.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {

			redeemedCookie.SameSession = false

			r.Rabbit.Publish("otp", getRedeemedCookie.Cookie, []byte(`ANOTHER_SESSION`), amqp.Transient)

			// No cookie exists, we want to give a different SameSession response
			return redeemedCookie, nil
		}

		return nil, err
	}

	// If cookie doesn't match the token used, then we will error out
	if currentCookie.Value != cookie {
		return nil, http.ErrNoCookie
	}

	// Check if user is registered
	getRegisteredUser, err := r.Services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getRedeemedCookie.Email})

	if err != nil {
		return nil, err
	}

	redeemedCookie.Registered = getRegisteredUser.Username != ""

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		r.Rabbit.Publish("otp", currentCookie.Value, []byte(`SAME_SESSION`), amqp.Transient)
		return redeemedCookie, nil
	}

	// Delete our cookie, since we now know this user will be logged in
	_, err = r.Services.Eva().DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil {
		return nil, err
	}

	// Otherwise, we remove the cookie, and create a JWT token
	http.SetCookie(gc.Writer, &http.Cookie{Name: helpers.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Create user session
	_, err = helpers.CreateUserSession(gc, r.Redis, getRegisteredUser.Id)

	if err != nil {
		return nil, err
	}

	r.Rabbit.Publish("otp", currentCookie.Value, []byte(`SAME_SESSION`), amqp.Transient)

	return redeemedCookie, err
}
