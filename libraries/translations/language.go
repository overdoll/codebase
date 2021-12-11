package translations

import (
	"errors"
	"golang.org/x/text/language"
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

func NewLanguage(locale string) (*Language, error) {

	lang, err := language.Parse(locale)

	if err != nil {
		return nil, err
	}

	for _, l := range tags {
		if l == lang {
			return &Language{tag: lang}, nil
		}
	}

	return nil, ErrInvalidLocale
}

func NewLanguageWithFallback(locale string) *Language {

	tag, _ := language.MatchStrings(matcher, locale)

	return &Language{tag: tag}
}

func (p *Language) Locale() string {
	return p.tag.String()
}
