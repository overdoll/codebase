package app

import (
	"github.com/gorilla/securecookie"
	"github.com/segmentio/ksuid"
	"net/http"
	"overdoll/applications/puppy/internal/domain/session"
	"overdoll/libraries/passport"
	"strings"
	"time"
)

const (
	sessionCookieName = "od.session"
)

type Application struct {
	session session.Repository
	codecs  []securecookie.Codec
}

func NewApplication(session session.Repository, codecs []securecookie.Codec) Application {
	return Application{
		session: session,
		codecs:  codecs,
	}
}

func (s Application) HandleResponse() func(*http.Response) error {
	return func(res *http.Response) error {

		responsePassport, err := passport.FromResponse(res)

		if err != nil {
			return err
		}

		// passport was not modified during this session
		if responsePassport == nil {
			return nil
		}

		ctx := passport.WithContext(res.Request.Context(), responsePassport)

		if responsePassport.PerformedAuthenticatedAccountAction() {

			sessionId, duration, err := s.session.CreateSession(ctx, responsePassport.AccountID())

			if err != nil {
				return err
			}

			encoded, err := securecookie.EncodeMulti(sessionCookieName, sessionId, s.codecs...)

			if err != nil {
				return err
			}

			ck := http.Cookie{
				Name:     sessionCookieName,
				Value:    encoded,
				Path:     "/",
				MaxAge:   int(duration),
				HttpOnly: true,
				Secure:   true,
			}

			res.Header.Add("Set-Cookie", ck.String())
		}

		if responsePassport.PerformedRevokedAccountAction() {

			if err := s.session.RevokeSession(ctx, responsePassport.SessionID()); err != nil {
				return err
			}

			ck := http.Cookie{
				Name:     sessionCookieName,
				Value:    "",
				Path:     "/",
				MaxAge:   -1,
				HttpOnly: true,
				Secure:   true,
			}

			res.Header.Add("Set-Cookie", ck.String())
		}

		return nil
	}
}

func (s Application) HandleRequest(w http.ResponseWriter, r *http.Request) error {

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
		return err
	}

	var duration int64

	if err == nil {
		if err := securecookie.DecodeMulti(sessionCookieName, c.Value, &sessionId, s.codecs...); err != nil {
			return err
		}

		valid, currentAccountId, dur, err := s.session.GetSession(r.Context(), sessionId)
		duration = dur
		if err != nil {
			return err
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
		return err
	}

	if err := passport.AddToRequest(r, requestPassport); err != nil {
		return err
	}

	return nil
}
