package passport

import (
	"context"
	"github.com/gorilla/securecookie"
	"net/http"
	"strings"
)

// passport doesn't care about the storage mechanism of how you store sessions or any other data
// however, passport wants to know if:
//  - there is already an account && session ID associated with the current request
//  - you want to run any methods after a specific action happens
type repository interface {
	GetSessionDataFromRequest(req *http.Request) (sessionId string, accountId string, error error)

	RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error
	NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error
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

	userAgent := strings.Join(req.Header["User-Agent"], ",")
	forwarded := req.Header.Get("X-FORWARDED-FOR")

	ip := ""

	if forwarded != "" {
		ip = strings.Split(forwarded, ",")[0]
	} else {
		ip = req.RemoteAddr
	}

	var sessionId string
	var accountId string

	sessionId, accountId, err := h.repository.GetSessionDataFromRequest(req)

	if err != nil {
		return nil, err
	}

	requestPassport, err := issuePassport(
		sessionId,
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

	return res, err
}
