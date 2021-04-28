package query

import (
	"context"
	"net/http"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/src/domain/otp"
	"overdoll/applications/hades/src/ports/graphql/types"
	"overdoll/libraries/cookie"
)

type ListenAuthenticationHandler struct {
}

func NewListenAuthenticationHandler() ListenAuthenticationHandler {
	return ListenAuthenticationHandler{}
}

func (h ListenAuthenticationHandler) Handle(ctx context.Context) ([]string, error) {
	// AuthenticationState - check the state of our authentication by checking the OTP Cookie header to see if we have redeemed it
	currentCookie, err := cookie.ReadCookie(ctx, otp.OTPKey)

	if err != nil {
		if err == http.ErrNoCookie {
			// The program returns this error
			return nil, err
		}
		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.Services.Eva().GetAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	// It could happen that the cookie was deleted - if so, then we should tell the user that the token has been redeemed
	if err != nil {
		return nil, err
	}

	getRegisteredUser, err := r.Services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Email})

	if err != nil {
		return nil, err
	}

	cookie := &types.Cookie{Registered: getRegisteredUser.Username != "", Redeemed: getAuthenticationCookie.Redeemed, SameSession: true}

	// If OTP queue doesn't exist
	_, err = r.Rabbit.Channel.QueueDeclare("otp", false, false, false, false, nil)
	if err != nil {
		return nil, err
	}

	// Bind the queue to the routing key
	err = r.Rabbit.Channel.QueueBind("otp", getAuthenticationCookie.Cookie, "otp", false, nil)
	if err != nil {
		return nil, err
	}

	// Consume RabbitMQ OTP keys
	msgs, err := r.Rabbit.Channel.Consume(
		"otp", // queue
		"",    // consumer
		true,  // auto-ack
		false, // exclusive
		false, // no-local
		false, // no-wait
		nil,   // args
	)

	return msgs, nil
}
