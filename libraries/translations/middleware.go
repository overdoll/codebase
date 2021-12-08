package translations

import (
	"context"
	"net/http"
	"overdoll/libraries/helpers"

	"github.com/gin-gonic/gin"
	"golang.org/x/text/language"
)

type languageContextType string

const (
	key = "LanguageContextKey"
)

func addLanguageToRequest(c *gin.Context, language *Language) *http.Request {
	return c.Request.WithContext(context.WithValue(c.Request.Context(), languageContextType(key), language))
}

func FromContext(ctx context.Context) *Language {
	raw := ctx.Value(languageContextType(key))

	if raw != nil {
		return raw.(*Language)
	}

	return nil
}

// LanguageToContext - parse the language cookie and determine the language
func LanguageToContext(c *gin.Context) *http.Request {

	ck, err := c.Request.Cookie(cookie)

	acceptedValue := ""

	if err == nil {
		acceptedValue = ck.Value
	}

	// cookie available, match language
	tag, _ := language.MatchStrings(matcher, acceptedValue)

	return addLanguageToRequest(c, &Language{tag: tag})
}

func MutateLanguageLocaleContext(ctx context.Context, p *Language, locale string) error {

	err := p.SetLocale(locale)

	if err != nil {
		return err
	}

	gc := helpers.GinContextFromContext(ctx)

	http.SetCookie(gc.Writer, &http.Cookie{
		Name:  cookie,
		Value: p.Locale(),
	})

	return nil
}
