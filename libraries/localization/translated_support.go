package localization

import (
	"golang.org/x/text/language"
	"golang.org/x/text/language/display"
)

type TranslatedSupport struct {
	tag  language.Tag
	data string
}

func (p *TranslatedSupport) Locale() string {
	return p.tag.String()
}

func (p *TranslatedSupport) Name() string {
	return display.Self.Name(p.tag)
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
