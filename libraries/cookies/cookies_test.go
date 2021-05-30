package cookies_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
)

func setupEncryptedCookies(t *testing.T) {
	// need to set encryption keys or else it doesnt encrypt
	err := os.Setenv(cookies.CookieKey, "very-secret-secret-that-nobody-knows-to-use")

	require.NoError(t, err)

	err = os.Setenv(cookies.CookieBlockKey, "another-very-sec")

	require.NoError(t, err)
}

func TestCookie_create_encrypted(t *testing.T) {

	gc, _ := gin.CreateTestContext(httptest.NewRecorder())

	// the cookie function uses the gin context to read cookies, so we need to create it here
	ctx := context.WithValue(context.Background(), helpers.GinContextType(helpers.GinKey), gc)

	setupEncryptedCookies(t)

	cookieValue := "value-cookie"
	cookieName := "test-cookie-name"

	cookie := &http.Cookie{Name: cookieName, Value: cookieValue, MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"}

	err := cookies.SetCookie(ctx, cookie)

	require.NoError(t, err)

	found := false

	// read the set-cookie header and ensure the cookie is encrypted
	for _, ck := range gc.Writer.Header()["Set-Cookie"] {
		item := strings.Split(ck, ";")

		cookie := strings.Split(item[0], "=")

		if cookie[0] == cookieName {
			found = true
			require.NotEqual(t, cookie[1], cookieValue)
		}
	}

	// need to have the cookie
	assert.Equal(t, true, found)
}

func TestCookie_read_encrypted(t *testing.T) {

	gc, _ := gin.CreateTestContext(httptest.NewRecorder())

	cookieName := "test-cookie-name"

	// set up our fake "request" that will have an encrypted cookie, and make sure that we can read it
	gc.Request = httptest.NewRequest("POST", "/test", nil)
	gc.Request.AddCookie(
		&http.Cookie{
			Name:     cookieName,
			Value:    "MTYyMjQwMTcxN3xuWi1GbHk0OU5JSnVXZWtsQzFkenZZUHRUZ29rN3FxYnRuc01jalBMcDc0PXzvM0tdxfVSx8pNO-vYfKesuV3SxN8jea6FCtZaSJnIag==",
			MaxAge:   100000000,
			HttpOnly: true,
			Secure:   false,
			Path:     "/",
		},
	)

	// the cookie function uses the gin context to read cookies, so we need to create it here
	ctx := context.WithValue(context.Background(), helpers.GinContextType(helpers.GinKey), gc)

	setupEncryptedCookies(t)

	// Now, ensure we can read back our cookie
	read, err := cookies.ReadCookie(ctx, cookieName)

	require.NoError(t, err)

	// expect that when we read it, it is the same value
	require.Equal(t, "value-cookie", read.Value)
}
