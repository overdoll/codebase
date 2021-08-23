package translations

import (
	"golang.org/x/text/language"
)

var tags = []language.Tag{
	language.English,
	language.Spanish,
	language.French,
	language.Italian,
	language.Polish,
	language.Portuguese,
	language.SimplifiedChinese,
	language.Chinese,
	language.Czech,
}

var matcher = language.NewMatcher(tags)
