package helpers

import (
	"context"
	"github.com/gorilla/securecookie"
	"net/http"
)

// Create Secure Cookies
// Hash keys should be at least 32 bytes long
// Block keys should be 16 bytes (AES-128) or 32 bytes (AES-256) long.
// Shorter keys may weaken the encryption used.
var secureCookie = securecookie.New([]byte("i&CGRhIrozlzy7Hk75XM#$NTNtxTl$nU"), []byte("lnoj$x7C*MWq$j9W#x9Y*&DXpS2*@tAX"))

// Set a cookie, encrypt
func SetCookie(ctx context.Context, cookie *http.Cookie) (bool, error) {
	gc := GinContextFromContext(ctx)

	name := cookie.Name
	value := cookie.Value

	// force HttpOnly and Secure on the cookie
	// Path must be "/" or it wont be available
	cookie.HttpOnly = true
	cookie.Secure = true
	cookie.Path = "/"

	encodedValue, err := secureCookie.Encode(name, value)
	cookie.Value = encodedValue

	if err == nil {
		http.SetCookie(gc.Writer, cookie)
		return true, nil
	}

	return false, err
}

// Read cookie
func ReadCookie(ctx context.Context, name string) (*http.Cookie, error) {
	gc := GinContextFromContext(ctx)

	currentCookie, err := gc.Request.Cookie(name)

	if err != nil {
		return nil, err
	}

	var value string

	if err = secureCookie.Decode(name, currentCookie.Value, &value); err == nil {
		currentCookie.Value = value
		return currentCookie, nil
	}

	return nil, err
}
