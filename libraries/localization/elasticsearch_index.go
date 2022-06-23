package localization

const ESSettings = `
    "analysis": {
      "analyzer": {
        "autocomplete": {
          "tokenizer": "autocomplete",
          "filter": [
            "lowercase",
			"truncate"
          ]
        },
        "autocomplete_search": {
          "tokenizer": "lowercase"
        }
      },
      "tokenizer": {
        "autocomplete": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 25,
          "token_chars": [
            "letter"
          ]
        }
      }
    }`

// ESIndex elasticsearch index with language mappings
const ESIndex = `
{
	"properties": {
		"language": {
			"type": "keyword"
		},
		"supported": {	
			"type": "boolean"
		},
		"en": {
			"type": "text",
			"analyzer": "autocomplete",
			"search_analyzer": "autocomplete_search"
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
			"analyzer": "default"
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
			"analyzer": "default"
		},
		"zh": {
			"type": "text",
			"analyzer": "default"
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
