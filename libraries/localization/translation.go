package localization

import (
	"go.uber.org/zap"
)

// support carries all translations for a specific thing
type Translation struct {
	translations []*TranslatedSupport
}

func (t *Translation) TranslateDefault(fallback string) string {
	englishTag := ""

	for _, item := range t.translations {
		if item.tag == defaultLanguage {
			englishTag = item.data
		}
	}

	if englishTag != "" {
		return englishTag
	}

	return fallback
}

func (t *Translation) Translate(lang *Language, fallback string) string {

	// english as a fallback if we dont find our target language
	englishTag := ""

	for _, item := range t.translations {
		if item.tag == lang.tag {
			return item.data
		}

		if item.tag == defaultLanguage {
			englishTag = item.data
		}
	}

	if englishTag != "" {
		return englishTag
	}

	// fallback if for some reason we dont have english?
	return fallback
}

func (t *Translation) UpdateDefaultTranslation(data string) error {

	for v, item := range t.translations {
		if item.tag == defaultLanguage {
			// remove default translation
			t.translations = append(t.translations[:v], t.translations[v+1:]...)

			// add a new default translation
			t.translations = append(t.translations, &TranslatedSupport{
				tag:  defaultLanguage,
				data: data,
			})
			break
		}
	}

	return nil
}

func MarshalTranslationToDatabase(t *Translation) map[string]string {
	tran := make(map[string]string)

	for _, ts := range t.translations {
		tran[ts.Locale()] = ts.data
	}

	return tran
}

func UnmarshalTranslationFromDatabase(translations map[string]string) *Translation {

	var trans []*TranslatedSupport

	for locale, data := range translations {
		res, err := unmarshalTranslatedSupportFromDatabase(locale, data)

		// if invalid translation object, log and continue
		if err != nil {
			zap.S().Error("invalid translation: ", zap.String("locale", locale), zap.Error(err))
			continue
		}

		trans = append(trans, res)
	}

	return &Translation{translations: trans}
}

func NewDefaultTranslation(name string) (*Translation, error) {

	var trans []*TranslatedSupport

	res, err := unmarshalTranslatedSupportFromDatabase(defaultLanguage.String(), name)

	if err != nil {
		return nil, err
	}

	trans = append(trans, res)

	return &Translation{translations: trans}, nil
}