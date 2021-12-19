package passport

import (
	"context"
	"github.com/gorilla/securecookie"
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
	GetDeviceDataFromRequest(req *http.Request) (deviceId string, ip string, userAgent string, language string, error error)

	// For events, the current passport is stored in context, so it can be easily accessible

	// RevokedAccountSessionEvent - runs when an account session should be revoked
	RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error

	// UpdateDeviceLanguageEvent - runs when the device's preferred language has been updated
	UpdateDeviceLanguageEvent(ctx context.Context, res *http.Response, language string) error

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

	sessionId, accountId, err := h.repository.GetSessionDataFromRequest(req)

	if err != nil {
		return nil, err
	}

	deviceId, ip, userAgent, language, err := h.repository.GetDeviceDataFromRequest(req)

	if err != nil {
		return nil, err
	}

	requestPassport, err := issuePassport(
		sessionId,
		deviceId,
		ip,
		userAgent,
		language,
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

	if responsePassport.performedDeviceLanguageUpdate() {
		if err := h.repository.UpdateDeviceLanguageEvent(ctx, res, responsePassport.Language().Locale()); err != nil {
			return nil, err
		}
	}

	if err := h.repository.ResponseEvent(ctx, res); err != nil {
		return nil, err
	}

	return res, err
}