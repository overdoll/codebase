package app

import (
	"context"
	"errors"
	"github.com/gorilla/securecookie"
	"github.com/segmentio/ksuid"
	"net/http"
	"overdoll/applications/puppy/internal/domain/session"
	"overdoll/libraries/passport"
	"strings"
	"sync"
	"time"
)

const (
	sessionCookieName = "od.session"
)

type returnedPassportKeyT string

const (
	returnedPassportKey = "ReturnedPassportContextKey"
)

type passportsReturnedFromResponse struct {
	passports []*passport.Passport
	mu        sync.Mutex
}

func (s *passportsReturnedFromResponse) addPassport(p *passport.Passport) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.passports = append(s.passports, p)
}

type Application struct {
	httpClient *http.Client
	session    session.Repository
	codecs     []securecookie.Codec
}

func NewApplication(session session.Repository, codecs []securecookie.Codec) Application {
	return Application{
		session: session,
		codecs:  codecs,
	}
}

func (s Application) HandleResponse() func(*http.Response) error {
	return func(resp *http.Response) error {
		resp.Header.Set("X-Proxy", "Magical")
		return nil
	}
}

func (s Application) HandleRequest(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (s Application) HandlePassportChanges(ctx context.Context, w http.ResponseWriter, r *http.Request) error {

	returnedPassportRes, ok := ctx.Value(returnedPassportKeyT(returnedPassportKey)).(*passportsReturnedFromResponse)

	if !ok {
		return errors.New("could not get context key")
	}

	for _, responsePassport := range returnedPassportRes.passports {
		// need to create a new context where passport is passed down for requests
		ctx := passport.WithContext(ctx, responsePassport)

		if responsePassport.PerformedAuthenticatedAccountAction() {

			sessionId, duration, err := s.session.CreateSession(ctx, responsePassport.AccountID())

			if err != nil {
				return err
			}

			encoded, err := securecookie.EncodeMulti(sessionCookieName, sessionId, s.codecs...)

			if err != nil {
				return err
			}

			http.SetCookie(w, &http.Cookie{
				Name:     sessionCookieName,
				Value:    encoded,
				Path:     "/",
				MaxAge:   int(duration),
				HttpOnly: true,
				Secure:   true,
			})
		}

		if responsePassport.PerformedRevokedAccountAction() {

			if err := s.session.RevokeSession(ctx, responsePassport.SessionID()); err != nil {
				return err
			}

			http.SetCookie(w, &http.Cookie{
				Name:     sessionCookieName,
				Value:    "",
				Path:     "/",
				MaxAge:   -1,
				HttpOnly: true,
				Secure:   true,
			})
		}
	}

	return nil
}

func (s Application) HandlePassportAndReturnModifiedContext(w http.ResponseWriter, r *http.Request) (context.Context, error) {

	userAgent := strings.Join(r.Header["User-Agent"], ",")
	forwarded := r.Header.Get("X-FORWARDED-FOR")

	ip := ""

	if forwarded != "" {
		ip = forwarded
	} else {
		ip = r.RemoteAddr
	}

	var sessionId string
	var accountId string

	c, err := r.Cookie(sessionCookieName)

	if err != nil && err != http.ErrNoCookie {
		return nil, err
	}

	var duration int64

	if err == nil {
		if err := securecookie.DecodeMulti(sessionCookieName, c.Value, &sessionId, s.codecs...); err != nil {
			return nil, err
		}

		valid, currentAccountId, dur, err := s.session.GetSession(r.Context(), sessionId)
		duration = dur
		if err != nil {
			return nil, err
		}

		if !valid {
			http.SetCookie(w, &http.Cookie{
				Name:     sessionCookieName,
				Value:    "",
				Path:     "/",
				Expires:  time.Unix(0, 0),
				HttpOnly: true,
				Secure:   true,
			})
		} else {
			accountId = currentAccountId
			// if session valid, refresh it
			encoded, err := securecookie.EncodeMulti(sessionCookieName, sessionId, s.codecs...)

			if err != nil {
				return nil, err
			}

			http.SetCookie(w, &http.Cookie{
				Name:     sessionCookieName,
				Value:    encoded,
				Path:     "/",
				MaxAge:   int(duration),
				HttpOnly: true,
				Secure:   true,
			})
		}
	}

	if sessionId == "" {
		sessionId = ksuid.New().String()
	}

	requestPassport, err := passport.IssuePassport(
		sessionId,
		ip,
		userAgent,
		accountId,
	)

	if err != nil {
		return nil, err
	}

	ctx := passport.WithContext(r.Context(), requestPassport)
	ctx = context.WithValue(ctx, returnedPassportKeyT(returnedPassportKey), &passportsReturnedFromResponse{})

	return ctx, nil
}

func (s Application) GetHttpClient() *http.Client {
	return s.httpClient
}

type transport struct {
	base    http.RoundTripper
	session session.Repository
	codecs  []securecookie.Codec
}

func (h *transport) RoundTrip(req *http.Request) (*http.Response, error) {

	requestPassport := passport.FromContext(req.Context())

	if requestPassport != nil {
		// add passport to request so it can be processed
		if err := passport.AddToRequest(req, requestPassport); err != nil {
			return nil, err
		}
	}

	res, err := h.base.RoundTrip(req)

	if err != nil {
		return nil, err
	}

	responsePassport, err := passport.FromResponse(res)

	if err != nil {
		return nil, err
	}

	if responsePassport != nil {
		// get returned passports and add them to context to process later
		returnedPassportRes, ok := req.Context().Value(returnedPassportKeyT(returnedPassportKey)).(*passportsReturnedFromResponse)

		if !ok {
			return nil, errors.New("could not get context key")
		}

		returnedPassportRes.addPassport(responsePassport)
	}

	return res, err
}
