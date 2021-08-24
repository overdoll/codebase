package translations

// elasticsearch index with language mappings
const ESIndex = `
{
	"properties": {
		"language": {
			"type": "keyword"
		},
		"supported": {	
			"type": "boolean"
		},
		"en-US": {
			"type": "text",
			"analyzer": "english"
		},
		"es": {
			"type": "text",
			"analyzer": "spanish"
		},
		"fr": {
			"type": "text",
			"analyzer": "french"
		},
		"it": {
			"type": "text",
			"analyzer": "italian"
		},
		"pt": {
			"type": "text",
			"analyzer": "portuguese"
		},
		"ru": {
			"type": "text",
			"analyzer": "russian"
		},
		"ko": {
			"type": "text",
			"analyzer": "nori"
		},
		"de": {
			"type": "text",
			"analyzer": "german"
		},
		"cs": {
			"type": "text",
			"analyzer": "czech"
		},
		"ja": {
			"type": "text",
			"analyzer": "kuromoji"
		},
		"zh-Hans": {
			"type": "text",
			"analyzer": "smartcn"
		},
		"zh": {
			"type": "text",
			"analyzer": "smartcn"
		}
	}
},
`

func GetESSearchFields(prefix string) []string {
	var str []string

	for _, l := range SupportedLanguages {
		str = append(str, prefix+"."+l.Locale())
	}

	return str
}
