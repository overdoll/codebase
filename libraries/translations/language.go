package translations

import (
	"errors"
	"golang.org/x/text/language"
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

func NewLanguage(locale string) *Language {
	tag, err := language.Parse(locale)

	if err != nil {
		return &Language{tag: defaultLanguage}
	}

	return &Language{tag: tag}
}

func NewDefaultLanguage() *Language {
	return &Language{tag: defaultLanguage}
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
