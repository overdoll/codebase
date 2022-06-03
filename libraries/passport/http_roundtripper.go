package passport

import (
	"context"
	"github.com/getsentry/sentry-go"
	"github.com/gorilla/securecookie"
	"go.uber.org/zap"
	"net/http"
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
	GetDeviceDataFromRequest(req *http.Request) (deviceId string, ip string, userAgent string, error error)

	// For events, the current passport is stored in context, so it can be easily accessible

	// RevokedAccountSessionEvent - runs when an account session should be revoked
	RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error

	// NewAccountSessionEvent - runs when a new account session should be created
	NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error

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

	res, err := h.roundTrip(req)

	if err != nil {

		// capture sentry exception
		if hub := sentry.GetHubFromContext(req.Context()); hub != nil {
			hub.CaptureException(err)
		}

		zap.S().Errorw("failed to roundtrip passport", zap.Error(err))
		return nil, err
	}

	return res, nil
}

func (h *passportTransport) roundTrip(req *http.Request) (*http.Response, error) {

	sessionId, accountId, err := h.repository.GetSessionDataFromRequest(req)

	if err != nil {
		return nil, err
	}

	deviceId, ip, userAgent, err := h.repository.GetDeviceDataFromRequest(req)

	requestPassport, err := issuePassport(
		sessionId,
		deviceId,
		ip,
		userAgent,
		accountId,
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
		if err := h.repository.NewAccountSessionEvent(ctx, res, responsePassport.AccountID()); err != nil {
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
