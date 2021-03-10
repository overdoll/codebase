package indexes

const (
	CharacterIndex = `{
  	"settings": {
      "index.mapping.single_type": true
    },
    "mappings": {
      "_doc": {
        "dynamic":      "strict",
        "properties": {
          "id":         { "type": "keyword" },
          "thumbnail":  { "type": "keyword" },
          "name":      { "type": "text", "analyzer": "english" },
          "media":    {
			"type": "nested",
            "properties": {
				"id": { "type": "keyword" },
 				"thumbnail": { "type": "keyword" },
                "title": { "type": "text", "analyzer": "english" }
            }
          }
        }
      }
    }
}`
)


const (
	MediaIndex = `{
    "mappings": {
      "media": {
        "dynamic":      "strict",
        "properties": {
          "id":         { "type": "keyword" },
          "thumbnail":  { "type": "keyword" },
          "title":      { "type": "text", "analyzer": "english" },
        }
      }
    }
}`
)

const (
	CategoryIndex = `{
    "mappings": {
      "category": {
        "dynamic":      "strict",
        "properties": {
          "id":         { "type": "keyword" },
          "thumbnail":  { "type": "keyword" },
          "title":      { "type": "text", "analyzer": "english" },
        }
      }
    }
}`
)