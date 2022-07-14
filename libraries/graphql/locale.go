package graphql

import "errors"

type Translation struct {
	// The language linked to this translation.
	Language *Language `json:"language"`
	// The translation text.
	Text string `json:"text"`
}

type Language struct {
	// BCP47 locale
	Locale string `json:"locale"`
	// Fully qualified name
	Name string `json:"name"`
}

func GetTranslationFromTranslationsAndLanguage(translations []*Translation, locale *string) (string, error) {
	var defaultLocale *Translation
	var foundLocale *Translation

	for _, r := range translations {

		if r.Language.Locale == "en" {
			defaultLocale = r
		}

		if locale != nil {
			if r.Language.Locale == *locale {
				foundLocale = r
				break
			}
		}

	}

	if locale == nil {

		if defaultLocale == nil {
			return "", nil
		}

		return defaultLocale.Text, nil
	}

	if foundLocale == nil {
		return "", errors.New("no language could be found")
	}

	return foundLocale.Text, nil
}
