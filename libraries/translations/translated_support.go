package translations

import (
	"golang.org/x/text/language"
)

type TranslatedSupport struct {
	tag  language.Tag
	data string
}

func (p *TranslatedSupport) Locale() string {
	base, _ := p.tag.Base()
	return base.ISO3()
}

func (p *TranslatedSupport) Data() string {
	return p.data
}

func unmarshalTranslatedSupportFromDatabase(locale, data string) (*TranslatedSupport, error) {
	tag, err := language.Parse(locale)

	if err != nil {
		return nil, err
	}

	return &TranslatedSupport{
		tag:  tag,
		data: data,
	}, nil
}
