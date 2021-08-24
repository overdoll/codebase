package translations

// elasticsearch index with language mappings
const ElasticSearchIndex = `
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
		"jp-JP": {
			"type": "text",
			"analyzer": "kuromoji"
		},
		"kr-KR": {
			"type": "text",
			"analyzer": "nori"
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
