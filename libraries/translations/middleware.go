package translations

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/text/language"
	"overdoll/libraries/cookies"
)

type languageContextType string

const (
	key = "LanguageContextKey"
)

func FromContext(ctx context.Context) *Language {
	raw := ctx.Value(languageContextType(key))

	if raw != nil {
		return raw.(*Language)
	}

	return nil
}

// CookieToContext - parse the language cookie and determine the language
func CookieToContext(c *gin.Context) *http.Request {
	
	ck, err := cookies.ReadCookie(c.Request.Context(), cookie)

	acceptedValue := ""

	if err == nil {
		acceptedValue = ck.Value
	}

	accept := c.Request.Header.Get("Accept-Language")

	// cookie available, match language
	tag, _ := language.MatchStrings(matcher, acceptedValue, accept)

	ctx := context.WithValue(c.Request.Context(), languageContextType(key), &Language{tag: tag})
	return c.Request.WithContext(ctx)
}
