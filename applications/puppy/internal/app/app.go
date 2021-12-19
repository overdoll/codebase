package app

import (
	"context"
	"github.com/google/uuid"
	"github.com/gorilla/securecookie"
	"net/http"
	"overdoll/applications/puppy/internal/domain/session"
	"overdoll/libraries/passport"
	"overdoll/libraries/translations"
	"strings"
)

const (
	sessionCookieName  = "od.session"
	deviceCookieName   = "od.device"
	languageCookieName = "od.language"
)

type Application struct {
	Cookie     *securecookie.SecureCookie
	Repository session.Repository
}

func (a *Application) GetDeviceDataFromRequest(req *http.Request) (string, string, string, string, error) {
	userAgent := strings.Join(req.Header["User-Agent"], ",")
	forwarded := req.Header.Get("X-FORWARDED-FOR")

	ip := ""
	deviceId := ""
	language := ""

	if forwarded != "" {
		ip = strings.Split(forwarded, ",")[0]
	} else {
		ip = req.RemoteAddr
	}

	c, err := req.Cookie(deviceCookieName)

	if err == nil {
		if err := a.Cookie.Decode(deviceCookieName, c.Value, &deviceId); err != nil {
			return "", "", "", "", err
		}
	}

	if err != nil && err != http.ErrNoCookie {
		return "", "", "", "", err
	}

	c, err = req.Cookie(languageCookieName)

	if err == nil {
		if err := a.Cookie.Decode(languageCookieName, c.Value, &language); err != nil {
			return "", "", "", "", err
		}
	}

	if err != nil && err != http.ErrNoCookie {
		return "", "", "", "", err
	}

	// no device ID - generate a new one (will be saved at the end of the request)
	if deviceId == "" {
		deviceId = uuid.New().String()
	}

	// no language set - read accept-language header
	if language == "" {
		accept := req.Header.Get("Accept-Language")
		language = translations.NewLanguageWithFallback(accept).Locale()
	}

	return deviceId, ip, userAgent, language, nil
}

func (a *Application) UpdateDeviceLanguageEvent(ctx context.Context, res *http.Response, language string) error {

	encoded, err := a.Cookie.Encode(languageCookieName, language)

	if err != nil {
		return err
	}

	ck := http.Cookie{
		Name:     languageCookieName,
		Value:    encoded,
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	res.Header.Add("Set-Cookie", ck.String())

	return nil
}

func (a *Application) GetSessionDataFromRequest(req *http.Request) (string, string, error) {

	c, err := req.Cookie(sessionCookieName)

	if err != nil && err != http.ErrNoCookie {
		return "", "", err
	}

	var sessionId string
	var accountId string

	if err == nil {
		if err := a.Cookie.Decode(sessionCookieName, c.Value, &sessionId); err != nil {
			return "", "", err
		}
		valid, currentAccountId, err := a.Repository.GetSession(req.Context(), sessionId)

		if err != nil {
			return "", "", err
		}

		if valid {
			accountId = currentAccountId
		}
	}

	return sessionId, accountId, nil
}

func (a *Application) RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error {

	if err := a.Repository.RevokeSession(ctx, sessionId); err != nil {
		return err
	}

	return nil
}

func (a *Application) NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error {

	sessionId, err := a.Repository.CreateSession(ctx, accountId)

	if err != nil {
		return err
	}

	encoded, err := a.Cookie.Encode(sessionCookieName, sessionId)

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
		SameSite: http.SameSiteLaxMode,
	}

	res.Header.Add("Set-Cookie", ck.String())

	return nil
}

// ResponseEvent - here we check for the cookie. If the cookie exists but passport is not authenticated, remove the cookie since it is no longer valid
func (a *Application) ResponseEvent(ctx context.Context, res *http.Response) error {

	_, err := res.Request.Cookie(sessionCookieName)

	if err == nil {
		// passport found, but cookie exists. check for authentication
		if err := passport.FromContext(ctx).Authenticated(); err != nil {
			// not authenticated - remove cookie
			ck := http.Cookie{
				Name:     sessionCookieName,
				Value:    "",
				Path:     "/",
				MaxAge:   -1,
				HttpOnly: true,
				Secure:   true,
				SameSite: http.SameSiteLaxMode,
			}

			res.Header.Add("Set-Cookie", ck.String())
		}
	}

	if err != nil && err != http.ErrNoCookie {
		return err
	}

	_, err = res.Request.Cookie(deviceCookieName)

	if err != nil {
		// no device cookie - we will add one
		if err == http.ErrNoCookie {

			encoded, err := a.Cookie.Encode(deviceCookieName, passport.FromContext(ctx).DeviceID())

			if err != nil {
				return err
			}

			ck := http.Cookie{
				Name:     deviceCookieName,
				Value:    encoded,
				Path:     "/",
				HttpOnly: true,
				Secure:   true,
				SameSite: http.SameSiteLaxMode,
			}

			res.Header.Add("Set-Cookie", ck.String())
		}
	}

	return nil
}