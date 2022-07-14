package localization

import (
	"go.uber.org/zap"
	"golang.org/x/text/language"
)

// support carries all translations for a specific thing
type Translation struct {
	translations []*LocalizedDataTag
}

func (t *Translation) Translations() []*LocalizedDataTag {
	return t.translations
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

func (t *Translation) UpdateTranslation(data, locale string) error {

	tag, err := language.Parse(locale)

	if err != nil {
		return err
	}

	for v, item := range t.translations {
		if item.tag == tag {
			// remove translation
			t.translations = append(t.translations[:v], t.translations[v+1:]...)
			break
		}
	}

	// change translation
	t.translations = append(t.translations, &LocalizedDataTag{
		tag:  defaultLanguage,
		data: data,
	})

	return nil
}

func (t *Translation) UpdateDefaultTranslation(data string) error {

	for v, item := range t.translations {
		if item.tag == defaultLanguage {
			// remove default translation
			t.translations = append(t.translations[:v], t.translations[v+1:]...)

			// add a new default translation
			t.translations = append(t.translations, &LocalizedDataTag{
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

	if t != nil {
		for _, ts := range t.translations {
			tran[ts.Locale()] = ts.data
		}
	}

	return tran
}

func UnmarshalTranslationFromDatabase(translations map[string]string) *Translation {

	var trans []*LocalizedDataTag

	for locale, data := range translations {
		res, err := unmarshalLocalizedDataTagFromDatabase(locale, data)

		// if invalid translation object, log and continue
		if err != nil {
			zap.S().Errorw("invalid translation: ", zap.String("locale", locale), zap.Error(err))
			continue
		}

		trans = append(trans, res)
	}

	return &Translation{translations: trans}
}

func NewDefaultTranslation(name string) (*Translation, error) {

	var trans []*LocalizedDataTag

	res, err := unmarshalLocalizedDataTagFromDatabase(defaultLanguage.String(), name)

	if err != nil {
		return nil, err
	}

	trans = append(trans, res)

	return &Translation{translations: trans}, nil
}
