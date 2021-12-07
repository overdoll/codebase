package app

import (
	"context"
	"fmt"
	"github.com/gorilla/securecookie"
	"net/http"
	"overdoll/applications/puppy/internal/domain/session"
)

const (
	sessionCookieName = "od.session"
)

type Application struct {
	Codecs     []securecookie.Codec
	Repository session.Repository
}

func (a *Application) GetSessionDataFromRequest(req *http.Request) (string, string, error) {
	c, err := req.Cookie(sessionCookieName)

	if err != nil && err != http.ErrNoCookie {
		return "", "", err
	}

	var sessionId string
	var accountId string

	if err == nil {
		if err := securecookie.DecodeMulti(sessionCookieName, c.Value, &sessionId, a.Codecs...); err != nil {
			return "", "", err
		}

		valid, currentAccountId, err := a.Repository.GetSession(req.Context(), sessionId)

		if err != nil {
			return "", "", err
		}

		if !valid {
			// TODO: need to remove cookie if invalid
		} else {
			accountId = currentAccountId
		}
	}

	return sessionId, accountId, nil
}

func (a *Application) RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error {

	fmt.Println(sessionId)

	if err := a.Repository.RevokeSession(ctx, sessionId); err != nil {
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

	return nil
}

func (a *Application) NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error {

	sessionId, err := a.Repository.CreateSession(ctx, accountId)

	if err != nil {
		return err
	}

	encoded, err := securecookie.EncodeMulti(sessionCookieName, sessionId, a.Codecs...)

	if err != nil {
		return err
	}

	ck := http.Cookie{
		Name:  sessionCookieName,
		Value: encoded,
		Path:  "/",
		// cookie will essentially never expire, unless invalidated by a logout or session invalidation
		MaxAge:   2147483647,
		HttpOnly: true,
		Secure:   true,
	}

	res.Header.Add("Set-Cookie", ck.String())

	return nil
}
