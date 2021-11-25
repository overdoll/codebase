package translations

import (
	"golang.org/x/text/language"
)

var defaultLanguage = language.AmericanEnglish

var tags = []language.Tag{
	language.AmericanEnglish,
	language.Spanish,
	language.French,
	language.Italian,
	language.Portuguese,
	language.Russian,
	language.Korean,
	language.German,
	language.Japanese,
	language.SimplifiedChinese,
	language.Chinese,
	language.Czech,
}

var matcher = language.NewMatcher(tags)
