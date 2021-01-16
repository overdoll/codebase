package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"net/http"

	eva "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
)

func (r *subscriptionResolver) AuthListener(ctx context.Context) (<-chan *models.AuthListener, error) {
	// AuthenticationState - check the state of our authentication by checking the OTP Cookie header to see if we have redeemed it
	currentCookie, err := helpers.ReadCookie(ctx, OTPKey)

	if err != nil {
		if err == http.ErrNoCookie {
			// The program returns this error
			return nil, err
		}
		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	// It could happen that the cookie was deleted - if so, then we should tell the user that the token has been redeemed
	if err != nil {
		return nil, err
	}

	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Email})

	if err != nil {
		return nil, err
	}

	channel := make(chan *models.AuthListener)

	cookie := &models.Cookie{Registered: getRegisteredUser.Username != "", Redeemed: getAuthenticationCookie.Redeemed, SameSession: true}

	// If OTP queue doesn't exist
	_, err = r.rabbit.Channel.QueueDeclare("otp", false, false, false, false, nil)
	if err != nil {
		return nil, err
	}

	// Bind the queue to the routing key
	err = r.rabbit.Channel.QueueBind("otp", getAuthenticationCookie.Cookie, "otp", false, nil)
	if err != nil {
		return nil, err
	}

	// Consume RabbitMQ OTP keys
	msgs, err := r.rabbit.Channel.Consume(
		"otp", // queue
		"",    // consumer
		true,  // auto-ack
		false, // exclusive
		false, // no-local
		false, // no-wait
		nil,   // args
	)
	if err != nil {
		return nil, err
	}

	go func() {

		for msg := range msgs {

			switch string(msg.Body) {

			case "SAME_SESSION":
				channel <- &models.AuthListener{SameSession: true, Cookie: cookie}
				return

			case "ANOTHER_SESSION":
				// If user exists, we can't set auth cookies here.
				// Because we can't set a cookie in websocket connections, we force the browser to refresh the current page,
				// and our root function will see that the cookie has been redeemed, and will log the user in
				channel <- &models.AuthListener{Cookie: cookie, SameSession: false}
				return
			}
		}

	}()

	return channel, nil
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
