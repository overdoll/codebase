package passport

import (
	"context"
	"github.com/cenkalti/backoff/v4"
	"github.com/gorilla/securecookie"
	"net/http"
	"overdoll/libraries/errors"
	"time"
)

// passport doesn't care about the storage mechanism of how you store sessions or any other data
// however, passport wants to know if:
//  - there is already an account && session ID associated with the current request
//  - you want to run any methods after a specific action happens
type repository interface {
	// GetSessionDataFromRequest - runs at the beginning, asking if the current request has any session or account data available
	// otherwise, it issues a fresh passport with no account and a new session ID
	GetSessionDataFromRequest(req *http.Request) (sessionId string, accountId string, error error)

	// GetDeviceDataFromRequest - grabs device data from request
	GetDeviceDataFromRequest(req *http.Request) (deviceId string, ip string, userAgent string, referer string, error error)

	// For events, the current passport is stored in context, so it can be easily accessible

	// RevokedAccountSessionEvent - runs when an account session should be revoked
	RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error

	// NewAccountSessionEvent - runs when a new account session should be created
	NewAccountSessionEvent(ctx context.Context, res *http.Response, deviceId, accountId string) error

	// ResponseEvent - runs right before a response is about to be sent out
	ResponseEvent(ctx context.Context, res *http.Response) error
}

type passportTransport struct {
	repository repository
	codecs     []securecookie.Codec
}

// NewHttpRoundTripper This HTTP client handles issuing passports during a roundtrip
// as well as parsing passports and revoking sessions based on passport data
func NewHttpRoundTripper(r repository) http.RoundTripper {
	return &passportTransport{
		repository: r,
	}
}

func (h *passportTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	if req.Method == "POST" {
		res, err := h.roundTrip(req)
		if err != nil {
			return nil, err
		}
		return res, nil
	}

	var retryError = errors.New("retry error")

	var res *http.Response
	var err error
	operation := func() error {

		res, err = h.roundTrip(req)

		if err != nil {
			return nil
		}

		// if status code error is greater than 500, we do retries
		if res.StatusCode > 500 {
			return retryError
		}

		return nil
	}

	if err != nil {
		return nil, err
	}

	err = backoff.Retry(operation, backoff.WithContext(&backoff.ExponentialBackOff{
		InitialInterval:     backoff.DefaultInitialInterval,
		RandomizationFactor: backoff.DefaultRandomizationFactor,
		Multiplier:          backoff.DefaultMultiplier,
		MaxInterval:         time.Second * 20,
		MaxElapsedTime:      1 * time.Minute,
		Stop:                backoff.Stop,
		Clock:               backoff.SystemClock,
	}, req.Context()))

	if err != nil && err != retryError {
		return nil, errors.Wrap(err, "failed to perform operation")
	}

	return res, nil
}

func (h *passportTransport) roundTrip(req *http.Request) (*http.Response, error) {

	sessionId, accountId, err := h.repository.GetSessionDataFromRequest(req)

	if err != nil {
		return nil, err
	}

	deviceId, ip, userAgent, referer, err := h.repository.GetDeviceDataFromRequest(req)

	requestPassport, err := issuePassport(
		sessionId,
		deviceId,
		ip,
		userAgent,
		accountId,
		referer,
	)

	if err != nil {
		return nil, err
	}

	if err := addToRequest(req, requestPassport); err != nil {
		return nil, err
	}

	res, err := http.DefaultTransport.RoundTrip(req)

	if err != nil {
		return nil, err
	}

	responsePassport, err := fromResponse(res)

	if err != nil {
		return nil, err
	}

	// passport was not modified during this session
	if responsePassport == nil {

		// still run the response event, but with the "request" passport instead
		if err := h.repository.ResponseEvent(withContext(res.Request.Context(), requestPassport), res); err != nil {
			return nil, err
		}

		return res, nil
	}

	// add passport to context to be used downstream if needed
	ctx := withContext(res.Request.Context(), responsePassport)

	if responsePassport.performedAuthenticatedAccountAction() {
		if err := h.repository.NewAccountSessionEvent(ctx, res, responsePassport.DeviceID(), responsePassport.AccountID()); err != nil {
			return nil, err
		}
	}

	if responsePassport.performedRevokedAccountAction() {
		if err := h.repository.RevokedAccountSessionEvent(ctx, res, responsePassport.SessionID()); err != nil {
			return nil, err
		}
	}

	if err := h.repository.ResponseEvent(ctx, res); err != nil {
		return nil, err
	}

	return res, err
}
