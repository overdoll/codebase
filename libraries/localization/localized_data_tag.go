package localization

import (
	"golang.org/x/text/language"
	"golang.org/x/text/language/display"
)

type LocalizedDataTag struct {
	tag  language.Tag
	data string
}

func (p *LocalizedDataTag) Locale() string {
	return p.tag.String()
}

func (p *LocalizedDataTag) Name() string {
	return display.Self.Name(p.tag)
}

func (p *LocalizedDataTag) Data() string {
	return p.data
}

func unmarshalLocalizedDataTagFromDatabase(locale, data string) (*LocalizedDataTag, error) {
	tag, err := language.Parse(locale)

	if err != nil {
		return nil, err
	}

	return &LocalizedDataTag{
		tag:  tag,
		data: data,
	}, nil
}

func NewLocalizedDataTag(name string, locale string) (*LocalizedDataTag, error) {

	res, err := unmarshalLocalizedDataTagFromDatabase(locale, name)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func MarshalLocalizedDataTagsToDatabase(t []*LocalizedDataTag) []map[string]string {
	tran := make([]map[string]string, len(t))

	for _, ts := range t {
		tran = append(tran, map[string]string{ts.Name(): ts.Data()})
	}

	return tran
}

func UnmarshalLocalizedDataTagsFromDatabase(dataTags []map[string]string) []*LocalizedDataTag {

	var localizedDataTags []*LocalizedDataTag

	for _, tag := range dataTags {

		for key, value := range tag {

			res, err := unmarshalLocalizedDataTagFromDatabase(key, value)

			if err == nil {
				localizedDataTags = append(localizedDataTags, res)
			}
		}
	}

	return localizedDataTags
}
