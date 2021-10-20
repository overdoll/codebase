package translations

import (
	"context"
	"errors"
	"net/http"

	"golang.org/x/text/language"
	"overdoll/libraries/cookies"
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
	return p.tag.String()
}

func (p *Language) SetLocale(locale string) error {

	lang, err := language.Parse(locale)

	if err != nil {
		return err
	}

	for _, l := range tags {
		if l == lang {
			p.tag = l
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

	return cookies.SetCookie(ctx, &http.Cookie{
		Name:  cookie,
		Value: p.Locale(),
	})
}