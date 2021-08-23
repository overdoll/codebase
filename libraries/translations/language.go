package translations

import (
	"context"
	"errors"
	"net/http"

	"golang.org/x/text/language"
	"overdoll/libraries/helpers"
)

const (
	cookie = "lang"
)

var (
	ErrInvalidLocale = errors.New("invalid locale")
)

var (
	SupportedLanguages []*Language
)

func init() {
	for _, t := range tags {
		SupportedLanguages = append(SupportedLanguages, &Language{tag: t})
	}
}

// Language contains information necessary to determine the language that should be used by the requesting user
type Language struct {
	tag language.Tag
}

func (p *Language) Locale() string {
	base, _ := p.tag.Base()
	return base.String()
}

func (p *Language) SetLocale(locale string) error {

	lang, err := language.Parse(locale)

	if err != nil {
		return err
	}

	for _, l := range tags {
		if l == lang {
			return nil
		}
	}

	return ErrInvalidLocale
}

// Mutate the language
func (p *Language) MutateLanguage(ctx context.Context, updateFn func(language *Language) error) error {

	err := updateFn(p)

	if err != nil {
		return err
	}

	gc := helpers.GinContextFromContext(ctx)

	http.SetCookie(gc.Writer, &http.Cookie{
		Name:     cookie,
		Value:    p.Locale(),
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
	})

	return nil
}
