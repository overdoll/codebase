package localization

import (
	"golang.org/x/text/language"
)

var defaultLanguage = language.English

var tags = []language.Tag{
	language.English,
	//language.Spanish,
	//language.French,
	//language.Italian,
	//language.Portuguese,
	//language.Russian,
	//language.Korean,
	//language.German,
	//language.Japanese,
	//language.Chinese,
	//language.Czech,
}

var matcher = language.NewMatcher(tags)
