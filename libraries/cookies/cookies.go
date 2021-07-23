package cookies

import (
	"context"
	"errors"
	"net/http"
	"os"

	"github.com/gorilla/securecookie"
	"go.uber.org/zap"
	"overdoll/libraries/helpers"
)

const (
	CookieKey      = "COOKIE_KEY"
	CookieBlockKey = "COOKIE_BLOCK_KEY"
)

var (
	ErrCookieNotFound = errors.New("cookie not found")
	ErrCookieError    = errors.New("internal cookie error")
)

// Create Secure Cookies
// Hash keys should be at least 32 bytes long
// Block keys should be 16 bytes (AES-128) or 32 bytes (AES-256) long.
// Shorter keys may weaken the encryption used.

// Set a cookie, encrypt
func SetCookie(ctx context.Context, cookie *http.Cookie) error {

	cookieKey := os.Getenv(CookieKey)
	encrypt := cookieKey != ""

	gc := helpers.GinContextFromContext(ctx)

	name := cookie.Name
	value := cookie.Value

	// force HttpOnly and Secure on the cookie
	// Path must be "/" or it wont be available
	cookie.HttpOnly = true

	// only secure if cookies are encrypted
	cookie.Secure = encrypt
	cookie.Path = "/"

	if encrypt {
		var secureCookie = securecookie.New([]byte(cookieKey), []byte(os.Getenv(CookieBlockKey)))
		encodedValue, err := secureCookie.Encode(name, value)

		if err != nil {
			zap.S().Errorf("failed to encode cookie: %s", err)
			return ErrCookieError
		}

		cookie.Value = encodedValue

	} else {
		cookie.Value = value
	}

	http.SetCookie(gc.Writer, cookie)

	return nil
}

// Read cookie
func ReadCookie(ctx context.Context, name string) (*http.Cookie, error) {

	cookieKey := os.Getenv(CookieKey)
	encrypt := cookieKey != ""

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := gc.Request.Cookie(name)

	if err != nil {

		if err == http.ErrNoCookie {
			return nil, ErrCookieNotFound
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, ErrCookieError
	}

	var value string
	if encrypt {
		secureCookie := securecookie.New([]byte(cookieKey), []byte(os.Getenv(CookieBlockKey)))

		// no restriction on maxAge
		secureCookie.MaxAge(0)
		if err = secureCookie.Decode(name, currentCookie.Value, &value); err == nil {
			currentCookie.Value = value
			return currentCookie, nil
		}

		zap.S().Errorf("failed to decode cookie: %s", err)
		return nil, ErrCookieError
	}

	return currentCookie, nil
}

func DeleteCookie(ctx context.Context, name string) {
	http.SetCookie(
		helpers.GinContextFromContext(ctx).Writer,
		&http.Cookie{Name: name, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"},
	)
}
