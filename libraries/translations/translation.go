package translations

import (
	"context"

	"go.uber.org/zap"
)

// support carries all translations for a specific thing
type Translation struct {
	translations []*TranslatedSupport
}

func (t *Translation) Translate(lang *Language, fallback string) string {

	for _, item := range t.translations {
		if item.tag == lang.tag {
			return item.data
		}
	}

	return fallback
}

func (t *Translation) TranslateFromContext(ctx context.Context, fallback string) string {
	return t.Translate(FromContext(ctx), fallback)
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
